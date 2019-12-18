const router = require("express").Router();
const furnitureRoutes = require("./furniture.js");
const vendorRoutes = require("./vendor");
const categoryRoutes = require("./category")

// Furniture routes
router.use("/furniture", furnitureRoutes);
router.use("/vendor", vendorRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;