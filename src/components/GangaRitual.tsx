import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Diya } from '../types';
import { Sparkles, Send, Heart, Eye } from 'lucide-react';

export default function GangaRitual() {
  const [wish, setWish] = useState('');
  const [sender, setSender] = useState('');
  const [diyas, setDiyas] = useState<Diya[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [activeDiya, setActiveDiya] = useState<Diya | null>(null);
  
  // Clear any existing active diyas on mount and load clean slate
  useEffect(() => {
    localStorage.removeItem('varanasi_diyas');
    setDiyas([]);
  }, []);

  // Save on state change if user floats new ones
  const saveDiyas = (currentDiyas: Diya[]) => {
    localStorage.setItem('varanasi_diyas', JSON.stringify(currentDiyas));
  };

  // Slowly drift diyas down the Ganges river flow (left to right, slightly upwards/downwards)
  useEffect(() => {
    const interval = setInterval(() => {
      setDiyas((prevDiyas) => {
        const drifted = prevDiyas.map((diya) => {
          let nextX = diya.x + diya.speed;
          // Loop back from left if floated off-screen to keep the river alive
          if (nextX > 110) {
            nextX = -10;
          }
          return {
            ...diya,
            x: nextX,
            // Slight wave sway
            y: diya.y + Math.sin(nextX / 5) * 0.05,
          };
        });
        return drifted;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    const newDiya: Diya = {
      id: `diya-${Date.now()}`,
      wish: wish.trim(),
      sender: sender.trim() || 'A Devotee',
      x: -5, // Start from left side
      y: 30 + Math.random() * 45, // River stream height
      scale: 0.8 + Math.random() * 0.5,
      speed: 0.08 + Math.random() * 0.1,
    };

    const updated = [newDiya, ...diyas];
    setDiyas(updated);
    saveDiyas(updated);

    setWish('');
    setSender('');
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  const clearAllDiyas = () => {
    setDiyas([]);
    localStorage.removeItem('varanasi_diyas');
    setActiveDiya(null);
  };

  return (
    <section id="ganga-ritual-section" className="relative w-full py-20 px-4 bg-gradient-to-b from-[#0A0A0C] via-[#0C0C0E] to-[#0A0A0C] overflow-hidden border-t border-b border-white/5">
      
      {/* Background stardust glow and abstract flowing waves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center max-w-2xl mb-12 relative">
          <div className="text-gold-500 font-mono tracking-[0.4em] text-xs uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fan Speculation Wave</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#F5F2ED] uppercase tracking-wider mb-4">
            The Ganges Hype Float
          </h2>
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mx-auto mb-6" />
          <p className="text-gold-200/60 text-sm leading-relaxed font-sans">
            Floating a Diya on Mother Ganga represents hope. Join fans worldwide by writing your teaser expectation, film theory, or cheers for Mahesh Babu & Rajamouli and setting it afloat in our dynamic river of hype.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          
          {/* Wish Input Panel */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0C0C0E]/70 backdrop-blur-md relative overflow-hidden group">
            {/* Top right design element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-serif text-gold-400 font-semibold tracking-wide flex items-center gap-2">
                Launch Your Teaser Theory
              </h3>
              
              <div>
                <label className="block text-gold-200/50 font-mono text-[10px] tracking-wider uppercase mb-1.5">
                  Your Film Conjecture or Message
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={150}
                  placeholder="E.g., Mahesh Babu's combat choreography, secret ancient relics, epic cameos..."
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 text-[#E0D8D0] rounded-xl py-3 px-4 text-sm font-sans focus:outline-none focus:border-gold-500/50 placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-gold-200/50 font-mono text-[10px] tracking-wider uppercase mb-1.5">
                  Your Name / Fan Handle (Optional)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Anonymous Fan"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 text-[#E0D8D0] rounded-xl py-3 px-4 text-sm font-sans focus:outline-none focus:border-gold-500/50 placeholder-slate-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 active:scale-[0.98] text-black font-serif font-black tracking-widest text-xs uppercase rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                FLOAT MOVIE FAN DIYA
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <AnimatePresence mode="wait">
                {successMsg ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-gold-400 font-mono text-xs flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                    Your conjecture is afloat in Ganga currents!
                  </motion.div>
                ) : (
                  <div className="text-gold-200/40 text-[10px] font-mono">
                    *Persists on your browser via localStorage
                  </div>
                )}
              </AnimatePresence>

              {diyas.length > 0 && (
                <button 
                  onClick={clearAllDiyas}
                  className="text-gold-500/40 hover:text-gold-300 font-mono text-[10px] tracking-wider hover:underline uppercase transition-all"
                >
                  Clear All Diyas
                </button>
              )}
            </div>
          </div>

          {/* Interactive River Canvas Panel */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between p-4 rounded-2xl border border-white/5 bg-[#0F0F12] relative overflow-hidden h-[380px] lg:h-auto min-h-[350px]">
            
            {/* Dark Ganges River overlay and starry reflection effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-[#09090C] to-[#0F0F12] pointer-events-none" />
            
            {/* River currents */}
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/5 to-transparent blur-xs" />
            <div className="absolute inset-x-0 top-2/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent blur-md" />
            <div className="absolute inset-x-0 top-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/5 to-transparent blur-xs" />

            <div className="relative z-10 flex items-center justify-between text-gold-200/40 font-mono text-[9px] tracking-widest uppercase border-b border-white/5 pb-2">
              <span className="flex items-center gap-1">
                {diyas.length > 0 ? (
                  <>
                    <Eye className="w-3 h-3 text-gold-500/45 animate-pulse" /> Hover a Diya to read fan expectations
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-gold-500/45 animate-pulse" /> Sacred waters serene • No active diyas afloat
                  </>
                )}
              </span>
              <span>GANGES RITUAL WATERFLOW</span>
            </div>

            {/* The Floating Arena */}
            <div className="relative flex-grow pointer-events-auto h-full w-full overflow-hidden flex items-center justify-center">
              {diyas.length === 0 && (
                <div className="text-center p-6 space-y-2 pointer-events-none select-none z-10">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gold-500/5 border border-gold-500/10 flex items-center justify-center text-gold-400/30">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <p className="text-xs font-serif text-gold-200/60 tracking-wider uppercase">
                    The sacred Ganges flows quietly
                  </p>
                  <p className="text-[10px] font-mono text-gold-500/40 tracking-widest uppercase">
                    Submit your teaser speculation on the left to float a new Diya
                  </p>
                </div>
              )}

              <AnimatePresence>
                {diyas.map((diya) => (
                  <motion.div
                    key={diya.id}
                    style={{
                      left: `${diya.x}%`,
                      top: `${diya.y}%`,
                      scale: diya.scale,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/diya"
                    onClick={() => setActiveDiya(diya)}
                    onMouseEnter={() => setActiveDiya(diya)}
                    onMouseLeave={() => setActiveDiya(null)}
                    layoutId={`diya-layout-${diya.id}`}
                  >
                    {/* Glowing Aura */}
                    <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,rgba(212,175,55,0)_70%)] animate-pulse" />
                    
                    {/* Diya Core Drawing */}
                    <div className="relative w-6 h-6 rounded-full bg-amber-950 border border-amber-900/60 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {/* Fire Wick */}
                      <div className="absolute -top-1 w-2.5 h-3.5 rounded-full bg-gradient-to-t from-orange-400 via-gold-300 to-white shadow-[0_0_12px_#dac174] animate-[bounce_1.5s_infinite]" />
                      
                      {/* Bowl Inner */}
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-950 border border-amber-900/40 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                      </div>
                    </div>

                    {/* Miniature Signature */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[8px] font-mono text-gold-300 bg-[#0A0A0C]/90 px-1 py-0.5 rounded border border-white/5 scale-90 opacity-40 group-hover/diya:opacity-100 transition-opacity whitespace-nowrap">
                      {diya.sender}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Wish Overlay Tooltip Card */}
              <AnimatePresence>
                {activeDiya && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    style={{
                      left: `calc(${activeDiya.x}% - 110px)`,
                      top: `calc(${activeDiya.y}% - 120px)`,
                    }}
                    className="absolute z-40 w-[220px] bg-[#0A0A0C]/95 text-[#E0D8D0] p-3.5 rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-md animate-float"
                  >
                    <p className="text-[11px] font-sans italic text-gold-200/90 leading-relaxed mb-2">
                      &quot;{activeDiya.wish}&quot;
                    </p>
                    <div className="flex justify-between items-center text-[10px] font-serif tracking-wider font-bold text-gold-400 border-t border-white/5 pt-1.5 font-sans">
                      <span>SIGN: {activeDiya.sender.toUpperCase()}</span>
                      <span className="text-[8px] font-mono opacity-50">PR-GRID:{activeDiya.id.slice(0, 6)}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex border-t border-white/5 pt-2 text-[9px] font-mono text-gold-500/40 items-center justify-between">
              <span>ACTIVE DIYAS: {diyas.length}</span>
              <span>FLOW SPEED: CURRENT CONSTANT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
