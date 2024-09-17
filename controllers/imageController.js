const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Process the uploaded image
const processImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    // TODO: Perform face detection and recognition

    // TODO: Fetch person details from database

    // Call AP-Style-Caption-Generator
    const response = await axios.post(process.env.CAPTION_API_URL, {
      people: [], // Example payload
      context: 'Event description', // Example context
    });

    const caption = response.data.caption;

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({ caption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing image' });
  }
};

module.exports = { processImage };
