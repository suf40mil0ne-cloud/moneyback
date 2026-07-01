import { useState, useEffect } from 'react';
import { Score, RankEntry } from '../types';

function loadScores(): Score[] {
  try { return JSON.parse(localStorage.getItem('scores') || '[]'); } catch { return []; }
}

export function useRanking() {
  const [rankings, setRankings] = useState<RankEntry[]>([]);

  function refresh() {
    const scores = loadScores();
    const map = new Map<string, { nickname: string; points: number; count: number; totalTime: number; correct: number; total: number }>();

    scores.forEach((s: Score) => {
      const nickname = localStorage.getItem(`nick_${s.userId}`) || s.userId;
      const prev = map.get(s.userId) || { nickname, points: 0, count: 0, totalTime: 0, correct: 0, total: 0 };
      map.set(s.userId, {
        nickname,
        points: prev.points + s.points,
        count: prev.count + 1,
        totalTime: prev.totalTime + s.timeSpent,
        correct: prev.correct + s.correctCount,
        total: prev.total + s.totalErrors,
      });
    });

    const entries: RankEntry[] = Array.from(map.entries())
      .map(([userId, v], i) => ({
        rankingId: `rank_${i}`,
        userId,
        nickname: v.nickname,
        totalPoints: v.points,
        gamesPlayed: v.count,
        averageTime: v.count > 0 ? Math.round(v.totalTime / v.count) : 0,
        accuracyRate: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
        rankToday: 0,
        rankThisWeek: 0,
        rankThisMonth: 0,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((e, i) => ({ ...e, rankToday: i + 1, rankThisWeek: i + 1, rankThisMonth: i + 1 }));

    setRankings(entries);
  }

  useEffect(() => { refresh(); }, []);

  function saveScore(score: Score, nickname: string) {
    const scores = loadScores();
    scores.push({ ...score, isPersisted: true });
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem(`nick_${score.userId}`, nickname);
    refresh();
  }

  return { rankings, saveScore, refresh };
}
