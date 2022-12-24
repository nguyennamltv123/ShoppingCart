const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const Page = require('../models/Pages');
const Category = require('../models/Categories');

class RegisterController {
    async index(req, res, next) {
        res.locals.user = null;
        let pages = await Page.find({});
        let categories = await Category.find({});
        res.render('register', { message: req.flash('message'), pages: pages, categories: categories });
    }

    register(req, res, next) {
        User.findOne({ username: req.body.username }, async(err, user) => {
            if (user) {
                req.flash('message', 'Username existed');
                res.redirect('/register');
            } else {
                var crypted_password = await bcrypt.hash(req.body.password, 10);
                var new_user = new User({
                    username: req.body.username,
                    password: crypted_password,
                    normalname: req.body.normalname,
                    role: false
                });
                new_user.save();
                req.flash('message', 'Register successfully');
                res.redirect('/login');
            }
        })
    }
}
module.exports = new RegisterController;