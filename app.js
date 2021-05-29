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

// Load Routes
const index = require('./routes/index');
const contact = require('./routes/contact');
const login = require('./routes/login');
const signup = require('./routes/signup');
const news = require('./routes/news');
const admin = require('./routes/admin/index');
const forms = require('./routes/admin/forms');
const members = require('./routes/admin/members');
const aNews = require('./routes/admin/news');
const vForm = require('./routes/admin/viewform');

// Use Routes
app.use('/', index);
app.use('/contact', contact);
app.use('/login', login);
app.use('/signup', signup);
app.use('/news', news);
app.use('/admin', admin);
app.use('/admin/forms', forms);
app.use('/admin/members', members);
app.use('/admin/news', aNews);
app.use('/admin/viewform', vForm);

// Static folder location
app.use(express.static(path.join(__dirname, '/static')));

// Starts the server
app.listen(80, function() {
    console.log('Server started on port 80.');
});