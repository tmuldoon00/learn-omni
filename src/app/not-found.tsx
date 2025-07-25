import Link from 'next/link';
import { Home, Search, BookOpen, ArrowLeft, RotateCcw } from 'lucide-react';
import { getAllChapters } from '@/lib/content';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Client component for the back button
function BackButton() {
  'use client';

  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Go back to previous page
    </button>
  );
}

export default function NotFound() {
  const chapters = getAllChapters();
  const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
  const randomLesson = randomChapter.lessons[Math.floor(Math.random() * randomChapter.lessons.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 animate-pulse">
            404
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Oops! This page went on vacation 🏖️
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Don't worry, even the best analytics sometimes need a break. Let's get you back to learning!
          </p>
        </div>

        {/* Fun animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-bounce flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Helpful suggestions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Go Home */}
          <Link
            href="/"
            className="group bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center mb-3">
              <Home className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Go Home</h3>
            <p className="text-sm text-gray-600">Return to the course homepage and start your analytics journey</p>
          </Link>

          {/* Search */}
          <Link
            href="/search"
            className="group bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center mb-3">
              <Search className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Search Course</h3>
            <p className="text-sm text-gray-600">Find the specific lesson or topic you're looking for</p>
          </Link>
        </div>

        {/* Random lesson suggestion */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5" />
            How about trying this lesson instead?
          </h3>
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="text-sm opacity-90">Chapter {randomChapter.order}: {randomChapter.title}</div>
            <div className="font-semibold text-lg">{randomLesson.title}</div>
            <div className="text-sm opacity-90 mt-1">{randomLesson.description}</div>
            <div className="text-xs opacity-75 mt-2">⏱️ {randomLesson.duration}</div>
          </div>
          <Link
            href={`/chapter/${randomChapter.id}/lesson/${randomLesson.id}`}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Start This Lesson
          </Link>
        </div>

        {/* Popular chapters */}
        <div className="text-left">
          <h3 className="font-semibold text-gray-800 mb-4 text-center">Popular Chapters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {chapters.slice(0, 4).map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapter/${chapter.id}/lesson/${chapter.lessons[0]?.id}`}
                className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-semibold group-hover:bg-blue-200">
                  {chapter.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">{chapter.title}</div>
                  <div className="text-sm text-gray-600">{chapter.lessons.length} lessons</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <BackButton />
        </div>

        {/* Fun footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Lost in the data wilderness? 🧭 Don't worry, every great analyst has been here before!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            "In analytics, every 404 is just a redirect to new insights." - Anonymous Data Philosopher
          </p>
        </div>
      </div>
    </div>
  );
}
