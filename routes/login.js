const express = require('express');
const { body } = require('express-validator/check');

const loginController = require('../controllers/login');

const router = express.Router();

// GET /register/posts
router.post('/login', loginController.getLogin);

module.exports = router;


