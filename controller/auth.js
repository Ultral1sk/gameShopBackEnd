require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const user = require("../model/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const signToken = id => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: 3600000 });
};

exports.postRegister = async (req, res) => {
  var { name, email, pass } = req.body;
  //console.log(req.body);
  /* We used JS Object short hand while setting varaible names on 
    req.body and user schema */

  //let userCheck = new user;
  let userCheck = await user.findOne({ email });

  if (userCheck) {
    res.json({ status: "failed", message: "Already in use!" });
    return;
  }

  pass = await bcrypt.hash(pass, 10);
  //console.log(pass)
  const newUser = new user({
    name,
    email,
    pass: pass
  });

  newUser.save(err => {
    if (err) {
      //res.status(500);
      res.json({ status: "failed", message: err });
    } else {
      res.json({
        status: "success",
        message: "Congrats! You created new account successfully"
      });
    }
  });
};

exports.postLogin = (req, res) => {
  const { email, pass } = req.body;
  //const pass = req.body.pass
  //console.log({email,pass});
  user.findOne({ email }, (err, result) => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else if (!result) {
      res.json({ status: "failed", message: "email or password is wrong!" });
    } else {
      bcrypt.compare(pass, result.pass).then(async isPassCorrect => {
        //console.log(isPassCorrect);
        if (isPassCorrect) {
          //Create Token
          //console.log("result in login backend after successul ", result)
          const token = await signToken(result.id);
          res.json({
            status: "success",
            message: "Congrats! You logged in successfully",
            token,
            username: result.name,
            _id: result.id,
            admin: result.admin || false
          });
        } else {
          res.json({
            status: "failed",
            message: "email or password is wrong!"
          });
        }
      });
    }
  });
};

exports.tokenLogin = (req, res) => {

  //console.log("token login function req.body", req.body.token)
  jwt.verify(
    req.body.token,
    process.env.JWT_SECRET_KEY,
    (fail, decodedPayload) => {
      if (fail) {
        res
          .status(401)
          .json({ status: "failed", message: "Authorization problem 5013" });
      } else {
        //console.log("decodedPayload id", decodedPayload.id);
        currentUserId = decodedPayload.id;
        user.findOne({ _id: currentUserId }, (err, result) => {
          if (err) {
            res.json({ status: "failed", message: err });
          } else if (!result) {
            res.json({ status: "failed", message: "No such a user!" });
          } else {
            res.json({
              status: "success",
              message: result,
            });
          }
        });
      }
    });
}


exports.fetchUserData = ((req, res) => {
  let nemoToken = req.headers["x-auth-token"]
  jwt.verify(
    nemoToken,
    process.env.JWT_SECRET_KEY,
    (fail, decodedPayload) => {
      if (fail) {
        res
          .status(401)
          .json({ status: "failedOne", message: "Authorization problem 5013" });
      } else {
        //console.log("decodedPayload id", decodedPayload.id);
        currentUserId = decodedPayload.id;
        user.findOne({ _id: currentUserId }, (err, result) => {
          if (err) {
            res.json({ status: "failedTwo", message: err });
          } else if (!result) {
            res.json({ status: "failedThree", message: "No such a user!" });
          } else {
            res.json({
              status: "success",
              message: result,
            });
          }
        });
      }
    });
})


exports.updateUserData = (req, res) => {
  const { name, email, phoneNumber, address, city, postCode, country } = req.body

  let updateToken = req.headers["x-auth-token"]
  //console.log(`body comming from updateUserData`, req.body);

  jwt.verify(
    updateToken,
    process.env.JWT_SECRET_KEY,
    (fail, decodedPayload) => {
      if (fail) {
        res
          .status(401)
          .json({ status: "failedOne", message: "Authorization problem 5013" });
      } else {
        // console.log("decodedPayload id",decodedPayload.id);
        currentUserId = decodedPayload.id;
        user.findByIdAndUpdate({ _id: currentUserId }, {
          name: name, email: email, phoneNumber: phoneNumber,
          address, city, postCode, country
        }, (err, result) => {

          if (err) { res.json({ status: "failedTwo", message: err }); }
          else if (!result) { res.json({ status: "failedThree", message: "No such a user!" }); }
          else { res.json({ status: "success", message: result, }); }
        });
      }
    });

}


exports.sendEmail = ((req, res) => {
  console.log(`body comming from sendEMAILBE`,req.body)

  const output = `
    <p>Support Message</p>
      <h3>Contact Details</h3>
        <ul>
          <li>Firstname:     ${req.body.firstname}</li> 
          <li>Lastname:      ${req.body.lastname}</li>
          <li>Email:         ${req.body.email}</li>
          <li>Contactnumber: ${req.body.contactnumber}</li> 
        </ul>
      <h3>Message</h3>
    <p>                       ${req.body.message}</p>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  var mailOptions = {
    firstname:      req.body.firstname,
    lastname:       req.body.lastname,
    contactnumber : req.body.contactnumber,
    from:           req.body.email,
    to:             `theservicethe@gmail.com`,
    subject:        `Contact message from GAMESHOPJB`,
    message:        req.body.message,
    html:           output
  }

  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(`Error`, err);

    } else {
      console.log(`email snt`)
    }
  })
  res.json({ status: 'sent' });
})

