import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Globe, 
  Film, 
  Users, 
  Music, 
  Sparkles, 
  Layers, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  Cpu,
  Tv,
  CheckCircle2,
  Clapperboard
} from 'lucide-react';

type TabKey = 'premise' | 'production' | 'technology' | 'cast' | 'release';

interface TabConfig {
  id: TabKey;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const TABS: TabConfig[] = [
  { id: 'premise', label: 'Premise & Lore', icon: BookOpen, badge: 'Treta to Kali Yuga' },
  { id: 'production', label: 'Scale & Locations', icon: Globe, badge: '₹1,400 Cr Budget' },
  { id: 'technology', label: 'Tech & 1.43:1 IMAX', icon: Film, badge: 'World First' },
  { id: 'cast', label: 'Dual Role & Cast', icon: Users, badge: 'Rudhra & Rama' },
  { id: 'release', label: 'Music & Worldwide Release', icon: Music, badge: 'April 7, 2027' },
];

export default function FilmInformationTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('premise');

  return (
    <section id="film-information-dossier" className="relative w-full py-24 px-4 bg-gradient-to-b from-[#0A0A0C] via-[#0D0D11] to-[#0A0A0C] border-t border-white/5 overflow-hidden">
      {/* Ambient background rings & light wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient(ellipse,rgba(212,175,55,0.04)_0%,transparent_70%) blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-gold-500 font-mono tracking-[0.4em] text-xs uppercase mb-3 flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>OFFICIAL PRODUCTION DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F2ED] uppercase tracking-wider mb-4">
            Varanasi: The Master Archive
          </h2>
          <div className="h-[1px] w-36 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mb-5" />
          <p className="text-gold-200/65 text-xs sm:text-sm leading-relaxed font-sans max-w-2xl mx-auto">
            Categorized production intelligence, technological milestones, and lore breakdown for S. S. Rajamouli&apos;s globetrotting Indian epic.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 no-scrollbar gap-2 sm:gap-3 px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-gold-500/15 border-gold-500/50 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#0E0E12]/80 hover:bg-[#15151C] border-white/5 text-gray-400 hover:text-[#E0D8D0]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gray-500'}`} />
                <span className="font-semibold uppercase whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span className={`hidden md:inline text-[9px] px-1.5 py-0.5 rounded font-extrabold tracking-normal ${
                    isActive ? 'bg-gold-500/25 text-gold-200' : 'bg-white/5 text-gray-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="relative min-h-[460px] rounded-2xl border border-white/10 bg-[#0C0C10]/85 backdrop-blur-xl p-5 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait">
            
            {/* 1. PREMISE & STORY TAB */}
            {activeTab === 'premise' && (
              <motion.div
                key="premise"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                    <Compass className="w-4 h-4" />
                    <span>HIGH-CONCEPT STORYLINE &amp; TIME SPAN</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px] tracking-wider font-semibold">
                    GENRE: EPIC ACTION-ADVENTURE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Cataclysmic Crisis</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Asteroid Collision Threat</h4>
                    <p className="text-xs text-gray-300/80 leading-relaxed font-sans">
                      The ancient sacred city of Varanasi in India faces the impending catastrophe of an inbound asteroid.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Yugas &amp; Timelines</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Treta Yuga to Kali Yuga</h4>
                    <p className="text-xs text-gray-300/80 leading-relaxed font-sans">
                      The narrative fractures across millenia, weaving events from the Ramayana era to modern-day Kali Yuga.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Cross-Continental</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Globetrotting Odyssey</h4>
                    <p className="text-xs text-gray-300/80 leading-relaxed font-sans">
                      Action sequences shift across Varanasi, the African forests, the Ross Ice Shelf in Antarctica, and Ancient Rome.
                    </p>
                  </div>
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest font-bold">Key Premise Highlights:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
                    <li className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>Classic Adventure Tone:</strong> Conceived by Rajamouli and V. Vijayendra Prasad in the stylistic vein of <em>Indiana Jones</em> and <em>James Bond</em>, rooted deeply in Vedic philosophy.</span>
                    </li>
                    <li className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>Emotional Weight:</strong> Story elements reflect the visceral emotional resonance of <em>Raiders of the Lost Ark</em> with ancient Indian archaeological stakes.</span>
                    </li>
                    <li className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>The Sacred Labyrinth:</strong> The sacred subterranean corridors beneath Kashi hold an ancient, primordial power essential to earth&apos;s survival.</span>
                    </li>
                    <li className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>60-Day Ramayana Episode:</strong> A monumental cinematic sequence dedicated to the Treta Yuga events that connects the protagonist&apos;s dual lineage.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* 2. SCALE & PRODUCTION TAB */}
            {activeTab === 'production' && (
              <motion.div
                key="production"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                    <Globe className="w-4 h-4" />
                    <span>PRODUCTION SCALE, BUDGET &amp; GLOBAL FILMING</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-300 font-mono text-[10px] tracking-wider font-semibold">
                    EST. BUDGET: ₹1,400 CRORE ($170M+)
                  </span>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-serif text-gold-400 font-bold">₹1,400 Cr</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">Most Expensive Indian Film</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-serif text-gold-400 font-bold">4th in World</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">Shoot in Antarctica</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-serif text-gold-400 font-bold">40% Share</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">Profit-Sharing Model</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-serif text-gold-400 font-bold">15 Years</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">In Planning Since 2010</div>
                  </div>
                </div>

                {/* Location Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest font-bold">Major Filming Expeditions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-gold-400 font-bold font-serif flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        Antarctica (Ross Ice Shelf)
                      </span>
                      <p className="text-gray-400 leading-relaxed">
                        The first Indian film and fourth feature film in global cinematic history to shoot on location on the icy wastes of Antarctica.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-gold-400 font-bold font-serif flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        Kenya (African Wilderness)
                      </span>
                      <p className="text-gray-400 leading-relaxed">
                        Comprehensive jungle expedition footage across Masai Mara, Amboseli National Park, Lake Naivasha, and Samburu.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-gold-400 font-bold font-serif flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        Odisha (Talamali Hilltop, Koraput)
                      </span>
                      <p className="text-gray-400 leading-relaxed">
                        A monumental, life-size ancient Kashi set erected atop the foggy mountains of Semiliguda block for pivotal clash scenes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-gold-400 font-bold font-serif flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        Hyderabad Mega Battle Set
                      </span>
                      <p className="text-gray-400 leading-relaxed">
                        Filmed an enormous climax battle involving Mahesh Babu alongside thousands of junior artists, supervised under heavy NDA security.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. TECH & IMAX 1.43:1 TAB */}
            {activeTab === 'technology' && (
              <motion.div
                key="technology"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>GROUNDBREAKING CINEMATOGRAPHY &amp; VIRTUAL PRODUCTION</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[10px] tracking-wider font-semibold">
                    FIRST NON-ENGLISH 1.43:1 IMAX FILM
                  </span>
                </div>

                {/* Highlight Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gold-500/10 via-amber-500/5 to-transparent border border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-gold-300 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Clapperboard className="w-4 h-4 text-gold-400" />
                      Historic IMAX 1.43:1 Native Aspect Ratio
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      <em>Varanasi</em> is the first non-English feature film in cinema history to shoot in the monumental 1.43:1 IMAX Grand Theatre format, unlocking 40% more vertical visual spectrum than standard wide-screen cinema.
                    </p>
                  </div>
                  <div className="shrink-0 px-3 py-1.5 rounded-md bg-black/60 border border-gold-500/30 text-gold-400 font-mono text-xs font-bold text-center">
                    IMAX GT 70MM
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#F5F2ED] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-gold-400" />
                      A&amp;M Performance MoCap Stage
                    </h5>
                    <p className="text-gray-400 leading-relaxed">
                      Inaugurated at Annapurna Studios in collaboration with Mihira Visual Labs and Animatrik Film Design, it is India&apos;s largest motion capture facility. Powered by 26-megapixel Vicon Valkyrie (VK26) cameras with live Unreal Engine visualization for camera blocking.
                    </p>
                    <span className="inline-block text-[10px] font-mono text-gold-400/80">
                      ★ Features a 25-minute multi-era traversal filmed entirely on this stage.
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#F5F2ED] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      Pure Artist-Driven CGI (No GenAI)
                    </h5>
                    <p className="text-gray-400 leading-relaxed">
                      VFX supervisor V. Srinivas Mohan confirmed that the film&apos;s teaser and effects strictly avoid generative AI in favor of traditional artist-driven CGI to maintain the uncompromising photorealism required by massive IMAX 1.43:1 projections.
                    </p>
                    <span className="inline-block text-[10px] font-mono text-gold-400/80">
                      ★ Primary Vendors: Cinesite (London), Trixter, Assemblage &amp; Phantom FX.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. CAST & CHARACTERS TAB */}
            {activeTab === 'cast' && (
              <motion.div
                key="cast"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                    <Users className="w-4 h-4" />
                    <span>PRINCIPAL CAST &amp; CHARACTER PROFILES</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[10px] tracking-wider font-semibold">
                    STAR LEAD: SUPERSTAR MAHESH BABU (SSMB29)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Dual Role</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Mahesh Babu</h4>
                    <p className="text-xs text-gold-300 font-mono">as Rudhra / Lord Rama</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Plays the witty, fierce adventurer Rudhra alongside an ancient, divine manifestation of Lord Rama across the Treta Yuga storyline.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Female Lead</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Priyanka Chopra</h4>
                    <p className="text-xs text-gold-300 font-mono">as Mandakini</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Marks her grand return to Indian cinema and maiden collaboration with Rajamouli in a fierce, complex, commanding co-lead role.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Antagonist</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Prithviraj Sukumaran</h4>
                    <p className="text-xs text-gold-300 font-mono">as Kumbha</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      A formidable character restricted from physical mobility who conveys power purely through his piercing eyes and psychological presence.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Veteran Powerhouse</span>
                    <h4 className="text-base font-serif text-[#F5F2ED] font-bold">Prakash Raj</h4>
                    <p className="text-xs text-gold-300 font-mono">Key Enigmatic Role</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Joined the ensemble in December 2025 in a pivotal role connected to the secret antiquities of Varanasi.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 flex items-center justify-between">
                  <span><strong>International Casting:</strong> S. S. Rajamouli signed with Creative Artists Agency (CAA) following RRR, incorporating international Hollywood talent for global sequences.</span>
                </div>
              </motion.div>
            )}

            {/* 5. MUSIC & RELEASE TAB */}
            {activeTab === 'release' && (
              <motion.div
                key="release"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>ORIGINAL SOUNDTRACK &amp; GLOBAL THEATRICAL LAUNCH</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] tracking-wider font-semibold">
                    RELEASE: 7 APRIL 2027 (UGADI)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Keeravani Tracklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-gold-400" />
                      Official Tracklist (Composed by M. M. Keeravani):
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-serif font-bold text-[#F5F2ED]">1. GlobeTrotter</div>
                          <div className="text-[10px] font-mono text-gray-400">Shruti Haasan &amp; Kaala Bhairava • Lyrics: Chaitanya Prasad</div>
                        </div>
                        <span className="text-xs font-mono text-gold-400">3:35</span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-serif font-bold text-[#F5F2ED]">2. Rana Kumbha</div>
                          <div className="text-[10px] font-mono text-gray-400">Aditya Iyengar • Lyrics: Chaitanya Prasad</div>
                        </div>
                        <span className="text-xs font-mono text-gold-400">1:40</span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-serif font-bold text-[#F5F2ED]">3. The Arrival</div>
                          <div className="text-[10px] font-mono text-gray-400">M. M. Keeravani Theme Instrumental</div>
                        </div>
                        <span className="text-xs font-mono text-gold-400">3:22</span>
                      </div>
                    </div>
                  </div>

                  {/* Release Parameters */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Tv className="w-3.5 h-3.5 text-gold-400" />
                      Theatrical Distribution Scope:
                    </h4>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2.5 text-xs text-gray-300">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-gray-400">Worldwide Release Date:</span>
                        <span className="text-gold-300 font-mono font-bold">April 7, 2027</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-gray-400">Festival Window:</span>
                        <span className="text-[#F5F2ED] font-mono">Ugadi Festive Weekend</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-gray-400">Global Reach:</span>
                        <span className="text-gold-400 font-mono font-bold">Over 120+ Countries</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-gray-400">Languages:</span>
                        <span className="text-gray-200">Telugu, Hindi, Tamil, Malayalam, Kannada</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Premium Formats:</span>
                        <span className="text-gold-300 font-mono">IMAX 1.43:1 • Dolby Cinema • 4K Laser</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
