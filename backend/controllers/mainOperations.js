const userModel = require('../models').users;
const matchModel = require('../models').matches;

const helpers = require('../utils/helpers');

const insertUser = () => {
    userModel.find({}).then(users => {
        if (users && users.length > 0) {
        } else {
            userModel.create(new userModel(helpers.defaultData.user)).then(user => {
                if (user) {
                    console.log("user created");
                }
            }).catch(err => { })
        }
    }).catch(error => { })
}

const insertMatches = () => {
    matchModel.find({}).then(matches => {
        if (matches && matches.length > 0) {
        } else {
            matchModel.insertMany(helpers.defaultData.matches, { ordered: true }).then(data => {
                if (data) console.log("matches created");
            }).catch(err => { })
        }
    }).catch(error => { })
}

const runMainOperations = () => {
    insertUser();
    insertMatches();
}

module.exports = {
    runMainOperations
}