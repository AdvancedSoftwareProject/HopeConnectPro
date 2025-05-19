const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");
const verifyToken = require("../middleware/verifyToken");
const checkPermission = require("../middleware/permissionsMiddleware");


router.post("/", verifyToken, checkPermission('canCreateRevenue'), revenueController.createRevenue);


router.get("/", verifyToken, checkPermission('canViewRevenue'), revenueController.getAllRevenues);


router.get("/:id", verifyToken, checkPermission('canViewRevenue'), revenueController.getRevenueById);


router.put("/:id", verifyToken, checkPermission('canUpdateRevenue'), revenueController.updateRevenue);


router.delete("/:id", verifyToken, checkPermission('canDeleteRevenue'), revenueController.deleteRevenue);

router.get("/external/chart", verifyToken, checkPermission("canViewRevenue"), revenueController.getRevenueChartUrl);

module.exports = router;
