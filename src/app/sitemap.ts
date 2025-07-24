import { MetadataRoute } from 'next';
import { getAllChapters } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learn-omni.vercel.app';
  const chapters = getAllChapters();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly', 
      priority: 0.8,
    },
  ];

  // Chapter pages
  const chapterPages: MetadataRoute.Sitemap = chapters.map((chapter) => ({
    url: `${baseUrl}/chapter/${chapter.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Lesson pages  
  const lessonPages: MetadataRoute.Sitemap = chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      url: `${baseUrl}/chapter/${chapter.id}/lesson/${lesson.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...chapterPages, ...lessonPages];
} 