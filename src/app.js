const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoute = require('./route/contactRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve ONLY the single HTML file — no other files exposed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'cm-marketing-website-v5.html'));
});

// Serve uploads folder (images/media only)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api/contact', contactRoute);

// 404 handler — catch any path that doesn't exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'The requested resource was not found on this server.'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error.'
  });
});

module.exports = app;
