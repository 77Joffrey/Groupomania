const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.userId);
          console.log(user._id);
          res.locals.user = user._id;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, process.env.USER_TOKEN_PASS, async (err, decodedToken) => {
      if(err) {
        res.status(200).json('Absence de token!')
      } else {
/*         let user = await User.findById(decodedToken.userId);
        res.locals.user = user._id; */
        const user_Id = decodedToken.userId;
        const role = decodedToken.role;
        const pseudo = decodedToken.pseudo;
        const mess = {user_Id, role, pseudo}
        res.status(200).send(mess);
        console.log(decodedToken);
        next()
      }
    })
  } else {
    res.status(400).send('Absence de token!')
    console.log('Absence de token!');
  }
}
