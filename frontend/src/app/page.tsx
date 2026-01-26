'use client';

import Image from 'next/image';
import { useState } from 'react';

const topics = [
  { id: 'r', label: 'リラックス', image: '/images/TopicChip-r.svg', color: '#CEAF22' },
  { id: 'p', label: 'ペット', image: '/images/TopicChip-p.svg', color: '#C64D82' },
  { id: 'm', label: '経済', image: '/images/TopicChip-m.svg', color: '#688E26' },
  { id: 's', label: 'スポーツ', image: '/images/TopicChip-s.svg', color: '#59A5CC' },
  { id: 't', label: '化学', image: '/images/TopicChip-t.svg', color: '#8A5CB0' },
];

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getTopicData = (id: string) => topics.find((t) => t.id === id);

  return (
    <main className="relative w-full max-w-sm mx-auto h-dvh bg-white p-4 overflow-hidden">
      <div className="relative w-full h-full">
        {/* スキップボタン */}
        <button className="absolute top-2 right-2 z-10">
          <Image src="/images/skip.png" alt="Skip" width={60} height={40} />
        </button>

        {/* 幾何学模様 */}
        <div className="flex justify-center mt-12 mb-4 relative z-0">
          {selected.length === 0 ? (
            <Image
              src="/images/AI-Container.svg"
              alt="AI Tekina Art"
              width={240}
              height={240}
              className="relative z-10"
            />
          ) : (
            <Image
              src="/images/Check-AI-obj.svg"
              alt="Check AI"
              width={240}
              height={240}
              className="relative z-10"
            />
          )}

          {/* トピックアイコンと背景ぼかし */}
          {selected.map((id, index) => {
            const topic = getTopicData(id);
            if (!topic) return null;

            const angle = (360 / selected.length) * index;
            const radius = selected.length === 1 ? 0 : 80;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            const blurSize = selected.length === 1 ? 160 : 100;
            const iconSize = selected.length === 1 ? 64 : 48;

            return (
              <div key={id}>
                {/* 背景ぼかし円 */}
                <div
                  className="absolute rounded-full blur-3xl opacity-50 pointer-events-none"
                  style={{
                    width: blurSize,
                    height: blurSize,
                    top: `calc(50% + ${y}px - ${blurSize / 2}px)`,
                    left: `calc(50% + ${x}px - ${blurSize / 2}px)`,
                    backgroundColor: topic.color,
                    opacity: 0.7,
                    zIndex: 5,
                  }}
                />
                {/* トピックアイコン */}
                <img
                  src={topic.image}
                  alt=""
                  className="absolute z-20"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                    left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* トピック表示エリア */}
        <div className="flex justify-center mb-2 z-10 relative">
          {selected.length === 0 ? (
            <button>
              <Image
                src="/images/All-topic.png"
                alt="すべてのトピック"
                width={180}
                height={90}
                style={{ marginBottom: '20px' }}
              />
            </button>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {selected.map((id) => {
                const topic = getTopicData(id);
                if (!topic) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 px-3 py-1 text-sm rounded-full text-white"
                    style={{
                      backgroundColor: `${topic.color}CC`,
                    }}
                  >
                    <span>{topic.label}</span>
                    <button onClick={() => toggleTopic(id)} className="text-white text-sm">
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 見出し */}
        <div className="flex justify-center mb-4 z-10 relative">
          <Image
            src="/images/Read-now.svg"
            alt="今読みたいトピックを選択"
            width={200}
            height={30}
          />
        </div>

        {/* 横スクロールカテゴリ */}
        <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 relative">
          <div className="flex gap-4 w-max px-2 pb-4">
            {topics
              .filter((t) => !selected.includes(t.id))
              .map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className="flex-shrink-0 p-0 transition-opacity duration-300"
                >
                  <img
                    src={topic.image}
                    alt=""
                    className="w-24 h-24 object-contain"
                  />
                </button>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
