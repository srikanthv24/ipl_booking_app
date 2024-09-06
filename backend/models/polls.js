let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let db = require('../db');

let pollSchema = new Schema({
    unique_id: { type: String, required: true, unique: true },
    match_id: { type: String, default: "" },
    user_id: { type: String, default: "" },
    team_name: { type: String, default: "" }
}, { timestamps: true })

module.exports = db.model('Polls', pollSchema);