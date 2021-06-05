const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user');
const form = require('../controllers/form');
const article = require('../controllers/article');
const auth = require('../middleware/auth');

// GET (Index)
router.get('/', auth.checkUserAuth, article.getHomepageInfo);

// GET (News Page)
router.get('/news', auth.checkUserAuth, article.getArticleById);

// GET (Contact Page)
router.get('/contact', auth.checkUserAuth, (req, res) => { 
    res.render('contact', { isLoggedIn: res.locals.isLoggedIn }); 
});

// GET (Login Page)
router.get('/login', auth.checkUserNotAuth, (req, res) => { 
    res.render('login', { isLoggedIn: res.locals.isLoggedIn }); 
});

// GET (Signup Page)
router.get('/signup', auth.checkUserNotAuth, (req, res) => {
    res.render('signup', { isLoggedIn: res.locals.isLoggedIn }); 
});

// GET (Logout Page)
router.get('/logout', auth.checkUserAuth, (req, res) => {
    if (res.locals.isLoggedIn === false) {
        // Add flash message: (Not logged in)
        res.redirect('/login');
    } else {
        req.logOut();
        req.flash('success_msg', "You have logged out");
        res.redirect('/');
    }
});

// POST
router.post('/login', 
  passport.authenticate("local", { successRedirect: "/",
                                   failureRedirect: "/login",
                                   failureFlash: true })
);
router.post('/signup', user.createUser);
router.post('/contact', form.createForm);

module.exports = router;