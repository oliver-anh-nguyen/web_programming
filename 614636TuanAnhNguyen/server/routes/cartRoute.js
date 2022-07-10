const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();


router.post('/:productId', cartController.addProduct);
router.get('/', cartController.getCart);
router.put('/', cartController.updateCart)
router.post('/place-order', cartController.orderCart)
module.exports = router;