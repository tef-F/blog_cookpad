const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

//Set storege upload img
module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../blog_cookpad/src/public/img/step');
        },
        filename: function (req, file, cb) {
            return crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) {
                    return cb(err);
                }
                return cb(
                    null,
                    'step_' +
                        Date.now() +
                        '_' +
                        raw.toString('hex') +
                        path.extname(file.originalname),
                );
            });
        },
    }),
    multer: multer,
};
