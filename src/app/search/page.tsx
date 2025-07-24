import { Suspense } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { SearchResults } from '@/components/search/search-results';
import { TopicBrowser } from '@/components/search/topic-browser';
import { getQuerySuggestions } from '@/lib/search';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

function SearchPageContent({ query }: { query: string }) {
  const suggestions = getQuerySuggestions();
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar 
          className="w-full"
          placeholder="What would you like to learn about Omni Analytics?"
        />
      </div>

      {/* Search Results */}
      {query && (
        <SearchResults 
          query={query}
          maxResults={10}
          showQueryInfo={true}
        />
      )}

      {/* Welcome Message */}
      {!query && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-ka-blue to-blue-600 rounded-lg p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-4">Search the Omni Analytics Course</h1>
            <p className="text-xl opacity-90 mb-6">
              Ask any question and find the most relevant chapters and lessons
            </p>
            <div className="bg-white/10 rounded-lg p-4 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">Try asking questions like:</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• &quot;How do I create interactive dashboards?&quot;</li>
                <li>• &quot;What are AI-powered analytics features?&quot;</li>
                <li>• &quot;How to connect to my database?&quot;</li>
                <li>• &quot;Show me sales and revenue analytics examples&quot;</li>
                <li>• &quot;How does embedded analytics work?&quot;</li>
              </ul>
            </div>
          </div>

          {/* Course Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-2xl font-bold text-ka-blue mb-2">8</div>
              <div className="font-medium text-gray-900">Chapters</div>
              <div className="text-sm text-gray-600">Comprehensive coverage</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-2xl font-bold text-ka-blue mb-2">49</div>
              <div className="font-medium text-gray-900">Video Lessons</div>
              <div className="text-sm text-gray-600">Professional demos</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-2xl font-bold text-ka-blue mb-2">41.3</div>
              <div className="font-medium text-gray-900">Hours Content</div>
              <div className="text-sm text-gray-600">In-depth learning</div>
            </div>
          </div>

          {/* Interactive Popular Topics */}
          <TopicBrowser suggestions={suggestions} />
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';

  return (
    <div className="ka-main">
      <Suspense fallback={
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ka-blue"></div>
        </div>
      }>
        <SearchPageContent query={query} />
      </Suspense>
    </div>
  );
} 