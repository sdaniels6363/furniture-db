const db = require("../models");

// Defining methods for the roomsController 
module.exports = {
    findRooms: function(req, res) {
        db.Furniture.distinct("roomName", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    },
};