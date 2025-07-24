// Google Analytics 4 configuration
// To enable analytics, set your GA4 measurement ID in environment variables

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Analytics - pageview
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// Google Analytics - events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track lesson completion
export const trackLessonComplete = (chapterId: string, lessonId: string, lessonTitle: string) => {
  event({
    action: 'lesson_complete',
    category: 'engagement',
    label: `${chapterId}/${lessonId}: ${lessonTitle}`,
  });
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement', 
    label: query,
    value: resultsCount,
  });
};

// Track chapter navigation
export const trackChapterView = (chapterId: string, chapterTitle: string) => {
  event({
    action: 'chapter_view',
    category: 'navigation',
    label: `${chapterId}: ${chapterTitle}`,
  });
}; 