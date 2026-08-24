package routes

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetupRoutes(app *fiber.App) {
	// CORS - allow requests from the deployed frontend and local dev
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	app.Use(cors.New(cors.Config{
		AllowOrigins: allowedOrigins,
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Content-Type,Authorization",
	}))

	// Health check
	app.Get("/health", HealthCheck)

	// Auth routes
	app.Post("/api/register", Register)
	app.Post("/api/login", Login)

	// Todos routes (protected)
	todos := app.Group("/api/mylittletodos", AuthMiddleware)
	todos.Get("/", GetAllTodos)
	todos.Post("/", CreateTodo)
	todos.Get("/:id", GetTodoByID)
	todos.Put("/:id", UpdateTodo)
	todos.Delete("/:id", DeleteTodo)
}
