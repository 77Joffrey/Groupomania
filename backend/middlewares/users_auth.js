const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.USER_TOKEN_PASS);
    next();
  } else {
    res.sendStatus(401)
    alert ('Erreur : Authentification impossible!');
    window.location = "/login"
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.USER_TOKEN_PASS,
      async (err, decodedToken) => {
        if (err) {
          res.status(200).json("Token invalide!");
          console.log(err);
        } else {
          const user_Id = decodedToken.userId;
          const role = decodedToken.role;
          const pseudo = decodedToken.pseudo;
          const mess = { user_Id, role, pseudo };
          res.status(200).send(mess);
          next();
        }
      }
    );
  } else {
    res.status(401).send("Absence de token!");
    alert ('Erreur : Authentification impossible!');
    window.location = "/login"
  }
};
