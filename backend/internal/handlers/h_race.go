package handlers

import "github.com/gofiber/fiber/v2"

func NewRace(c *fiber.Ctx) error {

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
		"details": fiber.Map{},
	})
}
