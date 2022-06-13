const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth_controller");

router.post("/signup", authCtrl.signUp);
router.post("/signin", authCtrl.signIn);
router.get("/logout", authCtrl.logOut);

module.exports = router;
