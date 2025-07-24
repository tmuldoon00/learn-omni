import { Clock, Users } from 'lucide-react';

interface LessonMetaProps {
  duration: string;
  showCommunity?: boolean;
}

export function LessonMeta({ duration, showCommunity = true }: LessonMetaProps) {
  return (
    <div className="flex items-center gap-4 ka-caption">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
      {showCommunity && (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>Community enhanced</span>
        </div>
      )}
    </div>
  );
} 