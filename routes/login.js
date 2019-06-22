const express = require('express');
const { body } = require('express-validator/check');

const loginController = require('../controllers/login/login');
const otpController = require('../controllers/login/otpVerification')

const router = express.Router();

// GET /register/posts
router.post('/login', loginController.getLogin);

router.post('/validateOtp',otpController.validateOTP);

module.exports = router;


