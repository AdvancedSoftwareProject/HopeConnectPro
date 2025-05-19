const express = require('express');
const router = express.Router();
const orphanageController = require('../controllers/orphanageController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.post('/', verifyToken, checkPermission('canCreateOrganization'), orphanageController.createOrphanage);


router.get('/search', orphanageController.searchOrphanages);


router.get('/:orphanageId/check-capacity', verifyToken, checkPermission('canCheckOrphanageCapacity'), orphanageController.checkOrphanageCapacity);


router.get('/:orphanageId', verifyToken, checkPermission('canViewOrphanageDetails'), orphanageController.getOrphanageDetails);


router.delete('/:orphanageId', verifyToken, checkPermission('canDeleteOrphanage'), orphanageController.deleteOrphanage);
module.exports = router;
