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
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"message": "failed to calculate place probabilities",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": result,
	})
}

func (h *Handler) getTop2Probabilities(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	result, err := h.services.Analytics.GetTops2Probabilities(groupID)
	if err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"message": "failed to calculate place probabilities",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": result,
	})
}

func (h *Handler) getTop3Probabilities(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	result, err := h.services.Analytics.GetTop3Probabilities(groupID)
	if err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"message": "failed to calculate place probabilities",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": result,
	})
}

func (h *Handler) getPairsProbabilities(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	result, err := h.services.Analytics.GetPairPlaceProbabilities(groupID)
	if err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"message": "failed to calculate place probabilities",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": result,
	})
}
