const express = require('express');
const checkAuthViews = require('../Middleware/checkAuthViews.middleware');
const checkAuthAdmin = require('../Middleware/checkAuthAdmin.middleware');
const viewsControllers = require('../Controllers/views.controllers');
const router = express.Router();

router.get('/login', viewsControllers.login);
router.get('/users',[checkAuthViews,checkAuthAdmin], viewsControllers.users);
router.get('/',checkAuthViews, viewsControllers.map);
router.get('/map',checkAuthViews, viewsControllers.map);
router.get('/layer',[checkAuthViews,checkAuthAdmin], viewsControllers.layer);


module.exports = router