import React, { useState } from 'react';
import { Terminal, Cpu, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/defaultPortfolio';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Category Selector (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              Capabilities & Mastery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Technical Architecture & Toolkit
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Synthesizing scalable backend infrastructure, real-time WebGL graphics, and machine-learning intelligence into cohesive digital experiences.
            </p>
          </div>

          {/* Interactive Category Selector Buttons */}
          <div className="space-y-2.5 pt-2">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const isActive = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'glass-panel border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 shadow-lg'
                      : 'glass-panel-subtle border-white/5 text-slate-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-600'
                      }`}
                    />
                    <span className="font-semibold text-sm sm:text-base font-display">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {cat.skills.length} competencies
                  </span>
                </button>
              );
            })}
          </div>

          {/* Architectural Principles Box */}
          <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
              Core Principles
            </span>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>60 FPS GPU-accelerated interaction with zero GC bottlenecks</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Type-safe, end-to-end architectures with resilient fallback states</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Accessible, semantic, and high-performance Web standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Category Skill Progress Bars & Gauges (Span 7) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {SKILL_CATEGORIES[activeCategoryIndex].name}
            </h3>
            <span className="text-xs font-mono text-cyan-300">
              Proficiency Benchmark
            </span>
          </div>

          <div className="space-y-5">
            {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5 group">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200 group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-slate-900/80 border border-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick interactive tags footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500 py-1">Tools & Ecosystem:</span>
            {['Vite', 'Git', 'Linux / Bash', 'Postman', 'Figma', 'Jest / Vitest', 'Docker'].map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
