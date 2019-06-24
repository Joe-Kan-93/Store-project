const express = require("express");
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");

const User = require("../models/user");

//
//
//
//
//

//*register page
exports.getRegister = (req, res) => {
  res.render("users/register");
};

//

//*register validation
exports.getRegisterVal = (req, res) => {
  //check your posted validations
  req.check("username", "Username is empty").notEmpty();

  req.check("firstName", "First name is empty").notEmpty();

  req.check("lastName", "Last name is empty").notEmpty();

  req
    .check("email")
    .notEmpty()
    .withMessage("Email is Empty")
    .isEmail()
    .withMessage("Please give valid Email");

  req
    .check("password")
    .notEmpty()
    .withMessage("Password can not be Empty")
    .isLength({ min: 6 })
    .withMessage("Please give at least 6 character long password");

  req
    .check("confirm_password", "Password does not Match correctly")
    .equals(req.body.password);

  // store all validation errors in a variable from request
  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render("users/register", {
      errors: errors
    });
  } else {
    /*     res.render("profile", {
        success: "You are successfully registered. Please login",
        user: req.body
      }); */
    console.log(req.body);
    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,

      route: req.body.route,
      street_number: req.body.street_number,
      locality: req.body.locality,
      postal_code: req.body.postal_code,
      administrative_area_level_1: req.body.administrative_area_level_1,
      country: req.body.country,

      registered: Date.now()
    });
    // hash password
    //!var user = this;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // set password to hash
        newUser.password = hash;
        newUser.save((err, data) => {
          if (err) throw err;
          // res.render("users/login", {
          //   user: data
          // });
          req.flash("success_msg", "Successfully registered! Login please");
          res.redirect("/login");
        });
      });
    });
  }
};

//
//
//

//*login page
exports.getLogin = (req, res) => {
  res.render("users/login");
};

//

//*login validation
exports.getLoginVal = (req, res, next) => {
  if (req.session.email) {
    console.log("You have session");
  } else {
    console.log(req.body);
    passport.authenticate("local", {
      successRedirect: "/profile/" + req.body.username,
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  }
};

//
//
//

//*profile page
exports.getProfile = (req, res) => {
  // res.render("users/profile");
  let username = req.params.username || req.session.username;
  User.findOne({ username }, (err, data) => {
    req.session.username = data.username;
    if (err) throw err;
    res.render("users/profile", {
      user: data
    });
  });
};

//
//
//

//*logout page
exports.getLogout = (req, res) => {
  // req.session.destroy(err => {
  //   res.redirect("/login");
  // });
  req.logout();
  req.flash("success_msg", "You are logged out!");
  res.redirect("/login");
};

//
//
//

//*update user data page
exports.getUpdateUser = (req, res) => {
  let user_id = req.params.id;
  const query = User.findById(user_id);
  query.exec((err, data) => {
    if (err) throw err;
    res.render("users/updateUser", { user: data });
  });
};

//

//*update user
exports.updateUser = (req, res) => {
  let user_id = req.body.id;
  const query = User.findById(user_id);
  query.exec((err, result) => {
    if (err) throw err;
    console.log(result);
    result.username = req.body.username;
    result.firstName = req.body.firstName;
    result.lastName = req.body.lastName;
    result.age = req.body.age;
    result.email = req.body.email;

    // result.password = req.body.password;

    // result.route = req.body.route;
    // result.street_number = req.body.street_number;
    // result.locality = req.body.locality;
    // result.postal_code = req.body.postal_code;
    // result.administrative_area_level_1 = req.body.administrative_area_level_1;
    // result.country = req.body.country;

    result.registered = Date.now();
    result.save((err, result) => {
      if (err) throw err;
      res.render("users/profile", { user: result });
    });
  });
};

//
//
//

//*forgot page
exports.getRetrieve = (req, res) => {
  res.render("users/forgot");
};

//*reset password
// exports.getForgot = function(req, res, next) {
//   async.waterfall(
//     [
//       function(done) {
//         crypto.randomBytes(20, function(err, buf) {
//           var token = buf.toString("hex");
//           done(err, token);
//         });
//       },
//       function(token, done) {
//         User.findOne({ email: req.body.email }, function(err, user) {
//           if (!user) {
//             req.flash("error", "No account with that email address exists.");
//             return res.redirect("/retrieve");
//           }

//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//           user.save(function(err) {
//             done(err, token, user);
//           });
//         });
//       },
//       function(token, user, done) {
//         var transport = nodemailer.createTransport({
//           service: "Gmail",
//           auth: {
//             user: "username",
//             pass: "password"
//           }
//         });
//         let message = {
//           to: user.email,
//           from: "passwordreset@demo.com",
//           subject: "Node.js Password Reset",
//           text:
//             "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
//             "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
//             "http://" +
//             req.headers.host +
//             "/reset/" +
//             token +
//             "\n\n" +
//             "If you did not request this, please ignore this email and your password will remain unchanged.\n"
//         };
//         transport.sendMail(message, function(err) {
//           req.flash(
//             "info",
//             "An e-mail has been sent to " +
//               user.email +
//               " with further instructions."
//           );
//           done(err, "done");
//         });
//       }
//     ],
//     function(err) {
//       if (err) return next(err);
//       res.redirect("/retrieve");
//     }
//   );
// };

//
//
//

//*login validation {V1}
// exports.getLoginVal = (req, res, next) => {
//   req
//     .check("email")
//     .notEmpty()
//     .withMessage("Email is Empty")
//     .isEmail()
//     .withMessage("Please give valid Email")
//     .equals(req.body.email);
//   req
//     .check("password")
//     .notEmpty()
//     .withMessage("Password can not be Empty")
//     .isLength({ min: 6 })
//     .withMessage("Please give at least 6 character long password")
//     .equals(req.body.password);
//   // store all validation errors in a variable from request
//   const errors = req.validationErrors();
//   if (errors) {
//     console.log(errors);
//     res.render("login", {
//       errors: errors
//     });
//   } else {
//     console.log(req.body);
//     const email = req.body.email;
//     User.findOne({ email }, (err, data) => {
//       if (err) throw err;
//       res.render("profile", {
//         user: data
//       });
//     });
//   }
// };
