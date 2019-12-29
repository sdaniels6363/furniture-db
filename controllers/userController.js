const User = require("../models/User");

// Defining methods for the furnitureController
module.exports = {
  validateUser: function (req, res) {
    let username = req.body.data.username;
    let password = req.body.data.password;
    console.log(username+ " - "+password)

    User.findOne({ username: username }).then(dbEntry => {
      console.log(dbEntry)

      dbEntry.verifyPassword(password, (err, valid) => {
        if(err){
          console.log(err);
          res.status(500).send("Error")
        } else if(valid){
          console.log(valid)
          res.status(200).send("Login Successful.")
        } else {
          console.log("not valid")
          res.status(401).send("Authentication failed.")
        }
      })
    })
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
