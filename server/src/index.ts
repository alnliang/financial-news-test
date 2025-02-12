import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

interface MarketauxArticle {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  relevance_score: number;
}

app.get('/api/news', async (req, res): Promise<any> => {
  try {
    const apiKey = process.env.MARKETAUX_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get('https://api.marketaux.com/v1/news/all', {
      params: {
        api_token: apiKey,
        countries: 'us',
        filter_entities: 'true',
        limit: 10
      }
    });

    const articles: MarketauxArticle[] = response.data.data;
    res.json(articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});