const matchesModel = require('../models').matches;

/**
 *
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {function} next - express function
 */

const matchesList = (req, res) => {
    matchesModel.find({}).then(matches => {
        if (matches && matches.length > 0) {
            res.send({ error: false, data: matches })
        } else {
            res.send({ error: false, data: [] })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

const matchDetails = (req, res) => {
    matchesModel.aggregate([
        {
            $match: { unique_id: req.query.match_id }
        },
        {
            $lookup: {
                from: "bookings",
                pipeline: [
                    {
                        $match: { match_id: req.query.match_id }
                    },
                    {
                        $unwind: "$seats"
                    },
                    {
                        $group: {
                            _id: "$seats.stand_name",
                            seats_list: {
                                $push: "$seats.seats"
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            stand_name: "$_id",
                            seats: {
                                $reduce: {
                                    input: "$seats_list",
                                    initialValue: [],
                                    in: {
                                        $concatArrays: [
                                            "$$value",
                                            "$$this"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            seat_nums: {
                                $push: "$$ROOT"
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                        }
                    }

                ],
                as: "booking_data"
            }
        },
        {
            $lookup: {
                from: "polls",
                pipeline: [
                    {
                        $match: { match_id: req.query.match_id, user_id: req.query.user_id }
                    },
                ],
                as: "user_poll_data"
            }
        }
    ]).then(data => {
        if (data && data[0] && data[0].unique_id) {
            let obj = JSON.parse(JSON.stringify(data[0]))
            if (obj && obj.booking_data && obj.booking_data.length > 0 && obj.booking_data[0].seat_nums) {
                obj.booking_data = obj.booking_data[0].seat_nums;
            }
            if (obj && obj.user_poll_data && obj.user_poll_data.length > 0) {
                obj.already_polled = true
            }
            res.send({ error: false, data: obj })
        } else {
            res.send({ error: true, description: "No data found with given match id" })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

module.exports = {
    matchesList,
    matchDetails
}