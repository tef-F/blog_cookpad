const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

//Set storege upload img
module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../blog_cookpad/src/public/img/food');
        },
        filename: function (req, file, cb) {
            return crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) {
                    return cb(err);
                }
                return cb(
                    null,
                    'food_' +
                        Date.now() +
                        '_' +
                        file.originalname +
                        path.extname(file.originalname),
                );
            });
        },
    }),
    multer: multer,
};
