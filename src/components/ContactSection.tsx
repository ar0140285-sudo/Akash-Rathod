import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Twitter,
  Code2,
  Youtube,
  Instagram,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData } from '../types/portfolio';

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Collaboration',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#c084fc']
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recipient = profile.socials.email || 'ar0140285@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Hello Akash,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from ${profile.name}'s Portfolio Website`
    );

    // Direct mailto link that opens user's email client addressed to Akash
    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#34d399', '#818cf8']
      });

      // Try opening mail client
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          Start a Conversation
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Let&apos;s Build Something Iconic
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Open for select engineering roles, spatial web contracts, and technical advisory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Direct Contact Info & Social Glass Cards (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Quick Copy Email Box */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 space-y-4 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Direct Communication
            </span>

            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                  {profile.socials.email}
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Response time: &lt; 24 hours</span>
              </div>
            </div>
          </div>

          {/* Social Hub Links Grid */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 space-y-4 shadow-xl flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Official Channels
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Github className="w-4 h-4 text-slate-200" />
                  <span>GitHub</span>
                </a>
              )}

              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              )}

              {profile.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Twitter className="w-4 h-4 text-sky-400" />
                  <span>Twitter / X</span>
                </a>
              )}

              {profile.socials.leetcode && (
                <a
                  href={profile.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>LeetCode</span>
                </a>
              )}

              {profile.socials.codeforces && (
                <a
                  href={profile.socials.codeforces}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Code2 className="w-4 h-4 text-red-400" />
                  <span>Codeforces</span>
                </a>
              )}

              {profile.socials.youtube && (
                <a
                  href={profile.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Glass Contact Form (Span 7) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
            Send an Encrypted Note
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Share project ideas, questions, or invite {profile.name} to collaborate.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                Email Client Triggered!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                A draft has been initiated directly to <span className="text-cyan-300 font-mono font-medium">{profile.socials.email}</span> with your message details.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}&su=${encodeURIComponent(
                    `[Portfolio Inquiry] ${formData.subject}`
                  )}&body=${encodeURIComponent(
                    `Hello Akash,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-white transition-all shadow-md cursor-pointer"
                >
                  Open in Gmail Web
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject / Scope
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, tech stack or opportunities..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-white transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
