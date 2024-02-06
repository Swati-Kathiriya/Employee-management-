const authController = require('../controllers/auth')
const express = require('express');
const router = express.Router();

router.post('/signUp', authController.signUp);
// router.get('/signUp', authController.signUp)

router.post('/login', authController.login);
// router.get('/login', authController.login);
module.exports = router; 