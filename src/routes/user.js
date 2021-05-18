const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/logout', userController.logout);

router.post('/api/login', userController.apiLogin);

router.post('/login', userController.login);

router.get('/signup', userController.signup);

router.post('/register', userController.register);

router.get('/api', userController.showById);

router.get('/', userController.index);

module.exports = router;
