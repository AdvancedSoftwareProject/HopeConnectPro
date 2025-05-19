const express = require('express');
const router = express.Router();
const controller = require('../controllers/emergencyDonationController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/', verifyToken, checkPermission('canViewEmergencyDonations'), controller.getAllEmergencyDonations);

router.get('/user/:userId', verifyToken, checkPermission('canViewUserEmergencyDonations'), controller.getEmergencyDonationsByUser);

router.get('/:id', verifyToken, checkPermission('canViewEmergencyDonations'), controller.getEmergencyDonationById);

router.post('/', verifyToken, checkPermission('canCreateEmergencyDonation'), controller.createEmergencyDonation);

router.delete('/:id', verifyToken, checkPermission('canDeleteEmergencyDonation'), controller.deleteEmergencyDonation);

router.put('/:id', verifyToken, checkPermission('canUpdateEmergencyDonation'), controller.updateEmergencyDonation);

module.exports = router;




 




