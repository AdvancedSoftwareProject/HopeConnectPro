const express = require("express");
const router = express.Router();
const coordinationController = require("../controllers/pickupDeliveryCoordinationController");
const verifyToken = require("../middleware/verifyToken");
const checkPermission = require("../middleware/permissionsMiddleware");


router.post("/", verifyToken, checkPermission("canCreatePickupCoordination"), coordinationController.createCoordination);

router.get("/", verifyToken, checkPermission("canViewPickupCoordination"), coordinationController.getAllCoordinations);

router.get("/:id", verifyToken, checkPermission("canViewPickupCoordination"), coordinationController.getCoordinationById);

router.put("/:id", verifyToken, checkPermission("canUpdatePickupCoordination"), coordinationController.updateCoordination);

router.delete("/:id", verifyToken, checkPermission("canDeletePickupCoordination"), coordinationController.deleteCoordination);


module.exports = router;

