const router = require("express").Router();
const furnitureRoutes = require("./furniture.js");
const vendorRoutes = require("./vendor");

// Book routes
router.use("/furniture", furnitureRoutes);
router.use("/vendor", vendorRoutes);

module.exports = router;