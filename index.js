// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import your database connection
const imageRoutes = require('./routes/imageRoutes'); // Image upload routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes); // Image upload route

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
