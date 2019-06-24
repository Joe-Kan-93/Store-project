const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const indexController = require("../controllers/index");
const userController = require("../controllers/user");

//
//
//
//
//

//*index page route
router.get("/", indexController.getIndex);
router.get("/index", indexController.getIndex);

//

//*tags page route
router.get("/tag", indexController.getTag);

//

//*map page route
router.get("/map", indexController.getMap);
router.get("/mapData", indexController.getMapData);

module.exports = router;
