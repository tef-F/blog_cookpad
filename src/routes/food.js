const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { storage, multer } = require('../util/imageUpload');
const foodController = require('../app/controllers/FoodController');
const userController = require('../app/controllers/UserController');
const stepController = require('../app/controllers/StepController');

router.post('/img/multiple-upload', foodController.uploadMultiImg);
router.post('/img/upload', foodController.uploadImage);
router.post('/img/step', stepController.uploadImgStep);
router.get('/img', foodController.imgUp);
router.post('/store', foodController.store);
router.get('/create', userController.checkLogin, foodController.create);
router.get('/show', userController.checkLogin, foodController.show);
router.post('/find', foodController.search);
//API
router.post('/api/store', foodController.apiStore);
router.get('/api/show/:id', foodController.apiShowById);
router.get('/api/show', foodController.apiFood);
router.post('/api/find', foodController.apiSearch);
router.get('/api/category', foodController.apiCategory);
//
router.get('/:id', foodController.showById);
router.get('/', userController.checkLogin, foodController.index);

module.exports = router;
