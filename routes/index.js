const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require("../db/index");
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/news', (req, res) => {
    var newsID = req.query.id;
    res.render('news', {id: newsID});
});

// GET authentication
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST authentication
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
})
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
        pool.query(
            'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.rows.length > 0) {
                    errors.push({message: "This email is already in use"});
                    res.render('register', { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`, [username, email, hashedPassword], (err, results) => {
                            if (err) {
                                throw err;
                            }
                            req.flash('success_msg', "You are now registered. Please log in");
                            res.redirect('/login');
                        }
                    );
                }
            } 
        );
    }
});

module.exports = router;