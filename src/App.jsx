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
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isStitched, setIsStitched] = useState(false);
  const [positionState, setPositionState] = useState('absolute');
  const [spacerLeft, setSpacerLeft] = useState(0);
  const [spacerAboutLeft, setSpacerAboutLeft] = useState(0);
  const [targetXAbout, setTargetXAbout] = useState(340);
  const [initialLeft, setInitialLeft] = useState(0);

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

  // Refs for tracking layout elements
  const cardParentRef = useRef(null);

  const [scrollBounds, setScrollBounds] = useState({
    skillsTop: 800,
    skillsHeight: 1200,
    aboutTop: 2000,
    aboutHeight: 1200,
    heroCardY: 280,
  });

  const [targetX, setTargetX] = useState(340);

  useEffect(() => {
    const handleMeasure = () => {
      const heroEl = document.getElementById('home');
      const skillsEl = document.getElementById('skills');
      const aboutEl = document.getElementById('about');
      const cardParentEl = cardParentRef.current;
      const w = window.innerWidth;

      if (heroEl && skillsEl && aboutEl) {
        let heroCardY = 280;
        if (cardParentEl) {
          const rect = cardParentEl.getBoundingClientRect();
          const heroRect = heroEl.getBoundingClientRect();
          heroCardY = rect.top - heroRect.top;
        }

        setScrollBounds({
          skillsTop: skillsEl.offsetTop,
          skillsHeight: skillsEl.offsetHeight,
          aboutTop: aboutEl.offsetTop,
          aboutHeight: aboutEl.offsetHeight,
          heroCardY: heroCardY || 280,
        });
      }

      const spacerEl = document.getElementById('photo-spacer');
      const spacerAboutEl = document.getElementById('photo-spacer-about');
      const triggerEl = document.getElementById('hero-card-trigger');

      if (triggerEl) {
        const triggerRect = triggerEl.getBoundingClientRect();
        setInitialLeft(triggerRect.left + window.scrollX);

        if (spacerEl) {
          const spacerRect = spacerEl.getBoundingClientRect();
          setSpacerLeft(spacerRect.left + 100); // Shift 100px further to the right!
          setTargetX(spacerRect.left - triggerRect.left + 100);
        }

        if (spacerAboutEl) {
          const spacerAboutRect = spacerAboutEl.getBoundingClientRect();
          setSpacerAboutLeft(spacerAboutRect.left + 120); // Shift 120px further to the right!
          setTargetXAbout(spacerAboutRect.left - triggerRect.left + 120);
        }
      }
    };

    const timer = setTimeout(handleMeasure, 500);
    window.addEventListener('resize', handleMeasure);
    if (loaded) {
      setTimeout(handleMeasure, 1000);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleMeasure);
    };
  }, [loaded]);

  // Scroll animations for profile photo (Desktop Only)
  const { scrollY } = useScroll();

  const t1 = scrollBounds.skillsTop - 150;
  const t2 = scrollBounds.skillsTop + scrollBounds.skillsHeight - 630;
  const t3 = scrollBounds.aboutTop - 150;
  const t4 = scrollBounds.aboutTop + scrollBounds.aboutHeight - 630;

  const initialHeroY = scrollBounds.heroCardY;
  const skillsStitchEnd = t2 + 150;
  const aboutStitchEnd = t4 + 150;

  const cardY = useTransform(
    scrollY,
    [0, Math.max(1, t1), Math.max(2, t2), Math.max(3, t3), Math.max(4, t4), Math.max(5, t4 + 300)],
    [initialHeroY, scrollBounds.skillsTop, skillsStitchEnd, scrollBounds.aboutTop, aboutStitchEnd, aboutStitchEnd + 300]
  );

  const cardX = useTransform(
    scrollY,
    [
      0, 
      Math.max(1, t1 * 0.3), 
      Math.max(2, t1 * 0.75), 
      Math.max(3, t1), 
      Math.max(4, t2), 
      Math.max(5, t2 + (t3 - t2) * 0.3), 
      Math.max(6, t2 + (t3 - t2) * 0.75), 
      Math.max(7, t3)
    ],
    [
      0, 
      isDesktop ? -35 : 0, 
      isDesktop ? targetX + 25 : 0, 
      isDesktop ? targetX : 0,
      isDesktop ? targetX : 0,
      isDesktop ? targetX - 25 : 0,
      isDesktop ? targetXAbout + 20 : 0,
      isDesktop ? targetXAbout : 0
    ]
  );

  const cardScale = useTransform(scrollY, [0, Math.max(1, t1)], [1, isDesktop ? 0.95 : 1]);
  
  const cardRotateZ = useTransform(
    scrollY,
    [0, Math.max(1, t1), Math.max(2, t2), Math.max(3, t3)],
    [0, isDesktop ? 6 : 0, isDesktop ? 6 : 0, isDesktop ? -4 : 0]
  );

  const cardRotateY = useTransform(
    scrollY,
    [
      0, 
      Math.max(1, t1 - 100), 
      Math.max(2, t1 - 50), 
      Math.max(3, t2), 
      Math.max(4, t2 + 50), 
      Math.max(5, t3)
    ],
    [
      0, 
      0, 
      180, 
      180,
      360,
      360
    ]
  );

  // Mouse tilt variables
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-15, 15]);
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: '' });

  const handleMouseMove = (e) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xVal = (mouseX - width / 2) / width;
    const yVal = (mouseY - height / 2) / height;
    tiltX.set(xVal);
    tiltY.set(yVal);

    setGlareStyle({
      opacity: 0.35,
      background: `radial-gradient(circle 180px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setGlareStyle({ opacity: 0, background: '' });
  };

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const isStitch = (latest >= t1 && latest <= t2) || (latest >= t3 && latest <= t4);
      setIsStitched(isStitch);
      
      if (latest < t1) {
        setPositionState('absolute');
      } else if (latest >= t1 && latest <= t2) {
        setPositionState('fixed-skills');
      } else if (latest > t2 && latest < t3) {
        setPositionState('absolute');
      } else if (latest >= t3 && latest <= t4) {
        setPositionState('fixed-about');
      } else {
        setPositionState('absolute');
      }
    });
    return () => unsubscribe();
  }, [scrollY, t1, t2, t3, t4]);

  const renderPhotoCard = (globalMode) => {
    if (globalMode !== isDesktop) return null;

    return (
      <motion.div
        style={{
          position: isDesktop ? ((positionState === 'fixed-skills' || positionState === 'fixed-about') ? 'fixed' : 'absolute') : 'relative',
          top: isDesktop ? (positionState === 'fixed-skills' || positionState === 'fixed-about' ? 150 : 0) : undefined,
          left: isDesktop ? (positionState === 'fixed-skills' || positionState === 'fixed-about' ? (positionState === 'fixed-skills' ? spacerLeft : spacerAboutLeft) : initialLeft) : undefined,
          y: isDesktop ? (positionState === 'fixed-skills' || positionState === 'fixed-about' ? 0 : cardY) : 0,
          x: isDesktop ? (positionState === 'fixed-skills' || positionState === 'fixed-about' ? 0 : cardX) : 0,
          scale: isDesktop ? ((positionState === 'fixed-skills' || positionState === 'fixed-about') ? 0.95 : cardScale) : 1,
          rotateZ: isDesktop ? (positionState === 'fixed-skills' ? 6 : (positionState === 'fixed-about' ? -4 : cardRotateZ)) : 0,
          rotateY: isDesktop ? cardRotateY : 0,
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className={isDesktop ? "absolute z-30" : "relative z-30"}
      >
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          whileHover={{
            scale: isDesktop ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          animate={{
            y: [0, -6, 2, -4, 0],
            x: [0, 4, -4, 3, 0]
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="w-[280px] sm:w-[300px] md:w-[360px] h-[370px] sm:h-[400px] md:h-[480px] relative cursor-pointer select-none rounded-[2rem] shadow-2xl group"
        >
          {/* Rotating Gradient Background Glow */}
          <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 opacity-20 blur-md group-hover:opacity-60 transition-opacity duration-300 -z-10" />

          {/* SVG Glowing Border Trace Animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-[2rem]">
            <defs>
              <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <motion.rect
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="32"
              fill="none"
              stroke="url(#glow-grad)"
              strokeWidth="3.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </svg>

          {/* Front Side (Profile Image) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div 
              animate={isStitched ? {
                scale: [0.97, 1.03, 0.97],
              } : {
                scale: 1,
              }}
              transition={isStitched ? {
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : undefined}
              className="w-full h-full rounded-[2rem] overflow-hidden border border-black/10 relative z-0 select-none bg-white"
            >
              <img
                src={personalInfo.avatar}
                alt="Prasiddha Gautam"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                style={{
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                }}
              />
              
              {/* Glossy glare overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-150"
                style={{
                  opacity: glareStyle.opacity,
                  background: glareStyle.background,
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>
          </div>

          {/* Back Side (Profile Image) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div 
              animate={isStitched ? {
                scale: [0.97, 1.03, 0.97],
              } : {
                scale: 1,
              }}
              transition={isStitched ? {
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : undefined}
              className="w-full h-full rounded-[2rem] overflow-hidden border border-black/10 relative z-0 select-none bg-white"
            >
              <img
                src={personalInfo.avatar}
                alt="Prasiddha Gautam"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                style={{
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                  transform: 'scaleX(-1)',
                }}
              />
              
              {/* Glossy glare overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-150"
                style={{
                  opacity: glareStyle.opacity,
                  background: glareStyle.background,
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.25em] text-amber-500 font-sans mb-8">
                    Welcome to the portfolio of
                  </h2>
                  <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[11rem] font-normal text-white leading-tight font-spark tracking-wide">
                    Prasiddha Gautam
                  </h1>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-black min-h-screen relative overflow-x-hidden font-sans select-none selection:bg-amber-500/20">
        {/* Global Photo Card for Desktop Scroll Flight */}
        {renderPhotoCard(true)}

        {/* Modern ambient background blobs and canvas particles */}
        <NeuralBackground />

        {/* Global bottom fixed pill navbar */}
        <QuantumHeader visible={loaded} />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-24 pb-36 lg:pb-12 px-6 md:px-12 max-w-7xl mx-auto relative">

          {/* Empty spacer replacing the old static subtitle */}
          <div className="h-4 w-full relative z-20" />

          {/* Symmetrical Layout aligned items-start so PRASIDDHA and GAUTAM line up perfectly */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10 py-4 gap-8 md:gap-10">

            {/* Left Column (flex-1 dynamically scales, with padding-right buffer, centered on mobile/tablet) */}
            <div className="w-full md:flex-1 flex flex-col items-center text-center md:items-start md:text-left space-y-4 md:space-y-6 md:pr-4 lg:pr-8 lg:pt-2">
              <h1 className="name-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6rem] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none whitespace-nowrap pt-2 pb-3 px-1">
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

            {/* Center Column: Holds Subtitle and Photo Container, centered on mobile/tablet */}
            <div className="w-full md:w-auto flex flex-col items-center shrink-0 z-30 gap-4 md:gap-6">
              {/* Subtitle centered above the photo, in normal document flow */}
              <div className="text-center w-full z-20">
                <div className="text-sm sm:text-base uppercase tracking-widest font-lostlate font-bold text-amber-600">
                  AI &amp; Full Stack Developer
                </div>
              </div>

              {/* Photo Container */}
              <div 
                ref={cardParentRef}
                id="hero-card-trigger"
                className="w-[280px] sm:w-[300px] md:w-[360px] h-[370px] sm:h-[400px] md:h-[480px] flex justify-center items-center relative lg:pt-2"
              >
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

                {/* Local Photo Card for Mobile Static Layout */}
                {renderPhotoCard(false)}
              </div>
            </div>

            {/* Right Column (flex-1 dynamically scales, with padding-left buffer, centered on mobile/tablet) */}
            <div className="w-full md:flex-1 flex flex-col items-center text-center md:items-end md:text-right space-y-4 md:space-y-6 md:pl-4 lg:pl-8 lg:pt-2">
              <h1 className="name-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[6rem] leading-[1.1] select-none text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] whitespace-nowrap pt-2 pb-3 px-1">
                GAUTAM
              </h1>

              <div className="bg-white border border-black/5 px-6 py-4 rounded-[2rem] shadow-sm text-left w-full max-w-xs space-y-2">
                <div className="text-[10px] uppercase font-mono tracking-widest text-black/40">Core Expertise</div>
                <div className="flex flex-wrap justify-start gap-1.5">
                  {["React", "Next.js", "Node.js", "TypeScript", "Python", "FastAPI", "LLMs", "Agentic AI", "LangChain", "RAG", "PostgreSQL", "Docker"].map((item) => (
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
