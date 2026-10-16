import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from 'framer-motion';
import {
  BarChart3,
  Bot,
  Brain,
  Code2,
  Database,
  FlaskConical,
  Sparkles,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  tip: string;
}

interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
  accentBorder: string;
  primary?: boolean;
  skills: Skill[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const coreExpertise: { label: string; icon: LucideIcon }[] = [
  { label: 'AI Engineering', icon: Brain },
  { label: 'Generative AI', icon: Sparkles },
  { label: 'AI Agents', icon: Bot },
  { label: 'Machine Learning', icon: BarChart3 },
  { label: 'Full-Stack Development', icon: Code2 },
  { label: 'Workflow Automation', icon: Workflow },
];

const categories: Category[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence & Generative AI',
    icon: Brain,
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-400/25',
    primary: true,
    skills: [
      { name: 'Generative AI', tip: 'Building applications powered by generative models for content creation, code generation, and intelligent assistants.' },
      { name: 'Large Language Models', tip: 'Working with GPT, LLaMA, and open-source LLMs for text generation, reasoning, and conversational AI.' },
      { name: 'AI Agents', tip: 'Developing autonomous AI agents that reason, plan, and execute multi-step tasks.' },
      { name: 'Multi-Agent Systems', tip: 'Orchestrating multiple AI agents to collaborate and solve complex problems together.' },
      { name: 'Prompt Engineering', tip: 'Crafting optimized prompts and system instructions for reliable LLM output.' },
      { name: 'LangChain', tip: 'Building LLM-powered chains, agents, and retrieval pipelines for production AI apps.' },
      { name: 'Groq API', tip: 'Leveraging Groq for ultra-fast LLM inference in real-time AI applications.' },
      { name: 'RAG Concepts', tip: 'Implementing Retrieval-Augmented Generation for knowledge-grounded AI responses.' },
      { name: 'AI Workflow Automation', tip: 'Connecting AI models with business processes through automated pipelines.' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning & Data Science',
    icon: FlaskConical,
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400/[0.08]',
    accentBorder: 'border-violet-400/[0.12]',
    skills: [
      { name: 'Python', tip: 'Primary language for ML, data science, and backend development.' },
      { name: 'Pandas', tip: 'Data manipulation and analysis for preprocessing ML datasets.' },
      { name: 'NumPy', tip: 'Numerical computing for matrix operations and scientific calculations.' },
      { name: 'Scikit-learn', tip: 'Building classification, regression, and clustering models.' },
      { name: 'TensorFlow', tip: 'Used for deep-learning and image-classification projects.' },
      { name: 'Keras', tip: 'High-level API for rapid neural network prototyping.' },
      { name: 'Matplotlib', tip: 'Creating visualizations for data analysis and model evaluation.' },
      { name: 'Seaborn', tip: 'Statistical data visualization for exploratory analysis.' },
      { name: 'K-Means', tip: 'Unsupervised clustering for customer segmentation and pattern discovery.' },
      { name: 'DBSCAN', tip: 'Density-based clustering for anomaly detection and spatial analysis.' },
      { name: 'Classification', tip: 'Building models for sentiment analysis, spam detection, and category prediction.' },
      { name: 'Regression', tip: 'Predictive modeling for price estimation and trend forecasting.' },
      { name: 'Recommendation Systems', tip: 'Collaborative and content-based filtering for personalized suggestions.' },
      { name: 'Feature Engineering', tip: 'Transforming raw data into meaningful features for better model performance.' },
      { name: 'Data Preprocessing', tip: 'Cleaning, normalizing, and preparing datasets for ML pipelines.' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    icon: Code2,
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/[0.08]',
    accentBorder: 'border-cyan-400/[0.12]',
    skills: [
      { name: 'JavaScript', tip: 'Core language for interactive frontend and Node.js backend development.' },
      { name: 'React.js', tip: 'Building component-driven, interactive user interfaces.' },
      { name: 'Next.js', tip: 'Used to build modern production-oriented full-stack applications.' },
      { name: 'Vite', tip: 'Fast build tool for modern frontend development workflows.' },
      { name: 'HTML', tip: 'Semantic markup for accessible and structured web pages.' },
      { name: 'CSS', tip: 'Styling and layout for responsive web interfaces.' },
      { name: 'Tailwind CSS', tip: 'Utility-first CSS framework for rapid, consistent UI development.' },
      { name: 'Bootstrap', tip: 'Component library for responsive prototyping and layout scaffolding.' },
      { name: 'Django', tip: 'Full-featured Python web framework for backend applications and APIs.' },
      { name: 'Django REST Framework', tip: 'Building robust RESTful APIs for frontend-backend communication.' },
      { name: 'REST APIs', tip: 'Designing and consuming APIs that connect frontends, services, and AI models.' },
    ],
  },
  {
    id: 'db',
    title: 'Databases',
    icon: Database,
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-400/[0.08]',
    accentBorder: 'border-emerald-400/[0.12]',
    skills: [
      { name: 'PostgreSQL', tip: 'Primary relational database for production applications and complex queries.' },
      { name: 'MySQL', tip: 'Relational database used in web applications and data storage.' },
      { name: 'SQLite', tip: 'Lightweight database for local development and embedded applications.' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & Integration',
    icon: Workflow,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400/[0.08]',
    accentBorder: 'border-amber-400/[0.12]',
    skills: [
      { name: 'n8n', tip: 'Used to build AI-powered automation and multi-agent workflows.' },
      { name: 'HTTP APIs', tip: 'Connecting services and systems through RESTful HTTP communication.' },
      { name: 'Webhooks', tip: 'Event-driven integrations for real-time system communication.' },
      { name: 'API Integration', tip: 'Connecting third-party APIs into applications and automation flows.' },
      { name: 'Workflow Automation', tip: 'Designing end-to-end automated pipelines for business processes.' },
      { name: 'WhatsApp Integration', tip: 'Connecting AI assistants and chatbots to WhatsApp for customer communication.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    accent: 'text-slate-400',
    accentBg: 'bg-slate-400/[0.06]',
    accentBorder: 'border-slate-400/[0.10]',
    skills: [
      { name: 'Git', tip: 'Version control for collaborative and individual development workflows.' },
      { name: 'GitHub', tip: 'Code hosting, collaboration, and open-source project management.' },
      { name: 'VS Code', tip: 'Primary code editor with custom extensions and configurations.' },
      { name: 'Streamlit', tip: 'Building interactive data apps and ML dashboards in Python.' },
      { name: 'Google Colab', tip: 'Cloud-based notebooks for ML experimentation and GPU-accelerated training.' },
      { name: 'Vercel', tip: 'Deploying and hosting modern frontend and full-stack applications.' },
      { name: 'Hugging Face', tip: 'Accessing and deploying open-source AI models and datasets.' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Responsive hook                                                            */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/* -------------------------------------------------------------------------- */
/* Marquee                                                                     */
/* -------------------------------------------------------------------------- */

const Marquee = memo(function Marquee({
  children,
  speed = 28,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  const x = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(velocity, {
    damping: 60,
    stiffness: 250,
  });

  const boost = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-2, 0, 2],
    { clamp: false },
  );

  useLayoutEffect(() => {
    const element = copyRef.current;
    if (!element) return;

    const measure = () => {
      setCopyWidth(element.offsetWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!copyWidth || reduceMotion) return;

    const boostValue = boost.get();

    if (boostValue < -0.05) {
      direction.current = reverse ? 1 : -1;
    } else if (boostValue > 0.05) {
      direction.current = reverse ? -1 : 1;
    }

    const deltaSeconds = Math.min(delta, 40) / 1000;
    const movement =
      direction.current *
      speed *
      (1 + Math.abs(boostValue)) *
      deltaSeconds;

    x.set(wrap(-copyWidth, 0, x.get() - movement));
  });

  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]">
      <motion.div
        className="flex w-max"
        style={{ x, willChange: 'transform' }}
      >
        <div ref={copyRef} className="flex shrink-0">
          {children}
        </div>

        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
});

const ExpertisePill = memo(function ExpertisePill({
  label,
  icon: Icon,
  variant,
}: {
  label: string;
  icon: LucideIcon;
  variant: 'strong' | 'soft';
}) {
  const strong = variant === 'strong';

  return (
    <div className="pr-2.5">
      <div
        className={`flex select-none items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-[13px] font-medium ${
          strong
            ? 'border-primary/[0.12] bg-primary/[0.04] text-slate-200'
            : 'border-white/[0.06] bg-white/[0.015] text-slate-400'
        }`}
      >
        <Icon
          size={14}
          className={
            strong ? 'text-primary-light opacity-70' : 'opacity-50'
          }
        />
        {label}
      </div>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Tooltip and skill badge                                                     */
/* -------------------------------------------------------------------------- */

const TOOLTIP_W = 240;
const TOOLTIP_GAP = 10;
const VIEWPORT_PAD = 12;

const SkillBadge = memo(function SkillBadge({
  skill,
  accent,
}: {
  skill: Skill;
  accent: string;
}) {
  const badgeRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({
    left: 0,
    top: 0,
    arrow: 0,
    below: false,
  });

  const place = useCallback(() => {
    const badge = badgeRef.current;
    const tip = tipRef.current;

    if (!badge || !tip) return;

    const rect = badge.getBoundingClientRect();
    const width = Math.min(
      TOOLTIP_W,
      window.innerWidth - VIEWPORT_PAD * 2,
    );
    const height = tip.offsetHeight;

    const center = rect.left + rect.width / 2;

    const left = Math.max(
      VIEWPORT_PAD,
      Math.min(
        center - width / 2,
        window.innerWidth - width - VIEWPORT_PAD,
      ),
    );

    const aboveTop = rect.top - TOOLTIP_GAP - height;
    const below = aboveTop < VIEWPORT_PAD;
    const top = below
      ? Math.min(
          rect.bottom + TOOLTIP_GAP,
          window.innerHeight - height - VIEWPORT_PAD,
        )
      : aboveTop;

    setPos({
      left,
      top: Math.max(VIEWPORT_PAD, top),
      below,
      arrow: Math.max(14, Math.min(center - left, width - 14)),
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    place();

    const handleScroll = () => setOpen(false);

    window.addEventListener('resize', place, { passive: true });
    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: PointerEvent) => {
      if (!badgeRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={badgeRef}
        type="button"
        aria-describedby={open ? `tip-${skill.name}` : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
        className="select-none whitespace-nowrap rounded-lg border border-white/[0.05] bg-white/[0.015] px-3 py-[7px] text-[12px] font-medium text-slate-400 outline-none transition-[background-color,border-color,color] duration-150 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-primary-light/60 motion-reduce:transition-none"
      >
        {skill.name}
      </button>

      {open &&
        createPortal(
          <motion.div
            ref={tipRef}
            id={`tip-${skill.name}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: pos.left,
              top: pos.top,
              width: `min(${TOOLTIP_W}px, calc(100vw - ${VIEWPORT_PAD * 2}px))`,
            }}
          >
            <div className="relative rounded-lg border border-white/[0.08] bg-[#0b0f17] px-3.5 py-2.5 shadow-xl shadow-black/30">
              <p className={`mb-1 text-[11px] font-semibold ${accent}`}>
                {skill.name}
              </p>

              <p className="text-[11px] leading-relaxed text-slate-400">
                {skill.tip}
              </p>

              <span
                className={`absolute h-2 w-2 -translate-x-1/2 rotate-45 border-white/[0.08] bg-[#0b0f17] ${
                  pos.below
                    ? '-top-1 border-l border-t'
                    : '-bottom-1 border-b border-r'
                }`}
                style={{ left: pos.arrow }}
              />
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
});

/* -------------------------------------------------------------------------- */
/* Category header                                                             */
/* -------------------------------------------------------------------------- */

const CategoryHeader = memo(function CategoryHeader({
  category,
  index,
  size,
}: {
  category: Category;
  index: number;
  size: 'sm' | 'lg';
}) {
  const { title, icon: Icon, accent, accentBg, primary } = category;
  const large = size === 'lg';

  return (
    <div
      className={`flex items-start gap-3 ${
        large ? 'mb-7 sm:gap-4' : 'mb-5'
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center ${accentBg} ${
          large
            ? 'h-12 w-12 rounded-2xl sm:h-14 sm:w-14'
            : 'h-10 w-10 rounded-xl'
        }`}
      >
        <Icon size={large ? 24 : 20} className={accent} />
      </div>

      <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
        <span className="shrink-0 pt-1 font-mono text-[11px] font-medium tracking-wider text-primary-light/50">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3
          className={`font-display font-semibold leading-tight tracking-tight text-white ${
            large
              ? 'text-lg sm:text-xl lg:text-2xl'
              : 'text-base'
          }`}
        >
          {title}
        </h3>
      </div>

      {primary && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-light">
          <Sparkles size={9} />
          Primary
        </span>
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Desktop stage card                                                         */
/* -------------------------------------------------------------------------- */

const cardVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction * 24,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction * -24,
  }),
};

const StageCard = memo(function StageCard({
  category,
  index,
  direction,
  reduceMotion,
}: {
  category: Category;
  index: number;
  direction: number;
  reduceMotion: boolean;
}) {
  const { accent, accentBorder, primary, skills } = category;

  return (
    <motion.div
      custom={direction}
      variants={reduceMotion ? undefined : cardVariants}
      initial={reduceMotion ? false : 'enter'}
      animate="center"
      exit={reduceMotion ? { opacity: 0 } : 'exit'}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        ease: EASE,
      }}
      className={`pointer-events-auto absolute max-h-[calc(100dvh-140px)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border bg-[#0b0f17]/95 p-6 shadow-xl shadow-black/20 sm:p-8 lg:p-10 ${
        primary ? accentBorder : 'border-white/[0.06]'
      }`}
    >
      <CategoryHeader
        category={category}
        index={index}
        size="lg"
      />

      <ul className="flex flex-wrap gap-1.5 sm:gap-2">
        {skills.map((skill) => (
          <li key={skill.name}>
            <SkillBadge skill={skill} accent={accent} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

/* -------------------------------------------------------------------------- */
/* Desktop stage: native scroll, no wheel interception                        */
/* -------------------------------------------------------------------------- */

function DesktopStage() {
  const reduceMotion = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const total = categories.length;
  const previousIndex = useRef(0);
  const lockedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);

  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  // Only update React state when the locked state actually changes.
  const checkLock = useCallback(() => {
    const element = stageRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const nextLocked =
      rect.top <= 0 &&
      rect.bottom >= window.innerHeight;

    if (lockedRef.current === nextLocked) return;

    lockedRef.current = nextLocked;
    setLocked(nextLocked);
  }, []);

  useMotionValueEvent(scrollY, 'change', checkLock);

  useEffect(() => {
    checkLock();

    window.addEventListener('resize', checkLock, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', checkLock);
    };
  }, [checkLock]);

  // Change category only when the scroll reaches another category slice.
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(progress * total)),
    );

    if (nextIndex === previousIndex.current) return;

    setDirection(nextIndex > previousIndex.current ? 1 : -1);
    previousIndex.current = nextIndex;
    setActive(nextIndex);
  });

  const jumpTo = useCallback(
    (index: number) => {
      const stage = stageRef.current;
      if (!stage) return;

      const stageTop =
        stage.getBoundingClientRect().top + window.scrollY;

      const scrollRange =
        stage.offsetHeight - window.innerHeight;

      const targetTop =
        stageTop + (index / total) * scrollRange + 2;

      window.scrollTo({
        top: targetTop,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    },
    [reduceMotion, total],
  );

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.5,
  });

  return (
    <>
      <div
        ref={stageRef}
        aria-hidden="true"
        style={{
          height: `${total * 100}vh`,
        }}
      />

      {createPortal(
        <AnimatePresence>
          {locked && (
            <motion.div
              key="skills-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.15,
              }}
              className="pointer-events-none fixed inset-0 z-40 flex h-screen w-screen items-center justify-center overflow-hidden px-6 lg:px-8"
            >
              <div className="relative flex h-full w-full max-w-2xl items-center justify-center pb-20 pt-16">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="sync"
                >
                  <StageCard
                    key={categories[active].id}
                    category={categories[active]}
                    index={active}
                    direction={direction}
                    reduceMotion={reduceMotion}
                  />
                </AnimatePresence>
              </div>

              <div
                aria-live="polite"
                className="absolute right-6 top-7 font-mono text-[11px] text-slate-500 lg:right-8"
              >
                <span className="text-slate-300">
                  {String(active + 1).padStart(2, '0')}
                </span>
                {' / '}
                {String(total).padStart(2, '0')}
              </div>

              <nav
                aria-label="Skill categories"
                className="pointer-events-auto absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2"
              >
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    type="button"
                    aria-label={category.title}
                    aria-current={index === active}
                    onClick={() => jumpTo(index)}
                    className="group flex h-4 items-center outline-none"
                  >
                    <motion.span
                      animate={{
                        width: index === active ? 32 : 6,
                        opacity: index === active ? 1 : 0.35,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                      }}
                      className="block h-1.5 rounded-full bg-primary-light group-hover:opacity-80 group-focus-visible:ring-2 group-focus-visible:ring-primary-light/60"
                    />
                  </button>
                ))}
              </nav>

              <motion.div
                style={{ scaleX: progressScale }}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary-light/40"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile cards                                                                */
/* -------------------------------------------------------------------------- */

const MobileCard = memo(function MobileCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-40px',
  });

  const reduceMotion = useReducedMotion();
  const { accent, accentBorder, primary, skills } = category;

  return (
    <motion.li
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : undefined
      }
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: EASE,
      }}
      className={`rounded-2xl border bg-[#0b0f17]/90 p-5 shadow-lg shadow-black/15 ${
        primary ? accentBorder : 'border-white/[0.06]'
      }`}
    >
      <CategoryHeader
        category={category}
        index={index}
        size="sm"
      />

      <ul className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li key={skill.name}>
            <SkillBadge skill={skill} accent={accent} />
          </li>
        ))}
      </ul>
    </motion.li>
  );
});

function MobileList() {
  return (
    <ul className="mt-4 flex flex-col gap-5 px-5 sm:px-6">
      {categories.map((category, index) => (
        <MobileCard
          key={category.id}
          category={category}
          index={index}
        />
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Skills section                                                         */
/* -------------------------------------------------------------------------- */

export default function Skills() {
  const reduceMotion = useReducedMotion();

  const headerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, {
    once: true,
    margin: '-60px',
  });

  const coreInView = useInView(coreRef, {
    once: true,
    margin: '-40px',
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const reveal = (
    inView: boolean,
    from: { x?: number; y?: number },
    delay = 0,
  ) => ({
    initial: reduceMotion
      ? false
      : { opacity: 0, ...from },
    animate: inView
      ? { opacity: 1, x: 0, y: 0 }
      : undefined,
    transition: {
      duration: reduceMotion ? 0 : 0.45,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark via-surface/20 to-dark" />

      <div className="pointer-events-none absolute -right-64 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/[0.012] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <motion.div
            {...reveal(headerInView, { x: -24 })}
            className="mb-5"
          >
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              {'// Skills'}
            </span>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Skills &amp; Technologies
            </h2>
          </motion.div>

          <motion.p
            {...reveal(headerInView, { x: 24 }, 0.08)}
            className="mb-12 max-w-2xl text-[15px] text-slate-400 lg:mb-14"
          >
            The tools and technologies I use to build intelligent,
            scalable, and practical digital solutions.
          </motion.p>
        </div>

        <div
          ref={coreRef}
          className="mb-14 lg:mb-16"
        >
          <motion.p
            {...reveal(coreInView, { y: 12 })}
            className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600"
          >
            {'// Core Expertise'}
          </motion.p>

          <motion.div
            {...reveal(coreInView, { y: 16 }, 0.05)}
            className="-mx-5 flex flex-col gap-3 sm:-mx-6 lg:-mx-8"
          >
            <Marquee speed={28}>
              {coreExpertise.map((item) => (
                <ExpertisePill
                  key={item.label}
                  {...item}
                  variant="strong"
                />
              ))}
            </Marquee>

            <Marquee speed={22} reverse>
              {[...coreExpertise].reverse().map((item) => (
                <ExpertisePill
                  key={item.label}
                  {...item}
                  variant="soft"
                />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>

      {isDesktop ? <DesktopStage /> : <MobileList />}
    </section>
  );
}