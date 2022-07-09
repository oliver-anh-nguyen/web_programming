const bookController = require('../controllers/bookController')
const express = require('express');
const router = express.Router();

// create
router.post('/', bookController.save);

// get
router.get('/', bookController.getAll);

router.get('/:bookId', bookController.getBookById)

// delete
router.delete('/:bookId', bookController.deleteById);

// update
router.put('/:bookId', bookController.update)

module.exports = router;