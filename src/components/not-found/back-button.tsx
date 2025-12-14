'use client';

import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Go back to previous page
    </button>
  );
}


