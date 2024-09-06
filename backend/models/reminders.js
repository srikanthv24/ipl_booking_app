let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let db = require('../db');

let reminderSchema = new Schema({
    unique_id: { type: String, required: true, unique: true },
    match_id: { type: String, default: "" },
    user_id: { type: String, default: "" }
}, { timestamps: true })

module.exports = db.model('Reminders', reminderSchema);