import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Eye, Cpu, Palette } from 'lucide-react';

const StackingCard = ({ card, idx }) => {
  const cardRef = useRef(null);

  // Track the scroll progress of this specific card container relative to the screen
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"] // active when the card sticks at the top and the next ones scroll past
  });

  // Interpolate scale down, fade, and slight vertical translation when stacked over
  // Exit scale is 0.9 and exit opacity is 0.1 to make the card underneath invisible once fully covered
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const Icon = card.icon;

  return (
    <div
      ref={cardRef}
      className="skill-card"
      style={{
        zIndex: 10 + idx,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: yOffset,
        }}
        className="bg-white border border-black/10 p-8 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-shadow duration-300 text-left relative group cursor-pointer"
      >
        {/* Accent Tag */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
            Capabilities
          </div>
          <div className="text-3xl font-black text-black/10 font-mono">
            {card.num}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-black flex items-center space-x-3 mb-3">
          <div className="p-2 rounded-xl bg-black/5 text-black group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
            <Icon size={20} />
          </div>
          <span>{card.title}</span>
        </h3>

        {/* Description */}
        <p className="text-black/60 text-sm mb-6 leading-relaxed">
          {card.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {card.tech.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono font-medium bg-black/5 hover:bg-amber-500/10 hover:text-amber-600 text-black/75 px-3 py-1 rounded-full transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const TechMatrix = ({ skills }) => {
  const cardsData = [
    {
      num: '01',
      title: 'AI & LLM Architecture',
      description: 'Designing retrieval-augmented systems, agent orchestration, and custom model prompt setups.',
      icon: Brain,
      tech: skills['AI & LLM Architecture'] || [],
    },
    {
      num: '02',
      title: 'Data Intelligence & Computer Vision',
      description: 'Building machine learning datasets, video sequence detection pipelines, and spectral models.',
      icon: Eye,
      tech: skills['Data Intelligence & CV'] || [],
    },
    {
      num: '03',
      title: 'Full-Stack & Core Systems',
      description: 'Writing scalable interfaces, concurrent databases, and backend automation CLI systems.',
      icon: Cpu,
      tech: skills['Core & Full-Stack'] || [],
    },
    {
      num: '04',
      title: 'Product Design & Experience',
      description: 'Crafting premium interactive mockups, animations, and clean portfolio layouts.',
      icon: Palette,
      tech: skills['Product Design & Experience'] || [],
    }
  ];

  return (
    <section id="skills" className="py-24 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-black/5">

      {/* Sticky section title */}
      <div className="mb-12 text-left">
        <div className="text-xs uppercase tracking-widest font-mono font-bold text-amber-600 mb-2">
          / Services, Skills &amp; Capabilities
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight">
          What I do <span className="text-amber-500">best?</span>
        </h2>
        <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl mt-3">
          I build robust, intelligent software solutions. Leveraging my background in Computer Science and AI, I turn theoretical machine learning concepts into actual, working platforms.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start relative">
        {/* Left Column (Stacking cards with parallax exit layering) */}
        <div className="lg:col-span-7 skills pb-24">
          {cardsData.map((card, idx) => (
            <StackingCard key={card.num} card={card} idx={idx} />
          ))}
        </div>

        {/* Right Column (Allocated space for sticky profile card) */}
        <div className="lg:col-span-5 hidden lg:block h-[500px] sticky top-[150px]">
          {/* Handled by fixed positioning inside App.jsx */}
        </div>
      </div>

    </section>
  );
};

export default TechMatrix;
