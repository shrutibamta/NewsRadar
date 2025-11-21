const { getNews } = require('../services/newsService');

async function newsHandler(req, res, next) {
  try {
    const category = req.query.category || 'general';
    const cursor = req.query.cursor || null;
    const limit = Math.min(parseInt(req.query.limit || '20'), 50);
    const q = req.query.q || '';

    const result = await getNews({ category, cursor, limit, q });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { newsHandler };
