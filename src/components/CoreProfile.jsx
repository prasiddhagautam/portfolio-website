import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Award, Brain, Target, Compass } from 'lucide-react';

const CoreProfile = ({ data, achievements }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const icons = [Brain, Target, Compass, Award];

  return (
    <section id="about" className="py-24 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-black/5">
      <motion.div 
        ref={ref} 
        variants={containerVariants} 
        initial="hidden" 
        animate={inView ? 'visible' : 'hidden'}
        className="grid lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Column - Biography */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6 text-left">
          <div className="text-xs uppercase tracking-widest font-mono font-bold text-amber-600">
            / About, Bio &amp; Career Objective
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight">
            My <span className="text-amber-500">Story</span>
          </h2>
          
          <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-black/5 text-black">
                <User size={18} />
              </div>
              <span className="font-bold text-black text-sm uppercase font-mono tracking-widest">Biography</span>
            </div>
            
            <p className="text-black/75 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {data.summary}
            </p>

            <div className="border-t border-black/5 pt-6">
              <div className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest mb-2">My Philosophy</div>
              <blockquote className="border-l-4 border-amber-500 pl-4 text-black/60 italic text-sm md:text-base">
                "{data.philosophy}"
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Highlights & Stats */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-black/5 text-black">
                <Award size={18} />
              </div>
              <span className="font-bold text-black text-sm uppercase font-mono tracking-widest">Highlights</span>
            </div>

            <div className="space-y-4">
              {achievements.map((ach, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 6 }}
                    className="flex items-start space-x-4 p-4 rounded-[1.5rem] border border-black/5 bg-black/[0.01] hover:bg-black/[0.03] transition-all duration-300"
                  >
                    <div className="p-2 rounded-xl bg-black/5 text-black mt-0.5">
                      <Icon size={14} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm text-black mb-0.5">{ach.title}</div>
                      <div className="text-xs text-black/60 leading-relaxed">{ach.description}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Large Stats Numbers */}
            <div className="border-t border-black/5 mt-8 pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-4xl font-black text-black font-mono">15+</div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-1">Completed Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black font-mono">AI/ML</div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-1">Core Focus Area</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default CoreProfile;
