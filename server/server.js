const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running flawlessly' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (Nodemailer ready!)`);
});

module.exports = app;
