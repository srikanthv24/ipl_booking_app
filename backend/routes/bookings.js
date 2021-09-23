const express = require('express');
const router = express.Router();
const booking = require('../controllers').bookings;
const middlewares = require('../middlewares');

router.post('/createBooking', [middlewares.validator(['match_id', 'user_id']), booking.createBooking])
router.get('/userBookingList', [middlewares.validator(['user_id']), booking.userBookingList])

module.exports = router;