var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = 80;
var path = require('path');

// For learning purposes:
// Middleware defines a stack of actions that you
// course through. You add layers to the middleware
// stack through the use of <app>.use

// Middleware for parsing bodies from URL
app.use(express.urlencoded({extended: true}));

// Middleware for parsing cookies from HTTP request
app.use(cookieParser());

// Sets view engine and pages folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/pages'))

// Sends user to specific pages based on HTTP requests
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/news', (req, res) => {
    res.render('news');
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup');
})

// Location of static files
app.use(express.static(path.join(__dirname, '/src/public')))

// Redirects user to 404 if link DNE
app.use(function(req, res, next) {
    res.status(404).render("404");
})

// Starts the server
app.listen(80, function() {
    console.log('Server started on port 80.')
})