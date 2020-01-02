const router = require("express").Router();
const clientController = require("../../controllers/clientController");

router.route("/create")
  .post(clientController.create);

router.route("/list")
  .get(clientController.list);

router.route("/delete")
  .post(clientController.delete)

router.route("/stageAdd")
  .post(clientController.stageAdd)

router.route("/stageRemove")
  .post(clientController.stageRemove)

router.route("/items")
  .post(clientController.getClientItems);

module.exports = router;