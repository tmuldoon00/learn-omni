import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const siteUrl = "https://learn-omni.vercel.app";
const siteName = "LearnOmni.org";
const defaultDescription = "Learn data analytics with our comprehensive 10.2-hour course covering Omni platform features, AI-powered querying, dashboard creation, and real-world applications.";

export function generateMetadata({
  title = "Master Omni Analytics",
  description = defaultDescription,
  keywords = [
    "omni analytics",
    "data analytics course", 
    "business intelligence",
    "dashboard creation",
    "data visualization",
    "ai analytics",
    "free online course",
    "data modeling",
    "sql training"
  ],
  canonical,
  ogImage = "/og-image.png",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author = "LearnOmni Team"
}: SEOProps = {}): Metadata {
  
  const fullTitle = title.includes("LearnOmni") ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    applicationName: "LearnOmni",
    
    robots: noIndex ? {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@learnomni',
      site: '@learnomni',
    },

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },

    category: 'education',
  };
}

// Structured data generators
export function generateCourseStructuredData(chapters: any[], totalHours: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Master Omni Analytics',
    description: defaultDescription,
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    url: siteUrl,
    courseCode: 'OMNI-101',
    educationalLevel: 'Beginner to Advanced',
    teaches: [
      'Data Analytics',
      'Business Intelligence', 
      'Dashboard Creation',
      'Data Visualization',
      'AI-Powered Analytics',
      'SQL Querying',
      'Data Modeling'
    ],
    timeRequired: `PT${Math.floor(totalHours)}H${Math.round((totalHours % 1) * 60)}M`,
    numberOfCredits: 0,
    isAccessibleForFree: true,
    inLanguage: 'en',
    availableLanguage: 'en',
    learningResourceType: 'Course',
    interactivityType: 'mixed',
    educationalUse: 'instruction',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${Math.floor(totalHours)}H${Math.round((totalHours % 1) * 60)}M`,
    },
    coursePrerequisites: 'Basic computer skills',
    syllabusSections: chapters.map((chapter, index) => ({
      '@type': 'Syllabus',
      name: chapter.title,
      description: chapter.description,
      position: index + 1,
      timeRequired: `PT${Math.floor(chapter.estimatedHours)}H${Math.round((chapter.estimatedHours % 1) * 60)}M`,
    }))
  };
}

export function generateLessonStructuredData(
  lesson: any, 
  chapter: any, 
  lessonUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.title,
    description: lesson.description,
    url: `${siteUrl}${lessonUrl}`,
    learningResourceType: 'lesson',
    educationalLevel: 'beginner',
    timeRequired: lesson.duration,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      name: 'Master Omni Analytics',
      url: siteUrl,
    },
    teaches: lesson.title,
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    isAccessibleForFree: true,
    ...(lesson.videoId && {
      video: {
        '@type': 'VideoObject',
        name: lesson.title,
        description: lesson.description,
        embedUrl: `https://www.youtube.com/embed/${lesson.videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${lesson.videoId}/maxresdefault.jpg`,
        duration: lesson.duration,
        uploadDate: new Date().toISOString(),
      }
    })
  };
}

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`,
    }))
  };
} 