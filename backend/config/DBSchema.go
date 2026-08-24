package config

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Collections
var (
	TodosCollection *mongo.Collection
	UsersCollection *mongo.Collection
)

// Initialize collections
func InitCollections() {
	database := Client.Database("mylittletodo")
	TodosCollection = database.Collection("todos")
	UsersCollection = database.Collection("users")
}

// Todo Schema
type Todo struct {
	ID        primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	UserID    primitive.ObjectID `bson:"userId" json:"-"`
	Body      string             `bson:"body" json:"body"`
	Completed bool               `bson:"completed" json:"completed"`
}

// User Schema
type User struct {
	ID           primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Email        string             `bson:"email" json:"email"`
	PasswordHash string             `bson:"passwordHash" json:"-"`
}

// CreateIndexes creates indexes for better query performance
func CreateIndexes() error {
	indexModel := mongo.IndexModel{
		Keys: bson.D{{Key: "_id", Value: 1}},
	}

	_, err := TodosCollection.Indexes().CreateOne(nil, indexModel)
	if err != nil {
		return err
	}

	return nil
}
