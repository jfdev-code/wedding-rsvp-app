const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// Admin password (replace with environment variable in production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Get all guests (admin only)
router.get('/guests', async (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add guest (admin only)
router.post('/guests', async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const guest = new Guest({
    name: req.body.name,
    plusOne: req.body.plusOne || 0,
    dietaryRestrictions: req.body.dietaryRestrictions || '',
  });
  try {
    const newGuest = await guest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Search guest by name
router.get('/guests/search', async (req, res) => {
  try {
    const guest = await Guest.findOne({ name: new RegExp('^' + req.query.name + '$', 'i') });
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update RSVP
router.put('/guests/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    guest.confirmed = req.body.confirmed;
    guest.plusOne = req.body.plusOne || guest.plusOne;
    guest.dietaryRestrictions = req.body.dietaryRestrictions || guest.dietaryRestrictions;
    await guest.save();
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;