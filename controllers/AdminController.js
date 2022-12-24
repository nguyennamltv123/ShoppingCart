const Page = require('../models/Pages');
const Category = require('../models/Categories');
const Product = require('../models/Products');
const fs = require('fs-extra');

class AdminController {
    index(req, res, next) {
        res.redirect('/');
    }

    get_pages(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            //res.locals.user = req.session.user;
            Page.find({}, (err, pages) => {
                if (err) console.log(err);
                else {
                    res.render('admin/pages', { pages: pages });
                }
            })
        } else {
            res.redirect('/');
        }
    }

    get_add_page(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            res.render('admin/add_page', { message: req.flash('message') });
        } else {
            res.redirect('/');
        }
    }

    add_page(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (req.body.tilte === "" || req.body.slug === "") {
                req.flash('message', 'Please fill out all text field!');
                return res.redirect('/admin/pages/add-page');
            } else {
                Page.findOne({ title: req.body.title }, (err, page1) => {
                    if (page1) {
                        req.flash('message', 'Title is existed!');
                        return res.redirect('/admin/pages/add-page');
                    } else {
                        Page.findOne({ slug: req.body.slug }, (err, page2) => {
                            if (page2) {
                                req.flash('message', 'Slug is existed!');
                                return res.redirect('/admin/pages/add-page');
                            } else {
                                let new_page = new Page({
                                    title: req.body.title,
                                    slug: req.body.slug
                                });
                                new_page.save();
                                res.redirect('/admin/pages');
                            }
                        });
                    }
                });
            }
        } else {
            res.redirect('/');
        }
    }

    get_edit_page(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Page.findOne({ slug: req.params.slug }, (err, page) => {
                res.render('admin/edit_page', { page: page, message: req.flash('message') });
            })
        } else {
            res.redirect('/');
        }
    }

    update_page(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (req.body.tilte === "" || req.body.slug === "") {
                req.flash('message', 'Please fill out all text field!');
                return res.redirect('/admin/pages/add-page');
            } else {
                Page.findOne({ title: req.body.title }, (err, page1) => {
                    if (page1) {
                        req.flash('message', 'Title is existed!');
                        return res.redirect('/admin/pages/add-page');
                    } else {
                        Page.findOne({ slug: req.body.slug }, (err, page2) => {
                            if (page2) {
                                req.flash('message', 'Slug is existed!');
                                return res.redirect('/admin/pages/add-page');
                            } else {
                                Page.findByIdAndUpdate(req.params.id, {
                                    title: req.body.title
                                }).then(() => res.redirect('/admin/pages'))
                            }
                        });
                    }
                });
            }
        } else {
            res.redirect('/');
        }
    }

    delete_page(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Page.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('/admin/pages'))
                .catch(next);
        } else {
            res.redirect('/');
        }
    }

    get_categories(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Category.find({}, (err, categories) => {
                if (err) console.log(err);
                else {
                    res.render('admin/categories', { categories: categories });
                }
            })
        } else {
            res.redirect('/');
        }
    }

    get_add_category(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            res.render('admin/add_category', { message: req.flash('message') });
        } else {
            res.redirect('/');
        }
    }

    add_category(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (req.body.tilte === "" || req.body.slug === "") {
                req.flash('message', 'Please fill out all text field!');
                return res.redirect('/admin/categories/add-category');
            } else {
                Category.findOne({ title: req.body.title }, (err, cat1) => {
                    if (cat1) {
                        req.flash('message', 'Title is existed!');
                        return res.redirect('/admin/categories/add-category');
                    } else {
                        Category.findOne({ slug: req.body.slug }, (err, cat2) => {
                            if (cat2) {
                                req.flash('message', 'Slug is existed!');
                                return res.redirect('/admin/categories/add-category');
                            } else {
                                let new_category = new Category({
                                    title: req.body.title,
                                    slug: req.body.slug
                                });
                                new_category.save();
                                res.redirect('/admin/categories');
                            }
                        });
                    }
                });
            }
        } else {
            res.redirect('/');
        }
    }

    get_edit_category(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Category.findOne({ slug: req.params.slug }, (err, category) => {
                res.render('admin/edit_category', { category: category, message: req.flash('message') });
            })
        } else {
            res.redirect('/');
        }
    }

    update_category(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (req.body.tilte === "" || req.body.slug === "") {
                req.flash('message', 'Please fill out all text field!');
                return res.redirect('/admin/categories/add-category');
            } else {
                Category.findOne({ title: req.body.title }, (err, cat1) => {
                    if (cat1) {
                        req.flash('message', 'Title is existed!');
                        return res.redirect('/admin/categories/add-category');
                    } else {
                        Category.findOne({ slug: req.body.slug }, (err, cat2) => {
                            if (cat2) {
                                req.flash('message', 'Slug is existed!');
                                return res.redirect('/admin/categories/add-category');
                            } else {
                                Category.findByIdAndUpdate(req.params.id, {
                                    title: req.body.title
                                }).then(() => res.redirect('/admin/categories'));
                            }
                        });
                    }
                });
            }
        } else {
            res.redirect('/');
        }
    }

    delete_category(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Category.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('/admin/categories'))
                .catch(next);
        } else {
            res.redirect('/');
        }
    }

    get_products(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            //res.locals.user = req.session.user;
            Product.find({}, (err, products) => {
                if (err) console.log(err);
                else {
                    res.render('admin/products', { products: products });
                }
            })
        } else {
            res.redirect('/');
        }
    }

    get_add_product(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Category.find({}, (err, categories) => {
                res.render('admin/add_product', { message: req.flash('message'), categories: categories });
            })
        } else {
            res.redirect('/');
        }
    }

    add_product(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (req.body.name === "" || req.body.describe === "" || !req.body.price || !req.file) {
                req.flash('message', 'Please fill out all field!');
                return res.redirect('/admin/products/add-product');
            } else {
                Product.findOne({ name: req.body.name }, (err, prod) => {
                    if (prod) {
                        req.flash('message', 'Product name is existed!');
                        return res.redirect('/admin/products/add-product');
                    } else {
                        let new_product = new Product({
                            name: req.body.name,
                            describe: req.body.describe,
                            price: req.body.price,
                            category: req.body.category,
                            image: req.file.originalname
                        });
                        new_product.save();
                        fs.rename(`public/product_images/${new_product.image}`, `public/product_images/${new_product._id}.png`, (err) => {
                            if (err) console.log(err);
                        });
                        res.redirect('/admin/products');
                    }
                });
            }
        } else {
            res.redirect('/');
        }
        // res.json(req.file);
    }

    get_edit_product(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            Category.find({}, (err, categories) => {
                Product.findOne({ _id: req.params.id }, (err, product) => {
                    res.render('admin/edit_product', { product: product, categories: categories, message: req.flash('message') });
                })
            });
        } else {
            res.redirect('/');
        }
    }

    update_product(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            if (!req.file) {
                Product.findByIdAndUpdate({ _id: req.params.id }, req.body).
                then(() => { res.redirect('/admin/products') });
            } else {
                fs.unlinkSync(`public/product_images/${req.params.id}.png`);
                fs.renameSync(`public/product_images/${req.file.originalname}`, `public/product_images/${req.params.id}.png`, (err) => {
                    if (err) console.log(err);
                });
                req.body.image = req.file.originalname;
                Product.findByIdAndUpdate({ _id: req.params.id }, req.body).
                then(() => { res.redirect('/admin/products') });
            }
        } else {
            res.redirect('/');
        }
    }

    delete_product(req, res, next) {
        if (req.session.user && req.session.user.role === true) {
            fs.unlinkSync(`public/product_images/${req.params.id}.png`);
            Product.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('/admin/products'))
                .catch(next);
        } else {
            res.redirect('/');
        }
    }
}

module.exports = new AdminController;