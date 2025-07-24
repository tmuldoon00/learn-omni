'use client';

import Link from 'next/link';
import { ChapterWithDuration } from '@/lib/content';
import { getCourseProgress, getChapterProgress, getLessonProgress } from '@/lib/progress';
import { BookOpen, Circle, Clock, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ChapterNavProps {
  chapters: ChapterWithDuration[];
  currentChapter?: string;
  currentLesson?: string;
}

export function ChapterNav({ chapters, currentChapter, currentLesson }: ChapterNavProps) {
  const [courseProgress, setCourseProgress] = useState({ completed: 0, total: 0, completionPercentage: 0 });
  const [chapterProgresses, setChapterProgresses] = useState<Record<string, {completed: number, total: number}>>({});
  const [lessonProgresses, setLessonProgresses] = useState<Record<string, {visited: boolean, completed: boolean}>>({});
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Update progress on mount and when navigation changes
    const updateProgress = () => {
      const course = getCourseProgress(chapters);
      setCourseProgress(course);

      const chapterProgs: Record<string, {completed: number, total: number}> = {};
      const lessonProgs: Record<string, {visited: boolean, completed: boolean}> = {};

      chapters.forEach(chapter => {
        chapterProgs[chapter.id] = getChapterProgress(chapter.id, chapter.lessons.length);
        
        chapter.lessons.forEach(lesson => {
          lessonProgs[`${chapter.id}-${lesson.id}`] = getLessonProgress(chapter.id, lesson.id);
        });
      });

      setChapterProgresses(chapterProgs);
      setLessonProgresses(lessonProgs);
    };

    updateProgress();
    
    // Listen for storage changes (if user has multiple tabs open)
    const handleStorageChange = () => updateProgress();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [chapters, currentChapter, currentLesson]);

  // Auto-expand current chapter and initially expand first chapter
  useEffect(() => {
    const newExpanded = new Set(expandedChapters);
    
    // Always expand the current chapter
    if (currentChapter) {
      newExpanded.add(currentChapter);
    }
    
    // If no chapters are expanded, expand the first chapter by default
    if (newExpanded.size === 0 && chapters.length > 0) {
      newExpanded.add(chapters[0].id);
    }
    
    setExpandedChapters(newExpanded);
  }, [currentChapter, chapters]);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const getFirstLessonUrl = (chapter: ChapterWithDuration) => {
    const firstLesson = chapter.lessons.sort((a, b) => a.order - b.order)[0];
    return firstLesson ? `/chapter/${chapter.id}/lesson/${firstLesson.id}` : '#';
  };

  return (
    <div className="ka-sidebar h-screen overflow-y-auto">
      <div className="p-4">
        {/* Header - Improved alignment */}
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">LearnOmni.org</span>
              <span className="text-xs text-gray-600 -mt-1">Omni Analytics Course</span>
            </div>
          </Link>
        </div>

        {/* Course Progress */}
        {courseProgress.total > 0 && (
          <div className="mb-6 p-3 bg-gray-50 rounded">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-700 font-medium">Course progress</span>
              <span className="text-gray-500 text-xs">{courseProgress.completionPercentage}%</span>
            </div>
            <div className="ka-progress-bar">
              <div 
                className="ka-progress-fill" 
                style={{width: `${courseProgress.completionPercentage}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {courseProgress.completed} of {courseProgress.total} lessons completed
            </p>
          </div>
        )}

        {/* Chapters */}
        <div className="space-y-1">
          {chapters.map((chapter) => {
            const chapterProg = chapterProgresses[chapter.id] || { completed: 0, total: chapter.lessons.length };
            const isExpanded = expandedChapters.has(chapter.id);
            const isCurrentChapter = currentChapter === chapter.id;
            
            return (
              <div key={chapter.id} className="rounded">
                {/* Chapter Header */}
                                  <div className={`relative rounded transition-colors ${isCurrentChapter ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full flex items-center justify-between p-3 text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm leading-tight">
                          Chapter {chapter.order}: {chapter.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {chapterProg.completed}/{chapterProg.total} lessons • {chapter.estimatedHours}h
                        </div>
                      </div>
                    </div>
                    {chapterProg.completed === chapterProg.total && chapterProg.total > 0 && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                    )}
                  </button>
                </div>

                {/* Chapter Lessons */}
                {isExpanded && (
                  <div className="ml-7 mt-1 space-y-1 pb-2">
                    {chapter.lessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson) => {
                        const lessonProg = lessonProgresses[`${chapter.id}-${lesson.id}`] || { visited: false, completed: false };
                        const isCurrentLesson = currentLesson === lesson.id && isCurrentChapter;
                        
                        return (
                          <Link
                            key={lesson.id}
                            href={`/chapter/${chapter.id}/lesson/${lesson.id}`}
                            className={`flex items-center gap-3 p-2 rounded text-sm transition-all duration-200 ${
                              isCurrentLesson 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md border-2 border-blue-500 font-semibold' 
                                : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {lessonProg.completed ? (
                                <CheckCircle2 className={`w-4 h-4 ${isCurrentLesson ? 'text-white' : 'text-green-500'}`} />
                              ) : lessonProg.visited ? (
                                <div className={`w-4 h-4 border-2 rounded-full ${
                                  isCurrentLesson ? 'border-white bg-white/20' : 'border-blue-600 bg-blue-50'
                                }`}></div>
                              ) : (
                                <Circle className={`w-4 h-4 ${isCurrentLesson ? 'text-white/70' : 'text-gray-400'}`} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium leading-tight ${isCurrentLesson ? 'text-white' : 'text-gray-900'}`}>
                                {lesson.title}
                              </p>
                              <div className={`flex items-center gap-1 mt-0.5 text-xs ${
                                isCurrentLesson ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 