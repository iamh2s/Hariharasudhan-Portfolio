import {
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

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

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
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* -------------------------------------------------------------------------- */
/*  Marquee: drifts on its own, speeds up and follows the scroll direction    */
/* -------------------------------------------------------------------------- */

function Marquee({
  children,
  speed = 28,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number; // px per second
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);
  const x = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], {
    clamp: false,
  });

  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => setCopyWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!copyWidth || reduceMotion) return;

    const b = boost.get();
    // Scrolling flips the drift direction relative to the row's base direction.
    if (b < -0.05) direction.current = reverse ? 1 : -1;
    else if (b > 0.05) direction.current = reverse ? -1 : 1;

    const step =
      direction.current * speed * (1 + Math.abs(b)) * (delta / 1000);
    x.set(wrap(-copyWidth, 0, x.get() - step));
  });

  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]">
      <motion.div className="flex w-max" style={{ x, willChange: 'transform' }}>
        {/* Spacing lives on the items (pr-2.5), so one copy's width is exact. */}
        <div ref={copyRef} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function ExpertisePill({
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
          className={strong ? 'text-primary-light opacity-70' : 'opacity-50'}
        />
        {label}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tooltip + badge                                                           */
/* -------------------------------------------------------------------------- */

const TOOLTIP_W = 240;
const TOOLTIP_GAP = 10;
const VIEWPORT_PAD = 12;

function SkillBadge({ skill, accent }: { skill: Skill; accent: string }) {
  const badgeRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0, arrow: 0, below: false });

  const place = useCallback(() => {
    const badge = badgeRef.current;
    const tip = tipRef.current;
    if (!badge || !tip) return;

    const b = badge.getBoundingClientRect();
    const width = Math.min(TOOLTIP_W, window.innerWidth - VIEWPORT_PAD * 2);
    const height = tip.offsetHeight;

    const center = b.left + b.width / 2;
    const left = Math.max(
      VIEWPORT_PAD,
      Math.min(center - width / 2, window.innerWidth - width - VIEWPORT_PAD),
    );

    // Prefer above; flip below if it would leave the viewport.
    const aboveTop = b.top - TOOLTIP_GAP - height;
    const below = aboveTop < VIEWPORT_PAD;
    const top = below ? b.bottom + TOOLTIP_GAP : aboveTop;

    setPos({
      left,
      top,
      below,
      arrow: Math.max(14, Math.min(center - left, width - 14)),
    });
  }, []);

  // Measure after the tooltip mounts, and keep it pinned on scroll/resize.
  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener('resize', place, { passive: true });
    window.addEventListener('scroll', place, { passive: true, capture: true });
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, place]);

  // Close on outside tap / Escape (touch + keyboard support).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!badgeRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
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
        onClick={() => setOpen((v) => !v)}
        className="select-none whitespace-nowrap rounded-lg border border-white/[0.05] bg-white/[0.015] px-3 py-[7px] text-[12px] font-medium text-slate-400 outline-none transition-[transform,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-primary-light/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {skill.name}
      </button>

      {open &&
        createPortal(
          <motion.div
            ref={tipRef}
            id={`tip-${skill.name}`}
            role="tooltip"
            initial={{ opacity: 0, y: pos.below ? -6 : 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: pos.left,
              top: pos.top,
              width: `min(${TOOLTIP_W}px, calc(100vw - ${VIEWPORT_PAD * 2}px))`,
              transformOrigin: pos.below ? 'top' : 'bottom',
            }}
          >
            <div className="relative rounded-lg border border-white/[0.08] bg-[rgba(11,15,23,0.94)] px-3.5 py-2.5 shadow-xl shadow-black/30 backdrop-blur-xl">
              <p className={`mb-1 text-[11px] font-semibold ${accent}`}>
                {skill.name}
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {skill.tip}
              </p>
              <span
                className={`absolute h-2 w-2 -translate-x-1/2 rotate-45 border-white/[0.08] bg-[rgba(11,15,23,0.94)] ${
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
}

/* -------------------------------------------------------------------------- */
/*  Category card (shared by desktop stage and mobile list)                   */
/* -------------------------------------------------------------------------- */

function CategoryHeader({
  category,
  index,
  size,
}: {
  category: Category;
  index: number;
  size: 'sm' | 'lg';
}) {
  const { title, icon: Icon, accent, accentBg, primary } = category;
  const lg = size === 'lg';

  return (
    <div className={`flex items-start gap-3 ${lg ? 'mb-7 sm:gap-4' : 'mb-5'}`}>
      <div
        className={`flex shrink-0 items-center justify-center ${accentBg} ${
          lg ? 'h-12 w-12 rounded-2xl sm:h-14 sm:w-14' : 'h-10 w-10 rounded-xl'
        }`}
      >
        <Icon size={lg ? 24 : 20} className={accent} />
      </div>

      <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
        <span className="shrink-0 pt-1 font-mono text-[11px] font-medium tracking-wider text-primary-light/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className={`font-display font-semibold leading-tight tracking-tight text-white ${
            lg ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base'
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
}

const cardVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 48, scale: 0.96 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, y: dir * -48, scale: 0.97 }),
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.015, duration: 0.25, ease: EASE },
  }),
};

