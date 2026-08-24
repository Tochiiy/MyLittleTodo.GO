# ✅ MyLittleTodo.GO

A full-stack todo app with per-user authentication and a landing page.
**Go (Fiber) + MongoDB** backend · **React + Vite + Chakra UI** frontend · **JWT** auth.

## 🌐 Live Demo

> ### 👉 [https://mylittle2do.vercel.app](https://mylittle2do.vercel.app)

Create a free account and start organizing — no setup needed.

---

## ✨ Features

- 🏠 **Landing page** — hero, feature showcase, smooth-scroll CTA
- 🔐 **Per-user auth** — register / login with JWT (72h tokens)
- 🙈 **Password security** — bcrypt hashing + show/hide eye toggle
- 📝 **Full CRUD** — create, complete, delete your own todos
- 👤 **User isolation** — every todo is scoped to its owner
- 🌙 **Dark mode** — persisted toggle
- 📱 **Responsive** — centered layout, works on all screens
- 🚀 **Deployed** — Vercel (frontend) + Render (backend)

---

## 🗂️ Project Structure

```
MyLittleTodo.GO/
├── 📁 backend/              # Go Fiber API
│   ├── 📁 config/           #   DB connection & schemas
│   ├── 📁 routes/           #   auth, todos, health
│   ├── 🐳 Dockerfile
│   └── 🔑 .env.example
├── 📁 frontend/             # React + Vite + Chakra UI
│   ├── 📁 src/api/          #   API client (token handling)
│   ├── 📁 src/components/   #   Landing, Auth, Todos, providers
│   ├── 🐳 Dockerfile        #   nginx + API proxy
│   ├── ⚙️ vercel.json       #   production rewrites
│   └── 🔑 .env.example
├── 🐳 docker-compose.yml    # full stack in one command
└── ⚙️ render.yaml           # Render blueprint (backend)
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
cp .env.example .env        # ✏️ set VITE_API_URL (empty = same origin via Vite proxy)
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

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Backend URL. **Empty = same origin** (proxy/rewrite) |

> 💡 **Easy switching:** copy `.env.example` → `.env` in each folder.
> Never commit real `.env` files — they are git-ignored.

---

## 📡 API Endpoints

Base URL (production): `https://mylittletodo-go.onrender.com`

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

## 🌍 Deployment

| Piece    | Platform | URL                                        |
| -------- | -------- | ------------------------------------------ |
| Frontend | ▲ Vercel | https://mylittle2do.vercel.app             |
| Backend  | 🟢 Render| https://mylittletodo-go.onrender.com       |

- **Backend (Render):** Blueprint from `render.yaml` — Docker runtime, free plan,
  auto health checks on `/health`
- **Frontend (Vercel):** auto-deploys on push to `main`; `/api/*` requests are
  rewritten to the Render backend via `frontend/vercel.json`

> ⚠️ Render free tier spins down after 15 min idle — first request may take ~30-50s.

### 🐳 Or self-host with Docker

```bash
docker compose up --build -d
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
