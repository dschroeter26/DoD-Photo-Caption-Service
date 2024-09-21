// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import your database connection
const imageRoutes = require("./routes/imageRoutes"); // Image upload routes
const multer = require("multer");
const { recognizeFace } = require("./utils/FacialRecognitionApiClient");

dotenv.config(); // Load environment variables

const app = express();
app.use(
  cors({
    origin: "http://localhost:8081", // Replace with your React app's URL
  })
);

const upload = multer({ dest: "uploads/" }); // Ensure 'uploads' folder exists
// const PORT = process.env.PORT || 5002;
const PORT = 5002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/images", imageRoutes); // Image upload route

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
