const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');


router.get('/service-requests',verifyToken, checkPermission('canViewServiceRequests'), serviceRequestController.getAllServiceRequests);
router.get('/service-requests/:id',verifyToken, checkPermission('canViewServiceRequests'), serviceRequestController.getServiceRequestById);
router.get('/service-requests/type/:type',verifyToken, checkPermission('canViewServiceRequests'), serviceRequestController.getServiceRequestsByType);


router.post('/service-requests',verifyToken, checkPermission('canCreateServiceRequest'),  serviceRequestController.createServiceRequest);
router.put('/service-requests/:id',verifyToken, checkPermission('canUpdateServiceRequest'),  serviceRequestController.updateServiceRequest);
router.delete('/service-requests/:id',verifyToken, checkPermission('canDeleteServiceRequest'),  serviceRequestController.deleteServiceRequest);
router.get('/orphanages/:orphanageId/service-requests',verifyToken, checkPermission('canViewOrphanageServiceRequests'),  serviceRequestController.getOrphanageServiceRequests);
router.put('/service-requests/:id/status',verifyToken, checkPermission('canUpdateServiceRequestStatus'), serviceRequestController.updateServiceRequestStatus);

module.exports = router; 
