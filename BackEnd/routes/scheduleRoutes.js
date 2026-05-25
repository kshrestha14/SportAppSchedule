const express  = require('express');
const router   = express.Router();
const { body } = require('express-validator');
const auth     = require('../middleware/auth');
const ctrl     = require('../controllers/scheduleController');

const scheduleValidation = [
  body('sport_name').notEmpty().withMessage('sport_name is required'),
  body('date').notEmpty().isISO8601().withMessage('date must be a valid date (YYYY-MM-DD)'),
  body('time').notEmpty().matches(/^\d{2}:\d{2}$/).withMessage('time must be HH:MM format'),
  body('venue').notEmpty().withMessage('venue is required'),
];

// Public
router.get('/',    ctrl.getAllSchedules);
router.get('/:id', ctrl.getScheduleById);

// Admin-only
router.post('/',      auth, scheduleValidation, ctrl.createSchedule);
router.put('/:id',    auth, scheduleValidation, ctrl.updateSchedule);
router.delete('/:id', auth, ctrl.deleteSchedule);

module.exports = router;
