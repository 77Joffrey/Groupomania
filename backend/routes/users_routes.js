const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users_controller");


router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getOneUser)

module.exports = router;
