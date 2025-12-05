const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for frontend → backend communication
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Import routes
const taskRoutes = require('./routes/taskRoutes');

// Mount routes
app.use('/api', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Only start the server if this file is called directly
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

module.exports = app;
