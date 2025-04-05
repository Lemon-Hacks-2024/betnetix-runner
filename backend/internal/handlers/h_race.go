package handlers

import (
	"backend-service/internal/entity"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"math/rand"
	"time"
)

func (h *Handler) newRace(c *fiber.Ctx) error {
	groupId := c.Params("id")
	if groupId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid group id"})
	}
	h.log.Debug().Msgf("groupId: %s", groupId)

	raceId, err := h.services.Race.CreateRace(entity.Race{
		GroupId: groupId,
		Results: []entity.RaceResult{},
	})
	if err != nil {
		h.log.Error().Err(err).Msg("failed to create race")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	players := generatePlayers(6, groupId)

	go h.simulateRace(groupId, raceId, players)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{
			"id": groupId,
		},
	})
}

// Функция для генерации списка участников с реалистичными данными
func generatePlayers(numPlayers int, groupID string) []entity.Player {
	rand.Seed(time.Now().UnixNano())
	players := make([]entity.Player, numPlayers)

	colors := []string{"Red", "Blue", "Green", "Yellow", "Black", "White", "Purple", "Orange"}
	names := []string{"John", "Sarah", "Mike", "Jessica", "Chris", "Ashley", "Brian", "Laura"}

	for i := range players {
		players[i] = entity.Player{
			ID:            fmt.Sprintf("player_%d", i+1),
			GroupID:       groupID,
			Name:          names[rand.Intn(len(names))],
			Color:         colors[rand.Intn(len(colors))],
			Number:        fmt.Sprintf("%d", rand.Intn(100)+1),
			ReactionTime:  0.1 + rand.Float64()*(0.3-0.1),    // Реакция в диапазоне 0.1 до 0.3 секунд
			Acceleration:  8 + rand.Float64()*(12-7),         // Ускорение от 8 до 12 м/с²
			MaxSpeed:      10 + rand.Float64()*(12-10),       // Максимальная скорость от 10 до 12 м/с
			CoffSpeedLoos: 0.01 + rand.Float64()*(0.05-0.01), // Коэффициент потери скорости от 0.01 до 0.05
		}
	}

	return players
}
