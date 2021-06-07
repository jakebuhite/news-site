const passport = require('passport');

module.exports = {
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
        res.locals.isLoggedIn = true;
        req.flash('error_msg', "You are already logged in");
        res.redirect('/');
    },
    checkUserRole: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.role === 2) {
                return next();
            } else {
                req.flash('error_msg', "You do not have permission to view that page");
                res.redirect("/");
            }
        } else {
            req.flash('error_msg', "You must log in to see this page");
            res.redirect("/login");
        }
    }
};