const userModel = require('../models').users;
const matchModel = require('../models').matches;

const helpers = require('../utils/helpers');

const insertUser = () => {
    console.log("inside insert user");
    userModel.find({}).then(users => {
        console.log("users::::", users);
        if (users && users.length > 0) {
        } else {
            userModel.create(new userModel(helpers.defaultData.user)).then(user => {
                if (user) {
                    console.log("user created");
                }
            }).catch(err => { 
                console.log("user creation error", err.message);
            })
        }
    }).catch(error => { 
        console.log("user find error", error.message);
    })
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
    console.log("inside main oprations::::");
    insertUser();
    insertMatches();
}

module.exports = {
    runMainOperations
}