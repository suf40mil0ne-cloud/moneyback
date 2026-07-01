import { create } from 'zustand';
import { User, Game, ChatMessage } from '../types';

function initUser(): User {
  const stored = localStorage.getItem('userId');
  const nicknameStored = localStorage.getItem('nickname');
  if (stored && nicknameStored) return { userId: stored, nickname: nicknameStored };
  const userId = `user_${Math.random().toString(36).slice(2, 10)}`;
  const nickname = `익명_${Math.floor(Math.random() * 90000) + 10000}`;
  localStorage.setItem('userId', userId);
  localStorage.setItem('nickname', nickname);
  return { userId, nickname };
}

interface AppState {
  user: User;
  games: Game[];
  currentGame: Game | null;
  chatMessages: ChatMessage[];
  setGames: (games: Game[]) => void;
  setCurrentGame: (game: Game | null) => void;
  addChatMessage: (msg: ChatMessage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: initUser(),
  games: [],
  currentGame: null,
  chatMessages: [],
  setGames: (games) => set({ games }),
  setCurrentGame: (game) => set({ currentGame: game }),
  addChatMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages.slice(-100), msg] })),
}));
