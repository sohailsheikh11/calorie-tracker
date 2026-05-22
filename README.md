# 🍱 AI Calorie Tracker

An AI-powered calorie tracking web application that analyzes food images and estimates nutritional information such as calories, protein, carbs, and fat using Google Gemini AI.

---

## 🚀 Features

- 📸 Upload food images
- 🤖 AI-powered food analysis using Gemini AI
- 🔥 Calorie estimation
- 💪 Protein, carbs, and fat tracking
- 🗂 Save meal history to MongoDB Atlas
- 📊 Daily calorie calculations
- 🌐 Modern React frontend with Node.js backend

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Fetch API
- CSS

### Backend
- Node.js
- Express.js
- Multer
- Gemini AI API
- Mongoose

### Database
- MongoDB Atlas

## 📂 Project Structure

```bash
AI-Calorie-Tracker/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

# 🌐 API Routes

## 🍱 Food Routes

### Get All Foods

```http
GET /food
```

Fetch all saved food entries.

---

### Delete Food Entry

```http
DELETE /food/:id
```

Deletes a food entry by ID.

| Parameter | Type | Description |
|----------|------|-------------|
| `id` | String | Food document ID |

---

### Analyze Food Image

```http
POST /api/food/analyze
```

Uploads a food image, analyzes nutrition details using Gemini AI, and stores the result in MongoDB.

### Form Data

| Key | Type |
|-----|------|
| `image` | File |

---

## 🔐 Authentication Routes

### User Signup

```http
POST /auth/signup
```

Creates a new user account.

### Request Body

```json
{
  "name": "Sohail",
  "email": "sohail@example.com",
  "password": "password123"
}
```

---

### User Login

```http
POST /auth/login
```

Authenticates a user and returns a token.

### Request Body

```json
{
  "email": "sohail@example.com",
  "password": "password123"
}
```

---

### Delete User Account

```http
POST /auth/delete
```

Deletes the authenticated user's account.

### Headers

```http
Authorization: Bearer <token>
```

Requires authentication middleware.




screenshots
<img width="1838" height="887" alt="Screenshot 2026-05-11 193409" src="https://github.com/user-attachments/assets/032186cb-859e-4d21-a558-21991a23c1ba" />

<img width="1877" height="531" alt="Screenshot 2026-05-11 193422" src="https://github.com/user-attachments/assets/f00a79c2-975b-4cb8-b467-2bd4cecfe23c" />


Get Food History
GET /foods

Returns all saved food entries.

📸 Future Improvements
User authentication
Daily calorie goals
Nutrition charts
Meal categories
Mobile responsive UI
Docker support
Search and filters
🧠 What I Learned
React state management
File uploads with Multer
AI integration using Gemini API
MongoDB Atlas database integration
REST API development
Async JavaScript and debugging
Full-stack project structure
📄 License

This project is open-source and available under the MIT License.
