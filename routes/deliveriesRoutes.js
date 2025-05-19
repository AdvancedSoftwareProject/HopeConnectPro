const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveriesController');
const checkPermission = require('../middleware/permissionsMiddleware');
const verifyToken = require('../middleware/verifyToken');


router.get('/', verifyToken, checkPermission('canViewDeliveries'), deliveryController.getAllDeliveries);

router.post('/', verifyToken, checkPermission('canCreateDelivery'), deliveryController.createDelivery);

router.put('/:id', verifyToken, checkPermission('canUpdateDelivery'), deliveryController.updateDelivery);

router.delete('/:id', verifyToken, checkPermission('canDeleteDelivery'), deliveryController.deleteDelivery);

module.exports = router;