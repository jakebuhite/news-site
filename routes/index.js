const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../controllers/user');
const form = require('../controllers/form');
const article = require('../controllers/article');

// GET
router.get('/', article.getHomepageArticles);

router.get('/news', article.getArticleById);

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/login', user.checkUserNotAuth, (req, res) => {
    res.render('login');
});

router.get('/signup', user.checkUserNotAuth, (req, res) => {
    res.render('signup');
});

router.get('/logout', user.checkUserAuth, (req, res) => {
    req.logOut();
    req.flash('success_msg', "You have logged out");
    res.redirect('/');
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