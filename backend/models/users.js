let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let db = require('../db');

let userSchema = new Schema({
    unique_id: { type: String, required: true, unique: true },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    mobile_number: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
}, { timestamps: true });

module.exports = db.model('Users', userSchema);