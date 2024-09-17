const express = require('express');
const Face = require('../models/Face');
const router = express.Router();

// POST /api/faces - Add a new known face
router.post('/', async (req, res) => {
  try {
    const face = new Face(req.body);
    await face.save();
    res.status(201).json(face);
  } catch (error) {
    res.status(400).json({ message: 'Error adding face', error });
  }
});

// GET /api/faces - Get all known faces
router.get('/', async (req, res) => {
  try {
    const faces = await Face.find();
    res.json(faces);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faces', error });
  }
});

// GET /api/faces/:id - Get a specific known face by ID
router.get('/:id', async (req, res) => {
  try {
    const face = await Face.findById(req.params.id);
    if (!face) return res.status(404).json({ message: 'Face not found' });
    res.json(face);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching face', error });
  }
});

module.exports = router;
