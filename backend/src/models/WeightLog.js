const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weightKg: { type: Number, required: true },
  bodyFatPercentage: { type: Number, default: null },
  muscleMassKg: { type: Number, default: null },
  date: { type: String, required: true }, // YYYY-MM-DD
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('WeightLog', weightLogSchema);
