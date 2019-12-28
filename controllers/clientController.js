const db = require("../models");

// Defining methods for the vendorController
module.exports = {
    create: function(req, res) {
        let newClient = req.body.data.name.toUpperCase();
        db.Client
            .create({name: newClient}, function(err, success) {
                if (err){
                    if (err.code === 11000){
                        res.status(422).json(err)
                    } else {
                        res.status(500).json(err)
                    }
                } else{
                    res.status(200).json(success)
                }
            })
    },
    list: function(req, res) {
        db.Client
            .find({}, function(err, success) {
                if (err)
                    console.log(err)
                else
                    res.json(success)
            })
    },
    delete: function(req, res){
        let name = req.body.data.name
        db.Client
            .deleteOne({name: name}, function(err,success){
                if (err) {
                    console.log(err)
                } else {
                    console.log(success);
                    res.status(200).json(success)
                }
            })
    }
}