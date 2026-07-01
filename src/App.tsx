import { useEffect, useState } from 'react';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import HomePage from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { useAppStore } from './store/useAppStore';
import { mockGames } from './utils/mockData';
import { Game } from './types';

export default function App() {
  const { setGames } = useAppStore();
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    setGames(mockGames);
  }, [setGames]);

  function handleSelectGame(game: Game) {
    setCurrentGame(game);
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      {currentGame ? (
        <GamePage />
      ) : (
        <HomePage onSelectGame={handleSelectGame} />
      )}

      <ChatWidget />

      <footer className="bg-[#003a70] text-white text-center text-xs py-4 mt-8">
        <p>정책브리핑 게임 | 정책 오류 찾기</p>
      </footer>
    </div>
  );
}
