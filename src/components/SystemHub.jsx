import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Clock, Instagram, Facebook, Youtube, MessageSquare } from 'lucide-react'

const DiscordIcon = ({ className }) => (
  <svg
    viewBox="0 0 127.14 96.36"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c1-.73,2-1.5,2.92-2.3a75.46,75.46,0,0,0,72.06,0c.93.8,1.91,1.57,2.92,2.3a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.83,50.12,123.63,27.34,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
  </svg>
);

const SystemHub = ({ contactInfo }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  const socialMediaList = [
    {
      icon: Github,
      label: 'GitHub',
      value: '@prasiddhagautam',
      href: 'https://github.com/prasiddhagautam',
      color: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Prasiddha Gautam',
      href: 'https://linkedin.com/in/prasiddhagautam',
      color: 'text-blue-400 border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@prishhhhhhh_',
      href: 'https://instagram.com/prishhhhhhh_',
      color: 'text-pink-400 border-pink-500/20 hover:border-pink-500/40 bg-pink-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'Prasiddha Gautam',
      href: 'https://facebook.com/prasiddha.gautam01',
      color: 'text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40 bg-indigo-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]',
    },
    {
      icon: DiscordIcon,
      label: 'Discord',
      value: 'prasiddha#7890',
      href: 'https://discordapp.com/users/962704145234669570',
      color: 'text-purple-400 border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    },
    {
      icon: Youtube,
      label: 'Youtube',
      value: 'Prish OP',
      href: 'https://youtube.com/prishop',
      color: 'text-red-400 border-red-500/20 hover:border-red-500/40 bg-red-500/5',
      glow: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]',
    },
  ]

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              Find me on <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Social Media</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          {/* Social media grid */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {socialMediaList.map(item => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center p-5 bg-[#0b0c10]/60 border backdrop-blur-md rounded-2xl ${item.color} ${item.glow} transition-all duration-300 relative`}
                >
                  <div className="w-10 h-10 border border-white/5 bg-white/5 rounded-xl flex items-center justify-center mr-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{item.value}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Location + Contact details */}
          <div className="grid md:grid-cols-3 gap-5">
            <motion.a
              variants={itemVariants}
              href={`mailto:${contactInfo.email}`}
              className="bg-[#0b0c10]/60 border border-white/10 rounded-2xl p-5 flex items-start space-x-4 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Direct Email</p>
                <p className="text-white font-bold text-sm mt-0.5">{contactInfo.email}</p>
                <p className="text-slate-400 text-xs mt-1">Send an email message anytime</p>
              </div>
            </motion.a>

            <motion.div
              variants={itemVariants}
              className="bg-[#0b0c10]/60 border border-white/10 rounded-2xl p-5 flex items-start space-x-4 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Location</p>
                <p className="text-white font-bold text-sm mt-0.5">{contactInfo.location}</p>
                <p className="text-slate-400 text-xs mt-1">Open to remote and local roles</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#0b0c10]/60 border border-white/10 rounded-2xl p-5 flex items-start space-x-4 hover:border-pink-500/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Response Time</p>
                <p className="text-white font-bold text-sm mt-0.5">Within 24 hours</p>
                <p className="text-slate-400 text-xs mt-1">Quick communications guaranteed</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-16 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-8 py-6 text-center">
          <p className="text-slate-500 text-[10px] md:text-xs font-mono">
            © 2026 {contactInfo.name}.
          </p>
        </div>
      </motion.footer>
    </section>
  )
}

export default SystemHub
