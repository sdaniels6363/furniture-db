const router = require("express").Router();
const roomsController = require("../../controllers/roomsController");

router.route("/")
  .get(roomsController.findRooms);


module.exports = router;
