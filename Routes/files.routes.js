const express = require('express');
const checkAuth = require('../Middleware/checkAuth.middleware');
const fileControllers = require('../Controllers/files.controllers');
const router = express.Router();

router.post('/upload', checkAuth, fileControllers.upload);
router.get('/getCSVFile', checkAuth, fileControllers.getCSVFile);

module.exports = router