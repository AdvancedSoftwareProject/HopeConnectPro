
const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/orphans',verifyToken, checkPermission('canViewOrphans'), orphanController.getAllOrphans);
 
router.get('/orphans/:id',verifyToken, checkPermission('canViewOrphans'), orphanController.getOrphanById); 
router.get('/orphans/:id/sponsorship-status',verifyToken, checkPermission('canViewOrphans'), orphanController.getOrphanSponsorshipStatus); 

router.post('/orphans', verifyToken, checkPermission('canCreateOrphan'), orphanController.createOrphan);
router.put('/orphans/:id',verifyToken, checkPermission('canUpdateOrphan'), orphanController.updateOrphan);
router.delete('/orphans/:id',verifyToken, checkPermission('canDeleteOrphan'), orphanController.deleteOrphan);

router.get('/orphans/orphanage/:orphanageId',verifyToken, checkPermission('canViewOrphans'),  orphanController.getOrphansByOrphanage); 

router.put('/orphans/:id/education',verifyToken, checkPermission('canUpdateOrphan'), orphanController.updateEducationStatus);
router.put('/orphans/:id/health',verifyToken, checkPermission('canUpdateOrphan'), orphanController.updateHealthCondition); 


module.exports = router;
