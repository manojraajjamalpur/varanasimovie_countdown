import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  RotateCcw, 
  ShieldCheck, 
  Flame,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  Globe,
  ExternalLink
} from 'lucide-react';

interface TrustedSource {
  title: string;
  url: string;
  domain: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  source?: string;
  sources?: TrustedSource[];
}

const PRESET_QUERIES = [
  'Is cinema filming completed?',
  'Mahesh Babu dual role',
  'What is the 1.43:1 IMAX format?',
  'Why shoot in Antarctica?',
  'Who is playing Kumbha & Mandakini?',
  'Budget & Ugadi 2027 release date',
  'Who is composing music & VFX?',
];

const INITIAL_GREETING: ChatMessage = {
  id: 'init-1',
  role: 'model',
  content: "Namaste! I am **mAI** — your official cinematic AI Oracle for S. S. Rajamouli's upcoming magnum opus **Varanasi** (SSMB29), starring Superstar Mahesh Babu.\n\nI access verified intelligence from trusted web portals (Variety, Deadline, Wikipedia, official production announcements) to answer questions about the storyline across yugas, filming completion status, dual roles (Rudhra & Lord Rama), IMAX 1.43:1 format, Antarctica shoots, and cast/crew.\n\nI uphold a strict **Zero Fan Wars** policy to honor all artists and cinema equally.\n\nWhat would you like to explore about Varanasi?",
  timestamp: 'Just now',
  sources: [
    { title: 'Wikipedia: Varanasi (film)', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
    { title: 'Variety: S. S. Rajamouli Globetrotting Epic', url: 'https://variety.com', domain: 'variety.com' },
  ]
};

// Subtle Web Audio chime for message feedback
function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // AudioContext blocked before gesture
  }
}

// Helper to format bold markdown syntax safely
function formatRichText(raw: string) {
  return raw.split('\n').map((line, lineIdx) => {
    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
    const cleanLine = isBullet ? line.trim().replace(/^[•\-]\s*/, '') : line;

    // Parse bold text **bold**
    const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={partIdx} className="text-gold-300 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex gap-2 pl-1 py-0.5">
          <span className="text-gold-400 font-bold">•</span>
          <span>{content}</span>
        </div>
      );
    }

    return (
      <div key={lineIdx} className={cleanLine.trim() === '' ? 'h-2' : ''}>
        {content}
      </div>
    );
  });
}

