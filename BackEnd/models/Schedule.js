const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    sport_name: { type: String, required: true, trim: true },
    date:       { type: String, required: true },
    time:       { type: String, required: true },
    venue:      { type: String, required: true, trim: true },
    status:     { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
    score:      { type: String, default: '', trim: true },
    result:     { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
