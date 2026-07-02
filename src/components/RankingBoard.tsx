import { RankEntry } from '../types';
import { useAppStore } from '../store/useAppStore';

interface Props {
  rankings: RankEntry[];
}

export default function RankingBoard({ rankings }: Props) {
  const { user } = useAppStore();

  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <h3 className="text-sm font-bold text-[#1d1d1d] border-b border-gray-200 pb-2 mb-3">
        순위표 (누적 점수)
      </h3>
      {rankings.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">아직 기록이 없습니다.<br/>게임을 플레이해보세요!</p>
      ) : (
        <ul className="space-y-2">
          {rankings.slice(0, 10).map((entry, i) => (
            <li
              key={entry.rankingId}
              className={`flex items-center gap-2 text-xs py-1 px-2 rounded ${
                entry.userId === user.userId ? 'bg-gray-100 border border-gray-300' : ''
              }`}
            >
              <span className={`w-5 font-bold flex-shrink-0 ${
                i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-500'
              }`}>{i + 1}</span>
              <span className="flex-1 truncate text-gray-700">{entry.nickname}</span>
              <span className="font-bold text-[#1d1d1d]">{entry.totalPoints}pt</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
