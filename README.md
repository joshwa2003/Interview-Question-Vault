# Public Interview Question Vault

A full-stack CRUD web app to **store, manage, and filter interview questions** by category and difficulty — built for developers preparing for technical interviews.

🔗 **Live:** [Frontend](https://interview-vault-frontend.onrender.com) · [Backend API](https://interview-vault-backend.onrender.com)  
📦 **Repo:** [github.com/joshwa2003/Interview-Question-Vault](https://github.com/joshwa2003/Interview-Question-Vault)

---

## ✨ About the Project

This project helps you build a public vault of interview questions.

**Features:**
- ➕ Add questions with title, category, difficulty, and answer
- ✏️ Edit existing questions
- 🗑️ Delete questions
- 🔍 Filter questions by category (DSA, React, System Design, etc.)
- 💾 All data saved persistently to MongoDB
- 🐳 Fully Dockerized — runs with one command

**Architecture:**
```
React (Frontend)  →  Node + Express (Backend)  →  MongoDB (Database)
```

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Containerization | Docker + Docker Compose |
| Deployment | Render (Docker backend, Static frontend) |

---

## 🚀 Run with Docker (Easiest — No setup needed)

> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop)

```bash
git clone https://github.com/joshwa2003/Interview-Question-Vault.git
cd Interview-Question-Vault
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5001 |

MongoDB runs inside Docker automatically. No Atlas or Compass needed.

To stop:
```bash
docker-compose down
```

---

## 💻 Run Locally (Without Docker)

### 1. Clone the repo
```bash
git clone https://github.com/joshwa2003/Interview-Question-Vault.git
cd Interview-Question-Vault
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI (see options below)
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env → set VITE_API_URL=http://localhost:5001
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔐 Environment Variables

**backend/.env**

Choose one MongoDB option:

```bash
# Option A — Local MongoDB (MongoDB Compass / local install)
MONGO_URI=mongodb://localhost:27017/interview-vault

# Option B — MongoDB Atlas (Cloud)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-vault

PORT=5001
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5001
```
