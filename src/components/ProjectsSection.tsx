import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, X, Layers, Code, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & 3D', 'Full Stack', 'Fintech'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Engineered with Precision & Taste
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A curated showcase of spatial web experiences, distributed architectures, and machine-intelligence applications.
          </p>
        </div>

        {/* Functional Segmented Filter Tabs (Zero-Pill compliant functional buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl glass-panel-subtle border border-white/10 shrink-0 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const isLarge = index === 0;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl overflow-hidden glass-panel border border-white/10 glass-card-interactive cursor-pointer flex flex-col ${
                isLarge ? 'md:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/80">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top-Right Quick Action Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/15 text-slate-300 group-hover:text-cyan-300 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Unboxed category & metric metadata */}
                {project.metrics && (
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span>{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-mono">
                    <span className="text-cyan-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Interactive Production</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Clean unboxed technology stack with subtle dot separators */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-300 hover:text-cyan-300 transition-colors">
                        {tech}
                      </span>
                      {i < project.technologies.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>{selectedProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.metrics || 'Production Ready'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Tech Stack List */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Tech Stack Architecture
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-200">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-white transition-all shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Preview</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-200 glass-panel-subtle hover:bg-white/10 hover:text-white border border-white/15 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
