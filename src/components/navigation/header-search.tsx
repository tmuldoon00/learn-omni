'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuickSearchResult {
  chapterId: string;
  chapterTitle: string;
  lessonId?: string;
  lessonTitle?: string;
  relevanceScore: number;
}

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<QuickSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      performQuickSearch(query);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  const performQuickSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&maxResults=3`);
      const data = await response.json();
      
      // Transform results for quick display
      const quickResults: QuickSearchResult[] = data.results.flatMap((result: any) => {
        const baseResult = {
          chapterId: result.chapterId,
          chapterTitle: result.chapterTitle,
          relevanceScore: result.relevanceScore
        };

        if (result.matchedLessons.length > 0) {
          return result.matchedLessons.slice(0, 2).map((lesson: any) => ({
            ...baseResult,
            lessonId: lesson.lessonId,
            lessonTitle: lesson.lessonTitle,
            relevanceScore: lesson.relevanceScore
          }));
        }

        return [baseResult];
      }).slice(0, 4);

      setResults(quickResults);
      setIsOpen(quickResults.length > 0);
    } catch (error) {
      console.error('Quick search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder="Search course..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-ka-blue focus:border-ka-blue outline-none text-sm bg-white"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-ka-blue"></div>
            </div>
          )}
        </div>
      </form>

      {/* Quick Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 max-w-sm">
          <div className="p-2">
            {results.map((result, index) => (
              <Link
                key={`${result.chapterId}-${result.lessonId || 'chapter'}-${index}`}
                href={result.lessonId 
                  ? `/chapter/${result.chapterId}/lesson/${result.lessonId}`
                  : `/chapter/${result.chapterId}/lesson/${result.chapterId.split('-')[0]}-01`
                }
                className="block p-2 hover:bg-gray-50 rounded text-sm"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm leading-tight">
                      {result.lessonTitle || result.chapterTitle}
                    </div>
                    {result.lessonTitle && (
                      <div className="text-xs text-gray-500 leading-tight">
                        {result.chapterTitle}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </Link>
            ))}
            
            {/* View All Results Link */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block p-2 text-sm text-ka-blue hover:bg-gray-50 rounded font-medium"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                View all results for "{query}"
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderSearch; 