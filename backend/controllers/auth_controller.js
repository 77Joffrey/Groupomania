const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

// Création d'un nouvel utilisateur
exports.signUp = (req, res, next) => {
  /* Méthode possible : try / catch
 const { pseudo, email, password} = req.body
 try{
        const user = await User.create({pseudo, email, password});
        res.status(201).json({user : user.pseudo})
    } catch (err){
        res.status(400).json({err})
    } */
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Nouvel utilisateur créé!" })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// Connexion d'un utilisateur
exports.signIn = (req, res, next) => {
  User.findOne(/* {pseudo: req.body.pseudo}, */ { email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Utilisateur inexistant!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect!" });
          }
          return res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.USER_TOKEN_PASS,
              { expiresIn: "24h" }
            )
          });
        })
        .catch((err) =>
          res.status(500).json({ message: "Connexion impossible au service !" })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Connexion impossible au service !" })
    );

};

/* exports.logOut = (req, res, next) => {
  res.token('jwt', '', {expiresIn : 1})
  res.redirect('/');
} */