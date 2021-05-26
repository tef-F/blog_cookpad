const Food = require('../models/Food');
const Step = require('../models/Step');
const { storage, multer } = require('../../util/StepImgUpload');

class StepController {
    index(req, res, next) {
        res.send('HElo');
    }
    //[POST] /food/api/step
    uploadImgStep(req, res, next) {
        const upload = multer({ storage: storage }).single('img_step');
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
            return res.json({
                message: `Upload file ${req.file.filename} thành công!`,
                data: req.file,
            });
        });
    }
    //[POST] /step/api/store
    store(req, res, next) {
        var formData = req.body;
        Step.addStep(formData, (err, result) => {
            res.send({
                message: `Thêm thành công!`,
                id: result.insertId,
            });
        });
    }
}

module.exports = new StepController();
