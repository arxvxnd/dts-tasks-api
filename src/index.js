const express = require('express');
const app = express();

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');

app.use('/api', taskRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// Only start the server if this file is run directly (not required during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

module.exports = app;

