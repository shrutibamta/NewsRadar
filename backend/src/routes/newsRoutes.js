const express = require('express');
const router = express.Router();
const { newsHandler } = require('../controllers/newsController');

router.get('/', newsHandler);

module.exports = router;
