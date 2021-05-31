const Food = require('../models/Food');
const Step = require('../models/Step');
const User = require('../models/User');
const Like = require('../models/Like');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const { storage, multer } = require('../../util/imageUpload');
const { imgUrlToPath } = require('../../util/handlerLinkImg');
const e = require('express');
const multipleUploadImage = require('../../util/multipleUploadImage');
const formidable = require('formidable');

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
        // const form = formidable({ multiples: true });

        // form.parse(req, (err, fields, files) => {
        //     if (err) {
        //         next(err);
        //         return;
        //     }
        //     res.json({ fields, files });
        // });
        // var json = JSON.stringify(formData);

        var token = req.cookies.userId;
        var result = jwt.verify(token, 'mk');

        formData.id_category = 1;
        formData.id_cmt = 1;
        formData.id_user = result.id;

        Food.addFood(formData, (err, result) => {
            if (err) next();
            res.send({
                message: `Thêm thành công!`,
                id: result.insertId,
            });
        });
    }

    //[GET] food/img
    imgUp(req, res, next) {
        res.render('foods/upload');
    }
    //[POST] food/img/upload
    uploadImage(req, res, next) {
        //res.send(req.body);
        const upload = multer({ storage: storage }).single('img_food');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return next();
            } else if (err) {
                // An unknown error occurred when uploading.
            }

            // Everything went fine.
            console.log(req.file);
            console.log(req.file.filename);
            //return res.status(200).end();
            var file = req.file;
            // var urlFile = file.destination;
            // var url = imgUrlToPath(urlFile, namefile);

            return res.json({
                message: `Upload file ${req.file.filename} thành công!`,
                data: req.file,
            });
        });
        // res.send({ message: 'Upload' });
    }
    //[POST] /img/multiple-upload
    async uploadMultiImg(req, res, next) {
        let debug = console.log.bind(console);
        try {
            // thực hiện upload
            await multipleUploadImage(req, res);
            // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
            debug(req.files);
            // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
            if (req.files.length <= 0) {
                return res.send({
                    message: `You must select at least 1 file or more.`,
                });
            }
            // trả về cho người dùng cái thông báo đơn giản.
            return res.send({
                message: `Your files has been uploaded.`,
            });
        } catch (error) {
            // Nếu có lỗi thì debug lỗi xem là gì ở đây
            debug(error);
            // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.send({
                    message: `Exceeds the number of files allowed to upload.`,
                });
            }
            return res.send({
                message: `Error when trying upload many files: ${error}}`,
            });
        }
    }
    //[POST] food/
    search(req, res, next) {
        var keywords = req.body.q;
        Food.findFoodByTitle(keywords, (err, data) => {
            if (err) next();
            if (data.length > 0) {
                return res.send({
                    message: `Các món mới nhất (${data.length})`,
                    result: data,
                });
            } else {
                return res.send({
                    message: `Không có kết quả cho ${keywords}`,
                });
            }
        });
    }

    // ------------------------ API -------------------------//
    //[POST] /food/api/store
    apiStore(req, res, next) {
        var formData = req.body;
        // if(formData.id_user == null) {
        //     // var token = req.cookies.userId;
        //     // var result = jwt.verify(token, 'mk');
        //     // formData.id_user = result.id;
        // }
        formData.id_category = 1;
        formData.id_cmt = 1;
        Food.addFood(formData, (err, result) => {
            if (err) next();
            res.send({
                message: `Thêm thành công!`,
                id: result.insertId,
            });
        });
    }
    //[PUT] /food/api/update
    apiUpdateFood(req, res, next) {
        var formData = req.body;
        var datetime = new Date();
        formData.updatedAt = datetime;
        var id = req.params.id;
        if (formData && id) {
            Food.updateFood([formData, id], (err, result) => {
                if (err) return res.send(err);
                return res.send({
                    message: `Cập nhập thành công!`,
                });
            });
        } else {
            return next();
        }
    }
    //[GET] /food/api/show
    apiFood(req, res, next) {
        Food.getAllFoodOfUser((err, foods) => {
            if (err) res.send(err);
            return res.send(foods);
            // for(let food in foods) {
            //     console.log(`food: ${food}: ${foods[food].id_food}`);
            //     console.log(foods[food].id_food);
            //     Like.countLike(foods[food].id_food, (err, count) => {
            //         console.log(foods[food]);
            //         // var a = foods[food];
            //         return res.send("Aa")
            //     })
            // }
            // for (const food in foods) {
            //     if (Object.hasOwnProperty.call(foods, food)) {
            //         const element = foods[food];
            //         console.log(element);

            //     }
            // }
        });
    }
    //[GET] food/api/show-time
    apiFoodNew(req, res, next) {
        Food.getAllFoodByTime((err, foods) => {
            if (err) res.send(err);
            return res.send(foods);
        });
    }
    //[GET] food/api/user/:id
    apiFoodByIdUser(req, res, next) {
        var id = req.params.id;
        Food.getAllFoodOfUserByIdUser(id, (err, food) => {
            if (err) return next(err);
            return res.json(food);
        });
    }

    //[POST] food/api/find/
    apiSearch(req, res, next) {
        var keywords = req.body.q;
        Food.findFoodByTitle(keywords, (err, data) => {
            if (err) next();
            if (data.length > 0) {
                return res.send({
                    message: `Các món mới nhất (${data.length})`,
                    result: data,
                });
            } else {
                return res.send({
                    message: `Không có kết quả cho ${keywords}`,
                });
            }
        });
    }

    //[GET] food/api/category
    apiCategory(req, res, next) {
        Category.getAllCategory((err, cate) => {
            if (err) res.send(err);
            return res.json(cate);
        });
    }

    // [GET] api/show/:id
    apiShowById(req, res, next) {
        var result = {};
        if (req.params.id && Number(req.params.id)) {
            Step.getStepByIdFood(req.params.id, (err, step) => {
                if (err) next();
                result.step = step;
            });
            Comment.getCommentByIdFood(req.params.id, (err, cmt) => {
                if (err) next();
                result.comment = cmt;
            });
            Food.getFoodOfUserById(req.params.id, (err, food) => {
                if (err) next();
                result.food = food;
                if (result) {
                    //res.send(result.food)
                    return res.send({
                        food: result.food,
                        step: result.step,
                        comment: result.comment,
                    });
                }
            });
        } else {
            return res.send({
                message: 'Lỗi không tìm thấy id khả dụng',
            });
        }
    }
    //[DELETE] food/api/delete/:id
    apiDeleteFoodById(req, res, next) {
        var id = req.params.id;
        console.log('ID Food: ' + id);
        Food.deleteFoodById(id, (err, result) => {
            if (err)
                return res.send({
                    message: `Xoá thất bại`,
                    error: err,
                });
            return res.send({
                message: `Xoá thành công!`,
            });
        });
    }
}

module.exports = new FoodControllers();
