import { useEffect, useState } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, FileText } from 'lucide-react';

const TimeWidget = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xs md:text-sm font-mono text-black/50 tracking-tight flex items-center space-x-2">
      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span>Kathmandu, Nepal</span>
      <span className="text-black/30">—</span>
      <span className="font-bold text-black">{time}</span>
      <span className="text-black/40">GMT+5:45</span>
    </div>
  );
};

const greetings = [
  { word: "नमस्ते", lang: "Nepali" }, // First (Focused - 1200ms)
  { word: "Hello", lang: "English" },  // Second (Focused - 600ms)
  { word: "Hola", lang: "Spanish" },    // Below are fast (80ms each)
  { word: "Bonjour", lang: "French" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "Ciao", lang: "Italian" },
  { word: "Guten Tag", lang: "German" },
  { word: "안녕하세요", lang: "Korean" },
  { word: "你好", lang: "Chinese" },
  { word: "Olá", lang: "Portuguese" },
  { word: "Привет", lang: "Russian" },
  { word: "Namaste", lang: "Hindi" },
  { word: "Konnichiwa", lang: "JapaneseRomanized" },
  { word: "Merhaba", lang: "Turkish" },
  { word: "Shalom", lang: "Hebrew" },
  { word: "Greetings", lang: "English" }
];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

  useEffect(() => {
    // Custom timeline greetings sequence:
    // 1. Stays on "नमस्ते" for 1200ms
    const timer1 = setTimeout(() => {
      setGreetingIndex(1); // Set to "Hello"

      // 2. Stays on "Hello" for 600ms
      const timer2 = setTimeout(() => {
        // 3. Fast cycling of other greetings at 80ms intervals
        let currentFastIdx = 2;
        const fastInterval = setInterval(() => {
          setGreetingIndex(currentFastIdx);
          currentFastIdx++;
          if (currentFastIdx >= greetings.length) {
            clearInterval(fastInterval);
            setShowWelcome(true);
          }
        }, 80);
      }, 600);
    }, 1200);

    // Fade reveal app content under preloader at 3.4s, remove loader at 4.2s
    const loadTimer = setTimeout(() => setLoaded(true), 3400);
    const preloaderTimer = setTimeout(() => setPreloaderDone(true), 4200);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Matches the md layout breakpoint!
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(preloaderTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { personalInfo, bio, achievements, skills, projects, education } = portfolioData;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll animations for profile photo (Desktop Only)
  const { scrollY } = useScroll();

  // y translation coordinates:
  // - 0 to 700: floats from hero center to right column of TechMatrix (480px displacement)
  // - 700 to 1900: moves down matching screen scroll to stay STICKY relative to viewport
  // - 1900 to 2400: remains constant so the card scrolls up naturally with the rest of the page
  const cardY = useTransform(scrollY, [0, 700, 1900, 2400], [0, isDesktop ? 480 : 0, isDesktop ? 1680 : 0, isDesktop ? 1680 : 0]);

  const cardX = useTransform(scrollY, [0, 700], [0, isDesktop ? '26.5vw' : '0vw']);
  const cardScale = useTransform(scrollY, [0, 700], [1, isDesktop ? 0.85 : 1]);
  const cardRotateZ = useTransform(scrollY, [0, 700], [0, isDesktop ? 6 : 0]);

  return (
    <ErrorBoundary>
      {/* Preloader */}
      <AnimatePresence>
        {!preloaderDone && (
          <motion.div
            id="custom-preloader"
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="flex flex-col items-center text-center px-6">
              {!showWelcome ? (
                <motion.div
                  key={greetingIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.1 }}
                  className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2"
                >
                  {greetings[greetingIndex].word}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <h2 className="text-lg sm:text-xl font-bold tracking-widest text-amber-500/80 font-mono uppercase">
                    Welcome to the portfolio of
                  </h2>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-widest text-white leading-none">
                    Prasiddha Gautam
                  </h1>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container: Replaced overflow-hidden with overflow-x-hidden to allow position: sticky elements to stick correctly */}
      <div className="text-black min-h-screen relative overflow-x-hidden font-sans select-none selection:bg-amber-500/20">
        {/* Modern ambient background blobs and canvas particles */}
        <NeuralBackground />

        {/* Global bottom fixed pill navbar */}
        <QuantumHeader visible={loaded} />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-24 pb-36 lg:pb-12 px-6 md:px-12 max-w-7xl mx-auto relative">

          {/* Centered Subtitle above Name Grid to enable baseline name alignment */}
          <div className="text-xs uppercase tracking-widest font-mono font-bold text-amber-600 mb-8 text-center w-full relative z-20">
            AI/ML &amp; Python Developer
          </div>

          {/* Symmetrical Layout aligned items-start so PRASIDDHA and GAUTAM line up perfectly */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10 py-4 gap-8 md:gap-10">

            {/* Left Column (flex-1 dynamically scales, with padding-right buffer, centered on mobile/tablet) */}
            <div className="w-full md:flex-1 flex flex-col items-center text-center md:items-start md:text-left space-y-4 md:space-y-6 md:pr-4 lg:pr-8 lg:pt-2">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none whitespace-nowrap">
                PRASIDDHA
              </h1>
              <p className="text-black/60 max-w-sm text-sm leading-relaxed">
                {personalInfo.tagline}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                <a
                  href="https://kamauchanepali.com/tip/prish_op/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white hover:bg-black/80 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5"
                >
                  <span>🧀 Buy me a cheese</span>
                </a>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="border border-black/20 hover:border-black/40 hover:bg-black/5 text-black px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5"
                >
                  <span>View Projects</span>
                  <ArrowDownRight size={14} className="text-amber-500" />
                </button>
              </div>
            </div>

            {/* Center: Scroll-Linked Photo Card (Size 320x430) */}
            <div className="w-[280px] md:w-[320px] h-[380px] md:h-[430px] shrink-0 flex justify-center items-center relative z-30 lg:pt-2">

              {/* Motion Graphic spinning rings behind photo card (Desktop Only to prevent layout stretching on mobile) */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center -z-10 opacity-35 pointer-events-none scale-[1.35] select-none">
                <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-amber-500/25 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[380px] h-[380px] rounded-full border-2 border-double border-black/5 animate-[spin_35s_linear_infinite_reverse]" />
                <div className="absolute w-[310px] h-[310px] rounded-full border border-dotted border-amber-600/30 animate-[spin_18s_linear_infinite]" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-black/5 flex items-center justify-center animate-[spin_12s_linear_infinite_reverse]">
                  <div className="absolute top-0 w-2 h-2 rounded-full bg-amber-500 blur-[1px]" />
                  <div className="absolute bottom-0 w-2 h-2 rounded-full bg-black/30" />
                  <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-amber-500/65" />
                </div>
              </div>

              {/* Nested Motion Divs: Parent handles scroll translation offsets, Child handles scale, rotate, breathing float and spring hover pops */}
              <motion.div
                style={{
                  y: cardY,
                  x: cardX,
                }}
                className="absolute"
              >
                <motion.div
                  style={{
                    scale: cardScale,
                    rotateZ: cardRotateZ,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotateZ: 4,
                    transition: { type: "spring", stiffness: 400, damping: 12 }
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="w-[280px] md:w-[320px] h-[380px] md:h-[430px] relative cursor-pointer select-none rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <img
                    src={personalInfo.avatar}
                    alt="Prasiddha Gautam"
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column (flex-1 dynamically scales, with padding-left buffer, centered on mobile/tablet) */}
            <div className="w-full md:flex-1 flex flex-col items-center text-center md:items-end md:text-right space-y-4 md:space-y-6 md:pl-4 lg:pl-8 lg:pt-2">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black leading-none tracking-tighter select-none text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] whitespace-nowrap">
                GAUTAM
              </h1>

              <div className="bg-white border border-black/5 px-6 py-4 rounded-[2rem] shadow-sm text-left w-full max-w-xs space-y-2">
                <div className="text-[10px] uppercase font-mono tracking-widest text-black/40">Core Expertise</div>
                <div className="flex flex-wrap justify-center md:justify-start lg:justify-start gap-1.5">
                  {["PyTorch", "Deep Learning", "LLMs", "Python", "Computer Vision", "NLP", "Agentic AI"].map((item) => (
                    <span key={item} className="text-[10px] font-semibold bg-black/5 text-black px-2 py-0.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <TimeWidget />
            </div>

          </div>
        </section>

        {/* Content Sections */}
        <TechMatrix skills={skills} />
        <CoreProfile data={bio} achievements={achievements} />
        <SystemShowcase projects={projects} />
        <Timeline education={education} />
        <SystemHub contactInfo={personalInfo} />

        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}

export default App;
