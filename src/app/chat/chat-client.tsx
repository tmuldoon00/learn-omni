"use client";

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { filenameToSlug } from '@/lib/rag';

type Citation = { label: string; href?: string };
type Msg = { role: 'user' | 'assistant'; content: string; citations?: Citation[] };

export default function ChatClient() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversationIdRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    conversationIdRef.current = localStorage.getItem('chatConversationId');
  }, []);

  useEffect(() => {
    const q = searchParams?.get('q');
    if (!bootstrappedRef.current && q && q.trim()) {
      bootstrappedRef.current = true;
      setInput(q);
      setTimeout(() => {
        void sendMessage(q);
      }, 0);
    }
  }, [searchParams]);

  async function sendMessage(forced?: string) {
    const text = (forced ?? input).trim();
    if (!text) return;
    if (!forced) setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId: conversationIdRef.current ?? undefined }),
      });
      const data = await res.json();
      if (data?.conversationId && data.conversationId !== conversationIdRef.current) {
        conversationIdRef.current = data.conversationId;
        localStorage.setItem('chatConversationId', data.conversationId);
      }
      const answer: string = data?.answer ?? '(no answer)';
      const citationsRaw = Array.isArray(data?.citations) ? data.citations : [];
      const citations: Citation[] = citationsRaw.slice(0, 5).map((c: any) => {
        const label: string = c.filename || c.file_id;
        const slug = label ? labelToSlug(label) : null;
        return slug ? { label, href: `/docs/${slug}` } : { label };
      });
      setMessages((m) => [...m, { role: 'assistant', content: answer, citations }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">LearnOmni Assistant</h1>
      <div className="border rounded p-0 h-[60vh] overflow-y-auto bg-white">
        {messages.length === 0 ? (
          <div className="text-gray-500 p-6">
            Ask a question about the docs to get started.
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {[
                'How do I do a filter in Omni?',
                'How do I embed dashboards externally?',
                'How do permissions and user groups work?',
              ].map((ex) => (
                <button key={ex} className="border rounded px-2 py-1 hover:bg-gray-50" onClick={() => void sendMessage(ex)}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={
                  'inline-block rounded px-3 py-2 max-w-full prose prose-sm prose-slate ' +
                  (m.role === 'user' ? 'bg-sky-50 text-sky-900' : 'bg-gray-50 text-gray-900')
                }>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
                {m.role === 'assistant' && m.citations && m.citations.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {m.citations.map((c, i) => (
                      c.href ? (
                        <a key={i} href={c.href} className="text-xs px-2 py-1 rounded border hover:bg-gray-50">{c.label}</a>
                      ) : (
                        <span key={i} className="text-xs px-2 py-1 rounded border bg-gray-50">{c.label}</span>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-2 sticky bottom-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-2 border rounded">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask about connections, embedding, permissions, charts, AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
        />
        <button className="border rounded px-3 py-2" onClick={() => void sendMessage()} disabled={loading}>
          {loading ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  );
}

function labelToSlug(label: string): string | null {
  try {
    return filenameToSlug(label);
  } catch {
    return null;
  }
}


