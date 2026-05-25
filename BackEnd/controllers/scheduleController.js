const { validationResult } = require('express-validator');
const Schedule = require('../models/Schedule');

exports.getAllSchedules = async (req, res) => {
  const schedules = await Schedule.find().sort({ date: 1, time: 1 });
  res.json(schedules);
};

exports.getScheduleById = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
  res.json(schedule);
};

exports.createSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { sport_name, date, time, venue } = req.body;
  const schedule = await Schedule.create({ sport_name, date, time, venue });
  res.status(201).json(schedule);
};

exports.updateSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const schedule = await Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
  res.json(schedule);
};

exports.deleteSchedule = async (req, res) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
  res.json({ message: 'Schedule deleted' });
};
