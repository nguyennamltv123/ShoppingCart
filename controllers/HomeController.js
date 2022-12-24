const Page = require('../models/Pages');
const Category = require('../models/Categories');
const Product = require('../models/Products');
class HomeController {
    async home(req, res, next) {
        if (!req.session.user) {
            res.locals.user = null;
            // Page.find({}, (err, pages) => {
            //     res.locals.pages = pages;
            //     res.render('home');
            // });
            let pages = await Page.find({});
            let categories = await Category.find({});
            let products = await Product.find({});
            res.render('home', { pages: pages, categories: categories, products: products });
        } else {
            res.locals.user = req.session.user;
            let pages = await Page.find({});
            let categories = await Category.find({});
            let products = await Product.find({});
            res.render('home', { pages: pages, categories: categories, products: products });
        }
    }

}
module.exports = new HomeController;