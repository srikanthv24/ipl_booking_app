const usersModel = require('../models').users;
const helpers = require('../utils/helpers');

/**
 *
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {function} next - express function
 */

const registerUser = (req, res) => {
    let user = { ...req.body };
    user.unique_id = helpers.keys.uniqId();
    usersModel.findOne({
        email: req.body.email
    }).then(userdata => {
        if (userdata && userdata.unique_id) {
            res.send({
                error: true,
                description: "user already exists"
            })
        } else {
            usersModel.create(new usersModel(user)).then(data => {
                if (!data) {
                    res.send({ error: true, description: "Error in user registration" })
                } else {
                    res.send({ error: false, data: data })
                }
            }).catch(err => res.send({ error: true, description: err.message }))
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

const loginUser = (req, res) => {
    usersModel.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(userdata => {
        if (userdata && userdata.unique_id) {
            userdata.password = "******";
            res.send({ error: false, data: userdata })
        } else {
            res.send({
                error:true,
                description:"user not found"
            })
        }
    }).catch(error => res.send({ error: true, description: error.message }))
}

module.exports = {
    registerUser,
    loginUser
}