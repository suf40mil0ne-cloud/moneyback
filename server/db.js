import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dir = dirname(fileURLToPath(import.meta.url));
const GAMES_FILE = join(__dir, 'data', 'games.json');
const SCORES_FILE = join(__dir, 'data', 'scores.json');

function readJSON(file, fallback = []) {
  try {
    if (!existsSync(file)) return fallback;
    return JSON.parse(readFileSync(file, 'utf-8'));
  } catch { return fallback; }
}

function writeJSON(file, data) {
  writeFileSync(file, JSON.stringify(data, null, 2));
}

// 초기 샘플 게임 데이터
const SAMPLE_GAMES = [
  {
    id: 'game-001',
    title: '2026년 상반기 고용동향 발표',
    date: '2026.7.1.',
    department: '고용노동부',
    originalText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 2.8%로 전년 동기보다 0.3%포인트 하락했다. 특히 청년층(15~29세) 취업자 수가 크게 늘어 청년 고용률이 45.2%를 기록했다.',
    modifiedText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 3.8%로 전년 동기보다 0.5%포인트 하락했다. 특히 청년층(15~29세) 취업자 수가 크게 늘어 청년 고용률이 45.2%를 기록했다.',
    errors: [{ index: 72, char: '3' }, { index: 77, char: '5' }],
    difficulty: 1,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'game-002',
    title: '숲에서 실현하는 청년창업을 돕다',
    date: '2026.7.1.',
    department: '산림청',
    originalText: '산림청은 숲에서 청년 창업을 지원하는 "산림 청년 창업 지원 사업"을 2025년부터 추진한다고 밝혔다. 이 사업은 총 50억 원 규모로, 전국 10개 지역에서 시범 운영될 예정이다.',
    modifiedText: '산림청은 숲에서 청년 창업을 지원하는 "산림 청년 창업 지원 사업"을 2026년부터 추진한다고 밝혔다. 이 사업은 총 50억 원 규모로, 전국 15개 지역에서 시범 운영될 예정이다.',
    errors: [{ index: 40, char: '6' }, { index: 72, char: '5' }],
    difficulty: 2,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'game-003',
    title: 'EU 新철강 조치 관련 국가별 쿼터 물량 최종 발표',
    date: '2026.7.1.',
    department: '산업통상자원부',
    originalText: '산업통상자원부는 EU의 新철강 수입 조치에 따른 국가별 쿼터 물량을 최종 확정했다. 한국의 경우 연간 120만 톤의 쿼터가 배정되었으며, 이는 전년 대비 5% 증가한 수치다.',
    modifiedText: '산업통상자원부는 EU의 新철강 수입 조치에 따른 국가별 쿼터 물량을 최종 확정했다. 한국의 경우 연간 130만 톤의 쿼터가 배정되었으며, 이는 전년 대비 8% 증가한 수치다.',
    errors: [{ index: 60, char: '3' }, { index: 75, char: '8' }],
    difficulty: 3,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export function getGames() {
  const games = readJSON(GAMES_FILE, SAMPLE_GAMES);
  if (games.length === 0) {
    writeJSON(GAMES_FILE, SAMPLE_GAMES);
    return SAMPLE_GAMES;
  }
  return games;
}

export function getGameById(id) {
  return getGames().find(g => g.id === id) || null;
}

export function addGames(newGames) {
  const existing = getGames();
  const existingIds = new Set(existing.map(g => g.id));
  const toAdd = newGames.filter(g => !existingIds.has(g.id));
  const updated = [...existing, ...toAdd];
  writeJSON(GAMES_FILE, updated);
  return toAdd.length;
}

export function getScores() {
  return readJSON(SCORES_FILE, []);
}

export function saveScore(score) {
  const scores = getScores();
  scores.push({ ...score, id: randomUUID(), playedAt: new Date().toISOString() });
  writeJSON(SCORES_FILE, scores);
  return getRankings(score.userId);
}

export function getRankings(currentUserId = null) {
  const scores = getScores();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekStart = todayStart - 6 * 86400000;

  const aggregate = (filterFn) => {
    const map = new Map();
    scores.filter(filterFn).forEach(s => {
      const prev = map.get(s.userId) || { nickname: s.nickname || s.userId, points: 0 };
      map.set(s.userId, { nickname: prev.nickname, points: prev.points + s.points });
    });
    return Array.from(map.entries())
      .map(([userId, v]) => ({ userId, ...v }))
      .sort((a, b) => b.points - a.points);
  };

  const todayRanks = aggregate(s => new Date(s.playedAt).getTime() >= todayStart);
  const weekRanks = aggregate(s => new Date(s.playedAt).getTime() >= weekStart);
  const allRanks = aggregate(() => true);

  const myRankToday = todayRanks.findIndex(r => r.userId === currentUserId) + 1 || null;
  const myRankWeek = weekRanks.findIndex(r => r.userId === currentUserId) + 1 || null;
  const myRankAll = allRanks.findIndex(r => r.userId === currentUserId) + 1 || null;

  return {
    today: todayRanks.slice(0, 20),
    week: weekRanks.slice(0, 20),
    all: allRanks.slice(0, 20),
    myRank: currentUserId ? { today: myRankToday, week: myRankWeek, all: myRankAll } : null,
  };
}
