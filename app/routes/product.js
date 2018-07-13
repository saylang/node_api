const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.get('/', ProductController.list);

router.post('/', ProductController.create);

router.get('/:productId', ProductController.show);

router.patch('/:productId', ProductController.update);

router.delete('/:productId', ProductController.delete);

module.exports = router;
