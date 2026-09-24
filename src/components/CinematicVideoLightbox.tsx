import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Maximize2, ExternalLink, Film, Sparkles } from 'lucide-react';

interface CinematicVideoLightboxProps {
  videoId?: string;
  youtubeUrl?: string;
}

export default function CinematicVideoLightbox({
  videoId = 'odDvRxuP2wQ',
  youtubeUrl = 'https://youtu.be/odDvRxuP2wQ?si=8Wx-VBJ9oQeI7fKI'
}: CinematicVideoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    const modalEl = document.getElementById('cinematic-imax-theater-stage');
    if (!modalEl) return;
    if (!document.fullscreenElement) {
      modalEl.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <>
      {/* Cinematic Trigger Button in Hero Section */}
      <div className="flex flex-col items-center justify-center my-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group p-[1px] rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Animated Gold/Amber Glowing Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500 via-amber-300 to-gold-600 opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          
          {/* Button Surface */}
          <div className="relative px-6 py-4 sm:px-8 sm:py-4.5 rounded-2xl bg-[#0C0C0E]/95 backdrop-blur-xl flex items-center gap-4 border border-gold-500/30 group-hover:border-gold-400 transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.45)]">
            
            {/* Pulsing Play Orb */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform duration-300">
              <Play className="w-5 h-5 fill-black translate-x-0.5" />
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full border border-gold-400/80 animate-ping opacity-75" />
            </div>

            {/* Labels and Specs */}
            <div className="text-left space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono tracking-[0.25em] text-gold-400 font-bold uppercase flex items-center gap-1">
                  <Film className="w-3 h-3 text-gold-400" />
                  IMAX® 1.43:1 RATIO
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider font-extrabold bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  4K GLIMPSE
                </span>
              </div>
              <div className="text-sm sm:text-base font-serif font-black tracking-widest text-[#F5F2ED] uppercase group-hover:text-gold-200 transition-colors">
                Watch Announcement Glimpse
              </div>
              <div className="text-[10px] text-gold-200/50 font-sans tracking-wide">
                Experience the official reveal with pure theater atmosphere
              </div>
            </div>

            {/* Sparkle subtle icon */}
            <Sparkles className="w-4 h-4 text-gold-400/40 group-hover:text-gold-300 transition-colors ml-2 hidden sm:block" />
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Theater Lightbox Modal mounted to document.body to prevent parent transform clipping */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="cinematic-imax-theater-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[99999] w-screen h-[100dvh] flex flex-col items-center justify-between bg-black/98 backdrop-blur-2xl p-3 sm:p-5 overflow-hidden select-none"
            >
              {/* Ambient Cinema Projection Backlight */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[70vh] bg-gradient-to-b from-amber-600/20 via-gold-500/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
                {/* Top projector cone effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%) pointer-events-none" />
              </div>

              {/* Cinema Header Bar */}
              <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-6xl flex items-center justify-between py-2 px-3 border-b border-white/10 shrink-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-gold-500/30 font-mono text-[10px] tracking-[0.25em] text-gold-400 font-bold">
                    <Film className="w-3.5 h-3.5 text-gold-400" />
                    <span>IMAX® 1.43:1 GT</span>
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-serif font-black tracking-widest text-[#F5F2ED] uppercase">
                      VARANASI • OFFICIAL GLIMPSE
                    </h2>
                    <p className="text-[9px] font-mono text-gold-200/50 uppercase tracking-widest hidden sm:block">
                      DIR: S. S. RAJAMOULI • SSMB29 • MUSIC: M. M. KEERAVANI
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    title="Toggle Fullscreen"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 hover:border-gold-500/30 bg-white/5 hover:bg-gold-500/10 text-gold-400 text-xs font-mono tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline text-[9px] uppercase">Theater Mode</span>
                  </button>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 hover:border-gold-500/30 bg-white/5 hover:bg-gold-500/10 text-gold-400 text-xs font-mono tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden md:inline text-[9px] uppercase">YouTube</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 hover:border-red-400 text-red-300 hover:text-white font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">EXIT</span>
                    <kbd className="hidden lg:inline-block px-1 py-0.2 bg-black/60 rounded text-[8px] border border-white/10 text-gray-400">ESC</kbd>
                  </button>
                </div>
              </motion.header>

              {/* Central Stage: IMAX 1.43:1 Aspect Ratio Player */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative z-10 w-full flex-grow flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* IMAX 1.43:1 Constrained Container - mathematically scaled to fit screen width & height */}
                <div 
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-gold-500/40 shadow-[0_0_120px_rgba(212,175,55,0.3),0_30px_60px_rgba(0,0,0,0.98)] bg-black"
                  style={{
                    aspectRatio: '1.43 / 1',
                    maxWidth: 'min(94vw, calc((100dvh - 150px) * 1.43))',
                    maxHeight: 'calc(100dvh - 150px)',
                    width: '100%',
                  }}
                >
                  {/* Traditional Cinematic Corner Brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-400 z-20 pointer-events-none m-2" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-400 z-20 pointer-events-none m-2" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-400 z-20 pointer-events-none m-2" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-400 z-20 pointer-events-none m-2" />

                  {/* Subtle ratio watermark badge */}
                  <div className="absolute top-3 left-4 z-20 pointer-events-none opacity-60 font-mono text-[9px] tracking-widest text-gold-400 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs border border-gold-500/20">
                    <span>IMAX 1.43:1 NATIVE</span>
                  </div>

                  {/* YouTube Video Embed */}
                  <iframe
                    title="Varanasi Official Teaser Glimpse - IMAX 1.43:1"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              {/* Cinema Footer Bar */}
              <motion.footer
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between py-2 px-3 border-t border-white/10 text-[9px] font-mono text-gold-200/50 gap-2 shrink-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="tracking-[0.2em] uppercase text-gold-400 font-bold">THEATER PROJECTION ACTIVE</span>
                  <span className="text-white/20">|</span>
                  <span className="tracking-wider uppercase">PRESENTED IN FULL 1.43:1 IMAX ASPECT RATIO</span>
                </div>

                <div className="tracking-widest uppercase text-gold-500/40 text-center sm:text-right">
                  SUPERSTAR MAHESH BABU • PRIYANKA CHOPRA • PRITHVIRAJ SUKUMARAN • S.S. RAJAMOULI
                </div>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
