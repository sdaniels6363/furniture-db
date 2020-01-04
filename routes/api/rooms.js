const router = require("express").Router();
const roomsController = require("../../controllers/roomsController");

router.route("/")
  .get(roomsController.findAll);


module.exports = router;
