package handlers

import (
	"backend-service/internal/entity"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) newRace(c *fiber.Ctx) error {
	groupId := c.Params("id")
	if groupId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid group id"})
	}
	h.log.Debug().Msgf("groupId: %s", groupId)

	_, err := h.services.Race.CreateRace(entity.Race{
		GroupId: groupId,
		Results: []entity.RaceResult{},
	})
	if err != nil {
		h.log.Error().Err(err).Msg("failed to create race")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{
			"group_id": groupId,
		},
	})
}
