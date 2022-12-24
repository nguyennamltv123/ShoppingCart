// var passport = require('passport');
var bcrypt = require('bcryptjs');
const User = require('../models/Users');
const Page = require('../models/Pages');
const Categories = require('../models/Categories');
class LoginController {
    async index(req, res, next) {
        res.locals.user = null;
        let pages = await Page.find({});
        let categories = await Categories.find({});
        res.render('login', { message: req.flash('message'), pages: pages, categories: categories });
    }
    login(req, res, next) {
        User.findOne({ username: req.body.username }, async(err, user) => {
            if (!user) {
                req.flash('message', 'Username does not exist!');
                res.redirect('/login');
            } else {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    req.flash('message', 'Password incorrect!');
                    res.redirect('/login');
                }
            }
        })
    }
    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = new LoginController;