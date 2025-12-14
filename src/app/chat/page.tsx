import { Suspense } from 'react';
import ChatClient from './chat-client';

export const dynamic = 'force-dynamic';

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-8">Loading chat…</div>}>
      <ChatClient />
    </Suspense>
  );
}



