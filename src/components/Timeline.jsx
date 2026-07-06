import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';

const Timeline = ({ education }) => {
  const [activeTab, setActiveTab] = useState('university');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const tabData = {
    university: {
      degree: "BSc (Hons) Computer Science with AI",
      institution: "Softwarica College of IT & E-Commerce",
      affiliation: "Coventry University",
      duration: "2025 - Present",
      status: "Currently Enrolled",
      badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
      description: "Pursuing specialized studies in Artificial Intelligence. The curriculum covers core computer science, neural networks, machine learning algorithms, and natural language processing.",
    },
    highschool: {
      degree: "Higher Secondary Education (Science)",
      institution: "Khwopa Higher Secondary School",
      affiliation: "National Examinations Board (NEB)",
      duration: "2023 - 2025",
      status: "Grade: A",
      badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
      description: "Completed secondary education with a major focus on physical sciences, advanced mathematics, and foundational computer science studies.",
    }
  };

  const currentData = tabData[activeTab];

  return (
    <section id="education" className="py-24 relative max-w-4xl mx-auto px-6 md:px-12 border-t border-black/5">
      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 space-y-4">
          <div className="text-xs uppercase tracking-widest font-mono font-bold text-amber-600">
            / Academics &amp; Qualifications
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight">
            My <span className="text-amber-500">Education</span>
          </h2>
          <p className="text-black/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            My academic timeline and formal learning path.
          </p>
        </motion.div>

        {/* Tabs Selector */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <div className="bg-black/5 border border-black/5 rounded-full p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab('university')}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeTab === 'university' ? 'text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              {activeTab === 'university' && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{ zIndex: -1 }}
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
                activeTab === 'highschool' ? 'text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              {activeTab === 'highschool' && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{ zIndex: -1 }}
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
        <motion.div variants={itemVariants} className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-8 items-start text-left"
            >
              {/* Left side: Large Icon and Duration */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 flex-shrink-0 w-full md:w-auto">
                <div className="p-4 rounded-[1.5rem] bg-black/5 text-black flex items-center justify-center">
                  {activeTab === 'university' ? <GraduationCap size={28} /> : <BookOpen size={28} />}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-black/5 border border-black/5 px-3 py-1.5 rounded-xl text-black/60 text-xs font-mono font-medium">
                  <Calendar size={12} className="text-amber-500" />
                  {currentData.duration}
                </div>
              </div>

              {/* Right side: Core details */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <span className={`inline-flex border px-3 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold ${currentData.badgeColor}`}>
                    {currentData.status}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight tracking-tight">
                    {currentData.degree}
                  </h3>
                  <p className="text-black/50 text-sm font-semibold flex items-center gap-1.5">
                    {currentData.institution} 
                    <span className="text-xs text-black/40 font-normal">({currentData.affiliation})</span>
                  </p>
                </div>
                <p className="text-black/75 text-sm md:text-base leading-relaxed">
                  {currentData.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Summary card */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-3 text-left">
            <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0" />
            <p className="text-black/75 text-xs md:text-sm font-semibold">
              Actively seeking internship and collaboration opportunities in AI, ML, and software systems.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-black text-white hover:bg-black/80 text-xs uppercase font-bold tracking-wider rounded-full transition-all duration-300 shadow-sm flex-shrink-0"
          >
            Let's Collaborate
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Timeline;
