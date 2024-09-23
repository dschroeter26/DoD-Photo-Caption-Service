// routes/imageRoutes.js
const express = require('express');
const imageController = require('../controllers/imageController');
const captionController = require('../controllers/captionController');
const router = express.Router();

router.post('/upload', imageController.uploadImage);
router.post('/generate-caption', captionController.generateCaption);

module.exports = router;
