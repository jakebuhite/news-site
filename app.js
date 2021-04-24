var express = require('express');
var app = express();
var port = 80;

// Sends user to specific pages based on HTTP requests
app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.get('/news', (req, res) => {
    res.render('news.ejs');
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

// Redirects user to 404 if link DNE
app.use(function(req, res, next) {
    res.status(404).render("404.ejs");
})

// Starts the server
app.listen(80, function() {
    console.log('Server started on port 80.')
})