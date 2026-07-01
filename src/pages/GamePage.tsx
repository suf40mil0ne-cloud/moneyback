import { useState, useEffect, useRef } from 'react';
import './game.css';

const API_URL = import.meta.env.VITE_API_URL || '';
const WS_URL  = import.meta.env.VITE_WS_URL  || 'wss://node-express--suf40mil0ne.replit.app/ws';
const CHAT_API = 'https://node-express--suf40mil0ne.replit.app/api';

function getUserId() {
  let v = localStorage.getItem('userId');
  if (!v) { v = `user_${Math.random().toString(36).slice(2,10)}`; localStorage.setItem('userId', v); }
  return v;
}
function getNickname() {
  let v = localStorage.getItem('nickname');
  if (!v) { v = `익명_${Math.floor(Math.random()*90000)+10000}`; localStorage.setItem('nickname', v); }
  return v;
}

type Segment = { text: string; isTypo: false } | { text: string; isTypo: true; index: number };

const FALLBACK: { id: string; category: string; title: string; date: string; dept: string; segments: Segment[]; errorCount: number } = {
  id: 'game-001',
  category: '정책뉴스',
  title: '숲에서 실현하는 청년창업을 돕다',
  date: '2026.07.01',
  dept: '산림청',
  errorCount: 4,
  segments: [
    { text: '산림청(청장 박은식)은 대전 케이더블류(KW) 컨벤션에서 산림분야 청년', isTypo: false },
    { text: '청', isTypo: true, index: 0 },
    { text: '업가와 ', isTypo: false },
    { text: '전문', isTypo: false },
    { text: '거', isTypo: true, index: 1 },
    { text: ' 등이 참석하는 \'제5회 산림 청년포럼\'을 개최했', isTypo: false },
    { text: '머', isTypo: true, index: 2 },
    { text: '고 29일 밝혔', isTypo: false },
    { text: '더', isTypo: true, index: 3 },
    { text: '.', isTypo: false },
  ],
};

const POPULAR_NEWS = [
  { rank: 1, title: '영화 할인권부터 단기 육아휴직까지… 7월부터 달라지는 것들', dept: '기획재정부' },
  { rank: 2, title: '자도 자도 피곤하다면? 수면무호흡증 무료 검사 받으세요', dept: '보건복지부' },
  { rank: 3, title: '7월부터 공공기관 승용차 2부제 해제 결정', dept: '환경부' },
  { rank: 4, title: '청년 도약계좌 6월 신청 현황 및 향후 일정 안내', dept: '금융위원회' },
  { rank: 5, title: '2026년 하반기 공무원 채용 일정 발표', dept: '인사혁신처' },
];

