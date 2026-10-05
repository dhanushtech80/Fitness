const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountMl: { type: Number, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, default: '10:00 AM' }
}, { timestamps: true });

module.exports = mongoose.model('WaterLog', waterLogSchema);
