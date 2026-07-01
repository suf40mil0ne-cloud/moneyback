import { useState } from 'react';
import { Score } from '../types';
import { useAppStore } from '../store/useAppStore';

interface Props {
  score: Score;
  onNext: () => void;
  onSave: (nickname: string) => void;
}

export default function ResultModal({ score, onNext, onSave }: Props) {
  const { user } = useAppStore();
  const [nickname, setNickname] = useState(user.nickname);
  const [saved, setSaved] = useState(false);
  const accuracy = Math.round((score.correctCount / score.totalErrors) * 100);

  function handleSave() {
    onSave(nickname);
    setSaved(true);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-bold text-[#003a70] mb-4 text-center">게임 결과</h3>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">발견한 오류</span>
            <span className="font-bold">{score.correctCount} / {score.totalErrors}개</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">소요 시간</span>
            <span className="font-bold">{score.timeSpent}초</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">정확도</span>
            <span className="font-bold">{accuracy}%</span>
          </div>
          <div className="flex justify-between text-sm border-t pt-3">
            <span className="text-gray-600 font-medium">획득 점수</span>
            <span className="font-bold text-[#003a70] text-xl">{score.points}점</span>
          </div>
        </div>

        {!saved ? (
          <div className="mb-4">
            <label className="text-xs text-gray-600 mb-1 block">닉네임으로 기록 저장</label>
            <input
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              maxLength={12}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#003a70] mb-2"
            />
            <button
              onClick={handleSave}
              className="w-full bg-[#003a70] text-white py-2 rounded text-sm font-medium hover:bg-[#002a50] transition-colors"
            >
              기록 저장
            </button>
          </div>
        ) : (
          <div className="mb-4 text-center text-sm text-green-600 font-medium py-2 bg-green-50 rounded">
            ✓ 저장되었습니다!
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full border border-[#003a70] text-[#003a70] py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          다음 게임 →
        </button>
      </div>
    </div>
  );
}
