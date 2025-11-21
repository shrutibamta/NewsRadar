const Favorite = require('../models/Favorite');

async function getFavorites(req, res, next) {
  try {
    const userId = req.userId;
    const favs = await Favorite.find({ userId }).sort({ savedAt: -1 }).limit(100);
    res.json({ items: favs });
  } catch (e) { next(e); }
}

async function addFavorite(req, res, next) {
  try {
    const userId = req.userId;
    const { articleUrl, title } = req.body;
    const fav = await Favorite.create({ userId, articleUrl, title });
    res.json({ id: fav._id });
  } catch (e) { next(e); }
}

module.exports = { getFavorites, addFavorite };
