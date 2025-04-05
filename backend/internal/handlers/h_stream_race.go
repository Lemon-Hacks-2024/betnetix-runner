package handlers

import (
	"backend-service/internal/entity"
	"encoding/json"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"math/rand"
	"sort"
	"time"
)

type GroupSubscriber struct {
	Connections map[*websocket.Conn]bool
}

func NewGroupSubscriber() *GroupSubscriber {
	return &GroupSubscriber{
		Connections: make(map[*websocket.Conn]bool),
	}
}

func (gs *GroupSubscriber) AddSubscriber(conn *websocket.Conn) {
	gs.Connections[conn] = true
}

func (gs *GroupSubscriber) RemoveSubscriber(conn *websocket.Conn) {
	delete(gs.Connections, conn)
}

func (gs *GroupSubscriber) BroadcastMessage(mt int, message []byte) {
	for conn := range gs.Connections {
		if err := conn.WriteMessage(mt, message); err != nil {
			log.Printf("write error: %v", err)
			gs.RemoveSubscriber(conn)
		}
	}
}

// Глобальная переменная для хранения подписчиков по группам
var groupSubscribers = make(map[string]*GroupSubscriber)

func (h *Handler) simulateRace(groupId string, raceId string, participants []entity.Player) {
	const trackLength = 100

	result := make([]entity.RaceResult, len(participants))

	for i, participant := range participants {
		result[i] = entity.RaceResult{
			PlayerId: participant.ID,
			Distance: 0,
		}
	}

	race := entity.Race{
		Id:        "",
		GroupId:   groupId,
		Results:   result,
		StartedAt: time.Now().UTC().Unix(),
	}

	// Инициализация текущей скорости каждого участника
	currentSpeeds := make([]float64, len(participants))
	for i := range currentSpeeds {
		currentSpeeds[i] = participants[i].ReactionTime * participants[i].Acceleration // Начальная скорость после реакции
	}

	finished := false
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		allFinished := true

		for i, participant := range participants {
			if race.Results[i].Distance < trackLength {
				// Применение случайного вырыва
				if rand.Float64() < 0.1 { // 10% шанс на вырыв
					currentSpeeds[i] += participant.MaxSpeed * 0.2 // Увеличение скорости на 20% от максимальной
				}

				// Обновление скорости с учетом потери скорости
				if currentSpeeds[i] < participant.MaxSpeed {
					currentSpeeds[i] += participant.Acceleration
					if currentSpeeds[i] > participant.MaxSpeed {
						currentSpeeds[i] = participant.MaxSpeed
					}
				} else {
					currentSpeeds[i] *= (1 - participant.CoffSpeedLoos)
				}

				// Расчет нового расстояния
				newDistance := float64(race.Results[i].Distance) + currentSpeeds[i]
				if newDistance >= trackLength {
					race.Results[i].Distance = trackLength
					race.Results[i].FinishedAt = time.Now().Unix()
				} else {
					race.Results[i].Distance = int64(newDistance)
					allFinished = false
				}
			}
		}

		// Обновление позиций
		sort.Slice(race.Results, func(i, j int) bool {
			return race.Results[i].Distance > race.Results[j].Distance
		})
		for pos, _ := range race.Results {
			race.Results[pos].Position = pos + 1
		}

		// Отправка текущего состояния забега
		msg, _ := json.Marshal(fiber.Map{
			"message": "update",
			"details": race,
		})
		log.Debug().Msgf("Broadcasting message to group: %s, initialized: %v", groupId, groupSubscribers[groupId] != nil)
		groupSubscribers[groupId].BroadcastMessage(websocket.TextMessage, msg)

		if allFinished && !finished {
			finished = true
			msg, _ := json.Marshal(map[string]string{"message": "finish"})
			groupSubscribers[groupId].BroadcastMessage(websocket.TextMessage, msg)
			race.FinishedAt = time.Now().UTC().Unix()
			race.Id = raceId
			h.log.Debug().Msgf("race result: %v", race)
			_, err := h.services.Race.SetResults(race)
			if err != nil {
				h.log.Error().Err(err).Msg("failed to set results")
				return
			}
			break
		}
	}
}

func (h *Handler) streamRaces(c *websocket.Conn) {
	defer c.Close()
	groupID := c.Query("group_id")
	if groupID == "" {
		h.log.Error().Msg("group_id is required")
		return
	}

	if groupSubscribers[groupID] == nil {
		h.log.Error().Msgf("group %s not found", groupID)
		NewGroupSubscriber()
	}

	// Подписываем пользователя на группу
	if _, ok := groupSubscribers[groupID]; !ok {
		groupSubscribers[groupID] = NewGroupSubscriber()
	}

	groupSubscribers[groupID].AddSubscriber(c)

	for {
		mt, msg, err := c.ReadMessage()
		if err != nil {
			h.log.Error().Msgf("read error: %v", err)
			break
		}
		h.log.Debug().Msgf("recv: %s", msg)

		// Здесь может быть логика обработки сообщений от клиентов, например команды на подписку или отписку

		// Рассылка сообщения всем подписчикам группы
		groupSubscribers[groupID].BroadcastMessage(mt, msg)
	}

	// Удаление подписчика при отключении
	groupSubscribers[groupID].RemoveSubscriber(c)
}
