import { getAllChapters, getLessonContent, type ChapterMetadata } from './content';

// Search result interface
export interface SearchResult {
  chapterId: string;
  chapterTitle: string;
  chapterDescription: string;
  relevanceScore: number;
  matchedLessons: {
    lessonId: string;
    lessonTitle: string;
    lessonDescription: string;
    relevanceScore: number;
    matchedContent: string[];
  }[];
  estimatedHours: number;
  order: number;
}

// Searchable content interface
export interface SearchableContent {
  chapterId: string;
  chapterTitle: string;
  chapterDescription: string;
  chapterKeywords: string[];
  estimatedHours: number;
  order: number;
  lessons: {
    lessonId: string;
    lessonTitle: string;
    lessonDescription: string;
    content: string;
    keywords: string[];
    concepts: string[];
    businessApplications: string[];
    technicalTerms: string[];
  }[];
}

// Extract business concepts and technical terms from content
export function extractKeyTerms(content: string): {
  keywords: string[];
  concepts: string[];
  businessApplications: string[];
  technicalTerms: string[];
} {
  // Remove markdown syntax for cleaner text analysis
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .toLowerCase();

  // Business application keywords
  const businessKeywords = [
    'revenue', 'roi', 'kpi', 'metrics', 'analytics', 'dashboard', 'reporting',
    'sales', 'marketing', 'customer', 'conversion', 'growth', 'performance',
    'pipeline', 'forecast', 'budget', 'operational', 'strategic', 'executive',
    'collaboration', 'self-service', 'efficiency', 'productivity', 'decision',
    'insights', 'trends', 'patterns', 'segmentation', 'attribution', 'optimization'
  ];

  // Technical keywords
  const technicalKeywords = [
    'sql', 'api', 'database', 'query', 'model', 'schema', 'json', 'csv',
    'data', 'semantic', 'excel', 'calculation', 'aggregation', 'join',
    'filter', 'dimension', 'measure', 'visualization', 'chart', 'graph',
    'embedding', 'integration', 'automation', 'workflow', 'pipeline',
    'snowflake', 'dbt', 'ai', 'machine learning', 'regression', 'statistical'
  ];

  // AI and intelligent features
  const aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'natural language',
    'semantic', 'intelligent', 'automated', 'smart', 'prediction', 'recommendation',
    'optimization', 'pattern recognition', 'nlp', 'conversational', 'chat'
  ];

  // Extract matched terms
  const businessApplications = businessKeywords.filter(keyword => 
    cleanContent.includes(keyword)
  );

  const technicalTerms = [
    ...technicalKeywords.filter(keyword => cleanContent.includes(keyword)),
    ...aiKeywords.filter(keyword => cleanContent.includes(keyword))
  ];

  // Extract key concepts (prominent phrases)
  const concepts = extractConcepts(cleanContent);
  
  // Combine all for general keywords
  const keywords = [...new Set([
    ...businessApplications,
    ...technicalTerms,
    ...concepts
  ])];

  return {
    keywords,
    concepts,
    businessApplications,
    technicalTerms
  };
}

