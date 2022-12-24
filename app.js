const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser'); //define req.body
const port = 4000;
const db = require('./database/index');
const route = require('./routes/index');
const session = require('express-session');
const flush = require('connect-flash');
var methodOverride = require('method-override');
// const passport = require('passport');


//connect database
db.connect();

// parse application/json
app.use(bodyParser.json());

// app.set('trust proxy', 1)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs');

// set views for error and 404 pages
app.set('views', path.join(__dirname, 'views'));

//method-overwrite
app.use(methodOverride('_method'));

//session
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 6000000 },
    resave: false,
    saveUninitialized: false
}));

//flash
app.use(flush());

app.use(express.static(path.join(__dirname, 'public')));

//console.log(path.join(__dirname, 'public'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});