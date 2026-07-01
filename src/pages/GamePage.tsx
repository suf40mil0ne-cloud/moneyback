import { useState } from 'react';
import { Game, Score } from '../types';
import GameArea from '../components/GameArea';
import ResultModal from '../components/ResultModal';
import RankingBoard from '../components/RankingBoard';
import { useRanking } from '../hooks/useRanking';

interface Props {
  game: Game;
  onBack: () => void;
  onNext: () => void;
}

export default function GamePage({ game, onBack, onNext }: Props) {
  const [score, setScore] = useState<Score | null>(null);
  const { rankings, saveScore } = useRanking();

  function handleSave(nickname: string) {
    if (!score) return;
    saveScore(score, nickname);
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex gap-6">
      <main className="flex-1 min-w-0">
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            홈 &gt; 브리핑룸 &gt;{' '}
            <button onClick={onBack} className="text-[#003a70] hover:underline">보도자료</button>{' '}
            &gt; <span className="text-gray-700">{game.title}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h1>
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="text-[#003a70] font-medium">{game.department}</span>
            <span>{new Date(game.createdAt).toLocaleDateString('ko-KR')}</span>
            <span className={`px-2 py-0.5 rounded ${
              game.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              game.difficulty === 'normal' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {game.difficulty === 'easy' ? '쉬움' : game.difficulty === 'normal' ? '보통' : '어려움'}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
          <GameArea game={game} onComplete={setScore} />
        </div>

        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-[#003a70] border border-gray-300 px-3 py-1.5 rounded hover:border-[#003a70] transition-colors"
        >
          ← 목록으로
        </button>
      </main>

      <aside className="hidden lg:block w-60 flex-shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-sm font-bold text-[#003a70] border-b border-gray-200 pb-2 mb-3">게임 안내</h3>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• 변조본에서 원문과 다른 부분을 클릭하세요</li>
            <li>• 30초 내에 모든 오류를 찾으세요</li>
            <li>• 오류 1개당 20점 + 잔여시간 점수</li>
            <li>• 오답 클릭 시 노란색으로 표시됩니다</li>
          </ul>
        </div>

        <div className="bg-[#e8f1ff] border border-[#003a70]/20 rounded p-4 text-center">
          <h3 className="text-sm font-bold text-[#003a70] mb-1">이 게임 오류 수</h3>
          <p className="text-3xl font-bold text-[#003a70]">{game.errors.length}개</p>
        </div>

        <RankingBoard rankings={rankings} />
      </aside>

      {score && (
        <ResultModal score={score} onSave={handleSave} onNext={onNext} />
      )}
    </div>
  );
}
