const router = require("express").Router();
const furnitureRoutes = require("./furniture.js");
const vendorRoutes = require("./vendor");
const clientRoutes = require("./clients")
const authRoutes = require("./auth")
const roomRoutes = require("./rooms")
// Furniture and Room routes
router.use("/furniture", furnitureRoutes);
router.use("/vendor", vendorRoutes);
router.use("/clients", clientRoutes)
router.use("/auth",authRoutes)
router.use("/rooms", roomRoutes)

module.exports = router;