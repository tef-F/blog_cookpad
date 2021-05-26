const express = require('express');
const router = express.Router();

const stepController = require('../app/controllers/StepController');

router.post('/api/store', stepController.store);
// router.use('/home', stepController.index);
router.get('/', stepController.index);

module.exports = router;
