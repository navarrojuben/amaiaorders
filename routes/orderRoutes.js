const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');

router.get('/', ctrl.getOrders);
router.post('/', ctrl.createOrder);
router.delete('/:id', ctrl.deleteOrder);
router.patch('/:id', ctrl.togglePaid);

// Bulk Operation Target Vectors
router.post('/bulk-toggle-paid', ctrl.bulkTogglePaid);
router.delete('/bulk-delete', ctrl.bulkDelete);

module.exports = router;