"use client";

import { CATEGORIES, Category } from "../types/news";

interface CategorySelectorProps {
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
}

const CATEGORY_IMAGES: Record<Category, string> = {
  business: "bg-blue-100",
  entertainment: "bg-pink-100",
  general: "bg-gray-100",
  health: "bg-green-100",
  science: "bg-indigo-100",
  sports: "bg-orange-100",
  technology: "bg-cyan-100",
};

export default function CategorySelector({
  selectedCategories,
  onToggleCategory,
}: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 max-w-md mx-auto">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <button
            key={category.id}
            onClick={() => onToggleCategory(category.id)}
            className={`
              flex items-center gap-3 px-2 py-2 pr-6 rounded-full transition-all duration-300
              ${
                isSelected
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }
            `}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs overflow-hidden ${
                CATEGORY_IMAGES[category.id]
              }`}
            >
              {/* Image placeholder */}
              <span className={isSelected ? "text-purple-700" : "text-gray-500"}>
                 {category.label.charAt(0)}
              </span>
            </div>
            <span className="font-medium text-sm">{category.labelJa}</span>
          </button>
        );
      })}
    </div>
  );
}
