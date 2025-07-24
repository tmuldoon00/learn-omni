'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, Clock, BookOpen, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import type { SearchResult } from '@/lib/search';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

interface SearchResponse {
  query: string;
  processedQuery: string;
  results: SearchResult[];
  totalResults: number;
  suggestions: string[];
}

export function SearchBar({ onSearch, placeholder = "Ask anything about Omni Analytics...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load initial suggestions
  useEffect(() => {
    loadSuggestions();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      loadSuggestions();
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Handle clicks outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSuggestions = async () => {
    try {
      const response = await fetch('/api/search');
      const data: SearchResponse = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&maxResults=5`);
      const data: SearchResponse = await response.json();
      
      setResults(data.results);
      setSuggestions(data.suggestions);
      setShowResults(true);
      setSelectedIndex(-1);
      
      if (onSearch) {
        onSearch(searchQuery);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    const totalItems = results.length + suggestions.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (selectedIndex < results.length) {
            // Navigate to selected chapter
            const selectedResult = results[selectedIndex];
            if (selectedResult.matchedLessons.length > 0) {
              window.location.href = `/chapter/${selectedResult.chapterId}/lesson/${selectedResult.matchedLessons[0].lessonId}`;
            }
          } else {
            // Use selected suggestion
            const suggestionIndex = selectedIndex - results.length;
            const selectedSuggestion = suggestions[suggestionIndex];
            setQuery(selectedSuggestion);
            performSearch(selectedSuggestion);
          }
        } else {
          performSearch(query);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const formatDuration = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours.toFixed(1)} hrs`;
  };

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
    let highlightedText = text;
    
    queryWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`} ref={resultsRef}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowResults(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ka-blue focus:border-transparent outline-none text-sm bg-white shadow-sm"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ka-blue"></div>
            </div>
          )}
        </div>
      </form>

      {/* Search Results */}
      {showResults && (results.length > 0 || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b">
                Found {results.length} relevant chapter{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((result, index) => (
                <div
                  key={result.chapterId}
                  className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                    selectedIndex === index ? 'bg-gray-50' : ''
                  }`}
                >
                  <Link 
                    href={result.matchedLessons.length > 0 
                      ? `/chapter/${result.chapterId}/lesson/${result.matchedLessons[0].lessonId}`
                      : `/chapter/${result.chapterId}/lesson/${result.chapterId.split('-')[0]}-01`
                    }
                    className="block"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-ka-blue flex-shrink-0" />
                          <h3 className="font-medium text-gray-900 text-sm">
                            {highlightText(result.chapterTitle, query)}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {formatDuration(result.estimatedHours)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {highlightText(result.chapterDescription, query)}
                        </p>
                        
                        {/* Matched Lessons */}
                        {result.matchedLessons.length > 0 && (
                          <div className="space-y-1">
                            {result.matchedLessons.slice(0, 2).map((lesson) => (
                              <div key={lesson.lessonId} className="flex items-center gap-2 text-xs text-gray-500">
                                <ChevronRight className="w-3 h-3" />
                                <span className="font-medium">
                                  {highlightText(lesson.lessonTitle, query)}
                                </span>
                              </div>
                            ))}
                            {result.matchedLessons.length > 2 && (
                              <div className="text-xs text-gray-400 ml-5">
                                +{result.matchedLessons.length - 2} more lessons
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 ml-3">
                        {Math.round(result.relevanceScore)}% match
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                {results.length > 0 ? 'Try these searches' : 'Popular searches'}
              </div>
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left p-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-50 last:border-b-0 ${
                    selectedIndex === results.length + index ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-3 h-3 text-gray-400" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 