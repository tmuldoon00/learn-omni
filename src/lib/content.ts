import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const chaptersDirectory = path.join(contentDirectory, 'chapters');

export interface LessonMetadata {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoMinutes: number; // New field for systematic duration tracking
  videoId?: string;
  order: number;
}

export interface ChapterMetadata {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonMetadata[];
  // Removed estimatedHours - now calculated dynamically
}

export interface ChapterWithDuration extends ChapterMetadata {
  estimatedHours: number; // Calculated dynamically from video minutes
}

export interface LessonContent {
  metadata: LessonMetadata;
  content: string;
}

// Utility function to parse duration strings like "45 min" into minutes
function parseDurationToMinutes(duration: string): number {
  const match = duration.match(/(\d+)\s*min/);
  return match ? parseInt(match[1], 10) : 0;
}

// Calculate total minutes for a chapter
function calculateChapterMinutes(lessons: LessonMetadata[]): number {
  return lessons.reduce((total, lesson) => total + (lesson.videoMinutes || 0), 0);
}

// Convert minutes to hours (rounded to 1 decimal place)
function minutesToHours(minutes: number): number {
  return Math.round((minutes / 60) * 10) / 10;
}

// Validation helper
function validateContent<T>(item: T | null, type: string, id: string): T {
  if (!item) {
    throw new Error(`${type} not found: ${id}`);
  }
  return item;
}

// Get all chapters with their lessons and calculated durations
export function getAllChapters(): ChapterWithDuration[] {
  if (!fs.existsSync(chaptersDirectory)) {
    return [];
  }

  const chapterDirs = fs.readdirSync(chaptersDirectory).filter(item => {
    return fs.statSync(path.join(chaptersDirectory, item)).isDirectory();
  });

  const chapters = chapterDirs.map((chapterDir) => {
    const chapterPath = path.join(chaptersDirectory, chapterDir);
    const metadataPath = path.join(chapterPath, 'index.json');
    
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as ChapterMetadata;
      
      // Calculate dynamic duration from video minutes
      const totalMinutes = calculateChapterMinutes(metadata.lessons);
      const estimatedHours = minutesToHours(totalMinutes);
      
      return {
        ...metadata,
        estimatedHours
      } as ChapterWithDuration;
    }
    
    throw new Error(`Chapter metadata not found: ${chapterDir}`);
  });
  
  return chapters.sort((a, b) => a.order - b.order);
}

export function getChapterById(chapterId: string): ChapterWithDuration | null {
  const chapters = getAllChapters();
  return chapters.find(chapter => chapter.id === chapterId) || null;
}

export function getLessonContent(chapterId: string, lessonId: string): LessonContent | null {
  const lessonPath = path.join(chaptersDirectory, chapterId, 'lessons', `${lessonId}.md`);
  
  if (!fs.existsSync(lessonPath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(lessonPath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    metadata: data as LessonMetadata,
    content,
  };
}

export function getAllLessonsCount(): number {
  const chapters = getAllChapters();
  return chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
}

export function getTotalCourseHours(): number {
  const chapters = getAllChapters();
  const totalMinutes = chapters.reduce((total, chapter) => {
    return total + calculateChapterMinutes(chapter.lessons);
  }, 0);
  return minutesToHours(totalMinutes);
}

export function getTotalCourseMinutes(): number {
  const chapters = getAllChapters();
  return chapters.reduce((total, chapter) => {
    return total + calculateChapterMinutes(chapter.lessons);
  }, 0);
}

// Content validation helpers
export function validateChapterAndLesson(chapterId: string, lessonId: string) {
  const chapter = validateContent(getChapterById(chapterId), 'Chapter', chapterId);
  const lesson = validateContent(getLessonContent(chapterId, lessonId), 'Lesson', lessonId);
  
  // Verify lesson exists in chapter
  const lessonExists = chapter.lessons.some(l => l.id === lessonId);
  if (!lessonExists) {
    throw new Error(`Lesson ${lessonId} not found in chapter ${chapterId}`);
  }
  
  return { chapter, lesson };
} 