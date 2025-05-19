const express = require('express');
const router = express.Router();
const trackingUpdateController = require('../controllers/trackingUpdateController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/', verifyToken, checkPermission('canViewTrackingUpdates'), trackingUpdateController.getAllTrackingUpdates);


router.get('/:id', verifyToken, checkPermission('canViewTrackingUpdates'), trackingUpdateController.getTrackingUpdateById);

router.get('/delivery/:deliveryId', verifyToken, checkPermission('canViewTrackingUpdates'), trackingUpdateController.getUpdatesByDeliveryId);

router.post('/', verifyToken, checkPermission('canCreateTrackingUpdate'), trackingUpdateController.createTrackingUpdate);


router.put('/:id', verifyToken, checkPermission('canUpdateTrackingUpdate'), trackingUpdateController.updateTrackingUpdate);

router.delete('/:id', verifyToken, checkPermission('canDeleteTrackingUpdate'), trackingUpdateController.deleteTrackingUpdate);

router.get("/external/export-sheet", verifyToken, checkPermission("canExportTracking"), trackingUpdateController.exportToGoogleSheet);

module.exports = router;