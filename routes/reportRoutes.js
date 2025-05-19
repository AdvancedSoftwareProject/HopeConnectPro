const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const verifyToken = require('../middleware/verifyToken');  
const checkPermission = require('../middleware/permissionsMiddleware');

router.post( '/',verifyToken, checkPermission('canCreateReport'),reportController.createReport);
router.get('/', verifyToken, checkPermission('canViewReports'), reportController.getAllReports);
router.delete('/:id', verifyToken, checkPermission('canDeleteReport'), reportController.deleteReport);

module.exports = router;
