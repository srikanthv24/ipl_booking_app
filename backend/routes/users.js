const express = require('express');
const router = express.Router();
const user = require('../controllers').users;

const middlewares = require('../middlewares');

router.post('/login', [middlewares.validator(['email', 'password']), user.loginUser])
router.post('/register', [middlewares.validator(['email', 'password']), user.registerUser])

module.exports = router;