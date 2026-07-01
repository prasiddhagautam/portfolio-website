import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ChevronDown, ChevronUp, FolderGit2, Calendar, Zap, Award } from 'lucide-react'

const SystemShowcase = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const toggleProject = (id) =>
    setExpandedProject(expandedProject === id ? null : id)

  // Card highlight gradients based on index
  const cardGlows = [
    'hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-500/30',
    'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:border-purple-500/30',
    'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30',
  ]

  return (
    <section id="projects" className="py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              A curated selection of deep learning tools, concurrent backends, and full-stack solutions.
            </p>
          </motion.div>

          {/* Projects list */}
          <div className="space-y-8">
            {projects.map((project, index) => {
              const glowClass = cardGlows[index % cardGlows.length]
              const isExpanded = expandedProject === project.id

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${glowClass}`}
                  whileHover={{ y: -3 }}
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                            <FolderGit2 size={14} />
                            Active Project
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                            <Calendar size={12} />
                            {project.year}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm font-medium mb-4">{project.subtitle}</p>

                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map(tech => (
                            <span
                              key={tech}
                              className="inline-block bg-white/[0.02] border border-white/5 text-slate-300 px-3 py-1 rounded-lg text-xs font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                              <ExternalLink size={14} />
                              <span>Live Demo</span>
                            </motion.a>
                          )}
                          {project.repoUrl && (
                            <motion.a
                              href={project.repoUrl.startsWith('http') ? project.repoUrl : `https://${project.repoUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-2 border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.02] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300"
                            >
                              <Github size={14} />
                              <span>Source Code</span>
                            </motion.a>
                          )}
                          <motion.button
                            onClick={() => toggleProject(project.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                              isExpanded
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'border border-white/10 hover:border-purple-400/30 hover:bg-white/[0.02] text-white'
                            }`}
                          >
                            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </motion.button>
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
                          className="mt-8 pt-8 border-t border-white/10 overflow-hidden"
                        >
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
                                <Zap size={14} />
                                Core Architecture & Features
                              </h4>
                              <ul className="space-y-3">
                                {project.features.map((f, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                                    <span className="text-cyan-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-2">
                                <Award size={14} />
                                Implementation Highlights
                              </h4>
                              <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-5 mb-4">
                                <p className="text-sm text-slate-300 leading-relaxed">{project.highlights}</p>
                              </div>
                              {project.performance && (
                                <div>
                                  <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Performance Metrics</h5>
                                  <p className="text-sm text-slate-400">{project.performance}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Project stats */}
          <motion.div variants={itemVariants} className="mt-16 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/20 transition-all duration-300 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Development Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">15+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Completed Projects</div>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">25+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Libraries & APIs</div>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">4</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Unique Domains</div>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">2026</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Active Year</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SystemShowcase
