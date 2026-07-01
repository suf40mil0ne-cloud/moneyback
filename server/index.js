import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';

const PORT = process.env.PORT || 3001;
const wss = new WebSocketServer({ port: PORT });

// { ws, userId, nickname }
const clients = new Map();

function broadcast(data, excludeWs = null) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client !== excludeWs && client.readyState === 1) {
      client.send(msg);
    }
  });
}

function broadcastAll(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg);
  });
}

wss.on('connection', (ws) => {
  const connId = randomUUID();
  clients.set(ws, { connId, userId: null, nickname: null });

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    if (data.type === 'join') {
      const info = clients.get(ws);
      info.userId = data.userId;
      info.nickname = data.nickname;

      // 입장 시 현재 접속자 수 전송
      const systemMsg = {
        messageId: randomUUID(),
        userId: 'system',
        nickname: 'system',
        message: `${data.nickname}님이 입장했습니다.`,
        timestamp: new Date().toISOString(),
        type: 'system',
      };
      broadcastAll(systemMsg);
      broadcastAll({ type: 'online_count', count: wss.clients.size });
    }

    if (data.type === 'chat') {
      const info = clients.get(ws);
      if (!info?.userId) return;
      const chatMsg = {
        messageId: randomUUID(),
        userId: info.userId,
        nickname: info.nickname,
        message: data.message.slice(0, 200),
        timestamp: new Date().toISOString(),
        type: 'chat',
      };
      broadcastAll(chatMsg);
    }
  });

  ws.on('close', () => {
    const info = clients.get(ws);
    if (info?.nickname) {
      broadcastAll({
        messageId: randomUUID(),
        userId: 'system',
        nickname: 'system',
        message: `${info.nickname}님이 퇴장했습니다.`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });
    }
    clients.delete(ws);
    broadcastAll({ type: 'online_count', count: wss.clients.size });
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
