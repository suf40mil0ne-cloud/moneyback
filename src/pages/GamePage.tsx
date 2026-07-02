import { useState, useEffect, useRef } from 'react';
import './game.css';
import { mockGames } from '../utils/mockData';

const API_URL = import.meta.env.VITE_API_URL || '';
const WS_URL  = import.meta.env.VITE_WEBSOCKET_URL || import.meta.env.VITE_WS_URL || 'wss://node-express--suf40mil0ne.replit.app/ws';

function getUserId() {
  let v = localStorage.getItem('userId');
  if (!v) { v = `user_${Math.random().toString(36).slice(2, 10)}`; localStorage.setItem('userId', v); }
  return v;
}
function getNickname() {
  let v = localStorage.getItem('nickname');
  if (!v) { v = `익명_${Math.floor(Math.random() * 90000) + 10000}`; localStorage.setItem('nickname', v); }
  return v;
}

type Segment  = { text: string; isTypo: false } | { text: string; isTypo: true; index: number };
type GameData = { id: string; category: string; title: string; date: string; dept: string; segments: Segment[]; errorCount: number; timerSeconds: number; };
type Settings = { timerEnabled: boolean; difficulty: 5 | 8 | 12; };
type Modal    = 'ranking' | 'myRecord' | 'settings' | null;

// mockGames → GameData 변환 (API 없을 때 fallback)
function mockToGameData(g: typeof mockGames[0]): GameData {
  const errorSet = new Set(g.errors);
  const segs: Segment[] = [];
  let buf = '';
  let typoIdx = 0;
  for (let i = 0; i < g.modifiedText.length; i++) {
    if (errorSet.has(i)) {
      if (buf) { segs.push({ text: buf, isTypo: false }); buf = ''; }
      segs.push({ text: g.modifiedText[i], isTypo: true, index: typoIdx++ });
    } else {
      buf += g.modifiedText[i];
    }
  }
  if (buf) segs.push({ text: buf, isTypo: false });
  return {
    id: g.gameId,
    category: g.category,
    title: g.title,
    date: new Date(g.createdAt).toLocaleDateString('ko-KR'),
    dept: g.department,
    errorCount: g.errors.length,
    timerSeconds: g.difficulty === 'easy' ? 30 : g.difficulty === 'normal' ? 60 : 90,
    segments: segs,
  };
}

const MOCK_GAMES: GameData[] = mockGames.map(mockToGameData);

const HISTORY_KEY  = 'gb_history';
const SETTINGS_KEY = 'gb_settings';
const FONT_SIZES   = [18, 20, 22, 24];

