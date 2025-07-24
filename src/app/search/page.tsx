import { Suspense } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { SearchResults } from '@/components/search/search-results';
import { getQuerySuggestions } from '@/lib/search';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

function SearchPageContent({ query }: { query: string }) {
  // Get dynamic suggestions from the search library
  const topicSuggestions = getQuerySuggestions();
  
  // Organize topics by category for better UX
  const topicCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      topics: [
        "How to connect to databases?",
        "What is AI-powered analytics?",
        "Omni platform overview",
        "Basic data modeling"
      ]
    },
    {
      title: "Dashboards & Visualization", 
      icon: "📊",
      topics: [
        "How do I create dashboards?",
        "Advanced SQL and querying",
        "Real-time data visualization",
        "Excel calculations and formulas"
      ]
    },
    {
      title: "Business Applications",
      icon: "💼", 
      topics: [
        "Sales and revenue analytics",
        "Marketing campaign analysis",
        "Customer success metrics",
        "Financial reporting and KPIs"
      ]
    },
    {
      title: "Advanced Features",
      icon: "⚡",
      topics: [
        "Embedding analytics for customers", 
        "dbt integration workflows",
        "Statistical analysis and insights",
        "Sharing reports and collaboration"
      ]
    }
  ];

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
                <li>• "How do I create interactive dashboards?"</li>
                <li>• "What are AI-powered analytics features?"</li>
                <li>• "How to connect to my database?"</li>
                <li>• "Show me sales and revenue analytics examples"</li>
                <li>• "How does embedded analytics work?"</li>
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
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse by Topic</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicCategories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="font-medium text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.set('q', topic);
                          window.location.href = url.toString();
                        }}
                        className="block w-full text-left text-sm text-gray-600 hover:text-ka-blue hover:bg-white px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Quick Searches</h3>
              <div className="flex flex-wrap gap-2">
                {topicSuggestions.slice(0, 8).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('q', suggestion);
                      window.location.href = url.toString();
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-ka-blue hover:text-ka-blue transition-colors hover:shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

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