let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let db = require('../db');

let matchSchema = new Schema({
    unique_id: { type: String, required: true, unique: true },
    team_a: { type: String, default: "" },
    team_b: { type: String, default: "" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    venue: { type: String, default: "" },
    team_a_img: { type: String, default: "" },
    team_b_img: { type: String, default: "" },
}, { timestamps: true });

module.exports = db.model('Matches', matchSchema);