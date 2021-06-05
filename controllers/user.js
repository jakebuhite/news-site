const { pool } = require("../db/index");
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: (req, res) => {
        pool.query("SELECT * FROM users ORDER BY id", (err, results) => {
            if (err) { throw err; }
            res.render('admin/members', { results });
        });
    },
    getUserByID: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This user does not exist");
            res.redirect('/admin/members');
        } else {
            let userID = req.query.id;
            pool.query( 
                `SELECT * FROM users WHERE users.id=$1`, [userID], (err, results) => {
                    if (err) { throw err; }
                    if (results.rows.length == 0) {
                        req.flash('error_msg', "This user does not exist");
                        res.redirect('/admin/users');
                    } else {
                        res.render('admin/edituser', { results });
                    }
                }
            );
        }
    },
    createUser: async (req, res) => {
        let { username, email, password } = req.body;
        if (password.length < 6) {
            req.flash('error_msg', "Password must be at least 6 characters");
            res.redirect('/signup');
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            let avatar = 'avatar.png';
            pool.query(
                'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
                    if (err) { throw err; }
                    if (results.rows.length > 0) {
                        req.flash('error_msg', "This email is already in use");
                        res.redirect('/signup');
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
    editUser: (req, res) => {
        let { username, email, role } = req.body;
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This user does not exist");
            res.redirect('/admin/members');
        } else {
            let userID = req.query.id;
            // Gotta select first
            pool.query(
                `UPDATE users SET username = $1, email = $2, role = $3 WHERE users.id = $4`, [username, email, role, userID], (err, results) => {
                    if (err) { throw err; }
                    req.flash('success_msg', "User has been modified successfully");
                    res.redirect('/admin/members');
                }
            );
        }
    },
    deleteUser: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This user does not exist");
            res.redirect('/admin/members');
        } else {
            let userID = req.query.id;
            // Gotta select first
            pool.query(
                `DELETE FROM users WHERE users.id=$1`, [userID], (err, results) => {
                    if (err) { throw err; }
                    req.flash('success_msg', "User has been successfully deleted");
                    res.redirect('/admin/members');
                }
            );
        }
    }
};