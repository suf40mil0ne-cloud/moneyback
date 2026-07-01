import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ChatMessage } from '../types';

const WS_URL = import.meta.env.VITE_WS_URL || null;

export function useChat() {
  const { user, addChatMessage } = useAppStore();
  const wsRef = useRef<WebSocket | null>(null);
  const [online, setOnline] = useState(1);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!WS_URL) return; // 서버 없으면 로컬 모드

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: 'join', userId: user.userId, nickname: user.nickname }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'online_count') {
        setOnline(data.count);
      } else if (data.type === 'chat' || data.type === 'system') {
        addChatMessage(data as ChatMessage);
      }
    };

    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, []);

  function sendMessage(message: string) {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'chat', message }));
    } else {
      // 로컬 모드: 자기 메시지만 추가
      addChatMessage({
        messageId: `local_${Date.now()}`,
        userId: user.userId,
        nickname: user.nickname,
        message,
        timestamp: new Date().toISOString(),
        type: 'chat',
      });
    }
  }

  return { sendMessage, online, connected };
}
