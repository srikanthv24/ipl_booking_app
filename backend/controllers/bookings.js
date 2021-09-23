const bookingModel = require('../models').bookings
const helpers = require('../utils/helpers');

/**
 *
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {function} next - express function
 */

const createBooking = (req, res) => {
    let booking = { ...req.body };
    booking.unique_id = helpers.keys.uniqId();
    bookingModel.create(new bookingModel(booking)).then(data => {
        if (data) {
            res.send({ error: false, data: data })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

const userBookingList = (req, res) => {
    bookingModel.aggregate([
        { $match: { user_id: req.query.user_id } },
        {
            $lookup: {
                from: "matches",
                localField: "match_id",
                foreignField: "unique_id",
                as: "match_data"
            }
        }
    ]).then(list => {
        if (list) {
            res.send({ error: false, data: list })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

module.exports = {
    createBooking,
    userBookingList
}