const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');


router.get('/volunteers',verifyToken, checkPermission('canViewVolunteers'), volunteerController.getAllVolunteers);
router.get('/volunteers/:id',verifyToken, checkPermission('canViewVolunteers'), volunteerController.getVolunteerById);


router.post('/volunteers',verifyToken, checkPermission('canCreateVolunteer'), volunteerController.createVolunteer);
router.put('/volunteers/:id',verifyToken, checkPermission('canUpdateVolunteer'), volunteerController.updateVolunteer);
router.delete('/volunteers/:id',verifyToken, checkPermission('canDeleteVolunteer'),  volunteerController.deleteVolunteer); 

router.get('/volunteers/user/:userId', verifyToken, checkPermission('canViewVolunteerByUserId'),volunteerController.getVolunteerByUserId);
router.put('/volunteers/:id/availability',verifyToken, checkPermission('canUpdateVolunteerAvailability'), volunteerController.updateVolunteerAvailability);
router.put('/volunteers/:id/skills',verifyToken, checkPermission('canUpdateVolunteerSkills'), volunteerController.updateVolunteerSkills);

module.exports = router;
