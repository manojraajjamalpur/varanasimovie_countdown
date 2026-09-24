import React, { useState } from 'react';
import { motion } from 'motion/react';
import VaranasiTitleLogo from './components/VaranasiTitleLogo';
import CountdownTimer from './components/CountdownTimer';
import CinematicVideoLightbox from './components/CinematicVideoLightbox';
import FilmInformationTabs from './components/FilmInformationTabs';
import CastCrew from './components/CastCrew';
import GangaRitual from './components/GangaRitual';
import AmbientSound from './components/AmbientSound';
import FooterAndAbout from './components/FooterAndAbout';
import MAIBotModal from './components/MAIBotModal';
import { Eye, ShieldAlert, Sparkles, Milestone, Bot, ShieldCheck } from 'lucide-react';

const EMBER_COUNT = 24;

// Cinematic reveal variants for hero section
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const heroTopBarVariants = {
  hidden: { opacity: 0, y: -16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroLogoVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.92, 
    y: 32, 
    filter: 'blur(10px)' 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 1.15, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

const heroItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 24, 
    filter: 'blur(6px)' 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export default function App() {
  const [isMaiOpen, setIsMaiOpen] = useState(false);

  // Generate random embers dynamically purely on render to keep the temple fire active
  const embers = Array.from({ length: EMBER_COUNT }).map((_, idx) => ({
    id: idx,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div id="varanasi-app-container" className="relative min-h-screen bg-[#0A0A0C] text-[#E0D8D0] font-sans overflow-x-hidden selection:bg-gold-500 selection:text-black">
      
      {/* 1. AMBIANT BACKGROUND ASSETS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep starry space / dark universe backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 bg-no-repeat scale-102 filter blur-xs animate-cosmos mix-blend-screen"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80')` }}
        />
        
        {/* Soft spiritual golden-orange dust filter overlay */}
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_60%)" />
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04)_0%,transparent_70%)" />
        
        {/* Abstract Sophisticated Concentric Background Rings */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#D4AF37]/5 -z-10 pointer-events-none" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#D4AF37]/10 -z-10 pointer-events-none" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#D4AF37]/15 -z-10 pointer-events-none" />
        
        {/* Atmospheric Floating Embers (Upward Fire Sparkles simulation) */}
        {embers.map((embCode) => (
          <motion.div
            key={embCode.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.7, 0.4, 0.9, 0],
              x: ['0px', '25px', '-15px', '10px']
            }}
            transition={{
              duration: embCode.duration,
              repeat: Infinity,
              delay: embCode.delay,
              ease: 'linear'
            }}
            className="absolute rounded-full bg-gradient-to-t from-orange-400 via-gold-300 to-white"
            style={{
              left: embCode.left,
              width: `${embCode.size}px`,
              height: `${embCode.size}px`,
              boxShadow: '0 0 10px rgba(212,175,55,0.8)',
            }}
          />
        ))}
      </div>

      {/* 2. LIVE INTERACTIVE AUDIO DROPS */}
      <AmbientSound />

      {/* 3. HERO EPIC BANNER CONTAINER */}
      <header id="hero-banner" className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 z-10 overflow-hidden">
        
        {/* Top Header Row / Fan Alert & mAI Trigger */}
        <motion.div 
          variants={heroTopBarVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="text-gold-500 font-mono text-[9px] tracking-[0.4em] font-black uppercase border border-gold-500/10 bg-gold-950/25 px-2.5 py-1.5 rounded-md backdrop-blur-xs">
              CINEMATIC FAN PORTAL
            </div>
            
            {/* mAI quick button */}
            <button
              onClick={() => setIsMaiOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 font-mono text-[10px] tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:border-gold-400"
            >
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Ask <strong className="text-gold-200">mAI</strong></span>
            </button>
          </div>

          <div className="text-gold-200/50 font-mono text-[9px] tracking-[0.4em] uppercase flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3 text-gold-500" />
            <span>FAN PREMIERE PORTAL</span>
          </div>
        </motion.div>

        {/* Centerpiece / Official Title Logo & Hero Stack with Staggered Entrance */}
        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex-grow flex flex-col items-center justify-center text-center space-y-6 max-w-5xl py-8 w-full"
        >
          {/* 1. Official Title Logo with dramatic entrance */}
          <motion.div variants={heroLogoVariants} className="w-full flex justify-center">
            <VaranasiTitleLogo />
          </motion.div>

          {/* 2. Tagline and Synopsis */}
          <motion.div
            variants={heroItemVariants}
            className="space-y-4 max-w-xl mx-auto"
          >
            <p className="text-gold-200/90 font-serif italic text-base sm:text-lg tracking-wider">
              &quot;Rudhra is born with a larger purpose and carries a destiny he did not choose for himself. A character defined by contrasting extremes—witty, vulnerable, and fiercely relentless.&quot;
            </p>
            <p className="text-gold-200/60 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
              Experience the highly anticipated globetrotting adventure film starring <span className="text-gold-400 font-bold">Superstar Mahesh Babu</span>, written by K. V. Vijayendra Prasad, coming to theatres on <span className="text-gold-400 font-bold">April 7, 2027</span>.
            </p>
          </motion.div>

          {/* 3. Interactive Countdown block */}
          <motion.div variants={heroItemVariants} className="w-full flex justify-center">
            <CountdownTimer />
          </motion.div>

          {/* 4. Cinematic Video Lightbox Trigger & mAI Oracle Prompt */}
          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center justify-center gap-3">
            <CinematicVideoLightbox />

            <button
              onClick={() => setIsMaiOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#14141E]/90 hover:bg-[#1C1C2A] border border-gold-500/30 hover:border-gold-400/60 text-gold-200 text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <Bot className="w-4 h-4 text-gold-400" />
              <span>Consult <strong>mAI</strong> Oracle</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom indicator row with smooth delayed reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-2 cursor-pointer"
          onClick={() => {
            const el = document.getElementById('ganga-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] font-mono tracking-[0.4em] text-gold-500/50 uppercase">SCROLL TO SACRED AARTI &amp; CAST</span>
          <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" />
        </motion.div>

      </header>

      {/* SACRED RITUALS OF LIGHT (Float a Wish) */}
      <GangaRitual />

      {/* INTERACTIVE mAI SPOTLIGHT BANNER */}
      <section className="relative w-full py-12 px-4 max-w-6xl mx-auto z-10">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#12121A] via-[#1A1A26] to-[#12121A] border border-gold-500/25 p-6 sm:p-8 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          {/* Subtle cosmic background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-gold-500 to-amber-300 p-0.5 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <div className="w-full h-full bg-[#0E0E14] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-7 h-7 text-gold-400" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-bold tracking-wide">
                    Meet <span className="text-gold-400">mAI</span> — The Varanasi Oracle
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    AI Knowledge Bot
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-sans leading-relaxed">
                  Have questions about the storyline across yugas, the Antarctica schedule, the 1.43:1 IMAX format, or the cast and crew? Ask mAI.
                </p>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-mono text-gold-400/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Strictly movie &amp; cast/crew facts • Zero fan wars policy</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMaiOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-gold-500 to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 shrink-0 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Chat with mAI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. COMPREHENSIVE FILM PRODUCTION DOSSIER TABS */}
      <FilmInformationTabs />

      {/* 7. CAST & VISIONARY STELLAR MEMBERS */}
      <CastCrew />

      {/* 8. COMPLETE FOOTER LOGS AND CREDIT HANDLES */}
      <FooterAndAbout />

      {/* 9. mAI BOT MODAL & FLOATING TRIGGER */}
      <MAIBotModal 
        isOpen={isMaiOpen} 
        onOpen={() => setIsMaiOpen(true)} 
        onClose={() => setIsMaiOpen(false)} 
      />

    </div>
  );
}
