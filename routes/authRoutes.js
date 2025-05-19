const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:resetToken', authController.resetPassword);
router.delete('/deleteUser/:id', verifyToken, checkPermission('canDeleteUser'), authController.deleteUser);  
router.put('/updateUser/:id', verifyToken, checkPermission('canUpdateUser'), authController.updateUser);    
router.get('/viewUser/:id', verifyToken, checkPermission('canViewUser'), authController.viewUser);         

module.exports = router;
