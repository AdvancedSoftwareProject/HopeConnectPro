const express = require("express");
const router = express.Router();
const transactionFeesController = require("../controllers/transactionFeesController");
const verifyToken = require("../middleware/verifyToken");
const checkPermission = require("../middleware/permissionsMiddleware");

router.post("/", verifyToken, checkPermission('canCreateTransactionFee'), transactionFeesController.createTransactionFee);
router.get("/", verifyToken, checkPermission('canViewTransactionFees'), transactionFeesController.getAllTransactionFees);
router.get("/:id", verifyToken, checkPermission('canViewTransactionFees'), transactionFeesController.getTransactionFeeById);
router.put("/:id", verifyToken, checkPermission('canUpdateTransactionFee'), transactionFeesController.updateTransactionFee);
router.delete("/:id", verifyToken, checkPermission('canDeleteTransactionFee'), transactionFeesController.deleteTransactionFee);

module.exports = router;
