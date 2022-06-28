const express = require("express");
const router = express.Router();

const logCtrl = require("../controllers/log_controller");

router.post("/signup", logCtrl.signUp);
router.post("/signin", logCtrl.signIn);
router.get("/logout", logCtrl.logOut);

module.exports = router;
