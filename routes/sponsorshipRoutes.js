const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/sponsorships',verifyToken, checkPermission('canViewSponsorships'), sponsorshipController.getAllSponsorships);
router.get('/sponsorships/:id',verifyToken, checkPermission('canViewSponsorships'), sponsorshipController.getSponsorshipById);


router.post('/sponsorships',verifyToken, checkPermission('canCreateSponsorship'), sponsorshipController.createSponsorship);
router.put('/sponsorships/:id',verifyToken, checkPermission('canUpdateSponsorship'), sponsorshipController.updateSponsorship);
router.put('/sponsorships/:id/end',verifyToken, checkPermission('canEndSponsorship'), sponsorshipController.endSponsorship);
router.get('/users/:userId/sponsorships',verifyToken, checkPermission('canViewUserSponsorships'), sponsorshipController.getUserSponsorships);
router.get('/orphans/:orphanId/sponsorships',verifyToken, checkPermission('canViewOrphanSponsorships'), sponsorshipController.getOrphanSponsorships);
router.post('/test-verification', async (req, res) => {
  try {
    const { sponsorId, amount, orphanId } = req.body;
    const result = await verifySponsorshipEligibility(sponsorId, amount, orphanId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error testing sponsorship verification', 
      error: error.message 
    });
  }
});

module.exports = router; 
