package handlers

import (
	"backend-service/internal/entity"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"math/rand"
	"strconv"
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

	group, err := h.services.Group.GetGroup(groupId)
	if err != nil {
		h.log.Error().Err(err).Msg("failed to get group")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	players := group.Players

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
			Number:        rand.Intn(100) + 1,
			ReactionTime:  0.1 + rand.Float64()*(0.3-0.1),    // Реакция в диапазоне 0.1 до 0.3 секунд
			Acceleration:  8 + rand.Float64()*(12-7),         // Ускорение от 8 до 12 м/с²
			MaxSpeed:      10 + rand.Float64()*(12-10),       // Максимальная скорость от 10 до 12 м/с
			CoffSpeedLoos: 0.01 + rand.Float64()*(0.05-0.01), // Коэффициент потери скорости от 0.01 до 0.05
		}
	}

	return players
}

func (h *Handler) creatRaces(c *fiber.Ctx) error {
	groupId := c.Params("id")
	if groupId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid group id"})
	}
	h.log.Debug().Msgf("groupId: %s", groupId)

	// Получаем количество симуляций (по умолчанию 1)
	quantityStr := c.Params("quantity", "1")
	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity < 1 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid quantity"})
	}

	// Получаем группу с участниками
	group, err := h.services.Group.GetGroup(groupId)
	if err != nil {
		h.log.Error().Err(err).Msg("failed to get group")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to get group",
		})
	}

	raceIDs := make([]string, 0, quantity)

	for i := 0; i < quantity; i++ {
		race := h.services.Race.Simulate(group)

		raceId, err := h.services.Race.CreateRace(race)
		if err != nil {
			h.log.Error().Err(err).Msgf("failed to create race #%d", i+1)
			continue // Пропускаем неудачный забег, но продолжаем
		}

		raceIDs = append(raceIDs, raceId)
	}

	if len(raceIDs) == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to create any races",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "races created successfully",
		"race_ids":  raceIDs,
		"group_id":  groupId,
		"generated": len(raceIDs),
	})
}
