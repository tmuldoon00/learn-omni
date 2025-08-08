import { NextRequest, NextResponse } from 'next/server';
import { searchChapters, preprocessQuery, getQuerySuggestions } from '@/lib/search';
import { searchDocs } from '@/lib/search-docs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const maxResults = parseInt(searchParams.get('maxResults') || '5');
  const type = (searchParams.get('type') || 'all').toLowerCase();
  
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
    
    // Perform grouped search
    const course = (type === 'all' || type === 'course') ? searchChapters(processedQuery, maxResults) : [];
    const docs = (type === 'all' || type === 'docs') ? searchDocs(processedQuery, maxResults) : [];

    // Backward compatibility when only course requested implicitly
    if (type !== 'all') {
      return NextResponse.json({
        query,
        processedQuery,
        results: type === 'course' ? course : docs,
        totalResults: (type === 'course' ? course : docs).length,
        suggestions: (course.length + docs.length) === 0 ? getQuerySuggestions() : []
      });
    }

    return NextResponse.json({
      query,
      processedQuery,
      course,
      docs,
      summary: { total: course.length + docs.length, courseCount: course.length, docsCount: docs.length },
      suggestions: (course.length + docs.length) === 0 ? getQuerySuggestions() : []
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