function loadSettings(): Settings {
  try { return { timerEnabled: true, difficulty: 8, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; }
  catch { return { timerEnabled: true, difficulty: 8 }; }
}

function toParagraphs(segs: Segment[]): Segment[][] {
  const result: Segment[][] = [[]];
  for (const seg of segs) {
    if (!seg.isTypo && seg.text.includes('\n')) {
      const parts = seg.text.split(/\n+/);
      result[result.length - 1].push({ text: parts[0], isTypo: false });
      for (let i = 1; i < parts.length; i++) result.push([{ text: parts[i], isTypo: false }]);
    } else {
      result[result.length - 1].push(seg);
    }
  }
  return result.filter(p => p.some(s => s.text.trim()));
}

interface GamePageProps {
  initialGameId?: string;
}

export function GamePage({ initialGameId }: GamePageProps) {
  const [games, setGames]       = useState<GameData[]>(MOCK_GAMES);
  const [gameIdx, setGameIdx]   = useState(0);
  const [found, setFound]       = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(MOCK_GAMES[0].timerSeconds);
  const [done, setDone]         = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [ranking, setRanking]   = useState<{ userId: string; nickname: string; points: number }[]>([]);
  const [myRank, setMyRank]     = useState<{ today: number | null; all: number | null } | null>(null);
  const [fontSize, setFontSize] = useState(20);
  const [toast, setToast]       = useState<string | null>(null);
  const [modal, setModal]       = useState<Modal>(null);
  const [rankTab, setRankTab]   = useState<'today' | 'weekly' | 'monthly'>('today');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState<Settings>(loadSettings);

  const game        = games[gameIdx];
  const targetCount = Math.min(settings.difficulty, game.errorCount);
  const paragraphs  = toParagraphs(game.segments);

  useEffect(() => { document.title = '정부부리핑 | 틀린글자 찾기'; }, []);

  // initialGameId로 시작 게임 설정
  useEffect(() => {
    if (!initialGameId) return;
    const idx = games.findIndex(g => g.id === initialGameId);
    if (idx >= 0) setGameIdx(idx);
  }, [initialGameId, games]);

  useEffect(() => {
    setTimeLeft(game.timerSeconds);
    setFound(new Set());
    setDone(false);
    setShowResult(false);
    window.scrollTo(0, 0);
  }, [game.id]);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/articles/today`).then(r => r.json())
      .then((gs: GameData[]) => { if (gs?.length) setGames(gs); }).catch(() => {});
    fetch(`${API_URL}/rankings?userId=${getUserId()}`).then(r => r.json())
      .then(d => { setRanking(d.today || []); setMyRank(d.myRank); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (done || !settings.timerEnabled) return;
    if (timeLeft === 0) { finish(found); return; }
    const t = setTimeout(() => setTimeLeft((s: number) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, settings.timerEnabled]);

  function handleTypoClick(idx: number) {
    if (done || found.has(idx)) return;
    const next = new Set(found); next.add(idx);
    setFound(next);
    if (next.size >= targetCount) finish(next);
  }

  function finish(f: Set<number>) {
    setDone(true); setShowResult(true);
    const timeSpent = game.timerSeconds - timeLeft;
    const pts = f.size * 20;
    const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    hist.unshift({ title: game.title, found: f.size, total: targetCount, time: timeSpent, points: pts, date: new Date().toISOString() });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(hist.slice(0, 30)));
    if (!API_URL) return;
    fetch(`${API_URL}/scores`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: getUserId(), nickname: getNickname(), gameId: game.id, foundCount: f.size, totalErrors: game.errorCount, timeSpent, points: pts }),
    }).then(r => r.json()).then(d => {
      if (d.rankings) { setRanking(d.rankings.today || []); setMyRank(d.rankings.myRank); }
    }).catch(() => {});
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2000); }
  function toggleFontSize() { setFontSize(f => { const i = FONT_SIZES.indexOf(f); return FONT_SIZES[(i + 1) % FONT_SIZES.length]; }); }
  function handleShare() { navigator.clipboard.writeText(window.location.href).then(() => showToast('링크가 복사되었습니다.')).catch(() => showToast('복사 실패')); }
  function goHome() { window.location.href = '/'; }
  function goPrev() { if (gameIdx > 0) setGameIdx(i => i - 1); }
  function goNext() { if (gameIdx < games.length - 1) setGameIdx(i => i + 1); }
  function selectGame(i: number) { setGameIdx(i); window.scrollTo(0, 0); }
  function saveSettings(s: Settings) { setSettings(s); localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

  const filteredGames = searchQuery
    ? games.filter(g => g.title.includes(searchQuery) || g.dept.includes(searchQuery))
    : games;

  return (
    <>
      {/* ── 헤더 ── */}
      <header className="kr-header">
        <div className="kr-header-inner">
          <div className="kr-logo" onClick={goHome}>
            <img src="/logo.jpg" alt="정부부리핑" style={{ height: 36, width: 'auto' }} />
          </div>
          <nav className="kr-gnb">
            <a href="#" onClick={e => { e.preventDefault(); goHome(); }}>뉴스</a>
            <a href="#" className="active" onClick={e => { e.preventDefault(); goHome(); }}>브리핑</a>
            <a href="#" onClick={e => { e.preventDefault(); goHome(); }}>정책자료</a>
            <a href="#" onClick={e => { e.preventDefault(); goHome(); }}>구독&amp;참여</a>
          </nav>
          <div className="kr-header-utils">
            <button onClick={() => setModal('ranking')}>랭킹</button>
            <span className="sep">|</span>
            <button onClick={() => setModal('myRecord')}>내기록</button>
            <span className="sep">|</span>
            <button onClick={() => setModal('settings')}>설정</button>
            <span className="sep">|</span>
            <button onClick={() => { setShowSearch(s => !s); setSearchQuery(''); }}>🔍</button>
          </div>
        </div>
      </header>

      {/* ── 검색바 ── */}
      {showSearch && (
        <div className="search-bar-wrap">
          <input autoFocus placeholder="기사 제목 또는 부처명 검색..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && (setShowSearch(false), setSearchQuery(''))}
          />
          {searchQuery && <span className="search-count">{filteredGames.length}건</span>}
          {searchQuery && filteredGames.length > 0 && (
            <div className="search-results">
              {filteredGames.slice(0, 5).map(g => (
                <button key={g.id} className="search-result-btn" onClick={() => {
                  const idx = games.findIndex(x => x.id === g.id);
                  if (idx >= 0) selectGame(idx);
                  setShowSearch(false); setSearchQuery('');
                }}>{g.dept} — {g.title.slice(0, 16)}…</button>
              ))}
            </div>
          )}
          <span className="search-clear" onClick={() => { setShowSearch(false); setSearchQuery(''); }}>✕ 닫기</span>
        </div>
      )}

      {/* ── 브레드크럼 ── */}
      <div className="kr-sub-header">
        <nav className="kr-breadcrumb">
          <span onClick={goHome} style={{ cursor: 'pointer' }}>홈</span>
          <span className="sep">›</span>
          <span>브리핑룸</span>
          <span className="sep">›</span>
          <span className="current" onClick={goHome} style={{ cursor: 'pointer' }}>보도자료</span>
        </nav>
      </div>

      {/* ── 메인 ── */}
      <main id="kr-main">
        <div className="area_contents">

          {/* SNS 툴바 */}
          <aside className="as_sns">
            <ul>
              <li><button type="button" onClick={handleShare}><span className="sns-icon">🔗</span><span>공유</span></button></li>
              <li><button type="button"><span className="sns-icon">💬</span><span>댓글</span></button></li>
              <li><button type="button" onClick={() => window.print()}><span className="sns-icon">🖨</span><span>인쇄</span></button></li>
              <li><button type="button" onClick={goHome}><span className="sns-icon">☰</span><span>목록</span></button></li>
            </ul>
          </aside>

          {/* 본문 */}
          <div className="article_wrap">
            <div className="container">
              <div className="article_head">
                <span className="head">{game.category}</span>
                <h1>{game.title}</h1>
                <div className="variety">
                  <div className="info">
                    <span>{game.date}</span>
                    <span>{game.dept}</span>
                  </div>
                  <div className="tool">
                    <button type="button" className="btn-fontsize" onClick={toggleFontSize}>가({fontSize})</button>
                    <button type="button" onClick={() => window.print()}>인쇄하기</button>
                    <button type="button">음성듣기</button>
                    <button type="button" onClick={goHome}>목록</button>
                  </div>
                </div>
              </div>

              <div className="article_body">
                <div className="game-instruction">
                  📝 본문에서 잘못된 글자를 찾아 클릭하세요! 총 <strong>{targetCount}개</strong>의 오류가 숨어있습니다.
                  {!settings.timerEnabled && <span style={{ marginLeft: 8, color: '#888', fontSize: 12 }}>(타이머 OFF)</span>}
                </div>

                <div className="atc_file">
                  <div className="file_title">첨부파일</div>
                  <ul>
                    <li><span>📎</span><a href="#">보도자료_{game.dept}_{game.title.slice(0, 10)}.hwp</a><span className="file_size">(245KB)</span></li>
                    <li><span>📎</span><a href="#">보도자료_{game.dept}_{game.title.slice(0, 10)}.pdf</a><span className="file_size">(312KB)</span></li>
                  </ul>
                </div>

                <div className="view_cont" style={{ fontSize: `${fontSize}px` }}>
                  {!done && settings.timerEnabled && (
                    <span className={`game-timer${timeLeft <= 10 ? ' urgent' : ''}`}>
                      ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                  {paragraphs.map((para, pi) => (
                    <p key={pi}>
                      {para.map((seg, si) =>
                        seg.isTypo ? (
                          <span key={si} className={`typo${found.has(seg.index) ? ' found' : ''}`}
                            onClick={() => handleTypoClick(seg.index)}>{seg.text}</span>
                        ) : (
                          <span key={si}>{seg.text}</span>
                        )
                      )}
                    </p>
                  ))}
                  <div className="game-hint">찾은 오류: <strong>{found.size}</strong> / {targetCount}</div>
                </div>

                {showResult && (
                  <div className="game-result">
                    <div className="result-row">
                      <span className="result-check">✓</span>
                      <span>{found.size}개 발견 &nbsp;·&nbsp; {game.timerSeconds - timeLeft}초 &nbsp;·&nbsp; {found.size * 20}점</span>
                    </div>
                    <div className="result-ranks">
                      <span>오늘 순위 <strong>{myRank?.today ? `#${myRank.today}` : '—'}</strong></span>
                      <span>전체 순위 <strong>{myRank?.all ? `#${myRank.all}` : '—'}</strong></span>
                    </div>
                    <div className="result-nav">
                      <button className="btn-article-nav" onClick={goPrev} disabled={gameIdx === 0}>← 이전 기사</button>
                      <button className="btn-article-nav primary" onClick={goNext} disabled={gameIdx === games.length - 1}>다음 기사 →</button>
                    </div>
                  </div>
                )}

                <div className="atc_bottom">
                  <div className="view_info">
                    <span>👁 조회수 1,234</span>
                    <span>👍 공감 45</span>
                    <span onClick={handleShare} style={{ cursor: 'pointer' }}>↗ 공유</span>
                  </div>
                </div>
                <div className="atc_nav">
                  <button onClick={goPrev} disabled={gameIdx === 0}>← 이전 기사</button>
                  <button onClick={goNext} disabled={gameIdx === games.length - 1}>다음 기사 →</button>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <aside className="as_side">

            {/* 채팅창 */}
            <div className="side_row">
              <div className="side_title">실시간 채팅</div>
              <SideChat />
            </div>

            {/* 인기 게임 목록 */}
            <div className="side_row">
              <div className="side_title">인기 게임</div>
              <ul style={{ listStyle: 'none' }}>
                {games.map((g, i) => (
                  <li key={g.id}
                    onClick={() => selectGame(i)}
                    style={{ borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                    <div style={{ padding: '10px 0', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span className="rank" style={{ background: i < 3 ? '#da101f' : '#69696a', flexShrink: 0 }}>{i + 1}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{
                          fontSize: 13, lineHeight: 1.4,
                          color: gameIdx === i ? '#d41115' : '#1d1d1d',
                          fontWeight: gameIdx === i ? 700 : 500,
                          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        } as React.CSSProperties}>
                          {g.title}
                        </strong>
                        <span style={{ fontSize: 11, color: '#888' }}>{g.dept} · 오류 {g.errorCount}개</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 오늘 순위 */}
            {ranking.length > 0 && (
              <div className="side_row">
                <div className="side_title">오늘 순위</div>
                <ul className="lst">
                  {ranking.slice(0, 5).map((r, i) => (
                    <li key={r.userId}>
                      <a href="#" onClick={e => e.preventDefault()}>
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

      {toast && <div className="toast">{toast}</div>}

      {/* ── 랭킹 모달 ── */}
      {modal === 'ranking' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h2>🏆 랭킹</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-tabs">
              {(['today', 'weekly', 'monthly'] as const).map(t => (
                <button key={t} className={`modal-tab${rankTab === t ? ' active' : ''}`} onClick={() => setRankTab(t)}>
                  {t === 'today' ? '오늘' : t === 'weekly' ? '주간' : '월간'}
                </button>
              ))}
            </div>
            <div className="modal-body">
              {ranking.length === 0
                ? <p className="modal-empty">아직 기록이 없습니다.</p>
                : ranking.slice(0, 10).map((r, i) => (
                  <div key={r.userId} className="modal-row">
                    <span className="modal-rank-num">{i + 1}</span>
                    <span className="modal-rank-name">{r.nickname}</span>
                    <span className="modal-rank-score">{r.points}pt</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ── 내기록 모달 ── */}
      {modal === 'myRecord' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h2>📋 내기록</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              {(() => {
                type H = { title: string; found: number; total: number; time: number; points: number; date: string };
                const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') as H[];
                return hist.length === 0
                  ? <p className="modal-empty">아직 기록이 없습니다.<br />게임을 완료하면 여기에 기록됩니다.</p>
                  : hist.map((h, i) => (
                    <div key={i} className="modal-row">
                      <span className="modal-hist-title">{h.title.slice(0, 22)}{h.title.length > 22 ? '…' : ''}</span>
                      <span className="modal-hist-meta">{h.found}/{h.total} · {h.time}초 · {h.points}pt</span>
                    </div>
                  ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── 설정 모달 ── */}
      {modal === 'settings' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h2>⚙️ 설정</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="setting-row">
                <div className="setting-label">타이머</div>
                <div className="setting-desc">끄면 시간 제한 없이 플레이합니다.</div>
                <div className="toggle">
                  <button className={`toggle-btn${settings.timerEnabled ? ' on' : ''}`}
                    onClick={() => saveSettings({ ...settings, timerEnabled: !settings.timerEnabled })} />
                  <span className="toggle-label">{settings.timerEnabled ? 'ON' : 'OFF'}</span>
                </div>
              </div>
              <div className="setting-row">
                <div className="setting-label">난이도</div>
                <div className="setting-desc">찾아야 할 오류 개수를 설정합니다.</div>
                <div className="diff-options">
                  {([5, 8, 12] as const).map(d => (
                    <button key={d} className={`diff-btn${settings.difficulty === d ? ' active' : ''}`}
                      onClick={() => saveSettings({ ...settings, difficulty: d })}>
                      {d === 5 ? '쉬움(5)' : d === 8 ? '보통(8)' : '어려움(12)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── 사이드 채팅 ── */
function SideChat() {
  const [messages, setMessages] = useState<{ id: number; type: string; nickname?: string; message: string }[]>([]);
  const [input, setInput]       = useState('');
  const [online, setOnline]     = useState(1);
  const wsRef     = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = e => {
      let d: { type?: string; message?: string; nickname?: string; count?: number };
      try { d = JSON.parse(e.data); } catch { return; }

      // 접속자 수
      if (d.type === 'online_count' && d.count != null) { setOnline(d.count); return; }

      const msg = d.message != null ? String(d.message) : null;

      // raw JSON 내용 필터링
      if (msg && msg.trimStart().startsWith('{')) return;

      if (d.type === 'join' && d.nickname) {
        setMessages(p => [...p.slice(-150), { id: Date.now() + Math.random(), type: 'system', message: `${d.nickname}님이 입장했습니다.` }]);
        return;
      }
      if (d.type === 'leave' && d.nickname) {
        setMessages(p => [...p.slice(-150), { id: Date.now() + Math.random(), type: 'system', message: `${d.nickname}님이 퇴장했습니다.` }]);
        return;
      }
      if (d.type === 'system' && msg) {
        setMessages(p => [...p.slice(-150), { id: Date.now() + Math.random(), type: 'system', message: msg }]);
        return;
      }
      if (d.type === 'chat' && msg) {
        setMessages(p => [...p.slice(-150), { id: Date.now() + Math.random(), type: 'chat', nickname: d.nickname, message: msg }]);
        return;
      }
      // 그 외 무시
    };

    ws.onerror = () => {};
    ws.onclose = () => {};
    return () => ws.close();
  }, []);

  function send() {
    const text = input.trim();
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(text); // plain text (Replit 서버 프로토콜)
    setInput('');
  }

  return (
    <div className="side-chat">
      <div className="side-chat-head">
        <span>실시간 채팅</span>
        <span className="side-chat-online">{online}명 접속 중</span>
      </div>
      <div className="side-chat-messages">
        {messages.length === 0 && <span className="side-chat-system" style={{ marginTop: 16 }}>채팅을 시작해보세요!</span>}
        {messages.map(m => (
          <div key={m.id} className="side-chat-msg">
            {m.type === 'system'
              ? <span className="side-chat-system">{m.message}</span>
              : <><span className="side-chat-nick">{m.nickname || '익명'}</span><span className="side-chat-text">{m.message}</span></>
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="side-chat-input">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()} placeholder="메시지 입력..." />
        <button onClick={send}>전송</button>
      </div>
    </div>
  );
}
