import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Music, 
  Play, 
  Pause, 
  Repeat, 
  Link2, 
  Plus, 
  Volume1, 
  Disc, 
  Sliders, 
  Radio, 
  Share2, 
  X, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface Track {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
}

const DEFAULT_PRESETS: Track[] = [
  {
    id: 'bramhastra-groove',
    name: 'Varanasi Shiva (YouTube Anthem)',
    category: 'YOUTUBE THEME',
    url: 'https://youtu.be/0oIvIwJ3qKg?si=vthHjb6c2pyFsViH',
    description: 'The monumental sacred energetic chants aligned with the cosmic Varanasi stargate scale.'
  },
  {
    id: 'varanasi-dawn',
    name: 'Dawn of Varanasi',
    category: 'SITAR & DRONE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Elevated sitar harmonies blending with classical Indian drone elements.'
  },
  {
    id: 'shiva-trance',
    name: 'Sacred Shiva Trance',
    category: 'FLUTE AMBIENT',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'A meditative bamboo flute resonance simulating subterranean caves.'
  },
  {
    id: 'vedic-resonance',
    name: 'Vedic Resonances',
    category: 'CHIME & MANTRA',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    description: 'Sacred space atmospheres styled with slow strings and high bells.'
  }
];

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  // Match standard, embedded, shortened, shorts, or query-based YouTube links
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
};

