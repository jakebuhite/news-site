const { pool } = require("../db/index");
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: (req, res) => {
        pool.query("SELECT * FROM users", (err, results) => {
            if (err) { throw err; }
            if (results.rows.length == 0) {
                // flash message: (No users)
                res.render('admin/members');
            } else {
                res.render('admin/members', { results });
            }
        });
    },
    createUser: async (req, res) => {
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
    },
    checkUserAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.locals.isLoggedIn = true;
        } else {
            res.locals.isLoggedIn = false;
        }
        next();
    },
    checkUserNotAuth: (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.locals.isLoggedIn = false;
            return next();
        }
        // Add flash message: (Already logged in)
        res.locals.isLoggedIn = true;
        res.redirect('/');
    },
    checkUserRole: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.role === 2) {
                return next();
            } else {
                res.redirect("/");
            }
        } else {
            res.redirect("/login");
        }
    }
};