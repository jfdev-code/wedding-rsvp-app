const express = require('express');
const cors = require('cors');
const guestRoutes = require('./routes/api');
const path = require('path');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use('/api', guestRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));