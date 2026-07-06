import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ChevronDown, ChevronUp, Folder, Calendar, Cpu, Award } from 'lucide-react';

const SystemShowcase = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-black/5">
      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-left mb-16 space-y-4">
          <div className="text-sm sm:text-base uppercase tracking-widest font-lostlate font-bold text-amber-600 mb-1">
            Portfolio &amp; Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight">
            Featured <span className="text-amber-500 font-spark font-normal text-5xl sm:text-6xl md:text-7xl ml-2 inline-block relative -top-[0.08em] transform -rotate-2">Work</span>
          </h2>
          <p className="text-black/60 max-w-xl text-sm md:text-base leading-relaxed">
            A curated selection of intelligent AI applications, concurrent databases, real-time software, and full-stack solutions.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-8">
          {projects.map((project) => {
            const isExpanded = expandedProject === project.id;

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 text-left space-y-4">
                      
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-amber-600 font-mono font-semibold uppercase tracking-widest">
                          <Folder size={12} />
                          Active Project
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                        <span className="flex items-center gap-1 text-xs text-black/50 font-mono font-semibold">
                          <Calendar size={12} />
                          {project.year}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-black/50 text-sm font-semibold mt-1">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-black/75 text-sm md:text-base leading-relaxed max-w-3xl">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono font-medium bg-black/5 text-black/80 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-black text-white hover:bg-black/85 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300"
                          >
                            <ExternalLink size={12} className="text-amber-500" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl.startsWith('http') ? project.repoUrl : `https://${project.repoUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 border border-black/10 hover:border-black/30 hover:bg-black/5 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300"
                          >
                            <Github size={12} />
                            <span>Source Code</span>
                          </a>
                        )}
                        <button
                          onClick={() => toggleProject(project.id)}
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                            isExpanded
                              ? 'bg-amber-500 text-black'
                              : 'border border-black/10 hover:border-black/30 hover:bg-black/5 text-black'
                          }`}
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 pt-8 border-t border-black/5 grid md:grid-cols-2 gap-8 text-left">
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-600 flex items-center gap-2">
                              <Cpu size={12} />
                              Architecture &amp; Features
                            </h4>
                            <ul className="space-y-2.5">
                              {project.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-black/70 leading-relaxed">
                                  <span className="text-amber-500 mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-black/40 flex items-center gap-2">
                              <Award size={12} />
                              Implementation Highlights
                            </h4>
                            <div className="bg-black/5 rounded-[1.5rem] p-6">
                              <p className="text-sm text-black/75 leading-relaxed">{project.highlights}</p>
                            </div>
                            {project.performance && (
                              <div className="pt-2">
                                <h5 className="text-[10px] font-bold uppercase tracking-wider text-black/40 font-mono">Performance Metric</h5>
                                <p className="text-xs text-black/60 mt-1 font-semibold">{project.performance}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default SystemShowcase;
