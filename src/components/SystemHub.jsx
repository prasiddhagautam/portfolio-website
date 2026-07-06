import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Clock, Instagram, Facebook, Youtube, FileText } from 'lucide-react';

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/prasiddhagautam',
      value: '@prasiddhagautam'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/prasiddhagautam',
      value: 'prasiddhagautam'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/prishhhhhhh_',
      value: '@prishhhhhhh_'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com/prasiddha.gautam01',
      value: 'prasiddha.gautam01'
    },
    {
      icon: DiscordIcon,
      label: 'Discord',
      href: 'https://discordapp.com/users/962704145234669570',
      value: 'prasiddha#7890'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/prishop',
      value: 'Prish OP'
    }
  ];

  return (
    <section id="contact" className="py-24 relative max-w-7xl mx-4 lg:mx-auto px-6 md:px-12 bg-white text-black border border-black/10 rounded-[3rem] my-12 overflow-hidden shadow-sm">
      
      {/* Decorative ambient footer glow */}
      <div className="absolute -bottom-20 -right-20 w-90 h-90 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        ref={ref} 
        variants={containerVariants} 
        initial="hidden" 
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-16 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center border-b border-black/10 pb-12 space-y-6">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-sm sm:text-base uppercase tracking-widest font-lostlate font-bold text-amber-600 mb-1">
              Connect &amp; Collaborate
            </div>
            <h2 className="text-4xl sm:text-6xl font-black leading-none tracking-tighter text-black">
              Let's work <span className="text-amber-500 font-spark font-normal text-5xl sm:text-6xl md:text-7xl ml-2 inline-block relative -top-[0.08em] transform -rotate-2">together.</span>
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            <a
              href="/assets/cv/Prasiddhagautam_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border border-black/10 hover:border-black/35 hover:bg-black/5 text-black px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-colors duration-300"
            >
              <FileText size={14} className="text-amber-500" />
              <span>Download CV</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-black px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors duration-300"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Contact Links & Details */}
        <div className="grid lg:grid-cols-12 gap-12 text-left">
          
          {/* Big Email Layout */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-mono tracking-widest text-black/50">Direct Inquiries</div>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-xl sm:text-3xl font-bold text-black hover:text-amber-600 transition-colors break-all font-sans"
              >
                {contactInfo.email}
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-black/[0.01] border border-black/5">
                <div className="p-2.5 rounded-xl bg-black/5 text-amber-600 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-black/50">Location</div>
                  <div className="text-sm font-semibold mt-0.5 text-black">{contactInfo.location}</div>
                  <div className="text-xs text-black/50 mt-0.5">Open to Remote / Relocation</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-black/[0.01] border border-black/5">
                <div className="p-2.5 rounded-xl bg-black/5 text-amber-600 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-black/50">Response Time</div>
                  <div className="text-sm font-semibold mt-0.5 text-black">Within 24 Hours</div>
                  <div className="text-xs text-black/50 mt-0.5">Quick communication guaranteed</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Socials Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-4">
            <div className="text-[10px] uppercase font-mono tracking-widest text-black/50">On the Web</div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl border border-black/10 bg-black/[0.01] hover:bg-black/[0.04] hover:border-black/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-black/5 text-black/60 group-hover:bg-amber-500/10 group-hover:text-amber-600 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-mono text-black/50">{item.label}</span>
                        <span className="text-xs font-semibold text-black/80 mt-0.5 group-hover:text-black transition-colors">{item.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={12} className="text-black/20 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Footer info */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-black/40 font-mono space-y-4 md:space-y-0"
        >
          <div>
            © 2026 Prasiddha Gautam. All rights reserved.
          </div>
          <div>
            Kathmandu, Nepal.
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default SystemHub;
