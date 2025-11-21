const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite } = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');

router.get('/favorites', requireAuth, getFavorites);
router.post('/favorites', requireAuth, addFavorite);

module.exports = router;
