const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/product_images')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/pages/add-page', adminController.get_add_page);

router.get('/pages/edit-page/:slug', adminController.get_edit_page);

router.put('/pages/edit-page/:id', adminController.update_page);

router.delete('/pages/delete-page/:id', adminController.delete_page);

router.post('/pages/add-page', adminController.add_page);

router.get('/pages', adminController.get_pages);

router.get('/categories/add-category', adminController.get_add_category);

router.post('/categories/add-category', adminController.add_category);

router.get('/categories/edit-category/:slug', adminController.get_edit_category);

router.put('/categories/edit-category/:id', adminController.update_category);

router.delete('/categories/delete-category/:id', adminController.delete_category);

router.get('/categories', adminController.get_categories);

router.get('/products/add-product', adminController.get_add_product);

router.post('/products/add-product', upload.single('productImage'), adminController.add_product);

router.get('/products/edit-product/:id', adminController.get_edit_product);

router.put('/products/edit-product/:id', upload.single('productImage'), adminController.update_product);

router.delete('/products/delete-product/:id', adminController.delete_product);

router.get('/products', adminController.get_products);

router.get('/', adminController.index);

module.exports = router;