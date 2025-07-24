import Link from 'next/link';
import { getAllChapters, getAllLessonsCount, getTotalCourseHours } from '@/lib/content';
import { BookOpen, PlayCircle, Clock, CheckCircle2, ArrowRight, Users } from 'lucide-react';
import { SearchBar } from '@/components/search/search-bar';
import { formatDuration } from '@/lib/utils';

export default function HomePage() {
  const chapters = getAllChapters();
  const totalLessons = getAllLessonsCount();
  const totalHours = getTotalCourseHours(); // Now calculated dynamically from video minutes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">LearnOmni.org</h1>
          </div>
          <Link 
            href="https://github.com/yourusername/learnomni" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Open Source
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master Omni Analytics
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn data analytics from the ground up. Comprehensive course covering everything 
            from basic concepts to advanced techniques.
          </p>
          
          {/* Course Stats */}
          <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{totalHours.toFixed(1)} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Free & Open Source</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link
              href={`/chapter/${chapters[0]?.id}/lesson/${chapters[0]?.lessons[0]?.id}`}
              className="bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning
            </Link>
            <Link
              href="/search"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors"
            >
              Browse Topics
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder="Search for topics, lessons, or concepts..." />
          </div>
        </div>

        {/* Course Overview */}
        <div className="pb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Eight comprehensive chapters taking you from beginner to advanced Omni Analytics mastery
            </p>
          </div>

          {/* Chapter Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                href={`/chapter/${chapter.id}/lesson/${chapter.lessons[0]?.id}`}
                className="bg-white rounded border border-gray-200 p-6 hover:shadow-md transition-shadow group"
              >
                <div className="text-sm font-medium text-blue-600 mb-2">
                  Chapter {chapter.order}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {chapter.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{chapter.lessons.length} lessons</span>
                  <span>{formatDuration(chapter.estimatedHours)}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* What You&apos;ll Learn */}
          <div className="bg-white rounded border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              What You&apos;ll Learn
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Data connection and modeling",
                "AI-powered querying and analysis", 
                "Advanced visualizations and dashboards",
                "Embedded analytics and sharing",
                "Enterprise-grade security and governance",
                "Real-world business applications"
              ].map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="pb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of learners mastering data analytics with Omni. 
              Start your journey today with our comprehensive, hands-on course.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={`/chapter/${chapters[0]?.id}/lesson/${chapters[0]?.lessons[0]?.id}`}
                className="bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Start Chapter 1
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/search"
                className="border border-white/20 text-white px-6 py-3 rounded font-medium hover:bg-white/10 transition-colors"
              >
                Explore Topics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-4">
            Open source course for learning Omni Analytics
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/contribute" className="text-blue-600 hover:text-blue-700 transition-colors">
              Contribute
            </Link>
            <Link href="https://github.com/yourusername/learnomni" className="text-gray-600 hover:text-gray-900 transition-colors">
              GitHub
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-gray-900 transition-colors">
              Search
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

