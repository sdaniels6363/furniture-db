const db = require("../models");

// Defining methods for the furnitureController
module.exports = {
    blockIp: function (req, res){
        let ip = req.body.ip;
        db.IpBlock.create({ip_address: ip})
            .then(success => res.status(200).json(success))
            .catch(err  => res.status(422).json(err))
    },
    isBlocked: function(req,res){
        let ip = req.body.ip;
        db.IpBlock.findOne({ip_address: ip})
            .then(success => res.status(401))
            .catch(err => res.status(200).json({msg: "IP not blocked"}))
    }

};
