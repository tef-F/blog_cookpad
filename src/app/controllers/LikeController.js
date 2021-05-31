const Food = require('../models/Food');
const Step = require('../models/Step');
const Like = require('../models/Like');

class LikeController {
    //[GET] like/api/show/:id
    apiCount(req, res, next) {
        var id = req.params.id;
        var result = {};
        Like.countLike(id, (err, count) => {
            result = count[0];
        });
        Like.getListLike(id, (err, list) => {
            result.like = list;

            res.json(result);
        });
    }

    //[POST] /like/api/store
    store(req, res, next) {
        var formData = req.body;
        Like.addLike(formData, (err, result) => {
            res.send({
                message: `Thêm thành công!`,
                id: result.insertId,
            });
        });
    }

    deleteLike(req, res, next) {
        var id = req.body.id_food;
        var id_user = req.body.id_user;
        console.log('id: ' + id + 'id_user: ' + id_user);
        // res.send([id, id_user]);
        Like.deleteLike([id, id_user], (err, result) => {
            if (err) next(err);
            if (result) {
                res.send({
                    message: `Xoá thành công!`,
                });
            }
            // else {
            //     return res.send({
            //         message: `Thất bại`
            //     })
            // }
        });
    }
}

module.exports = new LikeController();
