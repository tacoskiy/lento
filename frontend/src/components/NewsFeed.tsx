import { Article } from "../types/news";

interface NewsFeedProps {
  articles: Article[];
}

export default function NewsFeed({ articles }: NewsFeedProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>ニュースが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pb-20 max-w-6xl mx-auto">
      {articles.map((article, index) => (
        <a
          key={`${article.url}-${index}`}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            {article.urlToImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-200">
                <span className="text-4xl">News</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
              {article.source.name}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs text-purple-600 font-semibold mb-2">
              {new Date(article.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              {article.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
