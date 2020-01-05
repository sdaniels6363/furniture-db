const mongoose = require("mongoose");
const inquirer = require("inquirer");

mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });



inquirer.prompt(
    [
        {
            type: "input",
            message: "Username being updated: ",
            name: "username"
        },
        {
            type: "input",
            message: "New Password: ",
            name: "password"
        }
    ])
    .then(answers => {
        db.User.findOneAndUpdate({ username: answers.username},{ password: answers.password})
            .then(response => {
                if(response._id){
                    process.exit();
                }
            });
        })
