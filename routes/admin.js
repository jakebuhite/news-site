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

router.get('/deleteform', user.checkUserRole, form.deleteForm);
router.get('/deletenews', user.checkUserRole, article.deleteArticle);
router.get('deleteuser', user.checkUserRole, user.deleteUser);

router.get('/editnews', user.checkUserRole, article.getArticleByIDAdmin);
router.get('/edituser', user.checkUserRole, user.getUserByID);

router.post('/editnews', user.checkUserRole, article.editArticle);
router.post('/edituser', user.checkUserRole, user.editUser);

module.exports = router;