'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { YouTubePlayer } from '@/components/ui/youtube-player';
import { LessonMeta } from '@/components/ui/lesson-meta';
import { LessonContent as LessonContentType } from '@/lib/content';
import { useState } from 'react';

interface LessonContentProps {
  lesson: LessonContentType;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const { metadata, content } = lesson;
  const [activeTab, setActiveTab] = useState<'about' | 'overview'>('about');
  const hasVideo = metadata.videoId && metadata.videoId !== 'placeholder';

  // Video-focused layout
  if (hasVideo) {
    return (
      <div>
        {/* Video Section */}
        <div className="mb-6">
          <YouTubePlayer videoId={metadata.videoId!} title={metadata.title} />
        </div>

        {/* Video Info */}
        <div className="mb-6">
          <h1 className="ka-title mb-3">{metadata.title}</h1>
          <LessonMeta duration={metadata.duration} />
          {metadata.description && (
            <p className="ka-body mt-3">{metadata.description}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'border-ka-blue text-ka-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-ka-blue text-ka-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lesson Overview
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'about' && (
            <div className="prose max-w-none">
              <p className="ka-body leading-relaxed">
                {content.split('\n\n')[0] || metadata.description}
              </p>
            </div>
          )}
          
          {activeTab === 'overview' && (
            <div className="prose max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
                  h2: ({ children }) => <h4 className="text-base font-medium mt-3 mb-2">{children}</h4>,
                  h3: ({ children }) => <h5 className="text-sm font-medium mt-2 mb-1">{children}</h5>,
                  p: ({ children }) => <p className="ka-body mb-3 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="ka-body mb-3 space-y-1 list-disc ml-6">{children}</ul>,
                  ol: ({ children }) => <ol className="ka-body mb-3 space-y-1 list-decimal ml-6">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children, ...props }) => {
                    const inline = !('className' in props);
                    return inline ? (
                      <code className="bg-gray-100 px-1 py-0.5 text-xs font-mono rounded">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-50 border border-gray-200 p-3 rounded text-sm overflow-x-auto my-3">
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-3 border-ka-blue bg-ka-blue-light p-3 my-3 text-sm rounded-r">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Text-only layout for lessons without video
  return (
    <div>
      <div className="ka-section">
        <LessonMeta duration={metadata.duration} showCommunity={false} />
        
        <h1 className="ka-title mb-2 mt-3">{metadata.title}</h1>
        
        {metadata.description && (
          <p className="ka-body">{metadata.description}</p>
        )}
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-ka-blue bg-ka-blue-light p-4 my-6 rounded-r-md">
                {children}
              </blockquote>
            ),
            code: ({ children, ...props }) => {
              const inline = !('className' in props);
              return inline ? (
                <code className="bg-gray-100 px-2 py-1 text-sm font-mono rounded">
                  {children}
                </code>
              ) : (
                <pre className="bg-gray-50 border border-gray-200 p-4 rounded-lg overflow-x-auto my-4">
                  <code>{children}</code>
                </pre>
              );
            },
            h1: ({ children }) => <h1 className="ka-title mt-8 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="ka-subtitle mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="ka-body mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="ka-body mb-4 space-y-2 list-disc ml-6">{children}</ul>,
            ol: ({ children }) => <ol className="ka-body mb-4 space-y-2 list-decimal ml-6">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 