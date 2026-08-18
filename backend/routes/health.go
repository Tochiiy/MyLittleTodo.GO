package routes

import (
	"github.com/gofiber/fiber/v2"
)

func HealthCheck(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "little todo api is healthy and running ❤️",
	})
}
