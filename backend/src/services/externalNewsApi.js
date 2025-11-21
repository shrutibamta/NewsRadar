const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

async function fetchNewsFromProvider(category = 'general', pageSize = 20) {
  if (!NEWS_API_KEY) return [];
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
  const resp = await axios.get(url, { timeout: 7000 });
  return resp.data.articles || [];
}

module.exports = { fetchNewsFromProvider };
