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
    const ac = new AbortController();
    const { signal } = ac;
    (window as any).__chatAbortController = ac; // allow Stop button to cancel
    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId: conversationIdRef.current ?? undefined }),
        signal,
      });
      let assistantText = '';
      let assistantCitations: Citation[] = [];
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);

      if (res.body && 'getReader' in res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
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
                const i = copy.findIndex((msg, idx) => idx === copy.length - 1 && msg.role === 'assistant');
                if (i >= 0) copy[i] = { ...copy[i], content: assistantText } as any;
                return copy;
              });
            } else if (json.type === 'done') {
              if (json.conversationId && json.conversationId !== conversationIdRef.current) {
                conversationIdRef.current = json.conversationId;
                localStorage.setItem('chatConversationId', json.conversationId);
              }
              if (Array.isArray(json.citations)) {
                assistantCitations = json.citations.slice(0, 5).map((c: any) => {
                  const label: string = c.filename || c.file_id;
                  const slug = label ? labelToSlug(label) : null;
                  return slug ? { label, href: `/docs/${slug}` } : { label };
                });
              }
            } else if (json.type === 'error') {
              console.error('chat error', json.error);
              throw new Error(json.error || 'server error');
            } else if (json.type === 'status' && json.threadId && json.runId) {
              // can be used for debugging
            }
          }
        }
      } else {
        // Fallback: non-streamed body (text)
        const textBody = await res.text();
        for (const raw of textBody.split('\n\n')) {
          const trimmed = raw.trim();
          if (!trimmed.startsWith('data:')) continue;
          const json = JSON.parse(trimmed.slice(5).trim());
          if (json.type === 'token') assistantText += json.value ?? '';
          if (json.type === 'error') throw new Error(json.error || 'server error');
          if (json.type === 'done' && Array.isArray(json.citations)) {
            assistantCitations = json.citations.slice(0, 5).map((c: any) => {
              const label: string = c.filename || c.file_id;
              const slug = label ? labelToSlug(label) : null;
              return slug ? { label, href: `/docs/${slug}` } : { label };
            });
          }
        }
        setMessages((m) => {
          const copy = [...m];
          const i = copy.findIndex((msg, idx) => idx === copy.length - 1 && msg.role === 'assistant');
          if (i >= 0) copy[i] = { ...copy[i], content: assistantText } as any;
          return copy;
        });
      }
      if (assistantCitations.length > 0) {
        setMessages((m) => {
          const copy = [...m];
          const i = copy.findIndex((msg, idx) => idx === copy.length - 1 && msg.role === 'assistant');
          if (i >= 0) copy[i] = { ...copy[i], citations: assistantCitations } as any;
          return copy;
        });
      }
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
                  {m.role === 'assistant' && m.content.length === 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-gray-300 animate-pulse"></span>
                      <span className="inline-block h-2 w-2 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]"></span>
                      <span className="inline-block h-2 w-2 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]"></span>
                      <span className="text-xs text-gray-400 ml-1">Thinking…</span>
                    </div>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  )}
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
        {loading ? (
          <button
            className="border rounded px-3 py-2"
            onClick={() => {
              try { (window as any).__chatAbortController?.abort(); } catch {}
            }}
          >
            Stop
          </button>
        ) : (
          <button className="border rounded px-3 py-2" onClick={() => void sendMessage()}>
            Send
          </button>
        )}
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


