const db = require("../models");

// Defining methods for the vendorController
module.exports = {
    create: function(req, res) {

        // used to capitlize first letter of client name.
        function capitalize(arr){
            let capitalized = []
            for (let i = 0; i < arr.length; i++) {
                let str = arr[i]
                capitalized.push(str.charAt(0).toUpperCase() + str.slice(1));
            }
            return capitalized.join(" ");
        }

        let newClient = capitalize(req.body.data.name.split(" "))
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
    },
    stageAdd: function(req, res){
        db.Tackboard.create({
            client: req.body.data.client,
            item:req.body.data.item
        }, function(err, success){
            if(err)
                console.log(err)
            else{
                console.log(success)
                res.status(200).json(success)
            }
        })
    },
    stageRemove: function(req, res){
        console.log(req.body);
        db.Tackboard.findOneAndDelete({_id: req.body.data._id}, function(err, success){
            if(err)
                console.log(err)
            else{
                console.log(success)
                res.status(200).json(success)
            }
        })
    },
    getClientItems: function(req, res){
        db.Tackboard.find({client : req.body.data.client}, (err, success) => {
            if (err){
                console.log(err)
            } else {
                console.log(success);
                res.status(200).json(success)
            }
        })
    }
    
}