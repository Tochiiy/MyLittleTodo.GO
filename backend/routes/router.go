package routes

import (
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Health check
	app.Get("/health", HealthCheck)

	// Todos routes
	app.Get("/api/mylittletodos", GetAllTodos)
	app.Get("/api/mylittletodos/:id", GetTodoByID)
	app.Post("/api/mylittletodos", CreateTodo)
	app.Put("/api/mylittletodos/:id", UpdateTodo)
	app.Delete("/api/mylittletodos/:id", DeleteTodo)
}
