package routes

import (
	"context"

	"github.com/Tochiiy/MyLittleTodo.GO/config"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Todo Schema
type Todo struct {
	ID        primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Body      string             `bson:"body" json:"body"`
	Completed bool               `bson:"completed" json:"completed"`
}

// GetAllTodos - Get all todos
func GetAllTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := config.TodosCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch todos",
		})
	}
	defer cursor.Close(context.Background())

	if err := cursor.All(context.Background(), &todos); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to decode todos",
		})
	}

	if todos == nil {
		todos = []Todo{}
	}

	return c.Status(200).JSON(todos)
}

// GetTodoByID - Get a single todo by ID
func GetTodoByID(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid ID format",
		})
	}

	var todo Todo
	err = config.TodosCollection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&todo)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Todo not found",
		})
	}

	return c.Status(200).JSON(todo)
}

// CreateTodo - Create a new todo
func CreateTodo(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "Todo body cannot be empty",
		})
	}

	todo.ID = primitive.NewObjectID()

	insertResult, err := config.TodosCollection.InsertOne(context.Background(), todo)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create todo",
		})
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

// UpdateTodo - Update a todo
func UpdateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid ID format",
		})
	}

	todo := new(Todo)
	if err := c.BodyParser(todo); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{
		"body":      todo.Body,
		"completed": todo.Completed,
	}}

	_, err = config.TodosCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update todo",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Todo updated successfully",
	})
}

// DeleteTodo - Delete a todo
func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid ID format",
		})
	}

	filter := bson.M{"_id": objectID}
	result, err := config.TodosCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to delete todo",
		})
	}

	if result.DeletedCount == 0 {
		return c.Status(404).JSON(fiber.Map{
			"error": "Todo not found",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Todo deleted successfully",
	})
}
