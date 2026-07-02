import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import NewsList from '../components/NewsList';
import RankingBoard from '../components/RankingBoard';
import { useRanking } from '../hooks/useRanking';
import { Game } from '../types';

interface Props {
  onSelectGame: (game: Game) => void;
}

export default function HomePage({ onSelectGame }: Props) {
  const { games } = useAppStore();
  const [activeCategory, setActiveCategory] = useState('전체');
  const { rankings } = useRanking();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex gap-6">
      <main className="flex-1 min-w-0">
        <NewsList
          games={games}
          onSelect={onSelectGame}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </main>

      <aside className="hidden lg:block w-60 flex-shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-sm font-bold text-[#1d1d1d] border-b border-gray-200 pb-2 mb-3">오늘의 게임</h3>
          <div className="space-y-2">
            {games.slice(0, 3).map((g, i) => (
              <div
                key={g.gameId}
                onClick={() => onSelectGame(g)}
                className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <span className="text-[#d41115] font-bold text-sm flex-shrink-0">{i + 1}</span>
                <span className="text-xs text-gray-700 line-clamp-2">{g.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1d1d1d] text-white rounded p-4 text-center">
          <p className="text-xs mb-1">오늘 도전 가능</p>
          <p className="text-2xl font-bold">{games.length}개</p>
          <p className="text-xs opacity-80 mt-1">보도자료</p>
        </div>

        <RankingBoard rankings={rankings} />
      </aside>
    </div>
  );
}
