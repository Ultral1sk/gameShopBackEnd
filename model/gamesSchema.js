const mongoose = require("mongoose");
const gamesSchema = new mongoose.Schema({
    //id: { type: String },
    images:{type:[String] /*  validate : v => v === null || v.length */ },
    name: { type: String}, // this should be requrired
    //slug: { type: String },
    genre: { type: Array, default: undefined },          
    price: { type: Number },              
    discount: { type: Number },           
    agelimit: { type: Number },           
    platform: { type: Array, default: undefined },      
    description: { type: String },
    releasedate: { type: String },
    publisher:{type:String},
    gamewebsite: { type: String },      // this will be optional
    language: { type: Array, default: undefined },
    reviewscore: { type: Number },      // this will be optional
                                        // everything else required
  //  images: [{ type: String }],
   // videos: [{ type: String }]
});

module.exports = mongoose.model("game", gamesSchema);
