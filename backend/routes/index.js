const express = require('express');
const router = express.Router();

const user = require('./users');
const poll = require('./polls');
const match = require('./matches');
const booking = require('./bookings');
const reminder = require('./reminders');

router.use('/', user)
router.use('/', poll)
router.use('/', match)
router.use('/', booking)
router.use('/', reminder)

module.exports = router;