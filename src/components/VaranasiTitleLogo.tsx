import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface VaranasiTitleLogoProps {
  className?: string;
  variant?: 'white' | 'gold';
}

export default function VaranasiTitleLogo({ className = '', variant = 'white' }: VaranasiTitleLogoProps) {
  const [activeVariant, setActiveVariant] = useState<'white' | 'gold'>(variant);

  const isGold = activeVariant === 'gold';
  const primaryColor = isGold ? '#F6DC8A' : '#FFFFFF';
  const secondaryColor = isGold ? '#D4AF37' : '#E0E0E8';
  const glowColor = isGold ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.3)';

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Top action row: Mode selector */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-3 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setActiveVariant(activeVariant === 'white' ? 'gold' : 'white')}
          className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 bg-black/50 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-lg"
          title="Toggle between Original White (Official Teaser) and Golden Aarti Edition"
        >
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>{activeVariant === 'white' ? 'ORIGINAL TEASER LOGO (WHITE)' : 'GOLDEN EMBERS EDITION'}</span>
        </button>
      </motion.div>

      {/* Main Vector Artwork Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl px-2 sm:px-4"
      >
        <svg
          id="varanasi-official-svg-logo"
          viewBox="0 0 1400 680"
          className="w-full h-auto overflow-visible drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
          style={{
            filter: isGold 
              ? 'drop-shadow(0 0 25px rgba(212,175,55,0.35)) drop-shadow(0 0 70px rgba(212,175,55,0.15))' 
              : 'drop-shadow(0 0 22px rgba(255,255,255,0.25)) drop-shadow(0 0 60px rgba(255,255,255,0.08))'
          }}
          aria-label="Varanasi - S. S. Rajamouli Film Title Logo"
          role="img"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="whiteLetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E0E8" />
            </linearGradient>

            <linearGradient id="goldLetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF4C2" />
              <stop offset="45%" stopColor="#F5D77F" />
              <stop offset="85%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C771C" />
            </linearGradient>

            <linearGradient id="arcSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.05" />
              <stop offset="15%" stopColor={primaryColor} stopOpacity="0.8" />
              <stop offset="50%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="85%" stopColor={primaryColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.05" />
            </linearGradient>

            {/* Circular Path for the Top-Right Rubber Stamp */}
            <path
              id="stampArchTop"
              d="M 1160,150 A 42,42 0 1,1 1244,150"
              fill="none"
            />
            <path
              id="stampArchBottom"
              d="M 1244,150 A 42,42 0 1,1 1160,150"
              fill="none"
            />
          </defs>

          {/* ========================================================= */}
          {/* 1. TOP-RIGHT STAMP: "an s s raja mouli film"              */}
          {/* Weathered circular production seal                        */}
          {/* ========================================================= */}
          <g id="rajamouli-stamp" className="transition-all duration-300 opacity-90 hover:opacity-100">
            {/* Outer grunge circle */}
            <circle
              cx="1202"
              cy="150"
              r="48"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.2"
              strokeDasharray="6 2 12 3 18 2 4 2"
              opacity="0.9"
            />
            {/* Secondary distressed ring */}
            <circle
              cx="1202"
              cy="150"
              r="43"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="1.2"
              strokeDasharray="14 3 6 2 20 2"
              opacity="0.65"
            />
            {/* Center soft inner guide */}
            <circle
              cx="1202"
              cy="150"
              r="30"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="0.8"
              opacity="0.25"
            />

            {/* Text along top arch */}
            <text
              fill={primaryColor}
              fontSize="9.5"
              fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
              fontWeight="700"
              letterSpacing="0.22em"
              opacity="0.95"
            >
              <textPath href="#stampArchTop" startOffset="50%" textAnchor="middle">
                AN S S RAJA MOULI
              </textPath>
            </text>

            {/* Text along bottom arch */}
            <text
              fill={primaryColor}
              fontSize="9.5"
              fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
              fontWeight="700"
              letterSpacing="0.32em"
              opacity="0.95"
            >
              <textPath href="#stampArchBottom" startOffset="50%" textAnchor="middle">
                FILM
              </textPath>
            </text>
          </g>

          {/* ========================================================= */}
          {/* 2. THE CELESTIAL HORIZON / BOW PARABOLIC ARC              */}
          {/* Sweeps across the entire composition                      */}
          {/* ========================================================= */}
          <g id="celestial-arc">
            {/* Ambient diffuse aura */}
            <path
              d="M 115,480 C 360,195 980,195 1265,480 C 980,218 360,218 115,480 Z"
              fill={glowColor}
              opacity="0.4"
            />
            {/* Solid sharp celestial crescent arc */}
            <path
              d="M 115,480 C 360,195 980,195 1265,480 C 980,218 360,218 115,480 Z"
              fill="url(#arcSweepGrad)"
            />
          </g>

          {/* ========================================================= */}
          {/* 3. SUBTITLE: "S S   R A J A M O U L I ' S"                */}
          {/* Nestled squarely between the two temple flags             */}
          {/* ========================================================= */}
          <g id="director-subtitle">
            <text
              x="670"
              y="326"
              textAnchor="middle"
              fill={primaryColor}
              fontFamily="'Cinzel', 'Playfair Display', 'Bodoni Moda', Georgia, serif"
              fontSize="23"
              fontWeight="700"
              letterSpacing="0.44em"
              opacity="0.98"
            >
              S S   R A J A M O U L I &apos; S
            </text>
          </g>

          {/* ========================================================= */}
          {/* 4. TEMPLE FLAGS ON APEX OF 1st 'A' AND 3rd 'A'            */}
          {/* Traditional Hindu temple pennants fluttering rightward    */}
          {/* ========================================================= */}
          {/* Flag 1 (mounted at apex of 1st 'A' at x=390, y=348) */}
          <g id="flag-left" transform="translate(390, 318)">
            {/* Vertical flagstaff */}
            <line x1="0" y1="32" x2="0" y2="4" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Fluttering pennant with two gentle ripples */}
            <path
              d="M 0,5 C 16,1 30,12 46,5 C 34,16 18,7 0,20 Z"
              fill={primaryColor}
            />
          </g>

          {/* Flag 2 (mounted at apex of 3rd 'A' at x=945, y=348) */}
          <g id="flag-right" transform="translate(945, 318)">
            {/* Vertical flagstaff */}
            <line x1="0" y1="32" x2="0" y2="4" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Fluttering pennant with two gentle ripples */}
            <path
              d="M 0,5 C 16,1 30,12 46,5 C 34,16 18,7 0,20 Z"
              fill={primaryColor}
            />
          </g>

          {/* ========================================================= */}
          {/* 5. MAIN LETTERS: "V Ā R Ā N Ā S I"                          */}
          {/* High-contrast dramatic serif display typography           */}
          {/* ========================================================= */}
          <g
            id="main-letters"
            fill={isGold ? 'url(#goldLetterGrad)' : 'url(#whiteLetterGrad)'}
            fontFamily="'Bodoni Moda', 'Playfair Display', 'Cinzel', Georgia, serif"
            fontWeight="900"
            fontSize="182"
            letterSpacing="0.04em"
            style={{ fontFeatureSettings: '"titl" 1, "smcp" 0' }}
          >
            {/* Letter 1: V (Left arm sliced by celestial arc) */}
            <text x="240" y="505" textAnchor="middle">V</text>

            {/* Letter 2: A (Apex directly carries Flag 1) */}
            <text x="390" y="505" textAnchor="middle">A</text>

            {/* Letter 3: R (Flared classical leg) */}
            <text x="530" y="505" textAnchor="middle">R</text>

            {/* Letter 4: A (Middle A pierced by diagonal spear) */}
            <text x="668" y="505" textAnchor="middle">A</text>

            {/* Letter 5: N (Sharp bilateral serifs) */}
            <text x="808" y="505" textAnchor="middle">N</text>

            {/* Letter 6: A (Apex directly carries Flag 2) */}
            <text x="948" y="505" textAnchor="middle">A</text>

            {/* Letter 7: S (High-contrast sweeping curves) */}
            <text x="1075" y="505" textAnchor="middle">S</text>

            {/* Letter 8: I (Classical serif pillar) */}
            <text x="1178" y="505" textAnchor="middle">I</text>
          </g>

          {/* ========================================================= */}
          {/* 6. THE DIAGONAL SPEAR / BLADE SLASH                       */}
          {/* Slices from top-right down across the middle 'A' to base   */}
          {/* ========================================================= */}
          <g id="diagonal-slash">
            {/* Dynamic blade aura glow */}
            <line
              x1="840"
              y1="145"
              x2="520"
              y2="530"
              stroke={glowColor}
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Sharp tapered blade polygon */}
            <polygon
              points="842,145 838,148 518,530 523,528"
              fill={isGold ? 'url(#goldLetterGrad)' : 'url(#whiteLetterGrad)'}
            />
            {/* Needle sharp terminal points */}
            <circle cx="840" cy="145" r="1.5" fill={primaryColor} />
            <circle cx="520" cy="530" r="1.5" fill={primaryColor} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