export default function AmbientSound() {
  const [isOpen, setIsOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem('sound_system_tracks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_PRESETS; }
    }
    return DEFAULT_PRESETS;
  });
  
  const [currentTrackId, setCurrentTrackId] = useState<string>(() => {
    return localStorage.getItem('sound_system_current_id') || DEFAULT_PRESETS[0].id;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('sound_system_volume');
    return saved !== null ? parseFloat(saved) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  
  // Progress & Duration states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Custom MP3 Inputs
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [inputError, setInputError] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const [ytReady, setYtReady] = useState(false);

  const activeTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];
  const videoId = getYouTubeId(activeTrack.url);
  const isYoutube = !!videoId;

  // Use a ref for isLooping to prevent stale closures in YouTube callbacks
  const isLoopingRef = useRef(isLooping);
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  // 1. Initialise YouTube API script once securely
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      initYtPlayer();
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else if (window.YT.Player) {
      initYtPlayer();
    }

    // Keep checking as fallback until YT is loaded, then initialize
    const checkYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        initYtPlayer();
        clearInterval(checkYT);
      }
    }, 200);

    return () => clearInterval(checkYT);
  }, []);

  const initYtPlayer = () => {
    if (ytPlayerRef.current) return;
    try {
      ytPlayerRef.current = new window.YT.Player('yt-player-element', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          showinfo: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            setYtReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (isLoopingRef.current) {
                try {
                  ytPlayerRef.current.playVideo();
                } catch (err) {}
              } else {
                setIsPlaying(false);
              }
            } else if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          }
        }
      });
    } catch (e) {
      console.warn('YouTube Player initialization failed:', e);
    }
  };

  // 2. Playback state coordinator for both Native HTML5 audio & YouTube Player
  useEffect(() => {
    if (isYoutube) {
      // Pause native player if any
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (ytPlayerRef.current && ytReady && videoId) {
        try {
          if (isPlaying) {
            ytPlayerRef.current.loadVideoById({ videoId });
          } else {
            ytPlayerRef.current.cueVideoById({ videoId });
          }
        } catch (e) {
          console.warn("YouTube video load/cue failed:", e);
        }
      }
      return () => {
        if (ytPlayerRef.current && ytReady) {
          try {
            ytPlayerRef.current.pauseVideo();
          } catch (e) {}
        }
      };
    }

    // Pause YouTube player if active and switching back to Native Audio
    if (!isYoutube && ytPlayerRef.current && ytReady) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch (e) {
        console.warn("Failed to pause YouTube video:", e);
      }
    }

    // Native HTML Audio initialization
    const audio = new Audio(activeTrack.url);
    audio.loop = isLooping;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(e => {
        console.warn("Autoplay blocked or URL incorrect", e);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, [currentTrackId, ytReady, isYoutube, videoId]);

  // Sync loops
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  // Track YouTube progression & duration via simple check intervals
  useEffect(() => {
    let timer: any;
    if (isPlaying && isYoutube && ytPlayerRef.current && ytReady) {
      timer = setInterval(() => {
        try {
          const current = ytPlayerRef.current.getCurrentTime();
          const dur = ytPlayerRef.current.getDuration();
          if (typeof current === 'number') setCurrentTime(current);
          if (typeof dur === 'number' && dur > 0) setDuration(dur);
        } catch (e) {
          // ignore potential API reference states inside transitions
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isYoutube, ytReady]);

  // Synchronous Volumes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (ytPlayerRef.current && ytReady && isYoutube) {
      try {
        const targetVolValue = isMuted ? 0 : Math.round(volume * 100);
        ytPlayerRef.current.setVolume(targetVolValue);
      } catch (e) {}
    }
    localStorage.setItem('sound_system_volume', volume.toString());
  }, [volume, isMuted, isYoutube, ytReady]);

  // Play / Pause toggler
  const togglePlay = () => {
    if (isYoutube) {
      if (!ytPlayerRef.current || !ytReady) {
        setInputError('YouTube engine is still loading. Try again in a brief second.');
        return;
      }
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (e) {
        console.warn("YouTube play/pause failed:", e);
        setInputError('YouTube playback controller failed. Please try reloading.');
      }
    } else {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Audio playback error:", e);
          setInputError("Failed to play the audio stream. Verify the URL.");
        });
      }
    }
  };

  // Change active Track
  const handleTrackSelect = (trackId: string) => {
    setInputError('');
    setCurrentTrackId(trackId);
    localStorage.setItem('sound_system_current_id', trackId);
    
    const selectedTrack = tracks.find(t => t.id === trackId);
    const selectedIsYoutube = selectedTrack ? !!getYouTubeId(selectedTrack.url) : false;

    // Automatically trigger play on track switch
    setTimeout(() => {
      if (selectedIsYoutube) {
        if (ytPlayerRef.current && ytReady && selectedTrack) {
          const vid = getYouTubeId(selectedTrack.url);
          if (vid) {
            ytPlayerRef.current.loadVideoById({ videoId: vid });
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
          }
        }
      } else {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      }
    }, 150);
  };

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    if (isYoutube) {
      if (ytPlayerRef.current && ytReady) {
        ytPlayerRef.current.seekTo(value, true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = value;
      }
    }
  };

  // Reset custom tracks to Default
  const handleResetTracks = () => {
    setTracks(DEFAULT_PRESETS);
    localStorage.setItem('sound_system_tracks', JSON.stringify(DEFAULT_PRESETS));
    handleTrackSelect(DEFAULT_PRESETS[0].id);
  };

  // Add Custom MP3 or YouTube URL
  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');

    if (!customUrl.trim()) {
      setInputError('URL is mandatory');
      return;
    }

    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
      setInputError('URL must start with http:// or https://');
      return;
    }

    const isYt = !!getYouTubeId(customUrl);
    const cleanName = customName.trim() || (isYt ? `YouTube Stream #${tracks.length + 1}` : `Custom Track #${tracks.length + 1}`);
    const newTrackId = `custom-${Date.now()}`;
    const newTrack: Track = {
      id: newTrackId,
      name: cleanName,
      category: isYt ? 'YOUTUBE THEME' : 'USER MP3 STREAM',
      url: customUrl.trim(),
      description: isYt 
        ? 'Custom added streaming YouTube soundtrack ambient.' 
        : 'Custom added streaming MP3. Click to enjoy live audio.'
    };

    const updatedTracks = [...tracks, newTrack];
    setTracks(updatedTracks);
    localStorage.setItem('sound_system_tracks', JSON.stringify(updatedTracks));
    
    // Clear Form inputs
    setCustomName('');
    setCustomUrl('');

    // Play now
    handleTrackSelect(newTrackId);
  };

  // Delete Custom Track
  const handleDeleteTrack = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (DEFAULT_PRESETS.some(t => t.id === id)) return;

    const filtered = tracks.filter(t => t.id !== id);
    setTracks(filtered);
    localStorage.setItem('sound_system_tracks', JSON.stringify(filtered));

    if (currentTrackId === id) {
      handleTrackSelect(DEFAULT_PRESETS[0].id);
    }
  };

  // Format Time (Seconds to mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div id="ambient-audio-module" className="fixed bottom-6 left-6 z-40">
      {/* Invisible YouTube DOM placeholder */}
      <div id="yt-player-element" className="absolute pointer-events-none opacity-0 w-[1px] h-[1px] -left-[9999px] -top-[9999px] overflow-hidden" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 bg-[#0E0E12]/95 border border-gold-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold-500/10 to-transparent p-4 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Disc className={`w-5 h-5 text-gold-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <div>
                  <h3 className="font-mono text-xs font-bold tracking-widest text-gold-400 uppercase">TEASER SOUND SYSTEM</h3>
                  <p className="text-[9px] font-mono text-gold-300/40 uppercase">Interactive Live Audio Console</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gold-300/60 hover:text-gold-400 transition-colors p-1"
                title="Minimize player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Now Playing Visualizer Card */}
            <div className="p-4 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] bg-gold-500/15 text-gold-400 border border-gold-500/20 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                  {activeTrack.category}
                </span>
                <div className="flex space-x-0.5 items-end h-3" title="Visual Equalizer">
                  <span className={`w-0.5 h-3 bg-gold-400 rounded-full origin-bottom transition-all ${isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-1 opacity-50'}`} />
                  <span className={`w-0.5 h-1.5 bg-gold-400 rounded-full origin-bottom transition-all ${isPlaying ? 'animate-[bounce_0.6s_infinite_0.15s]' : 'h-1 opacity-50'}`} style={{ animationDelay: '0.1s' }} />
                  <span className={`w-0.5 h-2.5 bg-gold-400 rounded-full origin-bottom transition-all ${isPlaying ? 'animate-[bounce_0.7s_infinite_0.3s]' : 'h-1 opacity-50'}`} style={{ animationDelay: '0.2s' }} />
                  <span className={`w-0.5 h-2 bg-gold-400 rounded-full origin-bottom transition-all ${isPlaying ? 'animate-[bounce_0.5s_infinite_0.1s]' : 'h-1 opacity-50'}`} style={{ animationDelay: '0.3s' }} />
                </div>
              </div>

              <h4 className="text-sm font-sans font-bold text-white tracking-tight line-clamp-1">{activeTrack.name}</h4>
              <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 h-8 leading-normal font-light">
                {activeTrack.description}
              </p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 accent-gold-500 bg-white/10 h-1.5 rounded-full cursor-pointer hover:bg-white/20 transition-all outline-none"
                    style={{ background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(currentTime / (duration || 100) * 100)}%, rgba(255,255,255,0.1) ${(currentTime / (duration || 100) * 100)}%, rgba(255,255,255,0.1) 100%)` }}
                  />
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-[#070709] flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all"
                      title={isPlaying ? 'Pause Track' : 'Play Track'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                    </button>

                    <button
                      onClick={() => setIsLooping(!isLooping)}
                      className={`p-1.5 rounded-md border transition-all ${isLooping ? 'text-gold-400 border-gold-500/20 bg-gold-500/10' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                      title={isLooping ? 'Looping enabled' : 'Looping disabled'}
                    >
                      <Repeat className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-gray-400 hover:text-gold-400 transition-colors p-1"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 0.4 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-20 accent-gold-500 bg-white/10 h-1 rounded-full cursor-pointer outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Presets Menu */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-mono text-[10px] text-gold-400/80 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> ATMOSPHERIC presets
                </span>
                {tracks.length > DEFAULT_PRESETS.length && (
                  <button 
                    onClick={handleResetTracks}
                    className="text-[9px] font-mono text-gold-500/50 hover:text-gold-400 transition-all uppercase"
                  >
                    Reset List
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
                {tracks.map((track) => {
                  const isCurrent = track.id === currentTrackId;
                  const isUserAdded = !DEFAULT_PRESETS.some(t => t.id === track.id);
                  return (
                    <div
                      key={track.id}
                      onClick={() => handleTrackSelect(track.id)}
                      className={`group/item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        isCurrent 
                          ? 'bg-gold-500/15 border border-gold-500/35 text-white' 
                          : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.05] text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate flex-1 min-w-0">
                        {isCurrent && isPlaying ? (
                          <div className="flex space-x-0.5 items-end h-2 flex-shrink-0">
                            <span className="w-0.5 h-2.5 bg-gold-400 animate-[bounce_0.6s_infinite]" />
                            <span className="w-0.5 h-1.5 bg-gold-400 animate-[bounce_0.5s_infinite_0.1s]" />
                            <span className="w-0.5 h-2 bg-gold-400 animate-[bounce_0.7s_infinite_0.2s]" />
                          </div>
                        ) : (
                          <Music className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-gold-400' : 'text-gray-500'}`} />
                        )}
                        <span className="text-[11px] font-sans font-medium tracking-tight truncate">
                          {track.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
                        {isUserAdded && (
                          <button
                            onClick={(e) => handleDeleteTrack(track.id, e)}
                            className="opacity-0 group-hover/item:opacity-100 p-1 text-red-400/70 hover:text-red-400 transition-opacity"
                            title="Delete custom track"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                        <span className="text-[9px] font-mono text-gold-400/30 group-hover/item:text-gold-400/50 uppercase">
                          {isCurrent ? 'Playing' : 'Choose'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Panel */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <span className="block font-mono text-[10px] text-gold-400/80 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-gold-500" /> Live MP3 or YouTube Stream URL
              </span>

              <form onSubmit={handleAddCustomTrack} className="space-y-2">
                <div>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Enter direct MP3 URL or YouTube link"
                    className="w-full bg-[#16161C] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500/80 focus:border-gold-500/50 outline-none font-sans"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Optional Track Title (e.g. My Flute Loop)"
                    className="flex-1 bg-[#16161C] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500/80 focus:border-gold-500/50 outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-gold-500 hover:bg-gold-400 text-[#070709] px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
                  >
                    <Plus className="w-3.5 h-3.5" /> LOAD
                  </button>
                </div>

                {inputError && (
                  <p className="text-[10px] text-red-400 font-medium leading-normal animate-pulse">
                    ⚠️ {inputError}
                  </p>
                )}
                
                <p className="text-[8.5px] text-gray-400/70 font-mono mt-1 leading-normal uppercase text-center border-t border-white/5 pt-1.5">
                  Paste any direct MP3 file or YouTube clip link directly!
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating sound system toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center space-x-2.5 px-4.5 py-3.5 rounded-full border shadow-[0_5px_35px_rgba(0,0,0,0.7)] backdrop-blur-md cursor-pointer transition-all duration-300 ${
          isOpen
            ? 'bg-gold-500 text-[#070709] border-gold-500 shadow-[0_0_25px_rgba(212,175,55,0.45)]' 
            : isPlaying 
              ? 'bg-gold-500/20 border-gold-500/50 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:bg-gold-500/30' 
              : 'bg-[#0A0A0C]/90 border-white/10 text-gold-200/60 hover:border-gold-500/30 hover:text-gold-200'
        }`}
      >
        <div className="flex items-center">
          {isPlaying ? (
            <div className="flex space-x-0.5 items-end h-3 mr-2">
              <span className={`w-0.5 h-3 ${isOpen ? 'bg-[#070709]' : 'bg-gold-400'} rounded-full animate-[bounce_0.8s_infinite]`} />
              <span className={`w-0.5 h-1.5 ${isOpen ? 'bg-[#070709]' : 'bg-gold-400'} rounded-full animate-[bounce_0.6s_infinite_0.15s]`} />
              <span className={`w-0.5 h-2.5 ${isOpen ? 'bg-[#070709]' : 'bg-gold-400'} rounded-full animate-[bounce_0.7s_infinite_0.3s]`} />
            </div>
          ) : (
            <Music className="w-4 h-4 mr-1.5" />
          )}
          
          <span className="font-mono text-[10px] font-black tracking-widest uppercase">
            {isOpen ? 'CLOSE CONSOLE' : isPlaying ? 'SOUND SYSTEM (ACTIVE)' : 'SOUND SYSTEM'}
          </span>
        </div>
        
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4 text-gold-500/75" />}
      </motion.button>
    </div>
  );
}
