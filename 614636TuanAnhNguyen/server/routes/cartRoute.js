const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();

router.post('/place-order', cartController.orderCart);
router.post('/:productId', cartController.addCart);
router.get('/', cartController.getCart);
router.put('/', cartController.updateCart);

module.exports = router;