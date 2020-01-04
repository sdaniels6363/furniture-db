const db = require("../models");

// Defining methods for the categoryController and roomName
module.exports = {
    findRooms: function(req, res) {
        db.Furniture.distinct("rooms", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    },
};