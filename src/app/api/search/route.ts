import { NextRequest, NextResponse } from 'next/server';
import { searchChapters, preprocessQuery, getQuerySuggestions } from '@/lib/search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const maxResults = parseInt(searchParams.get('maxResults') || '5');
  
  // Return suggestions if no query
  if (!query || query.trim().length === 0) {
    return NextResponse.json({
      suggestions: getQuerySuggestions(),
      results: []
    });
  }

  try {
    // Preprocess query for better matching
    const processedQuery = preprocessQuery(query);
    
    // Perform search
    const results = searchChapters(processedQuery, maxResults);
    
    return NextResponse.json({
      query: query,
      processedQuery: processedQuery,
      results: results,
      totalResults: results.length,
      suggestions: results.length === 0 ? getQuerySuggestions() : []
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, maxResults = 5 } = await request.json();
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        error: 'Query is required'
      }, { status: 400 });
    }

    const processedQuery = preprocessQuery(query);
    const results = searchChapters(processedQuery, maxResults);
    
    return NextResponse.json({
      query: query,
      processedQuery: processedQuery,
      results: results,
      totalResults: results.length,
      suggestions: results.length === 0 ? getQuerySuggestions() : []
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 