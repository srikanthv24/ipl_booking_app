const express = require('express');
const router = express.Router();
const reminder = require('../controllers').reminders;
const middlewares = require('../middlewares');

router.post('/createReminder', [middlewares.validator(['match_id', 'user_id']), reminder.createReminder])
router.get('/userReminderList', [middlewares.validator(['user_id']), reminder.userReminderList])

module.exports = router;