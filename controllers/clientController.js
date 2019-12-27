const db = require("../models");

// Defining methods for the vendorController
module.exports = {
    create: function(req, res) {
        let newClient = req.body.data.name;
        db.Client
            .create({name: newClient.toUpperCase()}, function(err, success) {
                if (err){
                    if (err.code === 11000){
                        res.status(422)
                    } else {
                        res.status(500)
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
        
        db.Client
            .findByIdAndDelete({_id: req.body.data.id}, function(err,success){
                if (err) {
                    console.log(err)
                } else {
                    console.log(success);
                    res.status(200).json(success)
                }
            })
    }
}