const User = require("../models/User");

function comparePassword(password, reqBodyPassword) {
  if (password === reqBodyPassword) {
    return true
  } else {
    return false
  }
}

// Defining methods for the furnitureController
module.exports = {
  validateUser: function (req, res) {
    let body = req.body;
    console.log(body)
    db.User
      .find({ username: body.username })
      .then(dbEntry => {
        let valid = comparePassword(dbEntry.password, req.body.password)
        if (valid) {
          res.json(dbEntry.token);
        } else {
          res.status(401).json({ message: "Login failed!" })
        }
      })
      .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    let body = req.body.data;
    User
      .create({
        username: body.username,
        password: body.password
      }, (err, success) => {
        if (err) {
          if (err.code === 11000) {
            res.status(422).json(err)
          } else {
            res.status(500).json(err)
          }
        }
        console.log(success)
        res.status(200).send("User successfully created.")
      })

  }

};