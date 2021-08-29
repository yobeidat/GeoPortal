const express = require('express');
const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../Controllers/users.controllers');
const router = express.Router();

router.post('/login', userControllers.login);
router.get('/logout', userControllers.logout);
router.post('/register', userControllers.register);
router.get('/allUsers', checkAuth, userControllers.allUsers);

module.exports = router