const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Pro Athlete', 'Athlete', 'Member'], default: 'Pro Athlete' },
  avatarUrl: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' 
  },
  age: { type: Number, default: 20 },
  heightCm: { type: Number, default: 170 },
  weightKg: { type: Number, default: 62 },
  fitnessGoal: { type: String, default: 'Stay Fit' },
  streakDays: { type: Number, default: 14 },
  cnsReadiness: { type: Number, default: 94 },
  heartRateResting: { type: Number, default: 52 },
  targetWeightKg: { type: Number, default: 60.0 },
  targetCalories: { type: Number, default: 2200 },
  targetProtein: { type: Number, default: 140 },
  targetCarbs: { type: Number, default: 240 },
  targetFat: { type: Number, default: 65 },
  targetWaterMl: { type: Number, default: 2500 },
  bio: { type: String, default: 'High performance strength & conditioning athlete.' },
  joinedDate: { type: String, default: '2025-01-15' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
