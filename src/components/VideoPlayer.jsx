import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, RotateCcw } from 'lucide-react';

export default function VideoPlayer({ onComplete, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 min mock
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + playbackSpeed;
          const newProgress = (next / duration) * 100;
          setProgress(newProgress);
          if (next >= duration) {
            setIsPlaying(false);
            clearInterval(intervalRef.current);
            onComplete?.();
            return duration;
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, playbackSpeed, duration, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  return (
    <div 
      className="relative bg-gray-900 aspect-video w-full select-none"
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Area (mock) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        {!isPlaying && progress === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-white/50 text-xs mt-1">Tap to play • {formatTime(duration)}</p>
          </div>
        )}
        {isPlaying && (
          <div className="text-center text-white/30">
            <div className="w-16 h-16 border-4 border-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Volume2 className="w-6 h-6" />
            </div>
            <p className="text-xs mt-2">Playing video...</p>
          </div>
        )}
        {!isPlaying && progress > 0 && progress < 100 && (
          <div className="text-center text-white">
            <Pause className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-70">Paused</p>
          </div>
        )}
        {progress >= 100 && (
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold">Video Completed!</p>
            <p className="text-sm opacity-70 mt-1">Section marked as complete</p>
          </div>
        )}
      </div>

      {/* Custom Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-indigo-500 rounded-full relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-indigo-300 transition">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              {/* Skip */}
              <button onClick={() => { setCurrentTime(c => Math.min(c + 10, duration)); setProgress(p => Math.min(p + (10/duration)*100, 100)); }} className="text-white/70 hover:text-white transition">
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Volume */}
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Time */}
              <span className="text-white/80 text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Speed */}
              <button 
                onClick={() => setPlaybackSpeed(s => s >= 2 ? 0.5 : s + 0.25)}
                className="text-white/80 text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition"
              >
                {playbackSpeed}x
              </button>

              {/* Fullscreen */}
              <button className="text-white/70 hover:text-white transition">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click to play/pause */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        style={{ bottom: '60px' }}
        onClick={() => setIsPlaying(!isPlaying)}
      />

      {/* Completion badge */}
      {progress >= 100 && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          100% Complete ✓
        </div>
      )}

      {/* Watch progress badge */}
      {progress > 0 && progress < 100 && (
        <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {Math.round(progress)}% watched
        </div>
      )}
    </div>
  );
}
