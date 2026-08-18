# MyLittleTodo API - End-to-End Testing Guide

## 🚀 Quick Start

### 1. Seed the Database
Run this command to populate MongoDB with test data:
```bash
go run seed.go seed
```

This will create 5 sample todos and display:
- ✅ Confirmation message
- 📝 List of seeded todos with IDs
- 📋 Example API endpoints for testing

### 2. Start the Server
```bash
air
```

### 3. Test the API

## 📋 Test Endpoints

### 1. Health Check
**Test if API is running**
```
GET http://localhost:8000/health
```
Expected Response:
```json
{
  "message": "little todo api is healthy and running ❤️"
}
```

### 2. Get All Todos
**Fetch all todos from database**
```
GET http://localhost:8000/api/mylittletodos
```
Expected Response:
```json
[
  {
    "id": "ObjectID",
    "body": "Buy milk from the store",
    "completed": false
  },
  ...
]
```

### 3. Get Single Todo
**Fetch a specific todo by ID**
```
GET http://localhost:8000/api/mylittletodos/{id}
```
Replace `{id}` with an actual MongoDB ObjectID from the seeded data.

Expected Response:
```json
{
  "id": "ObjectID",
  "body": "Buy milk from the store",
  "completed": false
}
```

### 4. Create Todo
**Add a new todo**
```
POST http://localhost:8000/api/mylittletodos
Content-Type: application/json

{
  "body": "Your new todo here",
  "completed": false
}
```
Expected Response (201 Created):
```json
{
  "id": "newly-generated-objectid",
  "body": "Your new todo here",
  "completed": false
}
```

### 5. Update Todo
**Update an existing todo**
```
PUT http://localhost:8000/api/mylittletodos/{id}
Content-Type: application/json

{
  "body": "Updated todo text",
  "completed": true
}
```
Expected Response (200 OK):
```json
{
  "message": "Todo updated successfully"
}
```

### 6. Delete Todo
**Remove a todo**
```
DELETE http://localhost:8000/api/mylittletodos/{id}
```
Expected Response (200 OK):
```json
{
  "message": "Todo deleted successfully"
}
```

## 🧪 Using Thunder Client

1. Open Thunder Client extension in VS Code
2. Click "Import" and select `thunder-collection.json`
3. Replace `{{todoId}}` with actual IDs from responses
4. Run each request in order

## 🔍 Debugging

### Check MongoDB Connection
The server logs connection status:
```
Connected to MongoDB!
Server is running on port 8000
```

### View Database
Connect to your MongoDB Atlas cluster at:
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/
```
Select database: `mylittletodo`
Collection: `todos`

### Common Errors
- **Invalid ID format** - Make sure ID is a valid MongoDB ObjectID (24 hex characters)
- **Todo not found** - Verify the ID exists in the database
- **Connection failed** - Check `MONGODB_URI` in `.env` file

## 📝 Sample Test Flow

1. Run `go run seed.go seed` → 5 todos created
2. `GET /api/mylittletodos` → See all 5 todos
3. `POST /api/mylittletodos` → Create a new todo
4. `GET /api/mylittletodos/{id}` → Get the newly created todo
5. `PUT /api/mylittletodos/{id}` → Update it
6. `DELETE /api/mylittletodos/{id}` → Delete it
7. `GET /api/mylittletodos` → Verify it's gone

## 🎯 Test Checklist

- [ ] Health check returns 200
- [ ] Get all todos returns array
- [ ] Get single todo returns correct data
- [ ] Create todo generates new ID
- [ ] Update todo changes data
- [ ] Delete todo removes from database
- [ ] Invalid ID returns 400 error
- [ ] Non-existent todo returns 404 error
- [ ] Empty body in create returns 400 error

Done! ✅ Your API is fully tested and ready for frontend integration!
