# ✅ MyLittleTodo.GO

A full-stack todo app with per-user authentication.
**Go (Fiber) + MongoDB** backend · **React + Vite + Chakra UI** frontend · **JWT** auth.

## 🌐 Live Demo

> ### 👉 [https://mylittle2do.vercel.app](https://mylittle2do.vercel.app)

Create a free account and start organizing — no setup needed.

---

## ✨ Features

- 🔐 **Per-user auth** — register / login with JWT (72h tokens)
- 🙈 **Password security** — bcrypt hashing, show/hide toggle
- 📝 **Full CRUD** — create, complete, delete your own todos
- 👤 **User isolation** — every todo is scoped to its owner
- 🌙 **Dark mode** — persisted toggle
- 📱 **Responsive** — centered layout, works on all screens
- 🐳 **Dockerized** — one command to run everything

---

## 🗂️ Project Structure

```
MyLittleTodo.GO/
├── 📁 backend/          # Go Fiber API
│   ├── 📁 config/       #   DB connection & schemas
│   ├── 📁 routes/       #   auth, todos, health
│   └── 🐳 Dockerfile
├── 📁 frontend/         # React + Vite + Chakra UI
│   ├── 📁 src/api/      #   API client
│   ├── 📁 src/components/
│   └── 🐳 Dockerfile
└── 🐳 docker-compose.yml
```

---

## 🚀 Quick Start (Local)

### 1️⃣ Backend

```bash
cd backend
cp .env.example .env        # ✏️ fill in your values
go run .
# ▶️ API running on http://localhost:8000
```

### 2️⃣ Frontend

```bash
cd frontend
cp .env.example .env        # ✏️ set VITE_API_URL (empty = same origin)
npm install
npm run dev
# ▶️ App running on http://localhost:5173
```

---

## 🐳 Run with Docker (one command)

```bash
cp backend/.env.example backend/.env   # ✏️ fill in your values
docker compose up --build
# ▶️ App: http://localhost:3000  ·  API: http://localhost:8000
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable          | Description                                  |
| ----------------- | -------------------------------------------- |
| `PORT`            | Server port (default `8000`)                 |
| `MONGODB_URI`     | MongoDB connection string (Atlas or local)   |
| `JWT_SECRET`      | Secret for signing tokens                    |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins                 |

### Frontend (`frontend/.env`)

| Variable      | Description                                              |
| ------------- | -------------------------------------------------------- |
| `VITE_API_URL`| Backend URL. **Empty = same origin** (proxy/rewrite)     |

> 💡 **Easy switching:** copy `.env.example` → `.env` in each folder.
> Never commit real `.env` files — they are git-ignored.

---

## 📡 API Endpoints

| Method   | Endpoint                 | Auth | Description        |
| -------- | ------------------------ | ---- | ------------------ |
| `GET`    | `/health`                | ❌   | Health check       |
| `POST`   | `/api/register`          | ❌   | Create account     |
| `POST`   | `/api/login`             | ❌   | Get JWT token      |
| `GET`    | `/api/mylittletodos`     | ✅   | List your todos    |
| `POST`   | `/api/mylittletodos`     | ✅   | Create a todo      |
| `GET`    | `/api/mylittletodos/:id` | ✅   | Get one todo       |
| `PUT`    | `/api/mylittletodos/:id` | ✅   | Update a todo      |
| `DELETE` | `/api/mylittletodos/:id` | ✅   | Delete a todo      |

> 🔒 Protected routes need header: `Authorization: Bearer <token>`

---

## 🌍 Deploy (Production)

### Backend → Render

1. Push this repo to GitHub
2. On [Render](https://render.com): **New → Blueprint** → select the repo
   (`render.yaml` is auto-detected)
3. Set `MONGODB_URI` when prompted (Atlas connection string)

### Frontend → Vercel

1. On [Vercel](https://vercel.com): **Add New → Project** → import the repo
2. **Root directory:** `frontend`
3. Edit `frontend/vercel.json` → replace `REPLACE-WITH-YOUR-RENDER-URL`
   with your Render API URL
4. Deploy ✅

### 🐳 Or anywhere with Docker

```bash
docker compose up --build -d
```

---

## 🧪 Testing

```bash
cd backend
go run seed.go seed    # 🌱 seed 5 sample todos
```

---

## 🛠️ Tech Stack

| Layer    | Tech                                        |
| -------- | ------------------------------------------- |
| Backend  | 🐹 Go · ⚡ Fiber · 🍃 MongoDB Driver         |
| Frontend | ⚛️ React 19 · ⚡ Vite · 🎨 Chakra UI v3     |
| Data     | 🔄 TanStack Query                           |
| Auth     | 🔑 JWT (golang-jwt) · 🔒 bcrypt             |
| Deploy   | 🐳 Docker · 🟢 Render · ▲ Vercel            |
