import { useState, useEffect, useCallback } from 'react';
import { Game, Score } from '../types';
import { useAppStore } from '../store/useAppStore';

interface Props {
  game: Game;
  onComplete: (score: Score) => void;
}

export default function GameArea({ game, onComplete }: Props) {
  const { user } = useAppStore();
  const [timeLeft, setTimeLeft] = useState(30);
  const [found, setFound] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const finish = useCallback((foundErrors: number[]) => {
    setDone(true);
    const correct = foundErrors.filter(i => game.errors.includes(i)).length;
    const points = correct * 20 + (timeLeft > 0 ? timeLeft : 0);
    const score: Score = {
      scoreId: `score_${Date.now()}`,
      userId: user.userId,
      gameId: game.gameId,
      correctCount: correct,
      totalErrors: game.errors.length,
      timeSpent: 30 - timeLeft,
      points,
      playedAt: new Date().toISOString(),
      isPersisted: false,
    };
    onComplete(score);
  }, [game, timeLeft, user, onComplete]);

  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) { finish(found); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, finish, found]);

  function handleCharClick(idx: number) {
    if (done || found.includes(idx) || wrong.includes(idx)) return;
    if (game.errors.includes(idx)) {
      const next = [...found, idx];
      setFound(next);
      if (next.length === game.errors.length) finish(next);
    } else {
      setWrong(w => [...w, idx]);
    }
  }

  const chars = game.modifiedText.split('');

  const timerColor = timeLeft <= 10 ? 'text-red-600' : 'text-gray-700';

  return (
    <div>
      {/* Game header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-[#e8f1ff] rounded border border-[#003a70]/20">
        <div>
          <span className="text-sm font-bold text-[#003a70]">오류 찾기 미션</span>
          <span className="text-xs text-gray-600 ml-2">오류 {game.errors.length}개를 찾아 클릭하세요</span>
        </div>
        <div className={`text-2xl font-bold ${timerColor}`}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Original text */}
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">원문</div>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm leading-relaxed text-gray-500">
          {game.originalText}
        </div>
      </div>

      {/* Modified text - game area */}
      <div className="mb-4">
        <div className="text-xs font-bold text-[#003a70] mb-1 uppercase tracking-wide">
          변조본 — 다른 부분을 클릭하세요
        </div>
        <div className="p-3 bg-white border-2 border-[#003a70]/30 rounded text-sm leading-relaxed">
          {chars.map((char, idx) => {
            const isFound = found.includes(idx);
            const isWrong = wrong.includes(idx);
            return (
              <span
                key={idx}
                onClick={() => !done && handleCharClick(idx)}
                className={`cursor-pointer rounded transition-colors ${
                  isFound ? 'bg-red-200 text-red-800' :
                  isWrong ? 'bg-yellow-200' :
                  'hover:bg-blue-100'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>발견: <strong className="text-[#003a70]">{found.length}</strong> / {game.errors.length}</span>
        {wrong.length > 0 && <span className="text-yellow-600">오답: {wrong.length}회</span>}
      </div>

      {done && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
          게임 종료! 결과를 확인하세요.
        </div>
      )}
    </div>
  );
}
