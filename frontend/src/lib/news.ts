import { Article, Category, NewsResponse } from '../types/news';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNews(categories: Category[]): Promise<Article[]> {
  if (!API_KEY) {
    console.error('NEXT_PUBLIC_API_KEY is not set');
    throw new Error('API Key is missing');
  }

  if (categories.length === 0) {
    return [];
  }

  try {
    const promises = categories.map(async (category) => {
      const url = `${BASE_URL}/top-headlines?category=${category}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch news for category: ${category}`);
      }
      // const data: NewsResponse = await response.json();
      const data = await response.json();
      console.log(data);
      return data.articles;
    });

    const results = await Promise.all(promises);
    // Flatten the array of arrays into a single array of articles
    const allArticles = results.flat();

    // Sort by date (newest first)
    return allArticles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
