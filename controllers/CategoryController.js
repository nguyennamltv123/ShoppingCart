const Page = require('../models/Pages');
const Category = require('../models/Categories');
const Product = require('../models/Products');
class CategoryController {
    async products_by_category(req, res, next) {
        if (!req.session.user) {
            res.locals.user = null;
            let pages = await Page.find({});
            let categories = await Category.find({});
            let products_by_category = await Product.find({ category: req.params.category });
            res.render('product_categories', { pages: pages, categories: categories, products: products_by_category });
        } else {
            res.locals.user = req.session.user;
            let pages = await Page.find({});
            let categories = await Category.find({});
            let products_by_category = await Product.find({ category: req.params.category });
            res.render('product_categories', { pages: pages, categories: categories, products: products_by_category });
        }
    }

    async product_details(req, res, next) {
        if (!req.session.user) {
            res.locals.user = null;
            let pages = await Page.find({});
            let categories = await Category.find({});
            let product_detail = await Product.findById(req.params.id_product);
            res.render('product_detail', { pages: pages, categories: categories, product: product_detail });
        } else {
            res.locals.user = req.session.user;
            let pages = await Page.find({});
            let categories = await Category.find({});
            let product_detail = await Product.findById(req.params.id_product);
            res.render('product_detail', { pages: pages, categories: categories, product: product_detail });
        }
    }
}
module.exports = new CategoryController;