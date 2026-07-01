import { useState, useEffect, useRef } from 'react';
import './game.css';

const API_URL = import.meta.env.VITE_API_URL || '';
const WS_URL = import.meta.env.VITE_WS_URL || '';

function getUserId() {
  let id = localStorage.getItem('userId');
  if (!id) { id = `user_${Math.random().toString(36).slice(2, 10)}`; localStorage.setItem('userId', id); }
  return id;
}
function getNickname() {
  let n = localStorage.getItem('nickname');
  if (!n) { n = `익명_${Math.floor(Math.random() * 90000) + 10000}`; localStorage.setItem('nickname', n); }
  return n;
}

export function GamePage() {
  const [game, setGame] = useState<any>(null);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [myRank, setMyRank] = useState<any>(null);
  const [ranking, setRanking] = useState<any[]>([]);

  // 게임 데이터 로드
  useEffect(() => {
    if (API_URL) {
      fetch(`${API_URL}/api/games/today`)
        .then(r => r.json())
        .then(games => { if (games.length > 0) setGame(games[0]); })
        .catch(() => setFallbackGame());
    } else {
      setFallbackGame();
    }
    loadRanking();
  }, []);

  function setFallbackGame() {
    setGame({
      id: 'game-001',
      title: '2026년 상반기 고용동향 발표',
      date: '2026.7.1.',
      department: '고용노동부',
      originalText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 2.8%로 전년 동기보다 0.3%포인트 하락했다.',
      modifiedText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 3.8%로 전년 동기보다 0.5%포인트 하락했다.',
      errors: [{ index: 72, char: '3' }, { index: 77, char: '5' }],
    });
  }

  function loadRanking() {
    const userId = getUserId();
    if (API_URL) {
      fetch(`${API_URL}/api/rankings?userId=${userId}`)
        .then(r => r.json())
        .then(data => { setRanking(data.today || []); setMyRank(data.myRank); })
        .catch(() => {});
    }
  }

  // 타이머
  useEffect(() => {
    if (isComplete || !game) return;
    if (timeLeft === 0) { handleGameEnd(found); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isComplete, game]);

  function handleWordClick(index: number) {
    if (isComplete || !game) return;
    const isError = game.errors.some((e: any) => e.index === index);
    if (isError) {
      const next = new Set(found);
      next.add(index);
      setFound(next);
      if (next.size === game.errors.length) handleGameEnd(next);
    }
  }

  function handleGameEnd(foundSet: Set<number>) {
    setIsComplete(true);
    setShowResult(true);
    submitScore(foundSet);
  }

  function submitScore(foundSet: Set<number>) {
    const userId = getUserId();
    const nickname = getNickname();
    const points = foundSet.size * 20;
    const payload = {
      userId, nickname,
      gameId: game.id,
      foundCount: foundSet.size,
      totalErrors: game.errors.length,
      timeSpent: 30 - timeLeft,
      points,
    };
    if (API_URL) {
      fetch(`${API_URL}/api/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(r => r.json())
        .then(data => {
          if (data.rankings) {
            setRanking(data.rankings.today || []);
            setMyRank(data.rankings.myRank);
          }
        })
        .catch(() => {});
    }
  }

  if (!game) return <div className="loading">로딩중...</div>;

  const score = found.size * 20;

  return (
    <div className="game-page">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <div className="logo">정책브리핑</div>
          <nav className="nav">
            <a href="#news">뉴스</a>
            <a href="#briefing" className="active">브리핑</a>
            <a href="#policy">정책자료</a>
            <a href="#subscribe">구독&참여</a>
          </nav>
        </div>
      </header>

      {/* 크롬브레드 */}
      <div className="breadcrumb">
        <a href="#home">홈</a>
        <span>&gt;</span>
        <a href="#briefing">브리핑룸</a>
        <span>&gt;</span>
        <span>보도자료</span>
      </div>

      <div className="page-layout">
        {/* 메인 콘텐츠 */}
        <main className="main-content">
          <div className="title-section">
            <div className="top-buttons">
              <button className="btn-share">공유</button>
              <button className="btn-comment">댓글</button>
              <button className="btn-print">인쇄</button>
              <button className="btn-list">목록</button>
            </div>
            <h1 className="title">{game.title}</h1>
            <div className="meta">
              <span className="date">{game.date}</span>
              <span className="separator">|</span>
              <span className="department">{game.department}</span>
            </div>
            <hr className="divider" />
          </div>

          <div className="game-section">
            <div className="game-instruction">
              <span className="icon">📋</span>
              <span>이 보도자료의 본문을 확인하시고 오류를 찾아주세요.</span>
            </div>

            <div className="text-comparison">
              <div className="original-box">
                <div className="label">【원문】</div>
                <div className="text">{game.originalText}</div>
              </div>

              <div className="game-text-box">
                <div className="label-row">
                  <div className="label">【본문 - 오류 찾기】</div>
                  <div className={`timer ${timeLeft <= 10 ? 'timer-urgent' : ''}`}>
                    0:{timeLeft.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="text interactive">
                  {game.modifiedText.split('').map((char: string, i: number) => {
                    const isFound = found.has(i);
                    return (
                      <span
                        key={i}
                        className={`char ${isFound ? 'found' : ''}`}
                        onClick={() => handleWordClick(i)}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>

                <div className="game-progress">
                  <span className="found">
                    발견: <strong>{found.size}/{game.errors.length}</strong>
                  </span>
                </div>
              </div>
            </div>

            {showResult && (
              <div className="game-result">
                <div className="result-success">
                  <div className="result-icon">✓</div>
                  <div className="result-content">
                    <div className="result-score">{found.size}개 발견</div>
                    <div className="result-time">시간: {30 - timeLeft}초</div>
                    <div className="result-points">점수: {score}점</div>
                  </div>
                </div>

                <div className="result-ranking">
                  <div className="rank-item">
                    <span>오늘 순위</span>
                    <strong>{myRank?.today ? `#${myRank.today}` : '-'}</strong>
                  </div>
                  <div className="rank-item">
                    <span>전체 순위</span>
                    <strong>{myRank?.all ? `#${myRank.all}` : '-'}</strong>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="btn-next" onClick={() => window.location.reload()}>
                    다음 보도자료
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="metadata">
            <div className="meta-divider"></div>
            <span>조회수 1,234</span>
            <span className="separator">|</span>
            <span>공감 45</span>
          </div>

          <div className="nav-posts">
            <button className="btn-prev">← 이전기사</button>
            <button className="btn-next-post">다음기사 →</button>
          </div>
        </main>

        {/* 우측 사이드바 */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>오늘의 게임 진행도</h3>
            <div className="progress-info">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: isComplete ? '100%' : '0%' }}></div>
              </div>
              <div className="progress-score">점수: {score}점</div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>오늘 순위 TOP5</h3>
            <div className="news-list">
              {ranking.slice(0, 5).map((r: any, i: number) => (
                <div className="news-item" key={r.userId}>
                  <span className="rank">{i + 1}</span>
                  <span style={{ fontSize: '13px' }}>{r.nickname} — {r.points}pt</span>
                </div>
              ))}
              {ranking.length === 0 && (
                <div className="news-item"><span style={{ fontSize: '12px', color: '#999' }}>아직 기록 없음</span></div>
              )}
            </div>
          </div>

          <ChatWidget />
        </aside>
      </div>
    </div>
  );
}

// ─── 채팅 위젯 ───────────────────────────────────────────
function ChatWidget() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [online, setOnline] = useState(1);
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!WS_URL) return;
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'join', userId: getUserId(), nickname: getNickname() }));
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'online_count') { setOnline(data.count); return; }
      setMessages(prev => [...prev.slice(-100), data]);
    };
    ws.onclose = () => {};
    return () => ws.close();
  }, []);

  function handleSend() {
    if (!input.trim()) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'chat', message: input.trim() }));
    } else {
      // 로컬 모드
      setMessages(prev => [...prev, {
        type: 'chat', nickname: getNickname(),
        userId: getUserId(), text: input.trim(),
        messageId: Date.now(), timestamp: new Date().toISOString(), message: input.trim(),
      }]);
    }
    setInput('');
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>실시간 채팅</h3>
        <span className="user-count">({online}명)</span>
      </div>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="message system"><span className="system-msg">채팅을 시작해보세요!</span></div>
        )}
        {messages.map((msg: any) => (
          <div key={msg.messageId} className={`message ${msg.type}`}>
            {msg.type === 'system' ? (
              <span className="system-msg">{msg.message}</span>
            ) : (
              <>
                <span className="nickname">{msg.nickname}</span>
                <span className="text">{msg.message}</span>
              </>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="메시지 입력..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
