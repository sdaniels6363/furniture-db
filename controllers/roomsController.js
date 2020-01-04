const db = require("../models");

function findDistinctCategory(room) {
    return new Promise((resolve, reject) => {
        db.Furniture.distinct("category", { roomName: room }, (err, categories) => {
            if (err) return reject(err)

            resolve({name: room, categories: categories})
        } )
    })
}

// Defining methods for the categoryController
module.exports = {
  findAll: function(req, res) {
    db.Furniture.distinct("roomName", (err, rooms) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(rooms);
        const roomPromises = [];

        rooms.map(room => {
            roomPromises.push(findDistinctCategory( room))
        });

        Promise.all(roomPromises)
            .then(results => {
                console.log(results)
                res.status(200).json(results)
            })
      }
    })
  }
};
