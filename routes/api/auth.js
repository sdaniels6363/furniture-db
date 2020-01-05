const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/login")
  .post(userController.validateUser);

router.route("/register")
  .post(userController.createUser);

router.route("/verify")
  .post(userController.verifyToken);

module.exports = router;
