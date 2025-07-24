'use client';

import { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Play } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

const LoadingState = ({ title }: { title: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center ka-caption">
      <Play className="w-12 h-12 mx-auto mb-3 text-gray-400" />
      <p className="font-medium">Loading video...</p>
      <p className="mt-1">{title}</p>
    </div>
  </div>
);

const PlaceholderState = ({ title }: { title: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mx-auto mb-4">
        <Play className="w-8 h-8 text-gray-400" />
      </div>
      <p className="font-medium text-gray-700 mb-1">Video Coming Soon</p>
      <p className="ka-caption max-w-sm">{title}</p>
    </div>
  </div>
);

export function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const [isReady, setIsReady] = useState(false);

  // Show placeholder for placeholder video IDs
  if (videoId === 'placeholder' || !videoId) {
    return (
      <div className="ka-video-container mb-6">
        <PlaceholderState title={title} />
      </div>
    );
  }

  const opts: YouTubeProps['opts'] = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="ka-video-container mb-6">
      {!isReady && <LoadingState title={title} />}
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={() => setIsReady(true)}
        className="w-full h-full"
      />
    </div>
  );
} 