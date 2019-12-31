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
        db.Client.findOneAndUpdate({name: req.body.client}, {$push: {tackboard:req.body.item}}, function(err, success){
            if(err)
                console.log(err)
            else{
                console.log(success)
                res.status(200).json(success)
            }
        })
    },
    stageRemove: function(req, res){
        db.Client.findOneAndUpdate({name: req.body.client}, {$push: {tackboard:req.body.item}}, function(err, success){
            if(err)
                console.log(err)
            else{
                console.log(success)
                res.status(200).json(success)
            }
        })
    },
    
            

    }
}