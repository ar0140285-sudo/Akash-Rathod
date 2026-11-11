import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCES } from '../data/defaultPortfolio';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          Career Trajectory
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Experience & Milestones
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Engineering products at scale across startups, interactive labs, and high-velocity teams.
        </p>
      </div>

      <div className="relative border-l border-white/15 ml-4 sm:ml-32 md:ml-40 space-y-12">
        {EXPERIENCES.map((item, idx) => (
          <div key={item.id} className="relative pl-8 sm:pl-10 group">
            {/* Timeline node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_#38bdf8]" />

            {/* Date marker for desktop (positioned to the left of the timeline line) */}
            <div className="hidden sm:block absolute -left-36 md:-left-44 top-1 text-right text-xs font-mono text-cyan-300 tabular-nums">
              {item.period}
            </div>

            {/* Glassmorphic card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 glass-card-interactive">
              {/* Mobile date marker */}
              <div className="sm:hidden text-xs font-mono text-cyan-400 mb-2">
                {item.period}
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {item.role}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-cyan-300 font-medium">{item.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 mb-6">
                {item.description.map((desc, dIdx) => (
                  <li key={dIdx} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 mt-2 shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
