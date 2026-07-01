import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useChat } from '../hooks/useChat';

export default function ChatWidget() {
  const { chatMessages } = useAppStore();
  const { sendMessage, online, connected } = useChat();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, open]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col" style={{ height: '320px' }}>
          <div className="bg-[#003a70] text-white px-3 py-2 rounded-t-lg flex justify-between items-center">
            <span className="text-sm font-medium">실시간 채팅</span>
            <span className="text-xs opacity-70">
              {connected ? `접속 ${online}명` : '로컬 모드'}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
            {chatMessages.length === 0 && (
              <p className="text-gray-400 text-center mt-8">첫 번째 메시지를 남겨보세요!</p>
            )}
            {chatMessages.map(msg => (
              <div key={msg.messageId}>
                {msg.type === 'system' ? (
                  <p className="text-gray-400 text-center text-[11px] py-0.5">{msg.message}</p>
                ) : (
                  <div className={`flex gap-1 ${msg.userId === useAppStore.getState().user.userId ? 'flex-row-reverse' : ''}`}>
                    <div className={`max-w-[80%] px-2 py-1 rounded text-[12px] ${
                      msg.userId === useAppStore.getState().user.userId
                        ? 'bg-[#003a70] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.userId !== useAppStore.getState().user.userId && (
                        <p className="text-[10px] opacity-60 mb-0.5">{msg.nickname}</p>
                      )}
                      <p>{msg.message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="border-t p-2 flex gap-1">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="메시지 입력..."
              className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#003a70]"
            />
            <button
              onClick={handleSend}
              className="bg-[#003a70] text-white px-2 py-1 rounded text-xs hover:bg-[#002a50]"
            >
              전송
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-[#003a70] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#002a50] transition-colors text-lg"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}