export function GamePage() {
  const [game, setGame]         = useState(FALLBACK);
  const [found, setFound]       = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone]         = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [myRank, setMyRank]     = useState<{ today: number | null; all: number | null } | null>(null);
  const [ranking, setRanking]   = useState<{ userId: string; nickname: string; points: number }[]>([]);

  useEffect(() => {
    if (API_URL) {
      fetch(`${API_URL}/games/today`).then(r => r.json()).then(gs => { if (gs?.length) setGame(gs[0]); }).catch(() => {});
      fetch(`${API_URL}/rankings?userId=${getUserId()}`).then(r => r.json()).then(d => { setRanking(d.today || []); setMyRank(d.myRank); }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (done || !game) return;
    if (timeLeft === 0) { finish(found); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  function handleTypoClick(idx: number) {
    if (done || found.has(idx)) return;
    const next = new Set(found);
    next.add(idx);
    setFound(next);
    if (next.size === game.errorCount) finish(next);
  }

  function finish(f: Set<number>) {
    setDone(true);
    setShowResult(true);
    if (!API_URL) return;
    fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: getUserId(), nickname: getNickname(), gameId: game.id, foundCount: f.size, totalErrors: game.errorCount, timeSpent: 30 - timeLeft, points: f.size * 20 }),
    }).then(r => r.json()).then(d => { if (d.rankings) { setRanking(d.rankings.today || []); setMyRank(d.rankings.myRank); } }).catch(() => {});
  }

  return (
    <>
      {/* ── 헤더 ── */}
      <header className="kr-header">
        <div className="kr-header-inner">
          <div className="kr-logo">정책브리핑</div>
          <nav className="kr-gnb">
            <a href="#">뉴스</a>
            <a href="#" className="active">브리핑</a>
            <a href="#">정책자료</a>
            <a href="#">구독&amp;참여</a>
          </nav>
          <div className="kr-header-utils">
            <button>닫기</button>
            <span className="sep">|</span>
            <button>공직메일</button>
            <span className="sep">|</span>
            <button>알림ON</button>
            <span className="sep">|</span>
            <button>검색</button>
          </div>
        </div>
      </header>

      {/* ── 브레드크럼 ── */}
      <div className="kr-sub-header">
        <nav className="kr-breadcrumb">
          <span>홈</span><span className="sep">›</span>
          <span>브리핑룸</span><span className="sep">›</span>
          <span className="current">보도자료</span>
        </nav>
      </div>

      {/* ── 메인 ── */}
      <main id="kr-main">
        <div className="area_contents">

          {/* SNS 툴바 */}
          <aside className="as_sns">
            <ul>
              <li><button type="button"><span className="sns-icon">🔗</span><span>공유</span></button></li>
              <li><button type="button"><span className="sns-icon">💬</span><span>댓글</span></button></li>
              <li><button type="button"><span className="sns-icon">🖨</span><span>인쇄</span></button></li>
              <li><button type="button"><span className="sns-icon">☰</span><span>목록</span></button></li>
            </ul>
          </aside>

          {/* 본문 */}
          <div className="article_wrap">
            <div className="container">

              {/* 기사 헤더 */}
              <div className="article_head">
                <span className="head">{game.category}</span>
                <h1>{game.title}</h1>
                <div className="variety">
                  <div className="info">
                    <span>{game.date}</span>
                    <span>{game.dept}</span>
                  </div>
                  <div className="tool">
                    <button type="button">글자크기</button>
                    <button type="button">인쇄하기</button>
                    <button type="button">음성듣기</button>
                    <button type="button">목록</button>
                  </div>
                </div>
              </div>

              {/* 기사 본문 */}
              <div className="article_body">

                {/* 첨부파일 */}
                <div className="atc_file">
                  <div className="file_title">첨부파일</div>
                  <ul>
                    <li><span className="file_icon">📎</span><a href="#">보도자료_{game.dept}_{game.title.slice(0,10)}.hwp</a><span className="file_size">(245KB)</span></li>
                    <li><span className="file_icon">📎</span><a href="#">보도자료_{game.dept}_{game.title.slice(0,10)}.pdf</a><span className="file_size">(312KB)</span></li>
                  </ul>
                </div>

                {/* 핵심 본문 */}
                <div className="view_cont">
                  {!done && (
                    <span className={`game-timer${timeLeft <= 10 ? ' urgent' : ''}`}>
                      ⏱ 0:{timeLeft.toString().padStart(2, '0')}
                    </span>
                  )}
                  <p>
                    {game.segments.map((seg, i) =>
                      seg.isTypo ? (
                        <span
                          key={i}
                          className={`typo${found.has(seg.index) ? ' found' : ''}`}
                          onClick={() => handleTypoClick(seg.index)}
                        >
                          {seg.text}
                        </span>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </p>
                  <div className="game-hint">
                    찾은 오류: <strong>{found.size}</strong> / {game.errorCount}
                  </div>
                </div>

                {/* 결과 */}
                {showResult && (
                  <div className="game-result">
                    <div className="result-row">
                      <span className="result-check">✓</span>
                      <span>{found.size}개 발견 &nbsp;·&nbsp; {30 - timeLeft}초 &nbsp;·&nbsp; {found.size * 20}점</span>
                    </div>
                    <div className="result-ranks">
                      <span>오늘 순위 <strong>{myRank?.today ? `#${myRank.today}` : '—'}</strong></span>
                      <span>전체 순위 <strong>{myRank?.all ? `#${myRank.all}` : '—'}</strong></span>
                    </div>
                    <button className="btn-next" onClick={() => window.location.reload()}>다음 보도자료 →</button>
                  </div>
                )}

                {/* 하단 정보 */}
                <div className="atc_bottom">
                  <div className="view_info">
                    <span>👁 조회수 1,234</span>
                    <span>👍 공감 45</span>
                    <span>↗ 공유 12</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <aside className="as_side">

            {/* 정책 NOW 배너 */}
            <div className="side_row">
              <div className="side_title">정책 NOW</div>
              <div className="policy_banner_placeholder">정책브리핑 NOW</div>
            </div>

            {/* 실시간 인기뉴스 */}
            <div className="side_row">
              <div className="side_title">실시간 인기뉴스</div>
              <ul className="lst">
                {POPULAR_NEWS.map(n => (
                  <li key={n.rank}>
                    <a href="#">
                      <div className="thumb-placeholder">{n.dept}</div>
                      <div className="text">
                        <span className="rank">{n.rank}</span>
                        <strong>{n.title}</strong>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 오늘 순위 (API 연결 시) */}
            {ranking.length > 0 && (
              <div className="side_row">
                <div className="side_title">오늘 순위</div>
                <ul className="lst">
                  {ranking.slice(0, 5).map((r, i) => (
                    <li key={r.userId}>
                      <a href="#">
                        <div className="text">
                          <span className="rank">{i + 1}</span>
                          <strong style={{ fontSize: '13px' }}>{r.nickname} — {r.points}pt</strong>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </aside>

        </div>
      </main>

      {/* 채팅 위젯 */}
      <ChatWidget />
    </>
  );
}

/* ── 채팅 위젯 ──────────────────────────────────────────── */
function ChatWidget() {
  const [messages, setMessages] = useState<{ messageId: number | string; type: string; nickname?: string; message: string }[]>([]);
  const [input, setInput]       = useState('');
  const [online, setOnline]     = useState(1);
  const [myNick, setMyNick]     = useState<string | null>(null);
  const wsRef     = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // 접속자 수 REST API로 폴링 (30초마다)
  useEffect(() => {
    function fetchStats() {
      fetch(`${CHAT_API}/chat/stats`)
        .then(r => r.json())
        .then(d => { if (d.onlineUsers != null) setOnline(d.onlineUsers); })
        .catch(() => {});
    }
    fetchStats();
    const t = setInterval(fetchStats, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = e => {
      let d: { type: string; message: string; nickname?: string; users?: number; timestamp?: string };
      try { d = JSON.parse(e.data); } catch { return; }

      // 접속자 수 업데이트
      if (d.users != null) setOnline(d.users);

      // 내 닉네임 추출 (첫 system 메시지)
      if (d.type === 'system' && !myNick) {
        const m = d.message.match(/^(.+)님이 입장했습니다/);
        if (m) setMyNick(m[1]);
      }

      setMessages(p => [...p.slice(-100), { messageId: Date.now() + Math.random(), ...d }]);
    };

    ws.onerror = () => {};
    ws.onclose = () => {};
    return () => ws.close();
  }, []);

  function send() {
    const text = input.trim();
    if (!text) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // 서버가 plain string을 기대함
      wsRef.current.send(text);
    } else {
      // 오프라인 폴백
      setMessages(p => [...p, { messageId: Date.now(), type: 'chat', nickname: myNick || '나', message: text }]);
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
        {messages.map(m => (
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
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="메시지 입력..." />
        <button onClick={send}>전송</button>
      </div>
    </div>
  );
}
