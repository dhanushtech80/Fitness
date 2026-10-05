const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedInitialData = require('./seed/seedData');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect DB & Seed
connectDB().then(() => {
  seedInitialData();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/nutrition', require('./routes/nutritionRoutes'));
app.use('/api/water', require('./routes/waterRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/weight', require('./routes/weightRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'FitTrack AI Engine' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[FitTrack AI Backend] Listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[FitTrack AI Backend] Port ${PORT} is in use. Please close existing node process or port.`);
  } else {
    console.error('[FitTrack AI Backend] Server error:', err);
  }
});