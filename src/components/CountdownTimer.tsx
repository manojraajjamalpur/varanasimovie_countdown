import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOVIE_RELEASE_DATE } from '../data';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(MOVIE_RELEASE_DATE) - +new Date();
      let timeLeftData: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false,
        };
      }

      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div id="countdown-module" className="flex flex-col items-center justify-center space-y-8 py-6 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center space-x-3 text-gold-400 font-mono tracking-[0.4em] text-xs px-5 py-2 rounded-full border border-gold-500/10 bg-[#0F0F12] shadow-[0_0_20px_rgba(212,175,55,0.05)]"
      >
        <Clock className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
        <span>GLOBAL THEATRICAL PREMIERE COUNTDOWN</span>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl px-4">
        {timeBlocks.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#0C0C0E]/70 backdrop-blur-md p-8 flex flex-col items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-default transition-all duration-300 hover:border-gold-500/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-500/20 group-hover:border-gold-500/60 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold-500/20 group-hover:border-gold-500/60 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold-500/20 group-hover:border-gold-500/60 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-500/20 group-hover:border-gold-500/60 transition-all duration-300" />

            <div className="relative text-6xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight text-[#F5F2ED] select-none min-w-[70px] sm:min-w-[95px] text-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={block.value}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5F2ED] to-[#D5D1C8]"
                >
                  {String(block.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="mt-3 text-[10px] sm:text-xs font-serif tracking-[0.4em] font-medium transition-colors text-gold-200/60 group-hover:text-gold-300">
              {block.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center px-4 max-w-xl">
        <p className="text-gold-200/40 font-mono text-[10px] tracking-[0.2em] uppercase">
          THEATRICAL PREMIERE DATE: <span className="text-gold-400 font-bold font-serif italic tracking-widest">APRIL 7, 2027, 12:00 AM IST</span>
        </p>
      </div>
    </div>
  );
}
