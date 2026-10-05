const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Running', 'Lifting', 'Cycling', 'Swimming', 'Walking', 'HIIT', 'Mobility'], 
    default: 'Running' 
  },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  avgHeartRate: { type: Number, default: 145 },
  steps: { type: Number, default: 0 },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, default: '08:30 AM' },
  intensity: { type: String, enum: ['Low', 'Moderate', 'High', 'Maximum'], default: 'High' }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
