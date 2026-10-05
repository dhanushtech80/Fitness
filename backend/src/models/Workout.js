const mongoose = require('mongoose');

const exerciseSetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  reps: { type: Number, required: true },
  weightKg: { type: Number, required: true },
  rpe: { type: Number, default: 8 },
  completed: { type: Boolean, default: true }
});

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Barbell' },
  sets: [exerciseSetSchema]
});

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Hypertrophy', 'Strength', 'Endurance', 'HIIT', 'Recovery', 'Powerlifting'], default: 'Hypertrophy' },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  volumeKg: { type: Number, default: 0 },
  exercises: [exerciseSchema],
  status: { type: String, enum: ['Completed', 'In Progress', 'Planned'], default: 'Completed' },
  date: { type: String, required: true }, // YYYY-MM-DD
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
