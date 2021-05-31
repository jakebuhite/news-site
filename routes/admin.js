const express = require('express');
const router = express.Router();
const { pool } = require("../db/index");
const passport = require('passport');

const user = require('../controllers/user');
const article = require('../controllers/article');
const form = require('../controllers/form');

router.get('/', user.checkUserRole, (req, res) => {
    res.render('admin/index', {user: req.user.username});
});

router.get('/forms', user.checkUserRole, form.getForms);
router.get('/members', user.checkUserRole, user.getUsers);
router.get('/news', user.checkUserRole, article.getArticles);

router.get('/viewform', user.checkUserRole, (req, res) => {
    var newsID = req.query.id;
    res.render('admin/viewform', {id: newsID});
});

module.exports = router;