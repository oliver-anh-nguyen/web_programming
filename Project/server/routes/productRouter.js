const productController = require('../controllers/productController')
const express = require('express');
const router = express.Router();

// get all products
router.get('/', productController.getAll);

module.exports = router;