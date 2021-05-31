const { pool } = require("../db/index");

module.exports = {
    getArticles: (req, res) => {
        let errors = [];
        pool.query(
            `SELECT news.id, news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id ORDER BY news.id DESC`, (err, results) => {
                if (err) { throw err; }
                if (results.rows.length == 0) {
                    errors.push({message: "No articles have been published"});
                    res.render('admin/news', { errors });
                } else {
                    res.render('admin/news', { results });
                }
            }
        );
    },
    getHomepageArticles: (req, res) => {
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
    },
    getArticleById: (req, res) => {
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
    }
};