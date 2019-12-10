var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var db = require("./models")

//Vendor requires
var vendors = require("./modules/vendors")


// Require all models
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI);

console.log("Retrieving Hekman Bedroom Catalogue")
vendors.hekmanScrape();


//Function to check password
checkPassword = (user, pass, cb) => {
    db.User.findOne({ username: user }).then(function(user, err) {
        if (err) {
            //Error Finding user.
            res.send(err)
        } else {
            user.verifyPassword(pass,
                function(err, valid) {
                    if (err) {
                        res.send(err)
                    } else if (valid) { //Password is correct
                        cb(true);
                    } else { //Password incorrect.
                        cb(false);
                    }
                })
        }
    })
}

//Authentication Section(no JWT, yet)

//Create User
app.get("/create/:user/:pw", function(req, res) { //GET for easy browser testing.  Suggesting POST route for prod.
    db.User.create({
        username: req.params.user,
        password: req.params.pw
    }).then(function(data, err) {
        if (err)
            res.send(err)
        else
            res.send("Created user: " + data.username)
    })
})

//Login/test user/pass
app.get('/login/:user/:pw', function(req, res) {
    checkPassword(req.params.user, req.params.pw, function(valid) { //Get the return value from checking the password.
        if (valid)
            res.send("Password Accepted!  Welcome, " + req.params.user)
        else
            res.send("Incorrect Username/Password!");
    })
})

//Change password.
app.get('/update/:user/:pw/:pw2', function(req, res) { //GET for easy browser testing.  Suggesting PUT route for prod.
    checkPassword(req.params.user, req.params.pw, function(valid) { //Get the return value from checking the password.
        if (valid) { //If validated.  Try to change password.
            db.User.update({ username: req.params.user }, { password: req.params.pw2 }).then(function(user, err) { //Update password to the value of pw2.  
                if (err)
                    res.send(err)
                else
                    res.send("Password for " + req.params.user + " has been updated!")
            })
        } else {
            res.send("Sorry, you have provided an incorrect username/password!")
        }
    })
})


// Start the server
app.listen(PORT, () => {
    console.log("App running at http://localhost:" + PORT);
});