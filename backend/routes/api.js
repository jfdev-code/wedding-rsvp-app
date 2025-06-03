const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Get all guests (admin only)
router.get('/guests', async (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const result = await pool.query('SELECT * FROM guests');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add guest (admin only)
router.post('/guests', async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { name, plus_one = 0, dietary_restrictions = '' } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO guests (name, plus_one, dietary_restrictions) VALUES ($1, $2, $3) RETURNING *',
      [name, plus_one, dietary_restrictions]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Search guest by name
router.get('/guests/search', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM guests WHERE name = $1', [req.query.name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json({ ...result.rows[0], _id: result.rows[0].id }); // Map id to _id for frontend compatibility
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update RSVP
router.put('/guests/:id', async (req, res) => {
  try {
    const { confirmed, plus_one, dietary_restrictions } = req.body;
    const result = await pool.query(
      'UPDATE guests SET confirmed = $1, plus_one = $2, dietary_restrictions = $3 WHERE id = $4 RETURNING *',
      [confirmed, plus_one, dietary_restrictions, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json({ ...result.rows[0], _id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;