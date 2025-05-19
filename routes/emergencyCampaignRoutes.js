
const express = require('express');
const router = express.Router();
const emergencyCampaignController = require('../controllers/emergencyCampaignController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/', verifyToken, checkPermission('canViewEmergencyCampaigns'), emergencyCampaignController.getAllCampaigns);
router.post('/', verifyToken, checkPermission('canCreateEmergencyCampaign'), emergencyCampaignController.createCampaign);
router.put('/:id', verifyToken, checkPermission('canUpdateEmergencyCampaign'), emergencyCampaignController.updateCampaign);
router.delete('/:id', verifyToken, checkPermission('canDeleteEmergencyCampaign'), emergencyCampaignController.deleteCampaign);

router.get('/external/disasters', verifyToken, checkPermission('canViewEmergencyCampaigns'), emergencyCampaignController.fetchExternalDisasters);
router.get('/external/export-sheet', verifyToken, checkPermission('canViewEmergencyCampaigns'), emergencyCampaignController.exportToGoogleSheet);

module.exports = router;
