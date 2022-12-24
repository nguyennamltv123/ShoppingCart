var homeRoute = require('../routes/home');
var loginRoute = require('../routes/login');
var registerRoute = require('../routes/register');
var logoutRoute = require('../routes/logout');
var adminRoute = require('../routes/admin');
var categoryRoute = require('../routes/category');

function route(app) {

    app.use('/logout', logoutRoute);

    app.use('/login', loginRoute);

    app.use('/admin', adminRoute);

    app.use('/register', registerRoute);

    app.use('/categories', categoryRoute);

    app.use('/', homeRoute);
}
module.exports = route;