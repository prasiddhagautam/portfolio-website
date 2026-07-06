import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Cpu, User, Briefcase, GraduationCap } from 'lucide-react';

const QuantumHeader = ({ visible = true }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'about', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Portfolio', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 0.3 }}
          className="fixed bottom-6 left-1/2 z-50 glass-nav rounded-full px-2 py-1.5 flex items-center space-x-1 max-w-[95vw] sm:max-w-max shadow-lg"
        >
          {/* Home Icon Button (Mobile & Desktop) */}
          <button
            onClick={() => scrollToSection('home')}
            className={`p-2.5 sm:p-3 rounded-full text-white/70 hover:text-white transition-all ${
              activeSection === 'home' ? 'bg-white/10 text-white' : ''
            }`}
            title="Home"
          >
            <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* Core Sections Buttons */}
          {navItems.slice(1).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider relative transition-all duration-300 flex items-center space-x-1.5 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Icon on Mobile, Text on Desktop */}
                <Icon size={14} className="sm:hidden" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}

          {/* Contact Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-amber-500 text-black hover:bg-amber-600 hover:scale-105 active:scale-95 ${
              activeSection === 'contact' ? 'ring-2 ring-white/20' : ''
            }`}
          >
            Contact
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default QuantumHeader;
