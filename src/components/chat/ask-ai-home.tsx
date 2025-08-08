'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AskAiHome() {
  const [q, setQ] = useState('');
  const router = useRouter();

  function submit() {
    const query = q.trim();
    if (!query) return;
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="mt-6 max-w-2xl mx-auto flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Ask the AI about connections, embedding, permissions, charts, AI…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="border rounded px-4 py-2" onClick={submit}>Ask AI</button>
    </div>
  );
}


