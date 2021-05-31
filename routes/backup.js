const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require("../db/index");
const passport = require('passport');

router.get('/', (req, res) => {
    let errors = [];
    pool.query(
        `SELECT news.id, news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id ORDER BY news.id DESC`, (err, results) => {
            if (err) { throw err; }
            if (results.rows.length == 0) {
                errors.push({message: "No articles have been published"});
                res.render('index', { errors });
            } else {
                res.render('index', { results });
            }
        }
    );
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/news', (req, res) => {
    let errors = [];
    // Check if undefined
    if (typeof req.query.id === undefined) {
        console.log("It ended here: 1");
        errors.push({message: "This article does not exist"});
    }
    if (errors.length > 0) {
        // flash message: "This article does not exist"
        res.redirect('/');
    } else {
        let newsID = req.query.id;
        pool.query( 
            `SELECT news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id WHERE news.id=$1`, [newsID], (err, results) => {
                if (err) { throw err; }
                if (results.rows.length == 0) {
                    // flash message: "This article does not exist (it may have been moved or deleted)"
                    res.redirect('/');
                } else {
                    res.render('news', { results });
                }
            }
        );
    }
});

// GET authentication
router.get('/login', checkUserNotAuth, (req, res) => {
    res.render('login');
});

router.get('/signup', checkUserNotAuth, (req, res) => {
    res.render('signup');
});

router.get('/logout', checkUserAuth, (req, res) => {
    req.logOut();
    req.flash('success_msg', "You have logged out");
    res.redirect('/');
})

// POST authentication
router.post('/login', 
  passport.authenticate("local", { successRedirect: "/",
                                   failureRedirect: "/login",
                                   failureFlash: true })
);

router.post('/signup', async (req, res) => {
    let { username, email, password } = req.body;
    let errors = [];
    if (password.length < 6) {
        errors.push({message: "Password must be at least 6 characters"});
    }
    if (errors.length > 0) {
        res.render('signup', { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let avatar = 'avatar.png';
        pool.query(
            'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
                if (err) { throw err; }
                if (results.rows.length > 0) {
                    errors.push({message: "This email is already in use"});
                    res.render('signup', { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4)`, [username, email, hashedPassword, avatar], (err, results) => {
                            if (err) { throw err; }
                            req.flash('success_msg', "You are now registered. Please log in");
                            res.redirect('/login');
                        }
                    );
                }
            } 
        );
    }
});

// POST contact form
router.post('/contact', (req, res) => {
    let { cname, email, message } = req.body;
    pool.query(
        `INSERT INTO forms (name, email, message) VALUES ($1, $2, $3)`, [cname, email, message], (err, results) => {
            if (err) { throw err; }
            // Add flash message
            res.redirect('/contact');
        }
    )
});

function checkUserAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Add flash message
    res.redirect(401, '/login');
}

function checkUserNotAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    // Add flash message
    res.redirect(406, '/');
}

module.exports = router;