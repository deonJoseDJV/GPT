# SigmaGPT

A MERN-based ChatGPT replica implemented from scratch using OpenAI, with a
premium glassmorphism UI (React + Vite) and an Express + MongoDB backend.

---

## Stack

| Layer     | Tech                                             |
|-----------|--------------------------------------------------|
| Frontend  | React 19, Vite 7, react-markdown, rehype-highlight |
| Backend   | Node.js, Express 5, Mongoose 8, OpenAI SDK       |
| Database  | MongoDB (local or MongoDB Atlas)                 |

---

## Prerequisites

- **Node.js 20+** (developed on v24) and npm
- A **MongoDB** database — either:
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended, works from any machine), or
  - a local MongoDB install
- An **OpenAI API key** — https://platform.openai.com/api-keys

---

## Setup (run on any machine after cloning)

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
```

Open `Backend/.env` and fill in:

```
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/sigmagpt
PORT=8080
```

Then start it:

```bash
npm run dev      # auto-reload (nodemon)
# or
npm start        # plain node
```

You should see `server running on 8080` and `Connected with Database!`.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open the printed URL (default **http://localhost:5173**).

---

## Important notes for running on another system

- **`.env` and `node_modules` are gitignored** — they are *not* pushed to GitHub.
  On every new machine you must recreate `.env` (step 1) and run `npm install`
  in **both** `Backend/` and `Frontend/`.

- **MongoDB Atlas IP allowlist:** Atlas only accepts connections from allowed IPs.
  In the Atlas dashboard → **Network Access**, add the new machine's IP, or add
  `0.0.0.0/0` (allow from anywhere) for development. Otherwise the backend will
  hang/timeout connecting to the database.

- **Corporate networks (SSL inspection / Zscaler, etc.):** some corporate networks
  block or intercept `api.openai.com`, which shows up as a `403` or a TLS
  certificate error. The `start`/`dev` scripts already pass `--use-system-ca` so
  Node trusts the OS certificate store. If OpenAI is still blocked, run it on a
  network that permits `api.openai.com`, or route through an approved gateway.

---

## Project structure

```
gpt/
├── Backend/
│   ├── models/        # Mongoose schemas (Thread)
│   ├── routes/        # Express routes (/api/chat, /api/thread)
│   ├── utils/         # openai.js — OpenAI request helper
│   ├── server.js      # app entry point
│   └── .env.example   # template for required secrets
└── Frontend/
    └── src/           # React components + CSS (glassmorphism UI)
```
