// controllers/imageController.js
const multer = require("multer");
const { recognizeFace } = require("./../utils/pythonClient");

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

// Image upload and processing controller
exports.uploadImage = (req, res) => {
  console.log('Received request to upload image');

  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during image upload:', err);
      return res.status(500).json({ message: "Error uploading image", error: err });
    }

    if (!req.file) {
      console.warn('No image file provided in request');
      return res.status(400).json({ message: "No image file provided" });
    }

    console.log('Image uploaded successfully');

    try {
      // Prepare the image buffer to send to the Python backend
      console.log('Sending image to Python backend for face recognition');
      const result = await recognizeFace(req.file.buffer);  // Use buffer instead of path
      console.log('Received response from Python backend:', result);

      res.json(result);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ message: "Error processing image", error });
    }
  });
};

module.exports = {
  uploadImage
};
