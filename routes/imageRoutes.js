const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const { processImage } = require('../controllers/imageController');

// POST /api/images/upload - Upload and process an image
router.post('/upload', upload.single('image'), processImage);

module.exports = router;
