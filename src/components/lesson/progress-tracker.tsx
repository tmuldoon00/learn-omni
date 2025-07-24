'use client';

import { useEffect } from 'react';
import { markLessonVisited, markLessonCompleted, getLessonProgress } from '@/lib/progress';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ProgressTrackerProps {
  chapterId: string;
  lessonId: string;
}

export function ProgressTracker({ chapterId, lessonId }: ProgressTrackerProps) {
  const [progress, setProgress] = useState({ visited: false, completed: false });

  useEffect(() => {
    // Mark as visited when component mounts
    markLessonVisited(chapterId, lessonId);
    
    // Update local state
    const currentProgress = getLessonProgress(chapterId, lessonId);
    setProgress(currentProgress);
  }, [chapterId, lessonId]);

  const handleMarkComplete = () => {
    markLessonCompleted(chapterId, lessonId);
    setProgress(prev => ({ ...prev, completed: true }));
    
    // Trigger a storage event to update other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex justify-end mb-4">
      {!progress.completed && (
        <button
          onClick={handleMarkComplete}
          className="ka-btn-secondary flex items-center gap-2 text-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark as Complete
        </button>
      )}
      
      {progress.completed && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>Completed</span>
        </div>
      )}
    </div>
  );
} 