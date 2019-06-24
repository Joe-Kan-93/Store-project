const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const userController = require("../controllers/user");

//
//
//
//
//

//*register page route
router.get("/register", userController.getRegister);

//

//*create new user
router.post("/create", userController.getRegisterVal);

//

//*login page route
router.get("/login", userController.getLogin);

//

//*login {user}
router.post("/receive", userController.getLoginVal);

//

//*profile page route
router.get("/profile", ensureAuthenticated, userController.getProfile);

//

//*profile page with user data
router.get(
  "/profile/:username",
  ensureAuthenticated,
  userController.getProfile
);

//

//*logout route
router.get("/logout", userController.getLogout);

//

//*get user data to {update}
router.get("/update/user/:id", userController.getUpdateUser);

//

//*update user data
router.post("/update/user", userController.updateUser);

//

//*forgot user page route
router.get("/retrieve", userController.getRetrieve);

//

//*forgot user data to {retrieve}
// router.post("/forgot", userController.getForgot);

module.exports = router;
