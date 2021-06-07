const express = require('express');
const router = express.Router();
const { pool } = require("../db/index");
const passport = require('passport');
const user = require('../controllers/user');
const article = require('../controllers/article');
const form = require('../controllers/form');
const auth = require('../middleware/auth');

// GET (Index)
router.get('/', auth.checkUserRole, (req, res) => {
    res.render('admin/index', {user: req.user.username});
});

// GET (Forms)
router.get('/forms', auth.checkUserRole, form.getForms);
router.get('/deleteform', auth.checkUserRole, form.deleteForm);
router.get('/viewform', auth.checkUserRole, form.getFormById);

// GET (Users)
router.get('/members', auth.checkUserRole, user.getUsers);
router.get('/edituser', auth.checkUserRole, user.getUserByID);
router.get('/deleteuser', auth.checkUserRole, user.deleteUser);

// GET (News)
router.get('/news', auth.checkUserRole, article.getArticles);
router.get('/deletenews', auth.checkUserRole, article.deleteArticle);
router.get('/editnews', auth.checkUserRole, article.getArticleByIDAdmin);
router.get('/createnews', auth.checkUserRole, (req, res) => {
    res.render('admin/createnews');
});

// POST (Admin)
router.post('/editnews', auth.checkUserRole, article.editArticle);
router.post('/edituser', auth.checkUserRole, user.editUser);
router.post('/createnews', auth.checkUserRole, article.createArticle);

module.exports = router;