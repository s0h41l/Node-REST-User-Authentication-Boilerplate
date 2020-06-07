const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/register',userController.signUp);
router.get('/login',userController.signIn);

module.exports = router;