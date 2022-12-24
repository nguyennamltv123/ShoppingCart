const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/category=:cate&product=:id_product', categoryController.product_details);

router.get('/:category', categoryController.products_by_category);

module.exports = router;