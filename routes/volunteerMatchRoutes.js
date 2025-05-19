const express = require('express');
const router = express.Router();
const controller = require('../controllers/volunteerMatchController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/', verifyToken, checkPermission('canViewVolunteerMatches'), controller.getAllVolunteerMatches);
router.get('/:id', verifyToken, checkPermission('canViewVolunteerMatches'), controller.getVolunteerMatchById);
router.post('/', verifyToken, checkPermission('canCreateVolunteerMatch'), controller.createVolunteerMatch);
router.put('/:id', verifyToken, checkPermission('canUpdateVolunteerMatch'), controller.updateVolunteerMatch);
router.delete('/:id', verifyToken, checkPermission('canDeleteVolunteerMatch'), controller.deleteVolunteerMatch);

module.exports = router;
