const pollModel = require('../models').polls;
const helpers = require('../utils/helpers');

/**
 *
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {function} next - express function
 */

const saveUserOpinionOnPoll = (req, res) => {
    let obj = { ...req.body };
    obj.unique_id = helpers.keys.uniqId();
    pollModel.create(new pollModel(obj)).then(data => {
        if (data) {
            res.send({ error: false, data: data })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

const getPollResults = (req, res) => {
    //match_id required
    pollModel.aggregate([
        {
            $match: { match_id: req.query.match_id }
        },
        {
            $group: { _id: "$team_name", poll_count: { $sum: 1 } }
        }
    ]).then(data => {
        if (data) {
            res.send({ error: false, data: data })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

module.exports = {
    saveUserOpinionOnPoll,
    getPollResults
}