const express = require("express");
const router = express.Router();
const emailNotificationController = require("../controllers/emailNotificationController");
const verifyToken = require("../middleware/verifyToken");
const checkPermission = require("../middleware/permissionsMiddleware"); 

router.post("/", verifyToken, checkPermission("canCreateEmailNotification"), emailNotificationController.createEmailNotification);

router.get("/", verifyToken, checkPermission("canViewEmailNotifications"), emailNotificationController.getAllEmailNotifications);

router.get("/:id", verifyToken, checkPermission("canViewEmailNotifications"), emailNotificationController.getEmailNotificationById);

router.put("/:id", verifyToken, checkPermission("canUpdateEmailNotification"), emailNotificationController.updateEmailNotification);

router.delete("/:id", verifyToken, checkPermission("canDeleteEmailNotification"), emailNotificationController.deleteEmailNotification);

module.exports = router;
