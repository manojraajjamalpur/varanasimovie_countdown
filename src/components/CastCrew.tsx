import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAST_MEMBERS, CREW_MEMBERS } from '../data';
import { CastMember } from '../types';
import { User, Sparkles, BookOpen, Quote, Shield } from 'lucide-react';

const CAST_QUOTES: Record<string, string> = {
  'mahesh-babu': '"Rudhra is born with a larger purpose and carries a destiny he did not choose for himself. A character defined by contrasting extremes—witty, vulnerable, and fiercely relentless."',
  'priyanka-chopra': '"Mandakini demands a rare duality—fiercely formidable and commanding, yet deeply vulnerable. A character requiring equal measures of grit, resilience, and poignant emotional depth."',
  'prithviraj': '"Playing a character restricted from physical movement, everything has to be conveyed purely through the face and eyes. Kumbha is deeply layered with no one-dimensional emotions—carrying immense weight from his past with rich subtext beneath every line."',
};

export default function CastCrew() {
  const [selectedCast, setSelectedCast] = useState<CastMember | null>(null);

  return (
    <section id="cast-crew-section" className="relative w-full py-24 px-4 bg-gradient-to-b from-[#0A0A0C] via-[#0C0C0E] to-[#0A0A0C] overflow-hidden border-t border-white/5">
      
      {/* Dynamic ambient grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="text-gold-500 font-mono tracking-[0.4em] text-xs uppercase mb-3 flex items-center justify-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>THE STARCAST ENSEMBLE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#F5F2ED] uppercase tracking-wider mb-4">
            Cast &amp; Stellar Crew
          </h2>
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mx-auto mb-6" />
          <p className="text-gold-200/60 text-sm leading-relaxed font-sans">
            The legendary actors and master technicians gathered to bring SS Rajamouli&apos;s speculative action-adventure masterpiece &apos;Varanasi&apos; to global silver screens.
          </p>
        </div>

        {/* Cast Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {CAST_MEMBERS.map((actor, idx) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              onClick={() => setSelectedCast(actor)}
              className="group relative rounded-2xl border border-white/5 bg-[#0C0C0E]/70 backdrop-blur-md p-4 flex flex-col items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-gold-500/25 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] transition-all duration-300"
            >
              {/* Outer frame styling */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              </div>

              {/* Portrait Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 border border-white/5 group-hover:border-gold-500/20 transition-colors">
                <img
                  src={actor.imageUrl}
                  alt={actor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none brightness-90 group-hover:brightness-110"
                />
                {/* Visual glow ring over avatar when hovering */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Floating Character Role Banner */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block bg-[#0A0A0C]/90 border border-gold-500/20 text-gold-400 font-mono text-[9px] tracking-wider px-2 py-1 rounded">
                    {actor.id === 'mahesh-babu' ? 'MAIN PROTAGONIST' : actor.id === 'priyanka-chopra' ? 'CO-PROTAGONIST' : 'MAIN ANTAGONIST'}
                  </span>
                </div>
              </div>

              {/* Metadata details */}
              <div className="text-center w-full space-y-1">
                <h3 className="text-lg font-serif font-black text-[#F5F2ED] group-hover:text-gold-300 transition-colors">
                  {actor.name}
                </h3>
                <div className="text-gold-400 font-mono text-[10px] tracking-widest font-bold uppercase truncate max-w-full">
                  {actor.role.split('(')[0].trim()}
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/5 w-full flex items-center justify-center gap-1 text-[10px] font-mono text-gold-500 opacity-30 group-hover:opacity-90 transition-opacity">
                <BookOpen className="w-3 h-3" /> CLICK TO READ PRODUCTION DIALOGUE
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Cast Dialogue Popup Modal */}
        <AnimatePresence>
          {selectedCast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              onClick={() => setSelectedCast(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="relative max-w-xl w-full bg-[#0C0C0E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-500" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-500" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-500" />

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Portrait on Modal */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-gold-400/30 flex-shrink-0">
                    <img
                      src={selectedCast.imageUrl}
                      alt={selectedCast.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <div className="text-gold-500 font-mono text-[10px] tracking-[0.25em] font-black uppercase">
                      LOCKED CHARACTER SPECS
                    </div>
                    <h4 className="text-2xl font-serif text-[#F5F2ED] font-extrabold">{selectedCast.name}</h4>
                    <p className="text-gold-400 font-mono text-xs">{selectedCast.role}</p>
                  </div>
                </div>

                <div className="my-6 p-4 rounded-xl border border-white/5 bg-[#0A0A0C] relative">
                  <Quote className="w-6 h-6 text-gold-500/20 absolute top-2 left-2" />
                  <p className="text-gold-200 font-serif italic text-sm sm:text-base leading-relaxed pl-6 pt-2">
                    {CAST_QUOTES[selectedCast.id] || '"The cosmos will line up soon..."'}
                  </p>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-gold-500/40">
                  <span className="flex items-center gap-1 uppercase"><Shield className="w-3.5 h-3.5 animate-pulse" /> SECURE DOSSIER DB-300</span>
                  <button
                    onClick={() => setSelectedCast(null)}
                    className="px-4 py-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-lg hover:bg-gold-500 hover:text-black font-serif font-black tracking-widest text-[9px] uppercase cursor-pointer transition-all duration-300"
                  >
                    CLOSE DEBIEF
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Crew Spotlight Grid */}
        <div className="border-t border-white/5 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-xl font-serif text-[#F5F2ED] uppercase tracking-wider">
              The Creative Visionaries
            </h3>
            <p className="text-gold-400 font-mono text-[9px] tracking-widest uppercase mt-1">
              THE TEAM: BUILDERS OF THE ETERNAL BLOCKBUSTER
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CREW_MEMBERS.map((crew, idx) => (
              <div
                key={crew.name}
                className="p-5 rounded-xl border border-white/5 bg-[#0C0C0E]/50 hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="text-gold-500 font-mono text-[9px] tracking-widest font-black uppercase mb-1">
                  {crew.role}
                </div>
                <div className="text-base font-serif font-bold text-[#F5F2ED] mb-2">
                  {crew.name}
                </div>
                <div className="text-gold-200/50 text-xs font-sans leading-relaxed">
                  {crew.notableWork}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
