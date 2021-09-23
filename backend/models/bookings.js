let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let db = require('../db');

let bookingSchema = new Schema({
    unique_id: { type: String, required: true, unique: true },
    match_id: { type: String, default: "" },
    user_id: { type: String, default: "" },
    num_of_seats: { type: Number, default: 0 },
    seats: { type: Array, default: [{}] },
}, { timestamps: true });

module.exports = db.model('Bookings', bookingSchema);