import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Award, Brain, Compass, HelpCircle } from 'lucide-react'

const CoreProfile = ({ data, achievements }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const icons = [Brain, Award, Compass, HelpCircle]

  return (
    <section id="about" className="py-16 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Bio & Philosophy Card */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 shadow-xl group">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <User size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">About Me</h3>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    {data.summary}
                  </p>
                  <div className="relative p-5 bg-purple-500/5 border-l-4 border-purple-500 rounded-r-lg">
                    <p className="text-purple-300 font-medium italic text-sm md:text-base">
                      "{data.philosophy}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 shadow-xl group">
                <h4 className="text-base font-bold text-white flex items-center gap-2 m-0">
                  <span className="text-cyan-400 text-lg">📍</span> Kathmandu, Nepal
                </h4>
              </div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Highlights</h3>
                </div>
                
                <div className="space-y-4">
                  {achievements.map((ach, i) => {
                    const Icon = icons[i % icons.length]
                    return (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-start space-x-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-2 rounded-lg bg-white/5 text-cyan-400 mt-0.5">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white mb-0.5">{ach.title}</div>
                          <div className="text-xs text-slate-400 leading-normal">{ach.description}</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">15+</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">AI/ML</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Focus</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreProfile
