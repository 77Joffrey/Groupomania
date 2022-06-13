const User = require("../models/User");

// Consultation des utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.find().sort({password : -1})
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  };

exports.getOneUser = (req, res, next) => {
    User.findOne({_id : req.params.id})/* .sort('-password') */
    .then(user => res.status(200).json(user))
    .catch((err) => {
        res.status(400).json({ err });
      });
}
/*   function getAllUsers() {
	return users.map(({ id, name, job, picture }) => ({
		id,
		name, 
		job, 
		picture
	}))
} */



/* const userData = require('../models/User')

function getUser(id) {
	return usersData.find((user => user.id === id))
}

module.exports = getFreelance */