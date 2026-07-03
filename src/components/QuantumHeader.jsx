import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QuantumHeader = ({ visible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home',      label: 'Home'      },
    { id: 'about',     label: 'About'     },
    { id: 'skills',    label: 'Skills'    },
    { id: 'projects',  label: 'Projects'  },
    { id: 'education', label: 'Education' },
    { id: 'contact',   label: 'Contact'   },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-[9999] h-16 transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-cyan-400 font-mono text-lg font-extrabold relative group cursor-pointer tracking-wider"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('home')}
            >
              <span className="relative z-10">&lt;/&gt;PG</span>
              <motion.span
                className="absolute -inset-1 bg-cyan-500/20 rounded blur-sm opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2 relative">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 overflow-hidden ${
                      activeSection === item.id ? 'text-black' : 'text-slate-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://kamauchanepali.com/tip/prish_op/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] group overflow-hidden flex items-center"
            >
              <span className="relative z-10 flex items-center gap-1">
                🧀 Buy me a cheese
              </span>
            </motion.a>
          </div>

          {/* Scroll progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: isScrolled ? '100%' : '0%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default QuantumHeader
