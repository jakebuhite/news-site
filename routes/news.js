const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('news');
});

module.exports = router;