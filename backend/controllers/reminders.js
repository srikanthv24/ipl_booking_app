const reminderModel = require('../models').reminders
const helpers = require('../utils/helpers');

/**
 *
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {function} next - express function
 */

const createReminder = (req, res) => {
    let reminder = { ...req.body };
    reminder.unique_id = helpers.keys.uniqId();
    reminderModel.create(new reminderModel(reminder)).then(data => {
        if (data) {
            res.send({ error: false, data: data })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

const userReminderList = (req, res) => {
    reminderModel.aggregate([
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
    createReminder,
    userReminderList
}