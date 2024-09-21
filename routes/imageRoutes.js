// routes/imageRoutes.js
const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', imageController.uploadImage);
router.post('/caption', imageController.generateCaption);

module.exports = router;
