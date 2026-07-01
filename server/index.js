import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import { getGames, getGameById, saveScore, getRankings, addGames } from './db.js';

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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
