const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../controllers/user');
const form = require('../controllers/form');
const article = require('../controllers/article');

// GET
router.get('/', user.checkUserAuth, article.getHomepageInfo);

router.get('/news', user.checkUserAuth, article.getArticleById);

router.get('/contact', user.checkUserAuth, (req, res) => { 
    res.render('contact', { isLoggedIn: res.locals.isLoggedIn }); 
});

router.get('/login', user.checkUserNotAuth, (req, res) => { 
    res.render('login', { isLoggedIn: res.locals.isLoggedIn }); 
});

router.get('/signup', user.checkUserNotAuth, (req, res) => {
    res.render('signup', { isLoggedIn: res.locals.isLoggedIn }); 
});

router.get('/logout', user.checkUserAuth, (req, res) => {
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