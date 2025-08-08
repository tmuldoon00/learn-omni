'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { filenameToSlug } from '@/lib/rag';

type Citation = { label: string; href?: string };
type Msg = { role: 'user' | 'assistant'; content: string; citations?: Citation[] };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversationIdRef = useRef<string | null>(null);

  useEffect(() => {
    conversationIdRef.current = localStorage.getItem('chatConversationId');
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId: conversationIdRef.current ?? undefined }),
      });
      if (!res.body) throw new Error('No stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let assistantCitations: Citation[] = [];
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n\n')) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const json = JSON.parse(trimmed.slice(5).trim());
          if (json.type === 'token') {
            assistantText += json.value ?? '';
            setMessages((m) => {
              const copy = [...m];
              const idx = copy.findIndex((msg, i) => i === copy.length - 1 && msg.role === 'assistant');
              if (idx >= 0) copy[idx] = { ...copy[idx], content: assistantText } as any;
              return copy;
            });
          } else if (json.type === 'done') {
            if (json.conversationId && json.conversationId !== conversationIdRef.current) {
              conversationIdRef.current = json.conversationId;
              localStorage.setItem('chatConversationId', json.conversationId);
            }
            if (Array.isArray(json.citations)) {
              assistantCitations = json.citations.slice(0, 4).map((c: any) => {
                const label: string = c.filename || c.file_id;
                const slug = label ? safeSlug(label) : null;
                return slug ? { label, href: `/docs/${slug}` } : { label };
              });
            }
          }
        }
      }
      if (assistantCitations.length > 0) {
        setMessages((m) => {
          const copy = [...m];
          const i = copy.findIndex((msg, idx) => idx === copy.length - 1 && msg.role === 'assistant');
          if (i >= 0) copy[i] = { ...copy[i], citations: assistantCitations } as any;
          return copy;
        });
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        aria-label="Open AI Assistant"
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white rounded-full w-12 h-12 shadow hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="w-6 h-6 m-auto" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-[min(92vw,380px)] h-[520px] bg-white border rounded shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <div className="text-sm font-medium">LearnOmni Assistant</div>
            <button aria-label="Close" className="p-1 rounded hover:bg-gray-50" onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {messages.length === 0 ? (
              <div className="text-gray-500 text-sm p-2">Ask a question about the docs…</div>
            ) : (
              <div className="space-y-2">
                {messages.map((m, idx) => (
                  <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <div className={'inline-block rounded px-2 py-1 prose prose-sm prose-slate max-w-[90%] ' + (m.role === 'user' ? 'bg-sky-50 text-sky-900' : 'bg-gray-50 text-gray-900')}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                    {m.role === 'assistant' && m.citations && m.citations.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {m.citations.map((c, i) => (
                          c.href ? (
                            <a key={i} href={c.href} className="text-[11px] px-2 py-0.5 rounded border hover:bg-gray-50">{c.label}</a>
                          ) : (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded border bg-gray-50">{c.label}</span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <button className="border rounded px-3 py-1 text-sm" onClick={() => void sendMessage()} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function safeSlug(label: string): string | null {
  try { return filenameToSlug(label); } catch { return null; }
}


