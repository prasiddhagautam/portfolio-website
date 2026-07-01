import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Calendar, BookOpen, CheckCircle2 } from 'lucide-react'

const Timeline = ({ education }) => {
  const [activeTab, setActiveTab] = useState('university')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const tabData = {
    university: {
      degree: "BSc (Hons) Computer Science with AI",
      institution: "Softwarica College of IT & E-Commerce",
      affiliation: "Coventry University Affiliation",
      duration: "2025 - Present",
      status: "Currently Enrolled",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      iconColor: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10",
      description: "Pursuing specialized studies in Artificial Intelligence. The curriculum covers core computer science, neural networks, machine learning algorithms, and natural language processing.",
    },
    highschool: {
      degree: "Higher Secondary Education (Science)",
      institution: "Khwopa Higher Secondary School",
      affiliation: "National Examinations Board (NEB)",
      duration: "2023 - 2025",
      status: "Grade: A",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      iconColor: "text-purple-400 bg-purple-500/5 border-purple-500/10",
      description: "Completed secondary education with a major focus on physical sciences, advanced mathematics, and foundational computer science studies.",
    }
  }

  const currentData = tabData[activeTab]

  return (
    <section id="education" className="py-16 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Education</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Academic background, learning path, and formal training journey.
            </p>
          </motion.div>

          {/* Tabs Selector */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <div className="bg-slate-950/60 border border-white/10 rounded-full p-1.5 flex space-x-1 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('university')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  activeTab === 'university' ? 'text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === 'university' && (
                  <motion.div
                    layoutId="activeSubTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <GraduationCap size={14} />
                  University
                </span>
              </button>
              <button
                onClick={() => setActiveTab('highschool')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  activeTab === 'highschool' ? 'text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === 'highschool' && (
                  <motion.div
                    layoutId="activeSubTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <BookOpen size={14} />
                  High School
                </span>
              </button>
            </div>
          </motion.div>

          {/* Active Tab Panel */}
          <motion.div variants={itemVariants} className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl hover:border-cyan-500/20 transition-all duration-300 group flex flex-col md:flex-row gap-8 items-start"
              >
                {/* Left side: Large Icon and Duration */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 flex-shrink-0 w-full md:w-auto">
                  <div className={`p-4 rounded-2xl border ${currentData.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    {activeTab === 'university' ? <GraduationCap size={32} /> : <BookOpen size={32} />}
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl text-slate-400 text-xs font-mono">
                    <Calendar size={14} className="text-purple-400" />
                    {currentData.duration}
                  </div>
                </div>

                {/* Right side: Core details */}
                <div className="flex-1 text-left space-y-4">
                  <div className="space-y-2">
                    <span className={`inline-flex border px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold ${currentData.badgeColor}`}>
                      {currentData.status}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                      {currentData.degree}
                    </h3>
                    <p className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                      {currentData.institution} 
                      <span className="text-xs text-slate-500 font-normal">({currentData.affiliation})</span>
                    </p>
                  </div>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {currentData.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Summary card */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/20 transition-all duration-300 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-cyan-400 w-6 h-6 flex-shrink-0" />
              <p className="text-slate-300 text-sm md:text-base font-medium text-left">
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
