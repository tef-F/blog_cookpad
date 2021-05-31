const Food = require('../models/Food');
const Step = require('../models/Step');
const Comment = require('../models/Comment');
const { storage, multer } = require('../../util/StepImgUpload');

class CommentController {
    index(req, res, next) {
        res.send('Commnet');
    }
    //[POST] /commnet/api/store
    store(req, res, next) {
        var formData = req.body;
        Comment.addComment(formData, (err, result) => {
            res.send({
                message: `Thêm thành công!`,
                id: result.insertId,
            });
        });
    }
}

module.exports = new CommentController();