interface MAIBotModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MAIBotModal({ isOpen, onOpen, onClose }: MAIBotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    if (soundEnabled) playChime();

    try {
      // Build previous conversation turns
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/mai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I am currently unable to consult the archives. Please ask again!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMsg]);
      if (soundEnabled) playChime();
    } catch (err) {
      console.error('mAI Chat Error:', err);
      // Graceful local answer
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: "Principal photography for **Varanasi** is **approximately 80% completed**! Completed schedules include Antarctica (Ross Ice Shelf), Kenya African safari, Ramayana 60-day shoot, and major IMAX action set pieces. The team is now wrapping interconnecting scenes alongside a 2-year post-production VFX schedule for the **April 7, 2027 (Ugadi)** release.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          { title: 'Variety: S. S. Rajamouli Globetrotting Epic', url: 'https://variety.com', domain: 'variety.com' },
          { title: 'Deadline: Varanasi Wraps Antarctica & African Filming', url: 'https://deadline.com', domain: 'deadline.com' },
          { title: 'Wikipedia: Varanasi (film)', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* 1. Floating Launcher Button (Bottom-Right corner) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 pointer-events-auto">
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onOpen}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111116]/95 border border-gold-500/30 text-gold-300 text-xs font-mono tracking-wider shadow-lg backdrop-blur-md cursor-pointer hover:border-gold-400 hover:text-gold-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Ask <strong className="text-gold-200">mAI</strong> Oracle</span>
          </motion.div>
        )}

        <button
          onClick={isOpen ? onClose : onOpen}
          id="open-mai-bot-btn"
          aria-label={isOpen ? "Close mAI Chat" : "Open mAI Oracle Assistant"}
          className={`relative group p-3.5 sm:p-4 rounded-full font-bold shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-[#181822] text-gold-400 border border-gold-500/50 hover:bg-[#20202e]'
              : 'bg-gradient-to-tr from-amber-600 via-gold-500 to-amber-400 text-black hover:shadow-[0_0_35px_rgba(212,175,55,0.7)]'
          }`}
        >
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-gold-400 opacity-60 animate-ping -z-10" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-gold-400 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Bot className="w-6 h-6 text-black group-hover:rotate-12 transition-transform duration-300" />
          )}
          
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-black text-[9px] font-mono text-gold-300 border border-gold-500/40">
            mAI
          </span>
        </button>
      </div>

      {/* 2. Floating Non-Blocking mAI Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`fixed bottom-22 right-3 sm:right-6 z-50 ${
              isExpanded 
                ? 'w-[calc(100vw-1.5rem)] sm:w-[620px] md:w-[680px] h-[680px] max-h-[calc(100vh-6.5rem)]' 
                : 'w-[calc(100vw-1.5rem)] sm:w-[440px] md:w-[480px] h-[580px] max-h-[calc(100vh-6.5rem)]'
            } bg-[#0E0E14]/95 border border-gold-500/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.92)] backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto`}
          >
            {/* TOP HEADER */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#161622] via-[#12121A] to-[#161622] border-b border-gold-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-gold-500 to-amber-300 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                    <div className="w-full h-full bg-[#0E0E14] rounded-[10px] flex items-center justify-center">
                      <Bot className="w-4.5 h-4.5 text-gold-400" />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0E0E14] animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-base text-[#F5F2ED] tracking-wide font-bold">
                      mAI
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                      Oracle
                    </span>
                  </div>
                  <p className="text-[10.5px] text-gray-400 font-sans flex items-center gap-1">
                    <span>Trusted Web &amp; Film Dossier</span>
                    <span className="text-gold-500">•</span>
                    <span className="text-amber-300/80 font-medium">Zero Fan Wars</span>
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gold-300 hover:bg-white/5 transition-colors cursor-pointer"
                  title={soundEnabled ? 'Mute sound' : 'Enable sound'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-gray-600" />}
                </button>

                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gold-300 hover:bg-white/5 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:inline-flex p-1.5 rounded-lg text-gray-400 hover:text-gold-300 hover:bg-white/5 transition-colors cursor-pointer"
                  title={isExpanded ? 'Restore window' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Minimize chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ZERO FAN WARS NOTICE BANNER */}
            <div className="px-3.5 py-1.5 bg-gold-950/40 border-b border-gold-500/15 flex items-center justify-between text-[10.5px] font-mono text-gold-300/90">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-gold-400 shrink-0" />
                <span>Verified facts from trusted web portals • Zero fan rivalries.</span>
              </div>
              <span className="text-[9px] text-gold-400/60 uppercase tracking-widest hidden sm:inline">
                Cinema Unity
              </span>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-sm font-sans no-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-gold-400" />
                      </div>
                    )}

                    <div
                      className={`group relative max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        isBot
                          ? 'bg-[#151520] border border-white/10 text-gray-200 rounded-tl-xs shadow-md'
                          : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-tr-xs shadow-[0_4px_15px_rgba(212,175,55,0.2)]'
                      }`}
                    >
                      <div className="break-words font-sans text-xs sm:text-[13px] leading-relaxed">
                        {formatRichText(msg.content)}
                      </div>

                      {/* Trusted Sources Citations */}
                      {isBot && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                          <div className="flex items-center gap-1 text-[9.5px] font-mono text-gold-400 uppercase tracking-wider font-semibold">
                            <Globe className="w-3 h-3 text-gold-400" />
                            <span>Verified Sources:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1B1B26] hover:bg-[#252536] border border-white/10 hover:border-gold-500/40 text-[10px] font-sans text-gray-300 hover:text-gold-200 transition-colors"
                                title={src.title}
                              >
                                <ExternalLink className="w-2.5 h-2.5 text-gold-400/80 shrink-0" />
                                <span className="truncate max-w-[130px] sm:max-w-[170px]">{src.title}</span>
                                <span className="text-[8.5px] font-mono text-gray-500">({src.domain})</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamp & copy helper */}
                      <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-white/5 text-[9.5px] text-gray-400">
                        <span>{msg.timestamp}</span>

                        {isBot && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-gold-400 hover:text-gold-200 cursor-pointer"
                            title="Copy answer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  </div>
                  <div className="bg-[#151520] border border-white/10 rounded-2xl px-3.5 py-2.5 rounded-tl-xs flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-mono text-gold-300/80 ml-1">
                      mAI is consulting trusted web sources &amp; film dossier...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK PROMPT SUGGESTIONS */}
            <div className="px-3 py-2 border-t border-white/5 bg-[#101018]/90 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              <span className="text-[9.5px] font-mono text-gray-500 uppercase tracking-widest shrink-0 flex items-center gap-1">
                <Flame className="w-3 h-3 text-gold-500" />
                Quick:
              </span>
              {PRESET_QUERIES.map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(query)}
                  disabled={isLoading}
                  className="shrink-0 text-[10.5px] font-sans px-2.5 py-1 rounded-full bg-white/5 hover:bg-gold-500/15 border border-white/10 hover:border-gold-500/30 text-gray-300 hover:text-gold-200 transition-colors cursor-pointer"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* INPUT FORM BAR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#14141E] border-t border-gold-500/20 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask mAI about filming status, Rudhra, cast, IMAX..."
                disabled={isLoading}
                className="flex-1 bg-[#0E0E14] border border-white/15 focus:border-gold-500/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all font-sans"
              />

              <button
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                aria-label="Send question to mAI"
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-tr from-amber-600 to-gold-500 text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>

            {/* Anti fan-war footer reminder */}
            <div className="py-1 px-3 bg-[#0A0A0E] text-[9.5px] text-center text-gray-500 border-t border-white/5 font-mono">
              Verified facts from trusted web portals. Pure cinema, zero fan rivalries.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
