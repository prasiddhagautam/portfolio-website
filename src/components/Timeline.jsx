import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react'

const Timeline = ({ education, certifications }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="education" className="py-16 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Education &amp; <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Academic background, continuous learning path, and professional training.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education block */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <GraduationCap size={22} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Academic Studies</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-mono mb-3">
                    BSc (Hons) Student
                  </span>
                  <h4 className="text-lg font-bold text-white mb-1 leading-snug">{education.degree}</h4>
                  <p className="text-slate-400 text-sm font-medium mb-1">Softwarica College of IT &amp; E-Commerce</p>
                  <p className="text-slate-500 text-xs font-mono">Coventry University Partner | 2025 - Present</p>
                </div>

                {education.studyFocus && education.studyFocus.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Curriculum Focus Area</p>
                    <div className="flex flex-wrap gap-2">
                      {education.studyFocus.map(topic => (
                        <span
                          key={topic}
                          className="inline-block bg-white/[0.02] border border-white/5 text-slate-300 px-3 py-1 rounded-lg text-xs font-mono"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Secondary level studies */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="inline-block bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-mono">
                    NEB +2 Science Student
                  </span>
                  <h4 className="text-lg font-bold text-white mb-1 leading-snug">Higher Secondary Education (Science)</h4>
                  <p className="text-slate-400 text-sm font-medium mb-1">Khwopa Higher Secondary School</p>
                  <p className="text-slate-500 text-xs font-mono">Grade : A | 2023 - 2025</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications block */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  <Award size={22} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Certifications &amp; Achievements</h3>
              </div>

              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-purple-400 mt-0.5">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cert.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary card */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/20 transition-all duration-300 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-cyan-400 w-6 h-6 flex-shrink-0" />
              <p className="text-slate-300 text-sm md:text-base font-medium">
                Actively learning and seeking opportunities to apply AI models in industry-standard products.
              </p>
            </div>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-xs uppercase font-bold tracking-wider rounded-full transition-all duration-300 shadow-lg flex-shrink-0"
            >
              Collaborate
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
