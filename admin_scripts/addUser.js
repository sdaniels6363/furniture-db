const mongoose = require("mongoose");
const inquirer = require("inquirer");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });



inquirer.prompt(
    [
        {
            type: "input",
            message: "Username for new user: ",
            name: "username"
        },
        {
            type: "input",
            message: "Password for new user: ",
            name: "password"
        }
    ])
    .then(answers => {
        db.User.create(answers)
            .then(response => {
                if(response._id){
                    process.exit();
                }
            });
        })
