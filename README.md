# GPT Chat Application 🚀

A full-stack GPT-powered chat application inspired by ChatGPT, built using modern web technologies.  
The app supports multi-thread conversations, chat history, typing animation, and Markdown-rendered responses.

---

## ✨ Features

- 🧵 Multi-thread chat system
- 💬 Persistent chat history per thread
- ⚡ Typing animation for GPT replies
- 🧠 GPT-powered responses using OpenAI API
- 📝 Markdown + syntax-highlighted code blocks
- 🖥️ Clean and responsive UI
- 🌐 RESTful backend architecture

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Context API
- Fetch API
- React Markdown
- Highlight.js
- CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- OpenAI API
- UUID
- dotenv & CORS

---

## 📁 Project Structure

```
gpt/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env (ignored)
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gpt-chat-app.git
cd gpt-chat-app
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=8080
```

Start the backend server:

```bash
npm start
```

Backend runs at:
```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/chat` | Send message and receive GPT reply |
| GET | `/api/thread` | Fetch all chat threads |
| GET | `/api/thread/:threadId` | Fetch messages for a thread |
| DELETE | `/api/thread/:threadId` | Delete a thread |

---

## 🧠 Application Flow

1. User sends a message from the UI
2. Backend stores message in MongoDB
3. Backend requests response from OpenAI
4. GPT reply is saved and returned
5. Frontend renders response with typing animation
6. Chat history is preserved per thread

---

## 🔐 Security

- `.env` file is ignored via `.gitignore`
- API keys are never exposed to the frontend
- Backend handles all OpenAI communication

---

## 🚧 Future Enhancements

- User authentication
- Streaming GPT responses
- Cloud deployment
- Chat export functionality
- Mobile UI optimization

---

## 👤 Author

**Deon Jose**  
Built with ❤️ and curiosity

---

## 📜 License

This project is open-source and available under the MIT License.
