"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "../types/news";
import CategorySelector from "../components/CategorySelector";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = async () => {
    if (selectedCategories.length === 0) return;

    setIsLoading(true);
    
    // Slight delay to show loading animation before navigating
    // In a real app the loading state would persist across navigation or be handled by the next page's data fetching
    const query = selectedCategories.join(",");
    router.push(`/feed?categories=${query}`);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-white text-gray-800 font-sans">
      {/* Header */}
      <header className="p-6 flex justify-center items-center">
        <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
          <span className="text-xl">✨</span>
          <span className="font-bold text-lg tracking-wide">NewsSiteLogo</span>
        </div>
      </header>

      <div className="container mx-auto px-4 flex flex-col items-center min-h-[80vh]">
        {/* Hero Section */}
        <section
          className="flex flex-col items-center mt-20 scale-100 transition-all duration-700 ease-in-out"
        >
          {/* Central Circle Graphic */}
          <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
            {/* Concentric circles purely for decoration */}
            <div className="absolute w-[120%] h-[120%] rounded-full border border-purple-300/30 animate-pulse delay-75"></div>
            <div className="absolute w-[100%] h-[100%] rounded-full border border-purple-400/40 animate-pulse delay-150"></div>
            <div className="absolute w-[80%] h-[80%] rounded-full border border-purple-500/50 animate-pulse"></div>
            
            <div className="text-center z-10">
              <p className="text-purple-900 font-bold text-xl leading-tight">
                今読みたい
                <br />
                トピックを選択
              </p>
            </div>
          </div>

          {/* Category Selector */}
          <div className="mb-12 w-full max-w-2xl px-4">
            <CategorySelector
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleSearch}
            disabled={selectedCategories.length === 0 || isLoading}
            className={`
              px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300
              ${
                selectedCategories.length === 0
                  ? "bg-purple-200 text-purple-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl hover:-translate-y-1 transform active:scale-95"
              }
            `}
          >
            {isLoading ? "読み込み中..." : "このトピックに潜る"}
          </button>
        </section>
      </div>
    </main>
  );
}