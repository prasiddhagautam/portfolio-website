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
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.8], [0, -30]);

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
        className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-300 text-left relative group border border-black/[0.04]"
      >
        {/* Soft-grey italic mono label at the top */}
        <div className="text-[11px] font-mono italic font-semibold text-black/45 mb-2 uppercase tracking-wider">
          {card.label}
        </div>

        {/* Index & Title merged */}
        <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center">
          <span className="font-lostlate text-[1.25em] text-amber-500 mr-2 relative -top-[0.02em]">{card.num}.</span>
          <span>{card.title}</span>
        </h3>

        {/* Description paragraph */}
        <p className="text-black/55 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
          {card.description}
        </p>

        {/* Vertical list of detailed sub-skills (bullet points) */}
        <ul className="space-y-2 mt-4 pl-1">
          {card.points.map((point) => (
            <li key={point} className="text-xs text-black/70 flex items-start space-x-2 font-medium">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const TechMatrix = () => {
  const cardsData = [
    {
      num: '01',
      label: 'Model Driven',
      title: 'AI & LLM Architecture',
      description: 'Designing retrieval-augmented systems, agent orchestration, and custom model prompt setups.',
      points: [
        'LLMs, OpenAI API, Anthropic Claude',
        'Retrieval-Augmented Generation (RAG)',
        'Agent orchestration & LangChain / AutoGen',
        'Vector databases: Pinecone, ChromaDB',
        'Custom model prompt engineering & tuning',
        'Multi-agent systems & autonomous workflows'
      ]
    },
    {
      num: '02',
      label: 'Client-Facing Systems',
      title: 'Full-Stack Web Development',
      description: 'Creating high-performance web applications with React, Next.js, and modern state management.',
      points: [
        'React.js, Next.js, TypeScript',
        'Tailwind CSS, Responsive Web Design',
        'Client-side state management & caching',
        'Interactive motion design & micro-animations',
        'Performance optimization & SEO best practices',
        'Modern bundlers: Vite, Webpack'
      ]
    },
    {
      num: '03',
      label: 'Infrastructure & APIs',
      title: 'Backend & System Design',
      description: 'Designing scalable microservices, concurrent databases, and backend automation CLI systems.',
      points: [
        'Python scripting, concurrency, asyncio',
        'Node.js, Express, Fastify, REST APIs',
        'Databases: PostgreSQL, MongoDB, Redis',
        'WebSockets & real-time communication',
        'CI/CD workflows & Docker containerization',
        'Cloud deployment: Vercel, AWS'
      ]
    },
    {
      num: '04',
      label: 'Creative Interface',
      title: 'Product Design & Experience',
      description: 'Crafting premium interactive mockups, animations, and clean portfolio layouts.',
      points: [
        'User interface (UI) & user experience (UX)',
        'Interactive motion graphics & canvas renders',
        'Typography, layout, and visual brand identity',
        'Clean glassmorphism & responsive grid layouts',
        'Subtle micro-animations & spring transforms',
        'SEO optimization & web loading performance'
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-black/5">

      {/* Sticky section title */}
      <div className="mb-12 text-left">
        <div className="text-sm sm:text-base uppercase tracking-widest font-lostlate font-bold text-amber-600 mb-2">
          / Services, Skills &amp; Capabilities
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight">
          What I do <span className="text-amber-500 font-spark font-normal text-5xl sm:text-6xl md:text-7xl ml-2 inline-block relative -top-[0.08em] transform -rotate-2">best?</span>
        </h2>
        <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl mt-3">
          I build robust, intelligent software solutions. Leveraging my background in Computer Science and AI, I turn intelligent concepts into production-ready full-stack applications.
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
        <div id="photo-spacer" className="lg:col-span-5 hidden lg:block h-[500px]">
          {/* Spacer for the fixed profile card */}
        </div>
      </div>

    </section>
  );
};

export default TechMatrix;
