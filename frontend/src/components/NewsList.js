import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');

  async function loadMore(reset=false) {
    setLoading(true);
    try {
      const res = await API.get('/api/news', { params: { category, cursor: reset ? null : cursor, limit: 10 } });
      const data = res.data;
      if (reset) setArticles(data.items || []);
      else setArticles(prev => [...prev, ...(data.items || [])]);
      setCursor(data.nextCursor || null);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  useEffect(() => {
    loadMore(true);
    // eslint-disable-next-line
  }, [category]);

  return (
    <div className="container">
      <div className="controls">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button onClick={() => loadMore(true)}>Refresh</button>
        <button onClick={() => loadMore(false)} disabled={!cursor || loading}>Load More</button>
      </div>

      {articles.map((a, idx) => (
        <div key={idx} className="article">
          <h3><a href={a.url} target="_blank" rel="noreferrer">{a.title}</a></h3>
          <div style={{fontSize: '0.9rem', color:'#555'}}>{a.source} • {new Date(a.publishedAt).toLocaleString()}</div>
          <p>{a.description}</p>
        </div>
      ))}

      {loading && <div style={{padding:12}}>Loading...</div>}
      {!loading && !cursor && <div style={{padding:12, color:'#666'}}>No more articles</div>}
    </div>
  );
}

export default NewsList;