function StageCard({
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
      initial={reduceMotion ? { opacity: 0 } : 'enter'}
      animate={reduceMotion ? { opacity: 1 } : 'center'}
      exit={reduceMotion ? { opacity: 0 } : 'exit'}
      transition={{
        opacity: { duration: 0.3, ease: 'easeOut' },
        default: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`pointer-events-auto absolute max-h-[calc(100dvh-140px)] w-full max-w-2xl overflow-y-auto rounded-3xl border bg-white/[0.025] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8 lg:p-10 ${
        primary ? accentBorder : 'border-white/[0.06]'
      }`}
    >
      <CategoryHeader category={category} index={index} size="lg" />

      <ul className="flex flex-wrap gap-1.5 sm:gap-2">
        {skills.map((skill, i) => (
          <motion.li
            key={skill.name}
            custom={i}
            variants={chipVariants}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
          >
            <SkillBadge skill={skill} accent={accent} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop: sticky scroll stage (no wheel hijacking, no portals)             */
/* -------------------------------------------------------------------------- */

function DesktopStage() {
  const reduceMotion = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const total = categories.length;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndex = useRef(0);

  const [locked, setLocked] = useState(false);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  // The stage is "locked" while its tall spacer fills the viewport.
  const checkLock = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setLocked(r.top <= 0 && r.bottom >= window.innerHeight);
  }, []);

  useMotionValueEvent(scrollY, 'change', checkLock);
  useEffect(() => {
    checkLock();
    window.addEventListener('resize', checkLock, { passive: true });
    return () => window.removeEventListener('resize', checkLock);
  }, [checkLock]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    if (next === prevIndex.current) return;
    setDirection(next > prevIndex.current ? 1 : -1);
    prevIndex.current = next;
    setActive(next);
  });

  // Dots (and keyboard users) jump by scrolling to the matching slice.
  const jumpTo = (index: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const top = stage.getBoundingClientRect().top + window.scrollY;
    const range = stage.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (index / total) * range + 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <>
      {/* Empty spacer: its height is the scroll distance of the whole stage. */}
      <div
        ref={stageRef}
        aria-hidden="true"
        style={{ height: `${total * 100}vh` }}
      />

      {/* Fixed layer in <body>: pins to the screen no matter which ancestor
          has overflow / transform set (which breaks position: sticky). */}
      {createPortal(
        <AnimatePresence>
          {locked && (
            <motion.div
              key="skills-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none fixed inset-0 z-40 flex h-screen w-screen items-center justify-center overflow-hidden px-6 lg:px-8"
            >
              <div className="relative flex h-full w-full max-w-2xl items-center justify-center pb-20 pt-16">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                {categories.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.title}
                    aria-current={i === active}
                    onClick={() => jumpTo(i)}
                    className="group flex h-4 items-center outline-none"
                  >
                    <motion.span
                      animate={{
                        width: i === active ? 32 : 6,
                        opacity: i === active ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
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
/*  Mobile: stacked cards                                                     */
/* -------------------------------------------------------------------------- */

function MobileCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const { accent, accentBorder, primary, skills } = category;

  return (
    <motion.li
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE }}
      className={`rounded-2xl border bg-white/[0.025] p-5 shadow-xl shadow-black/20 backdrop-blur-xl ${
        primary ? accentBorder : 'border-white/[0.06]'
      }`}
    >
      <CategoryHeader category={category} index={index} size="sm" />
      <ul className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li key={skill.name}>
            <SkillBadge skill={skill} accent={accent} />
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

function MobileList() {
  return (
    <ul className="mt-4 flex flex-col gap-5 px-5 sm:px-6">
      {categories.map((c, i) => (
        <MobileCard key={c.id} category={c} index={i} />
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const coreInView = useInView(coreRef, { once: true, margin: '-40px' });
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const reveal = (inView: boolean, from: { x?: number; y?: number }, delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, ...from },
    animate: inView ? { opacity: 1, x: 0, y: 0 } : undefined,
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark via-surface/20 to-dark" />
      <div className="pointer-events-none absolute -right-64 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/[0.012] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <motion.div {...reveal(headerInView, { x: -60 })} className="mb-5">
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              {'// Skills'}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Skills &amp; Technologies
            </h2>
          </motion.div>

          <motion.p
            {...reveal(headerInView, { x: 60 }, 0.12)}
            className="mb-12 max-w-2xl text-[15px] text-slate-400 lg:mb-14"
          >
            The tools and technologies I use to build intelligent, scalable, and
            practical digital solutions.
          </motion.p>
        </div>

        <div ref={coreRef} className="mb-14 lg:mb-16">
          <motion.p
            {...reveal(coreInView, { y: 20 })}
            className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600"
          >
            {'// Core Expertise'}
          </motion.p>

          <motion.div
            {...reveal(coreInView, { y: 30 }, 0.1)}
            className="-mx-5 flex flex-col gap-3 sm:-mx-6 lg:-mx-8"
          >
            <Marquee speed={28}>
              {coreExpertise.map((item) => (
                <ExpertisePill key={item.label} {...item} variant="strong" />
              ))}
            </Marquee>
            <Marquee speed={22} reverse>
              {[...coreExpertise].reverse().map((item) => (
                <ExpertisePill key={item.label} {...item} variant="soft" />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>

      {isDesktop ? <DesktopStage /> : <MobileList />}
    </section>
  );
}