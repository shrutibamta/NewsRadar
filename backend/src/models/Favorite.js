const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  articleUrl: String,
  title: String,
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
