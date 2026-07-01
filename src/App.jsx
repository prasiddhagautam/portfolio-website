import { useEffect, useState, useRef } from 'react';
import './index.css';
import portfolioData from '../public/data/portfolio-data.json';
import { ErrorBoundary } from './components/ErrorBoundary';
import NeuralBackground from './components/NeuralBackground';
import QuantumHeader from './components/QuantumHeader';
import CoreProfile from './components/CoreProfile';
import TechMatrix from './components/TechMatrix';
import SystemShowcase from './components/SystemShowcase';
import Timeline from './components/Timeline';
import SystemHub from './components/SystemHub';
import Typewriter from './components/Typewriter';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-react';

const CodeTerminal = () => {
  return (
    <div className="bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full max-w-md font-mono text-left select-none text-[11px] md:text-xs">
      {/* Title bar */}
      <div className="bg-[#07080c] border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
          <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
          <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
        </div>
        <span className="text-[10px] text-slate-500 font-mono">prish@portfolio:~</span>
      </div>
      {/* Code Area */}
      <div className="p-5 space-y-3 leading-relaxed text-slate-300 font-mono">
        <div>
          <span className="text-cyan-400 font-bold">$</span> <span className="text-white">whoami</span>
          <div className="text-emerald-400 mt-1">Prasiddha Gautam</div>
        </div>
        <div>
          <span className="text-cyan-400 font-bold">$</span> <span className="text-white">cat skills.py</span>
          <div className="mt-2 space-y-1 border-l-2 border-slate-800 pl-3">
            <div>
              <span className="text-purple-400">class</span> <span className="text-yellow-300">Prish</span>:
            </div>
            <div className="pl-4">
              <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-400">self</span>):
            </div>
            <div className="pl-8 text-slate-300">
              <span className="text-orange-400">self</span>.skills = [
              <div className="pl-4 text-emerald-400">
                &quot;Python&quot;,<br />
                &quot;JavaScript&quot;,<br />
                &quot;TypeScript&quot;,<br />
                &quot;Computer Vision&quot;,<br />
                &quot;Deep Learning&quot;,<br />
                &quot;RAG &amp; LLM Ops&quot;,<br />
                &quot;Ui/Graphics Design&quot;
              </div>
              ]
            </div>
            <div className="pl-8 text-slate-300">
              <span className="text-orange-400">self</span>.university = <span className="text-emerald-400">&quot;Coventry University&quot;</span>
            </div>
            <div className="pl-8 text-slate-300">
              <span className="text-orange-400">self</span>.goals = [
              <div className="pl-4 text-emerald-400">
                &quot;AI &amp; ML Engineering&quot;,<br />
                &quot;Deep Learning Pipelines&quot;,<br />
                &quot;Full-Stack Systems&quot;,<br />
                &quot;Research Collaborations&quot;
              </div>
              ]
            </div>
          </div>
        </div>
        <div>
          <span className="text-cyan-400 font-bold">$</span> <span className="w-1.5 h-3 bg-cyan-400 inline-block align-middle animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const ProfilePhoto = ({ src }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((centerY - y) / centerY) * 15;
    const rY = ((x - centerX) / centerX) * 15;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-3xl cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="w-full h-full rounded-3xl overflow-hidden border border-white/5 bg-slate-950 shadow-2xl relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.img
          src={src}
          alt="Profile"
          className="w-full h-full object-cover rounded-3xl"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.25 : 0,
          }}
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(6, 182, 212, 0.3) 0%, rgba(168, 85, 247, 0.05) 80%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { personalInfo, bio, achievements, skills, projects, education, certifications } = portfolioData;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="bg-[#07080a] text-slate-100 min-h-screen font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
        
        {/* Interactive network background */}
        <NeuralBackground />

        {/* Global navigation */}
        <QuantumHeader visible={loaded} />

        {/* Loading Overlay */}
        {!loaded && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080a]">
            <div className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              {personalInfo.name}
            </div>
            <div className="text-xs text-slate-500 tracking-[0.3em] uppercase">Initializing Environment</div>
          </div>
        )}

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 px-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 items-center w-full relative z-10 py-8">
            
            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="md:col-span-7 space-y-5 text-left"
            >
              <div className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-mono">
                AI / ML / Python Engineering
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">{personalInfo.name}</span>
              </h1>

              <div className="text-lg md:text-xl font-semibold text-slate-300">
                <Typewriter texts={['Computer Science Student', 'AI & Machine Learning Innovator', 'Python & Deep Learning Developer']} />
              </div>

              <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                {personalInfo.tagline}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg"
                >
                  View My Work
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/assets/cv/Prasiddhagautam_CV.pdf"
                  target="_blank"
                  className="border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.02] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                >
                  <FileText size={14} />
                  Download CV
                </motion.a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4 pt-4">
                {[
                  { icon: Github, href: `https://${personalInfo.github}` },
                  { icon: Linkedin, href: personalInfo.linkedin },
                  { icon: Mail, href: `mailto:${personalInfo.email}` }
                ].map((soc, idx) => {
                  const Icon = soc.icon;
                  return (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1, color: '#22d3ee' }}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 transition-colors duration-300"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* CodeTerminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="md:col-span-5 flex flex-col items-center justify-center"
            >
              <CodeTerminal />
            </motion.div>
          </div>

          {/* Scroll down indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 pointer-events-none">
            <span className="text-[9px] uppercase tracking-widest font-mono font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={14} />
            </motion.div>
          </div>
        </section>

        {/* Sections */}
        <CoreProfile data={bio} achievements={achievements} />
        <TechMatrix skills={skills} />
        <SystemShowcase projects={projects} />
        <Timeline education={education} certifications={certifications} />
        <SystemHub contactInfo={personalInfo} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
