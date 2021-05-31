const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../db');
const bcrypt = require('bcrypt');

function initialize(passport) {

    // Stores user id
    passport.serializeUser((user, done) => { done(null, user.id) });
    
    // Obtains user details for database
    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM users WHERE id=$1`, [id], (err, results) => {
                if (err) { throw err; }
                return done(null, results.rows[0]);
            }
        )
    });

    const authUser = (username, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE username=$1`, [username], (err, results) => {
                if (err) { throw err; }
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) { throw err; }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: "Password is not correct"});
                        }
                    });
                } else {
                    return done(null, false, {message: "Username not found"});
                }
            }
        )
    }
    passport.use(new LocalStrategy({
            userField: 'username',
            passField: 'password'
        }, authUser)
    );
}

module.exports = initialize;