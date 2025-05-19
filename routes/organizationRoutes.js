const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');
const {   importLocalOrganizations } = require('../Apis/importOrganizations');

router.post('/organizations', verifyToken, checkPermission('canCreateOrganization'), organizationController.createOrganization);

router.get('/organizations', verifyToken, checkPermission('cangetAllOrganizations'), organizationController.getAllOrganizations);

router.put('/organizations/:id', verifyToken, checkPermission('canupdateOrganization'), organizationController.updateOrganization);

router.delete('/organizations/:id', verifyToken, checkPermission('candeleteOrganization'), organizationController.deleteOrganization);

router.get('/organizations/statistics', verifyToken, checkPermission('cangetOrganizationStatistics'), organizationController.getOrganizationStatistics);
router.post('/organizations/external/import', verifyToken, checkPermission('canImportOrganizations'), importLocalOrganizations);

module.exports = router;
