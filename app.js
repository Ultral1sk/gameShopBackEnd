require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
//const user = require("./model/userSchema");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
require("./passportConfig")

const jwtSecretKey = process.env.JWT_SECRET_KEY
const port = process.env.PORT || 5000;
app.use(session({ secret: 'secret',saveUninitialized: false, resave: false }));

//Token creator
const signToken = id => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: 3600000 });
};

//DB Connection
connectDB();
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS SETUP-------------------------------------------
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); //Which adresses to allow to reach our API
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, x-auth-token, Content-Type, Accept, Authorization"
//     ); //Which headers to send with request

//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// }); 

//GOOGLE ROUTES
app.get('/auth/google/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback/',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    //console.log(`req comming from google callback`,req.logout);
    
    // console.log('jwt key', jwtSecretKey);

    const token = await signToken(req.user.id);
    // console.log("token", token)
    //res.redirect("/cdscsd/?"+token+'?req.user.name')
    // make a new token with mongoid and send token to frontend. In frontend save this token to localstorage, make another request with token to get user information 
    res.redirect(`http://localhost:3000/auth/${token}`)

    // Successful authentication, redirect home.

  });
  

app.get('/logout', ( req, res ) => {
  //console.log(`logg from req resison after loging out`,req.session);
  
    req.logout();
    req.session.destroy();
    res.redirect('http://localhost:3000/')
 
})

//   //FACEBOOK ROUTES
//   app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/signin' }),
//   async (req, res)=> {
//     // Successful authentication, redirect home.
//     console.log("CALLBACK")
//     const token = await signToken(req.user.id);
//     // res.redirect(`http://localhost:3000/auth/${token}`)
    
//   });




app.use("/admin", require("./router/admin"));
app.use("/news", require("./router/news"));
app.use("/api/auth", require("./router/auth"));
app.use("/newsletter", require("./router/dashboard"));
app.use("/", require("./router/dashboard"));
//Server gets awake
app.listen(port, () =>
  console.log(`Working on port:${port}`)
);

