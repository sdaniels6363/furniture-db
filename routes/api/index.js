const router = require("express").Router();
const furnitureRoutes = require("./furniture.js");

// Book routes
router.use("/furniture", furnitureRoutes);

module.exports = router;