// Extract key concepts from content
export function extractConcepts(content: string): string[] {
  const concepts: string[] = [];
  
  // Look for patterns like "### **Title**" or "## Title"
  const headerMatches = content.match(/#{2,3}\s*\*?\*?([^*\n]+)\*?\*?/g);
  if (headerMatches) {
    concepts.push(...headerMatches.map(match => 
      match.replace(/#{2,3}\s*\*?\*?/, '').replace(/\*?\*?$/, '').trim().toLowerCase()
    ));
  }

  // Look for bullet points with key terms
  const bulletMatches = content.match(/[-*]\s*\*?\*?([^*\n]+)\*?\*?/g);
  if (bulletMatches) {
    concepts.push(...bulletMatches
      .map(match => match.replace(/[-*]\s*\*?\*?/, '').replace(/\*?\*?$/, '').trim().toLowerCase())
      .filter(concept => concept.length > 5 && concept.length < 50)
    );
  }

  return [...new Set(concepts)].slice(0, 20); // Limit to top 20 concepts
}

// Build searchable index
export function buildSearchIndex(): SearchableContent[] {
  const chapters = getAllChapters();
  
  return chapters.map(chapter => {
    const lessons = chapter.lessons.map(lessonMeta => {
      const lessonContent = getLessonContent(chapter.id, lessonMeta.id);
      const content = lessonContent?.content || '';
      const keyTerms = extractKeyTerms(content);
      
      return {
        lessonId: lessonMeta.id,
        lessonTitle: lessonMeta.title,
        lessonDescription: lessonMeta.description,
        content,
        ...keyTerms
      };
    });

    // Aggregate chapter-level keywords from all lessons
    const chapterKeywords = [...new Set([
      ...lessons.flatMap(lesson => lesson.keywords),
      ...chapter.title.toLowerCase().split(' '),
      ...chapter.description.toLowerCase().split(' ')
    ])].filter(keyword => keyword.length > 2);

    return {
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterDescription: chapter.description,
      chapterKeywords,
      estimatedHours: chapter.estimatedHours,
      order: chapter.order,
      lessons
    };
  });
}

// Simple text similarity scoring with proper normalization
export function calculateTextSimilarity(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
  const textWords = text.toLowerCase().split(' ');
  
  if (queryWords.length === 0) return 0;
  
  let matchedWords = 0;
  
  queryWords.forEach(queryWord => {
    // Check if any text word matches this query word (exact or partial)
    const hasMatch = textWords.some(textWord => {
      return textWord === queryWord || // Exact match
             textWord.includes(queryWord) || // Query word is substring
             queryWord.includes(textWord); // Text word is substring
    });
    
    if (hasMatch) {
      matchedWords++;
    }
  });
  
  // Simple ratio: matched words / total query words (always 0-1)
  return matchedWords / queryWords.length;
}

// Enhanced semantic search with business context
export function searchChapters(query: string, maxResults: number = 5): SearchResult[] {
  const searchIndex = buildSearchIndex();
  const queryLower = query.toLowerCase();
  
  // Score each chapter
  const chapterScores = searchIndex.map(chapter => {
    // Direct text matching (each component contributes max points as specified)
    const titleScore = calculateTextSimilarity(query, chapter.chapterTitle) * 25; // Max 25 points
    const descriptionScore = calculateTextSimilarity(query, chapter.chapterDescription) * 15; // Max 15 points
    
    // Keyword matching (simplified and capped)
    const keywordMatches = chapter.chapterKeywords.filter(keyword => 
      queryLower.includes(keyword) || keyword.includes(queryLower)
    );
    const keywordScore = Math.min(keywordMatches.length * 5, 10); // Max 10 points

    // Score lessons within chapter
    const lessonResults = chapter.lessons.map(lesson => {
      const lessonTitleScore = calculateTextSimilarity(query, lesson.lessonTitle) * 20; // Max 20 points
      const lessonDescScore = calculateTextSimilarity(query, lesson.lessonDescription) * 10; // Max 10 points
      const contentScore = calculateTextSimilarity(query, lesson.content) * 8; // Max 8 points
      
      // Keyword matching (capped)
      const lessonKeywordMatches = lesson.keywords.filter(keyword => 
        queryLower.includes(keyword) || keyword.includes(queryLower)
      );
      const lessonKeywordScore = Math.min(lessonKeywordMatches.length * 3, 10); // Max 10 points
      
      // Business application matching (capped)
      const businessMatches = lesson.businessApplications.filter(term => 
        queryLower.includes(term) || term.includes(queryLower)
      );
      const businessScore = Math.min(businessMatches.length * 4, 12); // Max 12 points
      
      // Technical term matching (capped)
      const techMatches = lesson.technicalTerms.filter(term => 
        queryLower.includes(term) || term.includes(queryLower)
      );
      const techScore = Math.min(techMatches.length * 3, 10); // Max 10 points

      const totalLessonScore = lessonTitleScore + lessonDescScore + contentScore + 
                              lessonKeywordScore + businessScore + techScore;

      // Extract relevant content snippets
      const matchedContent = extractRelevantSnippets(lesson.content, query);

      return {
        lessonId: lesson.lessonId,
        lessonTitle: lesson.lessonTitle,
        lessonDescription: lesson.lessonDescription,
        relevanceScore: Math.min(totalLessonScore, 80), // Cap lesson score at 80 points
        matchedContent
      };
    }).filter(lesson => lesson.relevanceScore > 2) // Minimum 2 points to show
     .sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Calculate overall chapter score 
    const avgLessonScore = lessonResults.length > 0 
      ? lessonResults.reduce((sum, lesson) => sum + lesson.relevanceScore, 0) / lessonResults.length
      : 0;
    
    // Limit average lesson score contribution to max 50 points
    const cappedAvgLessonScore = Math.min(avgLessonScore, 50);
    
    const totalChapterScore = titleScore + descriptionScore + keywordScore + cappedAvgLessonScore;

    return {
      chapterId: chapter.chapterId,
      chapterTitle: chapter.chapterTitle,
      chapterDescription: chapter.chapterDescription,
      relevanceScore: Math.min(Math.round(totalChapterScore), 100), // Hard cap at 100%
      matchedLessons: lessonResults.slice(0, 3), // Top 3 lessons per chapter
      estimatedHours: chapter.estimatedHours,
      order: chapter.order
    };
  });

  // Filter and sort results
  const filteredResults = chapterScores
    .filter(result => result.relevanceScore > 5) // Minimum 5% relevance to show
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);

  // Ensure final scores are capped at 100%
  return filteredResults.map(result => ({
    ...result,
    relevanceScore: Math.min(result.relevanceScore, 100), // Final safety cap
    matchedLessons: result.matchedLessons.map(lesson => ({
      ...lesson,
      relevanceScore: Math.min(Math.round(lesson.relevanceScore), 100) // Final safety cap for lessons
    }))
  }));
}

// Extract relevant content snippets
export function extractRelevantSnippets(content: string, query: string, maxSnippets: number = 3): string[] {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
  const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 20);
  
  const scoredSnippets = sentences.map(sentence => {
    const sentenceLower = sentence.toLowerCase();
    const score = queryWords.reduce((acc, word) => {
      return acc + (sentenceLower.includes(word) ? 1 : 0);
    }, 0);
    
    return { sentence: sentence.trim(), score };
  });
  
  return scoredSnippets
    .filter(snippet => snippet.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSnippets)
    .map(snippet => snippet.sentence);
}

