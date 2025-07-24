import { notFound } from 'next/navigation';
import { getAllChapters, validateChapterAndLesson } from '@/lib/content';
import { ChapterNav } from '@/components/navigation/chapter-nav';
import { LessonContent } from '@/components/lesson/lesson-content';
import { ProgressTracker } from '@/components/lesson/progress-tracker';

interface LessonPageProps {
  params: Promise<{
    chapterId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapterId, lessonId } = await params;
  
  try {
    const { lesson } = validateChapterAndLesson(chapterId, lessonId);
    const chapters = getAllChapters();

    return (
      <div className="flex min-h-screen">
        <ChapterNav
          chapters={chapters}
          currentChapter={chapterId}
          currentLesson={lessonId}
        />
        
        <div className="flex-1 overflow-auto">
          <div className="ka-main">
            <ProgressTracker chapterId={chapterId} lessonId={lessonId} />
            <LessonContent lesson={lesson} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.flatMap(chapter =>
    chapter.lessons.map(lesson => ({
      chapterId: chapter.id,
      lessonId: lesson.id,
    }))
  );
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { chapterId, lessonId } = await params;
  
  try {
    const { chapter, lesson } = validateChapterAndLesson(chapterId, lessonId);
    
    return {
      title: `${lesson.metadata.title} - ${chapter.title} - LearnOmni`,
      description: lesson.metadata.description,
    };
  } catch (error) {
    return {
      title: 'Lesson Not Found - LearnOmni',
    };
  }
} 