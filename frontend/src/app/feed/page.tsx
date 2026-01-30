"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Article, Category } from "../../types/news";
import { fetchNews } from "../../lib/news";
import LoadingScreen from "../../components/LoadingScreen";

// Separate component to wrap in Suspense for useSearchParams
function FeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get("categories");
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      if (!categoriesParam) {
        setIsLoading(false);
        return;
      }

      const categories = categoriesParam.split(",") as Category[];
      const data = await fetchNews(categories);
      setArticles(data);
      setIsLoading(false);
    };

    loadNews();
  }, [categoriesParam]);

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 bg-gray-50 p-4">
        <p className="mb-4">ニュースが見つかりませんでした。</p>
        <button onClick={handleBack} className="text-purple-600 underline">トピック選択に戻る</button>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pb-24 font-sans">
      {/* Header mock */}
      <div className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-20">
         <span className="font-bold text-gray-800">Latest News</span>
         <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>

      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-0 sm:my-8 sm:rounded-3xl sm:shadow-xl overflow-hidden relative pb-10">
        
        {/* Source Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="bg-gray-100 px-3 py-1 rounded-md mb-2 inline-block">
            <span className="font-bold text-sm text-gray-800 tracking-wider">
               {currentArticle.source.name}
            </span>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors">
            フォロー
          </button>
        </div>

        {/* Article Image */}
        <div className="w-full h-64 bg-gray-200 relative">
          {currentArticle.urlToImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={currentArticle.urlToImage} 
              alt={currentArticle.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
               No Image
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-purple-900 leading-tight mb-6">
            {currentArticle.title}
          </h1>

          {/* AI Summary Box */}
          <div className="bg-purple-100/50 rounded-2xl p-4 mb-6 relative overflow-hidden">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-500">✨</span>
                <span className="text-white font-bold text-xs bg-purple-400 px-2 py-0.5 rounded-full">AIによる要約</span>
             </div>
             <p className="text-sm text-purple-800/80 leading-relaxed">
               {currentArticle.description || "要約が利用できません。"}
             </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
             {currentArticle.content ? currentArticle.content.replace(/\[\+\d+ chars\]/, '...') : currentArticle.description}
          </p>
          
          <a href={currentArticle.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 text-sm font-bold underline">
             Read full story
          </a>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-30 flex items-center justify-center gap-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentIndex === 0 ? 'bg-gray-100 text-gray-300' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
        >
          &lt;
        </button>

        <button 
          onClick={handleBack}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
        >
          トピックを変更
        </button>

         <button 
          onClick={handleNext} 
          disabled={currentIndex === articles.length - 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentIndex === articles.length - 1 ? 'bg-gray-100 text-gray-300' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
        >
          &gt;
        </button>
      </div>

    </main>
  );
}

// Main Page Component
export default function FeedPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FeedContent />
    </Suspense>
  );
}
