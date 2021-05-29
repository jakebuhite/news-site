const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/forms', (req, res) => {
    res.render('admin/forms');
});

router.get('/members', (req, res) => {
    res.render('admin/members');
});

router.get('/news', (req, res) => {
    res.render('admin/news');
});

router.get('/viewform', (req, res) => {
    res.render('admin/viewform');
});


module.exports = router;