const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, ProductController.list);

router.post('/', checkAuth, ProductController.create);

router.get('/:productId', checkAuth, ProductController.show);

router.patch('/:productId', checkAuth, ProductController.update);

router.delete('/:productId', checkAuth, ProductController.delete);

module.exports = router;
