'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, Star, TrendingUp, Users } from 'lucide-react';
import type { SearchResult } from '@/lib/search';

interface SearchResultsProps {
  query: string;
  maxResults?: number;
  showQueryInfo?: boolean;
}

interface SearchResponse {
  query: string;
  processedQuery: string;
  results: SearchResult[];
  totalResults: number;
  suggestions: string[];
}

export function SearchResults({ query, maxResults = 8, showQueryInfo = true }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processedQuery, setProcessedQuery] = useState('');

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    }
  }, [query, maxResults]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}`);
      const data: SearchResponse = await response.json();
      
      setResults(data.results);
      setSuggestions(data.suggestions);
      setProcessedQuery(data.processedQuery);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
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

  const getRelevanceIcon = (score: number) => {
    if (score > 75) return <Star className="w-4 h-4 text-yellow-500" />;
    if (score > 50) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <Users className="w-4 h-4 text-blue-500" />;
  };

  const getRelevanceLabel = (score: number) => {
    if (score > 75) return 'Highly Relevant';
    if (score > 50) return 'Very Relevant';
    return 'Relevant';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ka-blue"></div>
        <span className="ml-3 text-gray-600">Searching...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Query Information */}
      {showQueryInfo && query && (
        <div className="bg-gray-50 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Search Results for "{query}"
          </h2>
          {processedQuery !== query.toLowerCase() && (
            <p className="text-sm text-gray-600">
              Expanded search: <span className="font-mono bg-white px-2 py-1 rounded text-xs">{processedQuery}</span>
            </p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Found {results.length} relevant chapter{results.length !== 1 ? 's' : ''} in the Omni Analytics course
          </p>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={result.chapterId} className="bg-white border border-gray-200 rounded p-6 hover:shadow-md transition-shadow">
              {/* Chapter Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-ka-blue flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {highlightText(result.chapterTitle, query)}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Chapter {result.order}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {highlightText(result.chapterDescription, query)}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(result.estimatedHours)}
                    </div>
                    <div className="flex items-center gap-1">
                      {getRelevanceIcon(result.relevanceScore)}
                      {getRelevanceLabel(result.relevanceScore)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Lessons */}
              {result.matchedLessons.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Most Relevant Lessons:</h4>
                  <div className="space-y-3">
                    {result.matchedLessons.map((lesson) => (
                      <div key={lesson.lessonId} className="bg-gray-50 rounded p-4">
                        <Link 
                          href={`/chapter/${result.chapterId}/lesson/${lesson.lessonId}`}
                          className="block hover:bg-gray-100 rounded transition-colors p-2 -m-2"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <ChevronRight className="w-4 h-4 text-ka-blue" />
                                <h5 className="font-medium text-gray-900">
                                  {highlightText(lesson.lessonTitle, query)}
                                </h5>
                              </div>
                              <p className="text-sm text-gray-600 ml-6">
                                {highlightText(lesson.lessonDescription, query)}
                              </p>
                              
                              {/* Content Snippets */}
                              {lesson.matchedContent.length > 0 && (
                                <div className="ml-6 mt-2 space-y-1">
                                  {lesson.matchedContent.slice(0, 2).map((snippet, snippetIndex) => (
                                    <div key={snippetIndex} className="text-xs text-gray-500 bg-white p-2 rounded border-l-2 border-ka-blue">
                                      {highlightText(snippet.substring(0, 150) + (snippet.length > 150 ? '...' : ''), query)}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 ml-3">
                              {Math.round(lesson.relevanceScore)}% match
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Learning Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  href={result.matchedLessons.length > 0 
                    ? `/chapter/${result.chapterId}/lesson/${result.matchedLessons[0].lessonId}`
                    : `/chapter/${result.chapterId}/lesson/${result.chapterId.split('-')[0]}-01`
                  }
                  className="inline-flex items-center gap-2 bg-ka-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Start Learning
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : query ? (
        /* No Results */
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded p-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No chapters found for "{query}"
            </h3>
            <p className="text-gray-600 mb-4">
              Try rephrasing your question or using different keywords.
            </p>
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Try these popular topics:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.slice(0, 6).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => window.location.href = `/search?q=${encodeURIComponent(suggestion)}`}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:border-ka-blue hover:text-ka-blue transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults; 