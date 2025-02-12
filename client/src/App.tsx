import { useEffect, useState } from 'react';
import './App.css';

interface Article {
  title: string;
  snippet: string;
  url: string;
  image_url: string;
  source: string;
  published_at: string;
}

function App() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/news');
        if (!response.ok) throw new Error('News fetch failed');
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="news-container">
      <h1>Latest Financial News</h1>
      <div className="news-grid">
        {news.map((article) => (
          <div key={article.url} className="news-card">
            <img src={article.image_url} alt={article.title} />
            <div className="news-content">
              <h2>{article.title}</h2>
              <p>{article.snippet}</p>
              <div className="news-meta">
                <span>{article.source}</span>
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;