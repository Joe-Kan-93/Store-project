const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const axios = require("axios");

//*@google/maps
// const googleMapsClient = require("@google/maps").createClient({
//   key: "AIzaSyBPpLmiojA25PuYuA2hXzQKbVCSl1YEkzo"
// });

// googleMapsClient.geocode(
//   {
//     address: "Hüttenstraße 100"
//   },
//   function(err, response) {
//     if (!err) {
//       console.log(response.json.results);
//     }
//   }
// );

//*dotenv config
require("dotenv").config();

//*passport config
require("./config/passport")(passport);

//
//
//

//*init app
const app = express();
const PORT = process.env.PORT || 3001;
const indexRouter = require("./routes/index");
const storeRouter = require("./routes/store");
const userRouter = require("./routes/user");

//
//
//

//*connecting database
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

//
//
//

//*template engine
app.set("view engine", "hbs");

//
//
//

//*public folder
app.use(express.static(__dirname + "/public"));

//
//
//

//*body-parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//

//*morgan
app.use(logger("dev"));

//

//*express-validator
// app.use(expressValidator());

//

//*express-session
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 864001000 //  1 day
    },
    resave: true,
    saveUninitialized: true
  })
);

//

//*passport middleware
app.use(passport.initialize());
app.use(passport.session());

//

//*connect flash
app.use(flash());

//

//*global var
app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

//
//
//

//*routes
app.use("", indexRouter);
app.use("", storeRouter);
app.use("", userRouter);

app.get("*", (req, res) => {
  res.send("404, wrong place. please go to right path");
});

//
//
//

app.listen(PORT, () => {
  console.log("Start...Server is running successfully on port " + PORT);
});
