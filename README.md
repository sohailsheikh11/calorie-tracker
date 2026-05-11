🍱 AI Calorie Tracker

An AI-powered calorie tracking web application that analyzes food images and estimates nutritional information such as calories, protein, carbs, and fat using Google Gemini AI.

🚀 Features
📸 Upload food images
🤖 AI-powered food analysis using Gemini AI
🔥 Calorie estimation
💪 Protein, carbs, and fat tracking
🗂 Save meal history to MongoDB Atlas
📊 Daily calorie calculations
🗺 Built with a modern React frontend and Node.js backend
🛠 Tech Stack
Frontend
React
Vite
Fetch API
CSS
Backend
Node.js
Express.js
Multer
Gemini AI API
Mongoose
Database
MongoDB Atlas
📂 Project Structure
project/
│
├── Frontend/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│
├── README.md
⚙️ Installation
1. Clone Repository
git clone https://github.com/yourusername/ai-calorie-tracker.git
2. Install Dependencies
Frontend
cd Frontend
npm install
Backend
cd Backend
npm install
🔑 Environment Variables

Create a .env file inside the Backend folder:

GEMINI_API_KEY=your_api_key
MONGO_URI=your_mongodb_connection_string
▶️ Run the Application
Start Backend
cd Backend
npm run dev
Start Frontend
cd Frontend
npm run dev
🌐 API Routes
Analyze Food Image
POST /foods

Uploads an image and stores analyzed nutrition data.

screenshots
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
