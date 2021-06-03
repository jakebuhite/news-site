const { pool } = require("../db/index");

module.exports = {
    getArticles: (req, res) => {
        let errors = [];
        pool.query(
            `SELECT news.id, news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id ORDER BY news.id`, (err, results) => {
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
    getHomepageInfo: (req, res) => {
        let errors = [];
        pool.query(
            `SELECT news.id, news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id ORDER BY news.id DESC`, (newsErr, newsResults) => {
                if (newsErr) { throw newsErr; }
                if (newsResults.rows.length == 0) {
                    errors.push({message: "No articles have been published"});
                }
                pool.query(
                    `SELECT users.username FROM users ORDER By users.id DESC`, (userErr, userResults) => {
                        if (userErr) { throw userErr; }
                        if (errors.length > 0) {
                            res.render('index', { errors, userResults });
                        } else {
                            res.render('index', { newsResults, userResults });
                        }
                    }
                );
            }
        );
    },
    getArticleById: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This article does not exist");
            res.redirect('/');
        } else {
            let newsID = req.query.id;
            pool.query( 
                `SELECT news.title, news.content, news.date, users.username, users.avatar FROM users INNER JOIN news ON news.author = users.id WHERE news.id=$1`, [newsID], (err, results) => {
                    if (err) { throw err; }
                    if (results.rows.length == 0) {
                        req.flash('error_msg', "This article does not exist");
                        res.redirect('/');
                    } else {
                        res.render('news', { results });
                    }
                }
            );
        }
    },
    getArticleByIDAdmin: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This article does not exist");
            res.redirect('/admin');
        } else {
            let newsID = req.query.id;
            pool.query( 
                `SELECT news.id, news.title, news.content FROM users INNER JOIN news ON news.author = users.id WHERE news.id=$1`, [newsID], (err, results) => {
                    if (err) { throw err; }
                    if (results.rows.length == 0) {
                        req.flash('error_msg', "This article does not exist");
                        res.redirect('/admin/forms');
                    } else {
                        res.render('admin/editnews', { results });
                    }
                }
            );
        }
    },
    editArticle: (req, res) => {
        let { title, message } = req.body;
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This article does not exist");
            res.redirect('/admin/news');
        } else {
            let newsID = req.query.id;
            // Gotta select first
            pool.query(
                `UPDATE news SET title = $1, content = $2 WHERE news.id = $3`, [title, message, newsID], (err, results) => {
                    if (err) { throw err; }
                    req.flash('success_msg', "Article has been modified successfully");
                    res.redirect('/admin/news');
                }
            );
        }
    },
    deleteArticle: (req, res) => {
        if (typeof req.query.id === undefined) {
            req.flash('error_msg', "This article does not exist");
            res.redirect('/admin/news');
        } else {
            let newsID = req.query.id;
            // Gotta select first
            pool.query(
                'DELETE FROM news WHERE id=$1', [newsID], (err, results) => {
                    if (err) { throw err; }
                    req.flash('success_msg', "Successfully deleted article");
                    res.redirect('/admin/news');
                }
            )
        }
    }
};