# SigmaGPT

An AI-powered conversational web application inspired by ChatGPT, built using the **MERN stack** and the **OpenAI API**. SigmaGPT provides a modern glassmorphism interface, persistent multi-thread conversations, and a scalable Express + MongoDB backend designed with production-oriented development practices.

---

## Preview

<p align="center">
  <img width="1458" alt="Home" src="https://github.com/user-attachments/assets/315f3750-c6af-4b5e-80ac-9eaa427a62df" />
  <br><br>
  <img width="1457" alt="Chat" src="https://github.com/user-attachments/assets/0b128a1e-7d76-4a46-84ea-fecbc7f1f936" />
  <br><br>
  <img width="1459" alt="Conversation History" src="https://github.com/user-attachments/assets/33dd1c27-2048-47af-8115-062eb97b9449" />
</p>

---

## Features

* 🤖 AI-powered conversations using the OpenAI API
* 💬 Multi-thread conversation management
* 📝 Persistent chat history using MongoDB
* ⚡ Fast React + Vite frontend
* 🎨 Premium glassmorphism user interface
* 📱 Responsive design
* 🔒 Secure server-side OpenAI API integration
* 🛡️ Environment-based configuration
* 🚨 Graceful API and database error handling
* 📄 Markdown rendering with syntax-highlighted code blocks

---

## Tech Stack

| Layer               | Technologies                                       |
| ------------------- | -------------------------------------------------- |
| **Frontend**        | React 19, Vite 7, React Markdown, Rehype Highlight |
| **Backend**         | Node.js, Express 5, Mongoose 8, OpenAI SDK         |
| **Database**        | MongoDB Atlas / MongoDB Community                  |
| **Version Control** | Git & GitHub                                       |

---

## Architecture

```text
                User
                  │
                  ▼
        React + Vite Frontend
                  │
          REST API Requests
                  │
                  ▼
         Express + Node.js API
          │                 │
          │                 ▼
          │          OpenAI API
          │
          ▼
      MongoDB Database
```

---

## Project Structure

```text
SigmaGPT
├── Backend
│   ├── models
│   │   └── Thread.js
│   ├── routes
│   │   ├── chat.js
│   │   └── thread.js
│   ├── utils
│   │   └── openai.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── Frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Prerequisites

Before running the project, install the following:

* Node.js **20+** (developed on Node.js 24)
* npm
* MongoDB Atlas account (recommended) or local MongoDB
* OpenAI API Key

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/deonJoseDJV/GPT.git
cd GPT
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update the `.env` file:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sigmagpt
PORT=8080
```

Start the backend:

```bash
npm run dev
```

or

```bash
npm start
```

Expected output:

```text
Connected with Database!
Server running on port 8080
```

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the **Backend** directory.

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| OPENAI_API_KEY | Your OpenAI API key                 |
| MONGODB_URI    | MongoDB Atlas or local database URI |
| PORT           | Backend server port                 |

---

## API Endpoints

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/api/chat`       | Generate AI responses     |
| GET    | `/api/thread`     | Fetch all chat threads    |
| POST   | `/api/thread`     | Create a new conversation |
| DELETE | `/api/thread/:id` | Delete a conversation     |

---

## Security

The application follows several backend security practices:

* Server-side API key management
* Environment variable configuration
* Input validation
* CORS configuration
* Centralized error handling
* Protected OpenAI API calls
* Graceful fallback responses

---

## Running on Another Machine

After cloning the repository:

1. Run `npm install` in both the `Backend` and `Frontend` folders.
2. Create a new `.env` file from `.env.example`.
3. Add your OpenAI API key.
4. Configure your MongoDB connection.
5. Start the backend.
6. Start the frontend.

### MongoDB Atlas

If using MongoDB Atlas, ensure the new machine's IP address is added to the Atlas Network Access allowlist.

For development, you may temporarily allow:

```text
0.0.0.0/0
```

---

## Development Scripts

### Backend

```bash
npm run dev
```

Runs the backend using Nodemon.

```bash
npm start
```

Runs the production server.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run preview
```

Previews the production build locally.

---

## Future Improvements

* User authentication
* Streaming AI responses
* Image generation support
* Voice input
* Chat sharing
* Conversation search
* Export conversations
* Theme customization

---

## Key Learnings

This project strengthened my understanding of:

* Full-stack MERN application development
* REST API design
* MongoDB schema design using Mongoose
* Secure OpenAI API integration
* Environment-based configuration
* Frontend state management in React
* Production-oriented backend architecture
* Error handling and debugging

---

## Author

**Deon Jose**

Computer Science Engineering Student

GitHub: https://github.com/deonJoseDJV

---

## License

This project is intended for educational and portfolio purposes.
