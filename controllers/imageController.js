// controllers/imageController.js
const multer = require('multer');
const sharp = require('sharp');

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Image upload and processing controller
exports.uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading image', error: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    try {
      // Image processing with Sharp
      const processedImageBuffer = await sharp(req.file.buffer)
        .resize(800, 800) // Resize image to 800x800 pixels
        .jpeg({ quality: 80 }) // Convert to JPEG with quality of 80
        .toBuffer();

      // You can save the processed image buffer to your database or file system
      // For now, we will just send a response that the image was processed successfully

      res.status(200).json({ message: 'Image uploaded and processed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error processing image', error });
    }
  });
};
