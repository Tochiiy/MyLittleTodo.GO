package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/Tochiiy/MyLittleTodo.GO/config"
	"github.com/Tochiiy/MyLittleTodo.GO/routes"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func seedDatabase() {
	godotenv.Load()
	config.ConnectToDB()
	defer func() {
		if err := config.Client.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v\n", err)
		}
	}()
	
	config.InitCollections()

	// Clear existing todos
	err := config.TodosCollection.Drop(context.Background())
	if err != nil {
		log.Printf("Warning: Could not drop collection: %v\n", err)
	}

	// Sample test data
	sampleTodos := []routes.Todo{
		{
			ID:        primitive.NewObjectID(),
			Body:      "Buy milk from the store",
			Completed: false,
		},
		{
			ID:        primitive.NewObjectID(),
			Body:      "Finish Go project",
			Completed: false,
		},
		{
			ID:        primitive.NewObjectID(),
			Body:      "Review pull requests",
			Completed: true,
		},
		{
			ID:        primitive.NewObjectID(),
			Body:      "Schedule meeting with team",
			Completed: false,
		},
		{
			ID:        primitive.NewObjectID(),
			Body:      "Deploy to production",
			Completed: false,
		},
	}

	// Insert test data
	result, err := config.TodosCollection.InsertMany(context.Background(), todoInterfaceSlice(sampleTodos))
	if err != nil {
		log.Fatal("Error seeding database:", err)
	}

	fmt.Println("✅ Database seeded successfully!")
	fmt.Printf("📝 Inserted %d todos\n", len(result.InsertedIDs))
	fmt.Println("\n📋 Test Todos Created:")
	for i, todo := range sampleTodos {
		status := "❌"
		if todo.Completed {
			status = "✅"
		}
		fmt.Printf("%d. %s %s\n", i+1, status, todo.Body)
		fmt.Printf("   ID: %s\n", todo.ID.Hex())
	}

	fmt.Println("\n🧪 API Test Endpoints:")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("\n1️⃣  GET All Todos")
	fmt.Println("   GET http://localhost:8000/api/mylittletodos")

	fmt.Println("\n2️⃣  GET Single Todo (replace {id} with actual ID)")
	fmt.Println("   GET http://localhost:8000/api/mylittletodos/{id}")
	if len(sampleTodos) > 0 {
		fmt.Printf("   Example: GET http://localhost:8000/api/mylittletodos/%s\n", sampleTodos[0].ID.Hex())
	}

	fmt.Println("\n3️⃣  CREATE New Todo")
	fmt.Println("   POST http://localhost:8000/api/mylittletodos")
	fmt.Println("   Body: {\"body\": \"Your todo here\", \"completed\": false}")

	fmt.Println("\n4️⃣  UPDATE Todo")
	fmt.Println("   PUT http://localhost:8000/api/mylittletodos/{id}")
	fmt.Println("   Body: {\"body\": \"Updated text\", \"completed\": true}")

	fmt.Println("\n5️⃣  DELETE Todo")
	fmt.Println("   DELETE http://localhost:8000/api/mylittletodos/{id}")

	fmt.Println("\n6️⃣  Health Check")
	fmt.Println("   GET http://localhost:8000/health")

	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
}

// Helper function to convert []Todo to []interface{}
func todoInterfaceSlice(todos []routes.Todo) []interface{} {
	result := make([]interface{}, len(todos))
	for i, v := range todos {
		result[i] = v
	}
	return result
}

func main() {
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		seedDatabase()
	} else {
		fmt.Println("Usage: go run seed.go seed")
	}
}
