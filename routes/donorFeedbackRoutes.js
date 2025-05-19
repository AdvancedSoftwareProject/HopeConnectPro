const express = require('express');
const router = express.Router();
const donorFeedbackController = require('../controllers/donorFeedbackController');
const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');

router.get('/', verifyToken, checkPermission('canViewFeedbacks'), donorFeedbackController.getAllFeedbacks);

router.post('/', verifyToken, checkPermission('canCreateFeedback'), donorFeedbackController.createFeedback);

router.put('/:id', verifyToken, checkPermission('canUpdateFeedback'), donorFeedbackController.updateFeedback);

router.delete('/:id', verifyToken, checkPermission('canDeleteFeedback'), donorFeedbackController.deleteFeedback);

router.get('/:id/analysis', verifyToken, checkPermission('canViewFeedbacks'), donorFeedbackController.getFeedbackWithAnalysis);

module.exports = router;
