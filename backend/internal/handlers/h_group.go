package handlers

import (
	"backend-service/internal/entity"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"time"
)

func (h *Handler) createGroup(c *fiber.Ctx) error {

	// Получаем только name из запроса
	var input struct {
		Name string `json:"name"`
	}
	if err := c.BodyParser(&input); err != nil || input.Name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid group name"})
	}

	// Создаём структуру группы
	group := entity.Group{
		ID:               uuid.New().String(),
		Name:             input.Name,
		DateTimeLastRace: time.Now().Unix(),
		Players:          nil, // будет сгенерировано в сервисе
	}

	// Создаём группу через сервис
	groupID, err := h.services.Group.CreateGroup(group)
	if err != nil {
		h.log.Error().Err(err).Msg("failed to create group")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to create group",
		})
	}

	// Возвращаем успешный ответ
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{
			"group_id": groupID,
			"name":     group.Name,
		},
	})
}

func (h *Handler) getGroups(c *fiber.Ctx) error {

	groups, err := h.services.Group.GetGroups()
	if err != nil {
		h.log.Error().Err(err).Msg("failed to get groups")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
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
