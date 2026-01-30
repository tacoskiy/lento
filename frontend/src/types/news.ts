export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export const CATEGORIES: { id: Category; label: string; labelJa: string }[] = [
  { id: 'business', label: 'Business', labelJa: 'ビジネス' },
  { id: 'entertainment', label: 'Entertainment', labelJa: 'エンタメ' },
  { id: 'general', label: 'General', labelJa: '総合' },
  { id: 'health', label: 'Health', labelJa: '健康' },
  { id: 'science', label: 'Science', labelJa: '科学' },
  { id: 'sports', label: 'Sports', labelJa: 'スポーツ' },
  { id: 'technology', label: 'Technology', labelJa: 'テクノロジー' },
];
