package handlers

import (
	"backend-service/internal/entity"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (h *Handler) createGroup(c *fiber.Ctx) error {
	var input struct {
		Details struct {
			Name    string          `json:"name"`
			Players []entity.Player `json:"players"`
		} `json:"details"`
	}

	if err := c.BodyParser(&input); err != nil {
		h.log.Error().Err(err).Msg("BodyParser failed")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid JSON body",
		})
	}

	if input.Details.Name == "" {
		h.log.Warn().Msg("Group name is empty")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Group name is required",
		})
	}

	group := entity.Group{
		ID:               uuid.New().String(),
		Name:             input.Details.Name,
		DateTimeLastRace: 0,
		Players:          input.Details.Players,
	}

	groupID, err := h.services.Group.CreateGroup(group)
	if err != nil {
		h.log.Error().Err(err).Msg("failed to create group")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to create group",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{
			"group_id": groupID,
		},
	})
}

func (h *Handler) getGroups(c *fiber.Ctx) error {
	groups, err := h.services.Group.GetGroups()
	if err != nil {
		h.log.Error().Err(err).Msg("failed to get groups")
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "failed to get groups",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{
			"groups": groups,
		},
	})
}

func (h *Handler) getGroup(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	group, err := h.services.Group.GetGroup(groupID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "failed to get group",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": group,
	})
}

func (h *Handler) generateRandomPlayers(c *fiber.Ctx) error {
	players, err := h.services.Group.GetRandomPlayers()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "failed to generate players",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": players,
	})
}

func (h *Handler) updateGroupPlayers(c *fiber.Ctx) error {
	groupID := c.Params("id")
	if groupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "group ID is required",
		})
	}

	var input struct {
		GroupName string          `json:"name"`    // новое имя, если есть
		Details   []entity.Player `json:"details"` // список игроков
	}

	if err := c.BodyParser(&input); err != nil || len(input.Details) == 0 {
		h.log.Error().Err(err).Msg("BodyParser failed or empty player list")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid player data",
		})
	}

	// Если указано новое имя — обновляем его
	if input.GroupName != "" {
		if err := h.services.Group.UpdateGroupName(groupID, input.GroupName); err != nil {
			h.log.Error().Err(err).Str("group_id", groupID).Msg("failed to update group name")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "failed to update group name",
			})
		}
	}

	// Обновляем игроков
	if err := h.services.Group.UpdatePlayers(groupID, input.Details); err != nil {
		h.log.Error().Err(err).Str("group_id", groupID).Msg("failed to update players")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