// Predefined query suggestions based on common topics
export function getQuerySuggestions(): string[] {
  return [
    "How do I create dashboards?",
    "What is AI-powered analytics?",
    "How to connect to databases?",
    "Excel calculations and formulas",
    "Embedding analytics for customers",
    "Sales and revenue analytics",
    "Data modeling best practices",
    "Sharing reports and collaboration",
    "Advanced SQL and querying",
    "Real-time data visualization",
    "Marketing campaign analysis",
    "dbt integration workflows",
    "Statistical analysis and insights",
    "Customer success metrics",
    "Financial reporting and KPIs"
  ];
}

// Smart query preprocessing
export function preprocessQuery(query: string): string {
  // Handle common variations and synonyms
  const synonyms: Record<string, string[]> = {
    'dashboard': ['dashboards', 'reports', 'reporting', 'visualization', 'charts'],
    'ai': ['artificial intelligence', 'machine learning', 'intelligent', 'smart'],
    'database': ['data source', 'connection', 'sql', 'warehouse'],
    'analytics': ['analysis', 'insights', 'metrics', 'data'],
    'excel': ['spreadsheet', 'calculations', 'formulas', 'functions'],
    'sharing': ['collaboration', 'embed', 'embedding', 'publish'],
    'sales': ['revenue', 'pipeline', 'crm', 'leads', 'deals'],
    'marketing': ['campaigns', 'attribution', 'conversion', 'acquisition']
  };

  let processedQuery = query.toLowerCase();
  
  // Expand query with synonyms
  Object.entries(synonyms).forEach(([key, values]) => {
    if (values.some(synonym => processedQuery.includes(synonym))) {
      processedQuery += ` ${key}`;
    }
  });

  return processedQuery;
} 