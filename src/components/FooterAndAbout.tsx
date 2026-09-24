import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Twitter, Youtube, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export default function FooterAndAbout() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.email || !emailForm.message) return;
    try {
      const mailtoUrl = `mailto:manojraajjamalpur@gmail.com?subject=${encodeURIComponent(
        `Varanasi Movie Portal Message from ${emailForm.name || 'Visitor'}`
      )}&body=${encodeURIComponent(
        `Sender: ${emailForm.name} (${emailForm.email})\n\nMessage:\n${emailForm.message}`
      )}`;
      window.location.href = mailtoUrl;
    } catch {
      // Fallback gracefully
    }
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setShowContact(false);
      setEmailForm({ name: '', email: '', message: '' });
    }, 3500);
  };

  return (
    <footer id="footer-section" className="relative w-full py-16 px-4 bg-[#0A0A0C] border-t border-white/5 text-[#E0D8D0]">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12">
        
        {/* Left columns / Branding */}
        <div className="max-w-md text-center md:text-left space-y-3">
          <h2 className="text-xl font-serif text-[#F5F2ED] uppercase tracking-widest font-black">
            VARANASI
          </h2>
          <p className="text-gold-200/50 text-xs leading-relaxed font-sans">
            An independent, fan-made interactive portal celebrating the speculative cinematic marvel of director S. S. Rajamouli. Built to gather absolute movie fans.
          </p>
        </div>

        {/* Middle columns / Social Links specified in original site */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-gold-400 font-mono text-[9px] tracking-[0.3em] font-bold uppercase">
            FOLLOW THE TIMELINE
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/varanasimovie/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full border border-white/5 hover:border-gold-500/20 text-gold-500 hover:text-gold-300 transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/VaranasiMovie"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full border border-white/5 hover:border-gold-500/20 text-gold-500 hover:text-gold-300 transition-all duration-300 hover:scale-105"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@varanasimovieofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full border border-white/5 hover:border-gold-500/20 text-gold-500 hover:text-gold-300 transition-all duration-300 hover:scale-105"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Primary bottom credits and mini links */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
        
        <div className="text-[10px] font-mono text-gold-200/40 text-center sm:text-left space-y-1">
          <p>© 2027 VARANASI. All Rights Reserved.</p>
          <p className="uppercase text-[9px] text-gold-500/50 tracking-wider">
            Produced by Sri Durga Arts &amp; Showing Business • K. L. Narayana &amp; S. S. Karthikeya
          </p>
        </div>

        {/* Links section */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-serif tracking-widest text-[#D4AF37]">
          <button
            onClick={() => setShowPrivacy(true)}
            className="hover:text-gold-200 hover:underline cursor-pointer transition-colors font-bold text-[10px] uppercase"
          >
            PRIVACY POLICY
          </button>
          
          <span className="text-white/10 text-xs">|</span>

          <button
            onClick={() => setShowContact(true)}
            className="hover:text-gold-200 hover:underline cursor-pointer transition-colors font-bold text-[10px] uppercase"
          >
            CONTACT
          </button>
          
          <span className="text-white/10 text-xs">|</span>

          <a
            href="https://www.instagram.com/manoj_raaj_1810/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold-200 hover:underline transition-colors font-bold text-[10px] uppercase"
          >
            DEVELOPER <span className="text-gold-400 font-mono font-normal lowercase tracking-normal">@manoj_raaj_1810</span> <ExternalLink className="w-2.5 h-2.5 text-gold-500/50" />
          </a>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivacy(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#0C0C0E] border border-white/10 rounded-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Corner Trim Borders */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-500" />

              <div className="flex items-center space-x-3 text-gold-400 font-mono text-[10px] tracking-[0.2em] font-black uppercase mb-4">
                <ShieldCheck className="w-4 h-4 text-gold-400 animate-pulse" />
                <span>DATA INTEGRITY CHARTER</span>
              </div>

              <h3 className="text-2xl font-serif text-[#F5F2ED] uppercase tracking-widest font-black mb-6">
                Privacy Policy
              </h3>

              <div className="space-y-4 text-gold-200/70 text-xs sm:text-sm font-sans leading-relaxed">
                <p>
                  Welcome to the fan-made Varanasi Countdown application! We are committed to maintaining a private and secure browsing experience. Let it be known:
                </p>
                <div className="h-[1px] w-full bg-white/5 my-4" />
                
                <h4 className="text-gold-400 font-serif font-black uppercase tracking-wider text-xs">
                  1. Local Storage Exclusivity
                </h4>
                <p className="text-gold-200/55">
                  Any interactive variables—such as casting your Diya fan wishes, adjusting synchronizer audio-mix, or sound states—are stored strictly on your local browser (via localStorage). No database connection is created, completely guaranteeing your data does not leave your machine.
                </p>

                <h4 className="text-gold-400 font-serif font-black uppercase tracking-wider text-xs">
                  2. Third-Party Analytics
                </h4>
                <p className="text-gold-200/55">
                  This website does not run any hidden third-party tracking scripts, cookie managers, or advertising networks. We operate entirely out of love for Indian cinema and Rajamouli&apos;s filmmaking vision.
                </p>

                <h4 className="text-gold-400 font-serif font-black uppercase tracking-wider text-xs">
                  3. Dynamic Assets & Permissions
                </h4>
                <p className="text-gold-200/55">
                  We render free, open-source icons (Lucide Icons) and static images imported from official free repositories. We do not demand any access permissions to your camera, location history, or filesystem.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-5 py-2.5 bg-gold-600/10 border border-gold-500/20 text-gold-400 font-serif font-black tracking-widest text-[9px] uppercase rounded-lg hover:bg-gold-500 hover:text-black cursor-pointer transition-colors"
                >
                  CLOSE AGREEMENT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContact(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#0C0C0E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              {/* Corner Trim Borders */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-500" />

              <div className="flex items-center space-x-3 text-gold-400 font-mono text-[10px] tracking-[0.2em] font-black uppercase mb-4">
                <HelpCircle className="w-4 h-4 text-gold-400" />
                <span>INQUIRIES CONTROL</span>
              </div>

              <h3 className="text-2xl font-serif text-[#F5F2ED] uppercase tracking-widest font-black mb-4">
                Contact Developer
              </h3>

              {/* Direct Mail Details */}
              <div className="mb-5 p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gold-500/20 text-gold-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                      Direct Inquiries Email
                    </div>
                    <a
                      href="mailto:manojraajjamalpur@gmail.com"
                      className="text-xs font-mono text-[#F5F2ED] hover:text-gold-300 underline decoration-gold-500/40 transition-colors break-all"
                    >
                      manojraajjamalpur@gmail.com
                    </a>
                  </div>
                </div>
                <a
                  href="mailto:manojraajjamalpur@gmail.com"
                  className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-black font-serif font-black tracking-wider text-[9px] uppercase rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  <Mail className="w-3 h-3" /> Mail Now
                </a>
              </div>

              {/* Developer Instagram Info */}
              <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gold-400">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-gold-400/80 font-semibold">
                      Developer
                    </div>
                    <div className="text-xs font-mono text-white">
                      @manoj_raaj_1810
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/manoj_raaj_1810/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gold-300 hover:text-gold-200 border border-white/10 font-mono text-[9px] uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  Instagram <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {contactSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <span className="inline-block p-4 bg-gold-950/20 border border-gold-500/20 rounded-full text-gold-400 animate-bounce">
                    ✓
                  </span>
                  <p className="text-gold-400 font-serif uppercase tracking-wider text-xs">
                    Transmission Sent to manojraajjamalpur@gmail.com!
                  </p>
                  <p className="text-slate-400 text-xs font-sans">
                    Your inquiry has been addressed to developer @manoj_raaj_1810 at manojraajjamalpur@gmail.com.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gold-200/50 font-mono text-[9px] tracking-wider uppercase mb-1">
                      Identity Name
                    </label>
                    <input
                      required
                      type="text"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#0A0A0C] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-gold-500/50 placeholder-slate-650"
                    />
                  </div>

                  <div>
                    <label className="block text-gold-200/50 font-mono text-[9px] tracking-wider uppercase mb-1">
                      Subspace Email
                    </label>
                    <input
                      required
                      type="email"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      placeholder="jane@galaxy.com"
                      className="w-full bg-[#0A0A0C] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-gold-500/50 placeholder-slate-650"
                    />
                  </div>

                  <div>
                    <label className="block text-gold-200/50 font-mono text-[9px] tracking-wider uppercase mb-1">
                      Coordinates Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                      placeholder="Write your feedback regarding S. S. Rajamouli speculative movie info portal here..."
                      className="w-full bg-[#0A0A0C] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-gold-500/50 placeholder-slate-650 resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContact(false)}
                      className="px-4 py-2 bg-[#0A0A0C] border border-white/5 text-slate-450 rounded-lg hover:border-slate-700 font-serif font-black tracking-widest text-[9px] uppercase cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-black font-serif font-black tracking-widest text-[9px] uppercase rounded-lg shadow-md cursor-pointer transition-all duration-300"
                    >
                      SEND TRANSMISSION
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
