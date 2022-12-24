// var passport = require('passport');
const User = require('../models/Users');
class LogoutController {
    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = new LogoutController;