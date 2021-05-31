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
                    res.render('index', { errors });
                } else {
                    res.render('index', { results });
                }
            }
        );
    },
    createForm: (req, res) => {
        let { cname, email, message } = req.body;
        pool.query(
            `INSERT INTO forms (name, email, message) VALUES ($1, $2, $3)`, [cname, email, message], (err, results) => {
            if (err) { throw err; }
            // Add flash message
            res.redirect('/contact');
        });    
    }
};