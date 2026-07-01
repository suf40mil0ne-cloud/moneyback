import { useState, useEffect } from 'react';
import './game.css';

export function GamePage() {
  const [game, setGame] = useState<any>(null);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 게임 데이터 로드 (임시 데이터)
  useEffect(() => {
    const testGame = {
      id: 1,
      title: '2026년 상반기 고용동향 발표',
      date: '2026.7.1.',
      department: '고용노동부',
      originalText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 2.8%로 전년 동기보다 0.3%포인트 하락했다.',
      modifiedText: '고용노동부는 2026년 상반기 고용동향을 발표했다. 취업자 수는 전년 동기 대비 28만 명 증가했으며, 실업률은 3.8%로 전년 동기보다 0.5%포인트 하락했다.',
      errors: [
        { index: 72, char: '3' },  // 2.8% → 3.8%
        { index: 77, char: '5' }   // 0.3% → 0.5%
      ]
    };
    setGame(testGame);
  }, []);

  // 타이머
  useEffect(() => {
    if (isComplete) return;
    
    if (timeLeft === 0) {
      handleGameEnd();
      return;
    }
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isComplete]);

  const handleWordClick = (index: number) => {
    if (isComplete) return;
    
    const isError = game.errors.some((e: any) => e.index === index);
    
    if (isError) {
      const newFound = new Set(found);
      newFound.add(index);
      setFound(newFound);

      if (newFound.size === game.errors.length) {
        handleGameEnd();
      }
    }
  };

  const handleGameEnd = () => {
    setIsComplete(true);
    setShowResult(true);
  };

  if (!game) return <div>로딩중...</div>;

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
          {/* 제목 영역 */}
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

          {/* 게임 섹션 */}
          <div className="game-section">
            <div className="game-instruction">
              <span className="icon">📋</span>
              <span>이 보도자료의 본문을 확인하시고 오류를 찾아주세요.</span>
            </div>

            {/* 텍스트 비교 */}
            <div className="text-comparison">
              {/* 원문 */}
              <div className="original-box">
                <div className="label">【원문】</div>
                <div className="text">{game.originalText}</div>
              </div>

              {/* 게임 본문 */}
              <div className="game-text-box">
                <div className="label-row">
                  <div className="label">【본문 - 오류 찾기】</div>
                  <div className="timer">
                    0:{timeLeft.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="text interactive">
                  {game.modifiedText.split('').map((char: string, i: number) => {
                    const isError = game.errors.some((e: any) => e.index === i);
                    const isFound = found.has(i);
                    
                    return (
                      <span
                        key={i}
                        className={`char ${isError ? 'error-word' : ''} ${
                          isFound ? 'found' : ''
                        }`}
                        onClick={() => handleWordClick(i)}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>

                {/* 진행 상황 */}
                <div className="game-progress">
                  <span className="found">
                    발견: <strong>{found.size}/{game.errors.length}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* 결과 화면 */}
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
                    <span>실시간 순위</span>
                    <strong>#234</strong>
                  </div>
                  <div className="rank-item">
                    <span>오늘 순위</span>
                    <strong>#45</strong>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="btn-next">다음 보도자료</button>
                  <button className="btn-save">점수 저장</button>
                </div>
              </div>
            )}
          </div>

          {/* 하단 정보 */}
          <div className="metadata">
            <div className="meta-divider"></div>
            <span>조회수 1,234</span>
            <span className="separator">|</span>
            <span>공감 45</span>
            <span className="separator">|</span>
            <span>공유 12</span>
          </div>

          {/* 이전/다음 */}
          <div className="nav-posts">
            <button className="btn-prev">← 이전기사</button>
            <button className="btn-next-post">다음기사 →</button>
          </div>
        </main>

        {/* 우측 사이드바 */}
        <aside className="sidebar">
          {/* 정책 NOW */}
          <div className="sidebar-section">
            <h3>정책 NOW</h3>
            <div className="policy-banner">
              <img src="/banner1.jpg" alt="banner" />
            </div>
          </div>

          {/* 오늘의 미션 */}
          <div className="sidebar-section">
            <h3>오늘의 게임 진행도</h3>
            <div className="progress-info">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '33%' }}></div>
              </div>
              <div className="progress-text">3/3 진행</div>
              <div className="progress-score">최고 점수: 240점</div>
            </div>
          </div>

          {/* 실시간 인기뉴스 */}
          <div className="sidebar-section">
            <h3>실시간 인기뉴스</h3>
            <div className="news-list">
              <div className="news-item">
                <span className="rank">1</span>
                <a href="#news1">영화 할인권부터 단기 육아휴직까지…</a>
              </div>
              <div className="news-item">
                <span className="rank">2</span>
                <a href="#news2">자도 자도 피곤하다면? 수면무호흡증…</a>
              </div>
              <div className="news-item">
                <span className="rank">3</span>
                <a href="#news3">7월부터 공공기관 승용차 2부제 해제</a>
              </div>
            </div>
          </div>

          {/* 실시간 채팅 */}
          <ChatWidget />
        </aside>
      </div>
    </div>
  );
}

// 간단한 채팅 위젯
function ChatWidget() {
  const [messages, setMessages] = useState<any[]>([
    { type: 'system', text: '익명_12345님이 입장했습니다.' },
    { type: 'chat', nickname: '익명_12345', text: '재미있네요!' },
    { type: 'chat', nickname: '익명_54321', text: '화이팅!!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { type: 'chat', nickname: '익명_99999', text: input }
      ]);
      setInput('');
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>실시간 채팅</h3>
        <span className="user-count">(5명)</span>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.type === 'system' ? (
              <span className="system-msg">{msg.text}</span>
            ) : (
              <>
                <span className="nickname">{msg.nickname}</span>
                <span className="text">{msg.text}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="메시지 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
