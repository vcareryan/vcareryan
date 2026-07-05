import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from 'lucide-react';

export default function VideoPlayer({ onComplete, title, videoId }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const playerInstanceRef = useRef(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId) return;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      // Check if script already loading
      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        window.onYouTubeIframeAPIReady = initPlayer;
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    };

    loadYouTubeAPI();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerInstanceRef.current) {
        try { playerInstanceRef.current.destroy(); } catch(e) {}
      }
    };
  }, [videoId]);

  const initPlayer = () => {
    if (playerInstanceRef.current) {
      try { playerInstanceRef.current.destroy(); } catch(e) {}
    }

    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      playerVars: {
        controls: 0,          // Hide default controls
        modestbranding: 1,    // Minimal YouTube branding
        rel: 0,               // No related videos
        iv_load_policy: 3,    // No annotations
        disablekb: 1,         // Disable keyboard controls
        fs: 0,                // No fullscreen button (we provide our own)
        playsinline: 1,       // Play inline on mobile
        showinfo: 0,          // Hide video info
        cc_load_policy: 0,    // No captions
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          setIsReady(true);
          setDuration(event.target.getDuration());
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startTracking();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopTracking();
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setProgress(100);
            stopTracking();
            onComplete?.();
          }
        }
      }
    });
  };

  const startTracking = () => {
    stopTracking();
    intervalRef.current = setInterval(() => {
      if (playerInstanceRef.current && playerInstanceRef.current.getCurrentTime) {
        const current = playerInstanceRef.current.getCurrentTime();
        const total = playerInstanceRef.current.getDuration();
        setCurrentTime(current);
        setDuration(total);
        if (total > 0) {
          const pct = (current / total) * 100;
          setProgress(pct);
          // Mark complete at 95% to account for buffering
          if (pct >= 95) {
            onComplete?.();
          }
        }
      }
    }, 1000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!playerInstanceRef.current) return;
    if (isPlaying) {
      playerInstanceRef.current.pauseVideo();
    } else {
      playerInstanceRef.current.playVideo();
    }
  };

  const handleSeek = (e) => {
    if (!playerInstanceRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTo = percentage * duration;
    playerInstanceRef.current.seekTo(seekTo, true);
    setCurrentTime(seekTo);
    setProgress(percentage * 100);
  };

  const handleMute = () => {
    if (!playerInstanceRef.current) return;
    if (isMuted) {
      playerInstanceRef.current.unMute();
      setIsMuted(false);
    } else {
      playerInstanceRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSkip = () => {
    if (!playerInstanceRef.current) return;
    const newTime = Math.min(currentTime + 10, duration);
    playerInstanceRef.current.seekTo(newTime, true);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    }
  };

  // Fallback for when no videoId is provided (mock player)
  if (!videoId) {
    return <MockVideoPlayer onComplete={onComplete} title={title} />;
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-black aspect-video w-full select-none overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* YouTube Player */}
      <div className="absolute inset-0">
        <div ref={playerRef} className="w-full h-full" />
      </div>

      {/* Overlay to capture clicks and hide YouTube UI */}
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        style={{ bottom: '50px' }}
        onClick={handlePlayPause}
      />

      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/70 text-sm">Loading video...</p>
            <p className="text-white/50 text-xs mt-1">{title}</p>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {showControls && isReady && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12 z-20">
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-red-500 rounded-full relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={handlePlayPause} className="text-white hover:text-red-400 transition">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={handleSkip} className="text-white/70 hover:text-white transition">
                <SkipForward className="w-5 h-5" />
              </button>
              <button onClick={handleMute} className="text-white/70 hover:text-white transition">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-white/80 text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleFullscreen} className="text-white/70 hover:text-white transition">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion badge */}
      {progress >= 95 && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          Complete ✓
        </div>
      )}

      {/* Watch progress badge */}
      {progress > 0 && progress < 95 && (
        <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}

// Fallback mock player when no video ID is available
function MockVideoPlayer({ onComplete, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
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
  }, [isPlaying, duration, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="relative bg-gray-900 aspect-video w-full select-none"
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        {!isPlaying && progress === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
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
            <p className="text-xs mt-2">Playing...</p>
          </div>
        )}
        {progress >= 100 && (
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold">Video Complete!</p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <div className="w-full h-1.5 bg-white/30 rounded-full">
          <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/60 text-xs">{formatTime(currentTime)}</span>
          <span className="text-white/60 text-xs">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
