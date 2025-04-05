package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) getPlacesProbabilities(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	result, err := h.services.Analytics.GetPlaceProbabilities(groupID)
	if err != nil {
		h.log.Error().Err(err).Msg("failed to calculate place probabilities")
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"message": "failed to calculate place probabilities",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": result,
	})
}
