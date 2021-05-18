const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const { storage, multer } = require('../util/imageUpload');
const foodController = require('../app/controllers/FoodController');
const userController = require('../app/controllers/UserController');

router.post('/store', foodController.store);
router.get('/create', userController.checkLogin, foodController.create);
router.get('/api/show', foodController.apiFood);
router.get('/api/store', foodController.apiStore);
router.get('/show', userController.checkLogin, foodController.show);

router.get('/img', foodController.imgUp);
router.post('/img/upload', foodController.uploadImage);
router.get('/:id', foodController.showById);
router.get('/', userController.checkLogin, foodController.index);

module.exports = router;
