const Food = require('../models/Food');
const Step = require('../models/Step');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { storage, multer } = require('../../util/imageUpload');
const upload = multer({ storage: storage }).single('food');

class FoodControllers {
    //[GET] /food
    index(req, res, next) {
        var token = req.cookies.userId;
        var result = jwt.verify(token, 'mk');
        //console.log(result);

        Food.getAllFood((err, food) => {
            var user;
            if (err) res.send(err);
            User.getUserById(result.id, (err, data) => {
                if (err) res.send(err);
                user = data;
                res.render('foods/show', {
                    foods: food,
                    dataU: data[0].user_name,
                });
            });
        });
    }
    // [GET] /food/show
    show(req, res, next) {
        var token = req.cookies.userId;
        var result = jwt.verify(token, 'mk');
        User.getUserById(result.id, (err, data) => {
            Food.getFoodByUser(data[0].id, (err, food) => {
                if (err) res.send(err);
                res.render('foods/show', {
                    foods: food,
                });
            });
        });
    }
    // [GET] /show/:id
    showById(req, res, next) {
        //console.log(req.params.id);
        // var food = {};
        var result = {};
        Step.getStepByIdFood(req.params.id, (err, step) => {
            if (err) next();
            result.step = step;
        });
        Food.getFoodById(req.params.id, (err, food) => {
            if (err) next();
            result.food = food;
            if (result) {
                //res.send(result.food)
                res.render('foods/showById', {
                    food: result.food,
                    step: result.step,
                });
            }
        });
    }
    //[GET] /food/create
    create(req, res, next) {
        res.render('foods/create');
    }
    //[POST] /food/store
    store(req, res, next) {
        const formData = req.body;
        formData.id_ingredient = 1;
        formData.id_cmt = 1;
        formData.id_user = 1;

        Food.addFood(formData, (err, result) => {
            if (err) next();
            res.redirect('/food/show');
        });
    }

    //[POST] /food/api/store
    apiStore(req, res, next) {
        const formData = req.body;
        formData.id_ingredient = 1;
        formData.id_cmt = 1;
        formData.id_user = 1;

        Food.addFood(formData, (err, result) => {
            if (err) next();
            res.json({ message: result });
        });
    }
    //[GET] /food/api/show
    apiFood(req, res, next) {
        Food.getAllFoodOfUser((err, food) => {
            if (err) res.send(err);
            return res.json(food);
        });
    }
    //[GET] food/img
    imgUp(req, res, next) {
        res.render('foods/upload');
    }
    //[POST] food/img/upload
    uploadImage(req, res, next) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return next();
            } else if (err) {
                // An unknown error occurred when uploading.
            }

            // Everything went fine.
            // console.log(req.file);
            //res.redirect("/uploads/" + req.file.filename);
            console.log(req.file.filename);
            //return res.status(200).end();
            res.send({
                data: req.body,
                file: req.file,
            });
        });
    }
}

module.exports = new FoodControllers();
