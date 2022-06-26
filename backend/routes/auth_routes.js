const express = require("express");
const router = express.Router();

const userAuth = require('../middlewares/users_auth')


router.get('/', userAuth.requireAuth)

module.exports = router