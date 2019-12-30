const router = require("express").Router();
const furnitureRoutes = require("./furniture.js");
const vendorRoutes = require("./vendor");
const categoryRoutes = require("./category")
const clientRoutes = require("./clients")
const authRoutes = require("./auth")
// Furniture routes
router.use("/furniture", furnitureRoutes);
router.use("/vendor", vendorRoutes);
router.use("/categories", categoryRoutes);
router.use("/clients", clientRoutes)
router.use("/auth",authRoutes)

module.exports = router;