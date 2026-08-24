package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Tochiiy/MyLittleTodo.GO/config"
	"github.com/Tochiiy/MyLittleTodo.GO/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.ConnectToDB()
	config.InitCollections()
	port := os.Getenv("PORT")
	fmt.Println("Server is running on port", port)

	app := fiber.New()

	// Setup all routes
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":" + port))
}
