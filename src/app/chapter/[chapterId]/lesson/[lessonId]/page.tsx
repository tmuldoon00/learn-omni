import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllChapters, validateChapterAndLesson } from '@/lib/content';
import { generateMetadata as generateSEOMetadata, generateLessonStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';
import { ChapterNav } from '@/components/navigation/chapter-nav';
import { LessonContent } from '@/components/lesson/lesson-content';
import { ProgressTracker } from '@/components/lesson/progress-tracker';

interface LessonPageProps {
  params: Promise<{
    chapterId: string;
    lessonId: string;
  }>;
}

// Generate SEO metadata for each lesson
export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { chapterId, lessonId } = await params;
  
  try {
    const { lesson, chapter } = validateChapterAndLesson(chapterId, lessonId);
    const lessonMeta = lesson.metadata;
    
    return generateSEOMetadata({
      title: `${lessonMeta.title} - ${chapter.title}`,
      description: `${lessonMeta.description} Learn about ${lessonMeta.title} in this ${lessonMeta.duration} video lesson from Chapter ${chapter.order}: ${chapter.title}.`,
      canonical: `/chapter/${chapterId}/lesson/${lessonId}`,
      keywords: [
        lessonMeta.title.toLowerCase(),
        chapter.title.toLowerCase(),
        'omni analytics',
        'data analytics',
        'business intelligence',
        'free course',
        lessonMeta.duration,
        'video lesson'
      ],
      publishedTime: new Date().toISOString(),
    });
  } catch (error) {
    return generateSEOMetadata({
      title: 'Lesson Not Found',
      noIndex: true,
    });
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapterId, lessonId } = await params;
  
  try {
    const { lesson, chapter } = validateChapterAndLesson(chapterId, lessonId);
    const chapters = getAllChapters();
    
    // Generate structured data for the lesson
    const lessonUrl = `/chapter/${chapterId}/lesson/${lessonId}`;
    const lessonStructuredData = generateLessonStructuredData(lesson.metadata, chapter, lessonUrl);
    
    // Generate breadcrumb structured data
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: chapter.title, url: `/chapter/${chapterId}` },
      { name: lesson.metadata.title, url: lessonUrl }
    ];
    const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs);

    return (
      <div className="flex min-h-screen">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([lessonStructuredData, breadcrumbStructuredData])
          }}
        />
        
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

 