const multer = require('multer')
const path = require("path");
const fs = require('fs')
const GameSchema = require("../model/gamesSchema");
const newsletter = require('../model/newsletterSchema')


const imageStorage = "public/gamesimages";
let fileName;
let images = []



const storage = multer.diskStorage({
  destination: imageStorage,

  filename: function (req, file, cb) {
    fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
    images.push(fileName);
    //console.log("filenameeeeee", fileName)

  }
});

var upload = multer({ storage: storage }).array("file");

exports.home = (req, res) => {
  GameSchema.find({}).then((data, err) => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else {
      //console.log('Home at /', data);
      res.json({ status: "success", message: data });
    }
  });
}



exports.newsLetter = (( req, res ) => {

  const { email } = req.body;
  console.log(`incomming email from newsletter `, email)
  const newsletterList = new newsletter({ email })

  newsletterList.save(err => {
    if (err) {
      //res.status(500);
      res.json({ status: "failed", message: `atm subscribtion is not possible`,err });
    } else {
      res.json({
        status: "success",
        message: "Congrats! a new email subscribed to the database"
      });
    }
  });
  
  console.log(`req body comming from newsletter`, req.body)
})