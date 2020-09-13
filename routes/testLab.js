const express = require('express');
const router =  express.Router();
const {cache} = require('../middlewares/cache');

const {getRepos} = require('../controllers/testLab');

router.get('/getRepos', cache, getRepos);

module.exports = router;