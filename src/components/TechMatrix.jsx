import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Server, Brain, Eye, Palette, Database } from 'lucide-react'

const categoryIcons = {
  Languages: Code,
  'Core & Full-Stack': Server,
  'AI & LLM Architecture': Brain,
  'Data Intelligence & CV': Eye,
  'Product Design & Experience': Palette,
  'Databases & Cloud': Database,
}

const categoryColors = {
  Languages: 'from-cyan-500 to-blue-500 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  'Core & Full-Stack': 'from-blue-500 to-indigo-500 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  'AI & LLM Architecture': 'from-indigo-500 to-purple-500 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  'Data Intelligence & CV': 'from-purple-500 to-pink-500 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  'Product Design & Experience': 'from-pink-500 to-cyan-500 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]',
  'Databases & Cloud': 'from-cyan-500 to-purple-500 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
}

const TechMatrix = ({ skills }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const keywords = [
    'Python', 'Flask', 'MySQL', 'React', 'TypeScript', 'Node.js', 
    'Express', 'MongoDB', 'Socket.IO', 'PyTorch', 'CUDA', 'OpenCV', 
    'Unity', 'C#', 'Figma', 'UI/UX', 'RAG', 'LLMs', 'DSP'
  ]

  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Skills & <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              My technical toolkit spanning core software engineering, artificial intelligence systems, computer vision, and product design.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => {
              const IconComponent = categoryIcons[category] || Code
              const cardColorClass = categoryColors[category] || 'from-cyan-500 to-blue-500 hover:border-cyan-500/30'

              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className={`bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 group ${cardColorClass}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-white/5 text-cyan-400 group-hover:text-white transition-colors duration-300">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                        className="inline-block bg-white/[0.02] border border-white/5 text-slate-300 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Key Capabilities Show Case */}
          <motion.div variants={itemVariants} className="mt-16 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/20 transition-all duration-300 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Primary Core Domains
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors">
                <h4 className="font-bold text-white text-sm mb-2">Deep Learning & CV</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Building and deploying computer vision and sequence detection pipelines using OpenCV, PyTorch, and CUDA.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors">
                <h4 className="font-bold text-white text-sm mb-2">Full-Stack & APIs</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Architecting concurrent backend pipelines and REST APIs using Python, Flask, Node.js, and relational databases.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors">
                <h4 className="font-bold text-white text-sm mb-2">AI & RAG</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Exploring prompt optimization, vector embeddings, semantic retrieval, and multi-agent systems orchestration.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Keywords cloud */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {keywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="text-xs text-slate-500 hover:text-cyan-400 transition-colors duration-300 font-mono tracking-tight"
                  whileHover={{ scale: 1.05 }}
                >
                  #{keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechMatrix
