const router = require("express").Router();
const furniture = require("./furniture");
const clients = require("./clients");

router.use("",furniture);
router.use("",clients);

module.exports = router;
