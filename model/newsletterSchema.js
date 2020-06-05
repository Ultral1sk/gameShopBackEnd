const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
    email: { type: String, default: undefined },
});

module.exports = mongoose.model("newsletter", newsLetterSchema);