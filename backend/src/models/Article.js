const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  source: String,
  author: String,
  url: { type: String, index: true },
  category: { type: String, index: true },
  publishedAt: { type: Date, index: true },
  description: String,
  fetchedAt: Date
});

ArticleSchema.index({ category: 1, publishedAt: -1 });

module.exports = mongoose.model('Article', ArticleSchema);
