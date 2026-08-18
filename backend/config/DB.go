package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func ConnectToDB() {
	godotenv.Load()
	uri := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(uri)
	var err error
	Client, err = mongo.NewClient(clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = Client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	err = Client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
}
