const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();
const port = 80;

const initializePassport = require('./config/passport');
initializePassport(passport);

// Sets view engine and pages folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(session({
    secret: 'potatoes',
    resave: false,
    saveUninitialized: false
}));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Init Passport (Authentication)
app.use(passport.initialize());
app.use(passport.session());

// Express Flash
app.use(flash());

// Load Routes
const index = require('./routes/index');
const admin = require('./routes/admin');

// Use Routes
app.use('/', index);
app.use('/admin', admin);

// Set static folder
app.use(express.static(path.join(__dirname, '/static')));

// 404 Route
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Starts the server
app.listen(port, function() {
    console.log(`Server started on port ${port}.`);
});