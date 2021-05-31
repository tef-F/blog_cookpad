const express = require('express');
const router = express.Router();

const likeController = require('../app/controllers/LikeController');

router.get('/api/show/:id', likeController.apiCount);
router.delete('/api/delete', likeController.deleteLike);
router.post('/api/store', likeController.store);

module.exports = router;
