const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.post('/register',userController.signUp);
router.post('/login',userController.signIn);

module.exports = router;