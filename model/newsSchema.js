const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
    shortname:{type: String},
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    releasedate: { type: String },
    agelimit: { type: Number },
    platform: { type: Array, default: undefined },
    author: { type: String },
    gamewebsite: { type: String },
});

module.exports = mongoose.model("news", newsSchema);
