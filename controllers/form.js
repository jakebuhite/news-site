const { pool } = require("../db/index");

const user = require('../controllers/user');

module.exports = {
    getForms: (req, res) => {
        let errors = [];
        pool.query(
            `SELECT * FROM forms`, (err, results) => {
                if (err) { throw err; }
                if (results.rows.length == 0) {
                    errors.push({message: "No forms have been completed"});
                    res.render('admin/forms', { errors });
                } else {
                    res.render('admin/forms', { results });
                }
            }
        );
    },
    createForm: (req, res) => {
        let { cname, email, message } = req.body;
        pool.query(
            `INSERT INTO forms (name, email, message) VALUES ($1, $2, $3)`, [cname, email, message], (err, results) => {
            if (err) { throw err; }
            req.flash('success_msg', "You message has been sent");
            res.redirect('/contact');
        });    
    },
    deleteForm: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This form does not exist");
            res.redirect('/admin/forms');
        } else {
            let formID = req.query.id;
            // Gotta select first
            pool.query(
                'DELETE FROM forms WHERE id=$1', [formID], (err, results) => {
                    if (err) { throw err; }
                    req.flash('success_msg', "Successfully deleted form");
                    res.redirect('/admin/forms');
                }
            );
        }
    }
};