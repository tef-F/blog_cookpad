const express = require('express');
const router = express.Router();

const commentController = require('../app/controllers/CommentController');

router.post('/api/store', commentController.store);
// router.use('/home', stepController.index);
router.get('/', commentController.index);

module.exports = router;
