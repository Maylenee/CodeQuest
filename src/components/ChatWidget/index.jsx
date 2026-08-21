import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageCircle, X, Send } from 'lucide-react';

const CID_KEY = 'codelearn_chat_conversation';
const HISTORY_KEY = 'codelearn_chat_history';

const SUGGESTIONS = [
  'Jelaskan perbedaan div dan span',
  'Buat contoh form HTML sederhana',
  'Apa itu CSS Flexbox?',
  'Kenapa kode JavaScript saya tidak jalan?',
];

function nowTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function generateConversationId() {
  const rand =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '')
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `conv_${rand.slice(0, 30)}`;
}

function loadConversationId() {
  let cid = localStorage.getItem(CID_KEY);
  if (!cid) {
    cid = generateConversationId();
    localStorage.setItem(CID_KEY, cid);
  }
  return cid;
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-100)));
}

function getPageContext() {
  const main = document.querySelector('main');
  const node = main || document.body;
  const content = (node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim();
  return {
    title: document.title,
    url: window.location.href,
    content: content.slice(0, 10000),
  };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(loadHistory);
  const [sending, setSending] = useState(false);
  const [streamingReply, setStreamingReply] = useState(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, streamingReply, open]);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (!streamingReply) return;
    const { count, full } = streamingReply;
    if (count >= full.length) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: full, time: streamingReply.time },
      ]);
      setStreamingReply(null);
      return;
    }
    const step = Math.max(1, Math.round(full.length / 260));
    const t = setTimeout(
      () =>
        setStreamingReply((p) =>
          p ? { ...p, count: Math.min(full.length, p.count + step) } : p
        ),
      9
    );
    return () => clearTimeout(t);
  }, [streamingReply]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending || streamingReply) return;
    setInput('');

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: message, time: nowTime() },
    ]);
    setSending(true);

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Makers-Conversation-Id': loadConversationId(),
        },
        body: JSON.stringify({ message, pageContext: getPageContext() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      const reply = data.reply || '...';
      setSending(false);
      setTimeout(
        () => setStreamingReply({ count: 0, full: reply, time: nowTime() }),
        350
      );
    } catch (err) {
      setSending(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Terjadi kesalahan: ${err.message}`,
          time: nowTime(),
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 font-sans">
      {open && (
        <div className="w-[min(380px,calc(100vw-2.5rem))] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-500 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Q — Asisten Belajar</p>
                <p className="text-[11px] text-emerald-100 leading-tight">
                  CodeLearn · Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
              className="p-1 rounded hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 space-y-3">
            {messages.length === 0 && !sending ? (
              <div className="text-center text-slate-400 text-sm py-6">
                <p className="font-semibold text-slate-500">Halo, selamat datang di CodeLearn. 👋</p>
                <p className="mt-1 px-6">Tanya apa saja seputar HTML, CSS, JavaScript, atau topik coding lainnya.</p>
                <div className="flex flex-col gap-2 items-stretch mt-5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="text-left text-[13px] bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 active:scale-[0.98] transition rounded-full px-4 py-2"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 text-sm rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-white self-end ml-auto rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-800 self-start rounded-bl-sm'
                  }`}
                >
                  {m.role === 'user' ? (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  ) : (
                    <div className="chat-md">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  {m.time && (
                    <p
                      className={`text-[10px] mt-1 ${
                        m.role === 'user' ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </p>
                  )}
                </div>
              ))
            )}
            {streamingReply && (
              <div className="max-w-[85%] px-3 py-2 text-sm rounded-2xl bg-white border border-slate-200 text-slate-800 self-start rounded-bl-sm">
                <div className="chat-md">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {streamingReply.full.slice(0, streamingReply.count) || '…'}
                  </ReactMarkdown>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{streamingReply.time}</p>
              </div>
            )}
            {sending && (
              <div className="flex items-center gap-2 text-slate-400 text-sm px-1">
                <span className="flex items-center gap-1">
                  <span className="chat-dot" />
                  <span className="chat-dot" style={{ animationDelay: '150ms' }} />
                  <span className="chat-dot" style={{ animationDelay: '300ms' }} />
                </span>
                Q sedang mengetik
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 px-3 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send();
              }}
              placeholder="Tulis pertanyaan..."
              className="flex-1 text-sm border border-slate-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={sending || streamingReply || !input.trim()}
              aria-label="Kirim"
              className="w-9 h-9 shrink-0 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Bubble */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka chat"
          className="w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}