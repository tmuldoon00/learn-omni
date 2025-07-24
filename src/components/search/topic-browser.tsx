'use client';

interface TopicBrowserProps {
  suggestions: string[];
}

export function TopicBrowser({ suggestions }: TopicBrowserProps) {
  
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
    <div className="bg-gray-50 rounded p-6">
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
                  className="block w-full text-left text-sm text-gray-600 hover:text-ka-blue hover:bg-white px-3 py-2 rounded transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
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
          {suggestions.slice(0, 8).map((suggestion: string) => (
            <button
              key={suggestion}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('q', suggestion);
                window.location.href = url.toString();
              }}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:border-ka-blue hover:text-ka-blue transition-colors hover:shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 