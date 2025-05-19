const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');




router.get('/donations' , verifyToken, checkPermission('canViewDonations'), donationController.getAllDonations);
router.get('/donations/:id', verifyToken,checkPermission('canViewDonations'), donationController.getDonationById);


router.post('/donations', verifyToken,checkPermission('canCreateDonation'), donationController.createDonation);
router.put('/donations/:id',verifyToken,checkPermission('canUpdateDonation'), donationController.updateDonation);
router.delete('/donations/:id',verifyToken,checkPermission('canDeleteDonation'), donationController.deleteDonation);
router.get('/users/:userId/donations',verifyToken,checkPermission('canViewUserDonations'), donationController.getUserDonations);
router.get('/orphanages/:orphanageId/donations',verifyToken,checkPermission('canViewOrphanageDonations'), donationController.getOrphanageDonations);
router.put('/donations/:id/status',verifyToken,checkPermission('canUpdateDonationStatus'), donationController.updateDonationStatus);
router.post('/donations/:donationId/verify-payment', verifyToken, checkPermission('canUpdateDonationStatus'), donationController.verifyDonationPayment);

module.exports = router; 
