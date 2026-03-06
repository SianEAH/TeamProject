const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    time: { type: String, required: true }, //maybe type time?
    score: { type: Number, required: true },
    name: { type: String, required: true },
    passOrFail: { type: String, required: true }
});

module.exports = mongoose.model('FeedbackForm', FeedbackSchema);