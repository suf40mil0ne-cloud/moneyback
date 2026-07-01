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

// 기본 게임 데이터 (API 없을 때 폴백)
const FALLBACK_GAME = {
  id: 'game-001',
  title: '숲에서 실현하는 청년창업을 돕다',
  date: '2026.07.01',
  department: '산림청',
  // 각 segment: { text: string, isTypo: boolean, index?: number }
  segments: [
    { text: '산림청(청장 박은식)은 대전 케이더블류(KW) 컨벤션에서\n산림분야 청년', isTypo: false },
    { text: '청', isTypo: true, index: 0 },
    { text: '업가와 ', isTypo: false },
    { text: '전문', isTypo: false },
    { text: '거', isTypo: true, index: 1 },
    { text: ' 등이 참석하는\n\'제5회 산림 청년포럼\'을 개최했', isTypo: false },
    { text: '머', isTypo: true, index: 2 },
    { text: '고 29일 밝혔', isTypo: false },
    { text: '더', isTypo: true, index: 3 },
    { text: '.', isTypo: false },
  ],
  errorCount: 4,
};

export function GamePage() {
  const [game, setGame] = useState<any>(FALLBACK_GAME);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [myRank, setMyRank] = useState<any>(null);
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    if (API_URL) {
      fetch(`${API_URL}/games/today`)
        .then(r => r.json())
        .then(games => { if (games?.length > 0) setGame(games[0]); })
        .catch(() => {});
    }
    loadRanking();
  }, []);

  function loadRanking() {
    if (!API_URL) return;
    fetch(`${API_URL}/rankings?userId=${getUserId()}`)
      .then(r => r.json())
      .then(data => { setRanking(data.today || []); setMyRank(data.myRank); })
      .catch(() => {});
  }

  useEffect(() => {
    if (isComplete || !game) return;
    if (timeLeft === 0) { finishGame(found); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isComplete, game]);

  function handleTypoClick(index: number) {
    if (isComplete || found.has(index)) return;
    const next = new Set(found);
    next.add(index);
    setFound(next);
    if (next.size === game.errorCount) finishGame(next);
  }

  function finishGame(foundSet: Set<number>) {
    setIsComplete(true);
    setShowResult(true);
    if (API_URL) {
      fetch(`${API_URL}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: getUserId(),
          nickname: getNickname(),
          gameId: game.id,
          foundCount: foundSet.size,
          totalErrors: game.errorCount,
          timeSpent: 30 - timeLeft,
          points: foundSet.size * 20,
        }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.rankings) { setRanking(data.rankings.today || []); setMyRank(data.rankings.myRank); }
        })
        .catch(() => {});
    }
  }

  return (
    <>
      {/* korea.kr 헤더 */}
      <header id="header" className="kr-header">
        <div className="kr-header-inner">
          <div className="kr-logo">정책브리핑</div>
          <nav className="kr-nav">
            <a href="#">뉴스</a>
            <a href="#" className="active">브리핑</a>
            <a href="#">정책자료</a>
            <a href="#">구독&amp;참여</a>
          </nav>
          <div className="kr-utils">
            <button>검색</button>
          </div>
        </div>
      </header>

      <main id="main" className="kr-main">
        {/* 브레드크럼 */}
        <div className="kr-breadcrumb">
          <span>홈</span><span className="sep">&gt;</span>
          <span>브리핑룸</span><span className="sep">&gt;</span>
          <span className="current">보도자료</span>
        </div>

        <div className="kr-layout">
          {/* 기사 본문 */}
          <article className="kr-article">
            {/* 기사 헤더 */}
            <div className="article-head">
              <div className="article-actions">
                <button>공유</button>
                <button>댓글</button>
                <button>인쇄</button>
                <button>목록</button>
              </div>
              <h1 className="article-title">{game.title}</h1>
              <div className="article-info">
                <span className="article-date">{game.date}</span>
                <span className="article-sep">|</span>
                <span className="article-dept">{game.department}</span>
              </div>
              <hr className="article-divider" />
            </div>

            {/* 기사 본문 (게임 영역) */}
            <div className="article-cont">
              {/* 첨부파일 (장식) */}
              <div className="file-list">
                <span className="file-icon">📎</span>
                <a href="#">보도자료_산림청_청년포럼.hwp</a>
                <a href="#">보도자료_산림청_청년포럼.pdf</a>
              </div>

              <div className="article-body">
                {/* 타이머 (본문 위 우측, 아주 작게) */}
                {!isComplete && (
                  <span className={`inline-timer ${timeLeft <= 10 ? 'urgent' : ''}`}>
                    ⏱ 0:{timeLeft.toString().padStart(2, '0')}
                  </span>
                )}

                {/* 실제 본문 - 오타 글자만 span으로 */}
                <p className="article-paragraph">
                  {(game.segments || []).map((seg: any, i: number) => {
                    if (!seg.isTypo) {
                      return seg.text.split('\n').map((line: string, j: number) => (
                        j === 0 ? line : <span key={`${i}-${j}`}><br />{line}</span>
                      ));
                    }
                    const isFound = found.has(seg.index);
                    return (
                      <span
                        key={i}
                        className={`typo${isFound ? ' found' : ''}`}
                        onClick={() => handleTypoClick(seg.index)}
                        title={isFound ? '찾았습니다!' : undefined}
                      >
                        {seg.text}
                      </span>
                    );
                  })}
                </p>

                {/* 발견 카운트 */}
                <div className="inline-hint">
                  찾은 오류: <strong>{found.size}</strong> / {game.errorCount}
                </div>
              </div>

              {/* 결과 */}
              {showResult && (
                <div className="result-box">
                  <div className="result-summary">
                    <span className="result-check">✓</span>
                    <span>{found.size}개 발견 · {30 - timeLeft}초 · {found.size * 20}점</span>
                  </div>
                  <div className="result-ranks">
                    <span>오늘 순위 <strong>{myRank?.today ? `#${myRank.today}` : '-'}</strong></span>
                    <span>전체 순위 <strong>{myRank?.all ? `#${myRank.all}` : '-'}</strong></span>
                  </div>
                  <button className="btn-retry" onClick={() => window.location.reload()}>
                    다음 보도자료 →
                  </button>
                </div>
              )}
            </div>

            {/* 하단 메타 */}
            <div className="article-footer">
              <span>조회수 1,234</span>
              <span className="article-sep">|</span>
              <span>공감 45</span>
            </div>
          </article>

          {/* 사이드바 */}
          <aside className="kr-sidebar">
            <div className="sidebar-box">
              <h3>오늘 순위 TOP5</h3>
              {ranking.length === 0 ? (
                <p className="sidebar-empty">아직 기록 없음</p>
              ) : (
                <ol className="rank-list">
                  {ranking.slice(0, 5).map((r: any, i: number) => (
                    <li key={r.userId} className={r.userId === getUserId() ? 'me' : ''}>
                      <span className="rank-no">{i + 1}</span>
                      <span className="rank-nick">{r.nickname}</span>
                      <span className="rank-pt">{r.points}pt</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <ChatWidget />
          </aside>
        </div>
      </main>
    </>
  );
}

// ─── 채팅 위젯 ────────────────────────────────────────────
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
    ws.onopen = () => ws.send(JSON.stringify({ type: 'join', userId: getUserId(), nickname: getNickname() }));
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'online_count') { setOnline(data.count); return; }
      setMessages(prev => [...prev.slice(-100), data]);
    };
    return () => ws.close();
  }, []);

  function handleSend() {
    if (!input.trim()) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'chat', message: input.trim() }));
    } else {
      setMessages(prev => [...prev, {
        messageId: Date.now(), type: 'chat',
        userId: getUserId(), nickname: getNickname(), message: input.trim(),
      }]);
    }
    setInput('');
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <span>실시간 채팅</span>
        <span className="chat-online">{online}명 접속 중</span>
      </div>
      <div className="chat-messages">
        {messages.length === 0 && <p className="chat-empty">채팅을 시작해보세요!</p>}
        {messages.map((m: any) => (
          <div key={m.messageId} className={`chat-msg ${m.type}`}>
            {m.type === 'system'
              ? <span className="chat-system">{m.message}</span>
              : <><span className="chat-nick">{m.nickname}</span><span className="chat-text">{m.message}</span></>
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="메시지 입력..."
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
