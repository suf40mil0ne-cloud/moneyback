export interface Game {
  gameId: string;
  newsId: number;
  title: string;
  department: string;
  originalText: string;
  modifiedText: string;
  errors: number[];
  difficulty: 'easy' | 'normal' | 'hard';
  createdAt: string;
  isActive: boolean;
  category: string;
  summary: string;
}

export interface Score {
  scoreId: string;
  userId: string;
  gameId: string;
  correctCount: number;
  totalErrors: number;
  timeSpent: number;
  points: number;
  playedAt: string;
  isPersisted: boolean;
}

export interface RankEntry {
  rankingId: string;
  userId: string;
  nickname: string;
  totalPoints: number;
  gamesPlayed: number;
  averageTime: number;
  accuracyRate: number;
  rankToday: number;
  rankThisWeek: number;
  rankThisMonth: number;
}

export interface ChatMessage {
  messageId: string;
  userId: string;
  nickname: string;
  message: string;
  timestamp: string;
  type: 'chat' | 'system';
}

export interface User {
  userId: string;
  nickname: string;
}
