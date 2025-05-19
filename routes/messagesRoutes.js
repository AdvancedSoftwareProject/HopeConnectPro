const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


const verifyToken = require('../middleware/verifyToken');
const checkPermission = require('../middleware/permissionsMiddleware');


router.post('/', verifyToken, checkPermission('canSendMessage'), messageController.sendMessage);
router.get('/', verifyToken, checkPermission('canViewOwnMessages'), messageController.getOwnMessages);
router.put('/:id', verifyToken, checkPermission('canMarkMessagesAsSeen'), messageController. markMessagesAsSeen);
router.get('/status', verifyToken, messageController.getSentMessagesStatus);

module.exports = router;
