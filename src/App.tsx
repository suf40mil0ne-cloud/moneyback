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

  if (currentGame) return <GamePage initialGameId={currentGame.gameId} />;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <HomePage onSelectGame={handleSelectGame} />
      <ChatWidget />
      <footer className="bg-[#1d1d1d] text-white text-center text-xs py-4 mt-8">
        <p>정부부리핑 | 틀린글자 찾기</p>
      </footer>
    </div>
  );
}
