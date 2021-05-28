var express = require('express');
var app = express();
var port = 80;
var path = require('path');

// For learning purposes:
// Middleware defines a stack of actions that you
// course through. You add layers to the middleware
// stack through the use of <app>.use

// Sets view engine and pages folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Sends user to specific pages based on HTTP requests
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/news', (req, res) => {
    res.render('news');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/signup', (req, res) => {
    res.render('signup');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})


app.get('/admin', (req, res) => {
    res.render('admin/index');
})
app.get('/admin/forms', (req, res) => {
    res.render('admin/forms');
})
app.get('/admin/members', (req, res) => {
    res.render('admin/members');
})
app.get('/admin/news', (req, res) => {
    res.render('admin/news');
})
app.get('/admin/viewform', (req, res) => {
    res.render('admin/viewform');
})


// Location of static files
app.use(express.static(path.join(__dirname, '/static')));

// Starts the server
app.listen(80, function() {
    console.log('Server started on port 80.');
})