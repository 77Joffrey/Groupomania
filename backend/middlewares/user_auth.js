const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};
