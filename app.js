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
const admin = require('./routes/admin');

// Use Routes
app.use('/', index);
app.use('/admin', admin);

// Static folder location
app.use(express.static(path.join(__dirname, '/static')));

// Starts the server
app.listen(80, function() {
    console.log('Server started on port 80.');
});