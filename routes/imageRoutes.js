// routes/imageRoutes.js
const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', imageController.uploadImage);

module.exports = router;
