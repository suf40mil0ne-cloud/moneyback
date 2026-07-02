import { Game } from '../types';

const CATEGORIES = ['전체', '경제', '사회', '복지', '교육', '기타'];

interface Props {
  games: Game[];
  onSelect: (game: Game) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function NewsList({ games, onSelect, activeCategory, onCategoryChange }: Props) {
  const filtered = activeCategory === '전체' ? games : games.filter(g => g.category === activeCategory);

  return (
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-4">
        홈 &gt; 브리핑룸 &gt; <span className="text-[#1d1d1d] font-medium">보도자료</span>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-[#1d1d1d] pb-2">보도자료</h2>

      <div className="flex gap-1 mb-4 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1 text-sm border rounded cursor-pointer transition-colors ${
              activeCategory === cat
                ? 'bg-[#1d1d1d] text-white border-[#1d1d1d]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#1d1d1d]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="space-y-0">
        {filtered.map((game) => (
          <li
            key={game.gameId}
            onClick={() => onSelect(game)}
            className="border-b border-gray-200 py-4 cursor-pointer hover:bg-gray-50 px-2 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                game.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                game.difficulty === 'normal' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {game.difficulty === 'easy' ? '쉬움' : game.difficulty === 'normal' ? '보통' : '어려움'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-gray-800 hover:text-[#d41115] leading-snug mb-1">
                  {game.title}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{game.summary}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="text-[#555]">{game.department}</span>
                  <span>{new Date(game.createdAt).toLocaleDateString('ko-KR')}</span>
                  <span>오류 {game.errors.length}개</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
