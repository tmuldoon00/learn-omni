// Client-side progress tracking - no server storage, no personal data

export interface LessonProgress {
  visited: boolean;
  completed: boolean;
  lastVisited?: string;
}

export interface CourseProgress {
  [chapterId: string]: {
    [lessonId: string]: LessonProgress;
  };
}

const PROGRESS_KEY = 'learnomni-progress';

// Get all progress from localStorage
export function getProgress(): CourseProgress {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save progress to localStorage
function saveProgress(progress: CourseProgress) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Ignore localStorage errors (private browsing, etc.)
  }
}

// Mark a lesson as visited
export function markLessonVisited(chapterId: string, lessonId: string) {
  const progress = getProgress();
  
  if (!progress[chapterId]) {
    progress[chapterId] = {};
  }
  
  if (!progress[chapterId][lessonId]) {
    progress[chapterId][lessonId] = { visited: false, completed: false };
  }
  
  progress[chapterId][lessonId].visited = true;
  progress[chapterId][lessonId].lastVisited = new Date().toISOString();
  
  saveProgress(progress);
}

// Mark a lesson as completed
export function markLessonCompleted(chapterId: string, lessonId: string) {
  const progress = getProgress();
  
  if (!progress[chapterId]) {
    progress[chapterId] = {};
  }
  
  if (!progress[chapterId][lessonId]) {
    progress[chapterId][lessonId] = { visited: false, completed: false };
  }
  
  progress[chapterId][lessonId].completed = true;
  progress[chapterId][lessonId].visited = true;
  progress[chapterId][lessonId].lastVisited = new Date().toISOString();
  
  saveProgress(progress);
}

// Get lesson progress
export function getLessonProgress(chapterId: string, lessonId: string): LessonProgress {
  const progress = getProgress();
  return progress[chapterId]?.[lessonId] || { visited: false, completed: false };
}

// Get chapter progress stats
export function getChapterProgress(chapterId: string, lessonCount: number) {
  const progress = getProgress();
  const chapterProgress = progress[chapterId] || {};
  
  const completedCount = Object.values(chapterProgress).filter(p => p.completed).length;
  const visitedCount = Object.values(chapterProgress).filter(p => p.visited).length;
  
  return {
    completed: completedCount,
    visited: visitedCount,
    total: lessonCount,
    completionPercentage: Math.round((completedCount / lessonCount) * 100),
    visitedPercentage: Math.round((visitedCount / lessonCount) * 100),
  };
}

// Get overall course progress
export function getCourseProgress(chapters: Array<{id: string, lessons: Array<{id: string}>}>) {
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  let totalCompleted = 0;
  let totalVisited = 0;
  
  chapters.forEach(chapter => {
    const chapterStats = getChapterProgress(chapter.id, chapter.lessons.length);
    totalCompleted += chapterStats.completed;
    totalVisited += chapterStats.visited;
  });
  
  return {
    completed: totalCompleted,
    visited: totalVisited,
    total: totalLessons,
    completionPercentage: Math.round((totalCompleted / totalLessons) * 100),
    visitedPercentage: Math.round((totalVisited / totalLessons) * 100),
  };
}

// Clear all progress (for privacy)
export function clearProgress() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
} 