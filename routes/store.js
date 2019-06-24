const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const storeController = require("../controllers/store");

//
//
//
//
//

//*add {store} page route
router.get("/add", ensureAuthenticated, storeController.getAdd);

//

//*create store
router.post("/add/store", storeController.createStore);

//

//*get store data
router.get("/storeDetail/:name", storeController.getStore);

//

//*get store data to {update}
router.get("/update/store/:id", storeController.getUpdateStore);

//

//*update store data
router.post("/update/store", storeController.updateStore);

module.exports = router;
