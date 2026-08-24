package routes

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"github.com/Tochiiy/MyLittleTodo.GO/config"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func getJWTSecret() []byte {
	return []byte(os.Getenv("JWT_SECRET"))
}

func generateToken(userID primitive.ObjectID) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID.Hex(),
		"exp": time.Now().Add(72 * time.Hour).Unix(),
		"iat": time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(getJWTSecret())
}

// AuthMiddleware - validates the Bearer token and stores userId in locals
func AuthMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(401).JSON(fiber.Map{"error": "Missing or invalid Authorization header"})
	}

	tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.ErrUnauthorized
		}
		return getJWTSecret(), nil
	})
	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	sub, ok := claims["sub"].(string)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token subject"})
	}

	userID, err := primitive.ObjectIDFromHex(sub)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid user ID in token"})
	}

	c.Locals("userId", userID)
	return c.Next()
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Register - create a new user account
func Register(c *fiber.Ctx) error {
	var req registerRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	if req.Email == "" || !strings.Contains(req.Email, "@") {
		return c.Status(400).JSON(fiber.Map{"error": "Valid email is required"})
	}
	if len(req.Password) < 6 {
		return c.Status(400).JSON(fiber.Map{"error": "Password must be at least 6 characters"})
	}

	err := config.UsersCollection.FindOne(context.Background(), bson.M{"email": req.Email}).Decode(&config.User{})
	if err == nil {
		return c.Status(409).JSON(fiber.Map{"error": "Email already registered"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user := config.User{
		ID:           primitive.NewObjectID(),
		Email:        req.Email,
		PasswordHash: string(hash),
	}

	_, err = config.UsersCollection.InsertOne(context.Background(), user)
	if err != nil {
		log.Println("Insert user error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create account"})
	}

	token, err := generateToken(user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
	}

	return c.Status(201).JSON(fiber.Map{
		"user":  user,
		"token": token,
	})
}

// Login - authenticate a user
func Login(c *fiber.Ctx) error {
	var req registerRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))

	var user config.User
	err := config.UsersCollection.FindOne(context.Background(), bson.M{"email": req.Email}).Decode(&user)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	token, err := generateToken(user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
	}

	return c.Status(200).JSON(fiber.Map{
		"user":  user,
		"token": token,
	})
}
