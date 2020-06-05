const multer = require('multer')
const path = require("path");
const fs = require('fs')
const GameSchema = require("../model/gamesSchema");
const UserSchema = require("../model/userSchema")
const bcrypt = require("bcrypt");

const imageStorage = "public/gamesimages";
let fileName;
let images = []
const storage = multer.diskStorage({
    destination: imageStorage,

    filename: function (req, file, cb) {
        fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
        images.push(fileName);

    }
});

var upload = multer({ storage: storage }).array("file");


exports.addGameForm = (req, res) => {
    //console.log('req.body add game', req.body);

    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            //console.log("req from backend", req.body);
            // A Multer error occurred when uploading.
            //console.log(err);
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(err);
        }
        const { name, genre, platform, language, price, discount, agelimit, description, releasedate, publisher, gamewebsite, reviewscore, } = req.body;
        new GameSchema({
            images,
            name,
            genre,
            platform,
            language,
            price,
            discount,
            agelimit,
            description,
            releasedate,
            publisher,
            gamewebsite,
            reviewscore
        })
            .save()
            .then((result, err) => {
                images = [];
                // console.log(req.files)
                if (err) { return console.log("Error in Adding Game to DB"), res.json({ status: "failed", message: err }) }
                else { return console.log("Game Successfully Added to DB"), res.json({ status: "success", files: result }); };

            }).catch(err => {
                if (err) return console.log("Error in Adding Game", err), res.json({ status: "failed", message: err });
            });

    });
}

exports.editGameForm = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            //console.log("req from backend", req.body);
            // A Multer error occurred when uploading.
            console.log(err);
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(err);
        }
        //console.log(req.files)
        /*    const { game, genre, platform, language, price, discount, agelimit, description, releasedate, publisher, gamewebsite, reviewscore, id } = req.body; */
        const record = await GameSchema.findById(req.body.id);//images in Mongo
        let images = req.body["images"] || []; // images to keep / if it does not exist we put an empty array to the "image"
        images = Array.isArray(images) ? images : [images]; // if it is not an array create it or convert it into an array
        const imagesToDelete = record.images.filter(img => !images.includes(img));//compare images with Mongo and decide which to delete 
        //console.log('images to delete array', imagesToDelete);

        imagesToDelete.forEach(file => { console.log("images to delete filename", file); try { fs.unlinkSync(path.join(imageStorage, file)) } catch (e) { console.log(e) } });//deleting from server

        req.files.forEach(file => images.push(file.filename));//new images added to keeped images

        const newRecord = { ...req.body, images }; // make a copy of req.body; change images to updated version

        //console.log('response data after merging images', newRecord);

        GameSchema.findByIdAndUpdate(req.body.id, newRecord, (err, data) => {
            if (err) {
                res.json({ status: "failed", response: err });
            } else {
                res.json({ status: "success", response: newRecord });
                //console.log("edited successfully", newRecord)
                images = [];
            }
        })
    })
}
exports.deleteGameForm = (req, res) => {
    const id = req.body

    GameSchema.findByIdAndRemove(req.body.id).then((data) => {
        console.log("success")
        res.json({ status: "success", message: data });
    }).catch((err) => {
        console.log("err")

        res.json({ status: "failed", message: err });

    })
}

exports.admin = async (req, res) => {

    //console.log("admin", req.userId)
    const id = await req.userId
    UserSchema.findOne({ _id: id }).then((data, err) => {
        //console.log("users in mongo response", data)
        if (err) {
            res.json({ status: "failed", message: err });
        } else if (true) {

            //console.log("users in mongo response", data);
            res.json({ status: "success", message: data });
        } else {

            res.json({ status: "failed", message: "Not authenticated admin" });

        }

    });
}

//MAKING AN ADMIN
/* pass = "1234"
var pass = await bcrypt.hash(pass, 10);
new UserSchema({
    name: "admin",
    email: "admin@admin.com",
    pass,
    admin: true,
})
    .save()
    .then((result, err) => {
        console.log('saved');

    }) */