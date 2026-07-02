import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getGames, getGameById, saveScore, getRankings, addGames } from './db.js';
import { startScheduler, runPopularScraper, runScraper } from './scraper.js';

const __dir = dirname(fileURLToPath(import.meta.url));
const ARTICLES_FILE = join(__dir, 'data', 'articles.json');
const POPULAR_FILE  = join(__dir, 'data', 'popular_news.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── REST API ───────────────────────────────────────────

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/games/today', (_, res) => {
  const games = getGames().filter(g => g.isActive);
  res.json(games);
});

app.get('/api/games/:id', (req, res) => {
  const game = getGameById(req.params.id);
  if (!game) return res.status(404).json({ error: 'Not found' });
  res.json(game);
});

app.post('/api/scores', (req, res) => {
  const { userId, nickname, gameId, foundCount, totalErrors, timeSpent, points } = req.body;
  if (!userId || !gameId) return res.status(400).json({ error: 'Missing fields' });
  const rankings = saveScore({ userId, nickname: nickname || userId, gameId, foundCount, totalErrors, timeSpent, points });
  res.json({ ok: true, rankings });
});

app.get('/api/rankings', (req, res) => {
  const { userId } = req.query;
  res.json(getRankings(userId));
});

app.post('/api/games', (req, res) => {
  const added = addGames(req.body);
  res.json({ added });
});

// 수동 스크래핑 테스트: 브라우저에서 GET /api/scrape/test
app.get('/api/scrape/test', async (_, res) => {
  try {
    const result = await runScraper();
    res.json({ ok: true, added: result.length, articles: result.map(a => ({ newsId: a.newsId, title: a.title, errorCount: a.errorCount })) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/api/popular-news', (_, res) => {
  try {
    if (!existsSync(POPULAR_FILE)) return res.json([]);
    res.json(JSON.parse(readFileSync(POPULAR_FILE, 'utf-8')));
  } catch { res.json([]); }
});

app.get('/api/articles/today', (_, res) => {
  try {
    if (!existsSync(ARTICLES_FILE)) return res.json([]);
    const all = JSON.parse(readFileSync(ARTICLES_FILE, 'utf-8'));
    const today = new Date().toISOString().slice(0, 10);
    const todayArticles = all.filter(a => a.scrapedAt === today && a.isActive);
    res.json(todayArticles.length > 0 ? todayArticles : all.filter(a => a.isActive).slice(-5));
  } catch { res.json([]); }
});

// ─── WebSocket ───────────────────────────────────────────

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
const clients = new Map();

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

wss.on('connection', (ws) => {
  clients.set(ws, { userId: null, nickname: null });

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    if (data.type === 'join') {
      clients.get(ws).userId = data.userId;
      clients.get(ws).nickname = data.nickname;
      broadcast({
        messageId: randomUUID(), userId: 'system', nickname: 'system',
        message: `${data.nickname}님이 입장했습니다.`,
        timestamp: new Date().toISOString(), type: 'system',
      });
      broadcast({ type: 'online_count', count: wss.clients.size });
    }

    if (data.type === 'chat') {
      const info = clients.get(ws);
      if (!info?.userId) return;
      broadcast({
        messageId: randomUUID(), userId: info.userId, nickname: info.nickname,
        message: String(data.message).slice(0, 200),
        timestamp: new Date().toISOString(), type: 'chat',
      });
    }
  });

  ws.on('close', () => {
    const info = clients.get(ws);
    if (info?.nickname) {
      broadcast({
        messageId: randomUUID(), userId: 'system', nickname: 'system',
        message: `${info.nickname}님이 퇴장했습니다.`,
        timestamp: new Date().toISOString(), type: 'system',
      });
    }
    clients.delete(ws);
    broadcast({ type: 'online_count', count: wss.clients.size });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startScheduler();

  // 서버 시작 시 즉시 1회 스크래핑
  runScraper().then(result => {
    console.log('✅ 시작 스크래핑 결과:', result.length, '개 기사');
    result.forEach(a => console.log(' -', a.title));
  }).catch(err => {
    console.error('❌ 시작 스크래핑 실패:', err.message);
  });
  runPopularScraper().catch(err => console.error('❌ 인기뉴스 실패:', err.message));
});
