import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

import { createPortal } from 'react-dom';

import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';

import {
  Brain,
  Code2,
  Database,
  Workflow,
  Wrench,
  Sparkles,
  Bot,
  BarChart3,
  FlaskConical,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

interface Skill {
  name: string;
  tip: string;
}

interface Category {
  step: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
  accentBorder: string;
  primary?: boolean;
  skills: Skill[];
}

/* ═══════════════════════════════════════════════
   CORE EXPERTISE
   ═══════════════════════════════════════════════ */

const coreExpertise = [
  { label: 'AI Engineering', icon: Brain },
  { label: 'Generative AI', icon: Sparkles },
  { label: 'AI Agents', icon: Bot },
  { label: 'Machine Learning', icon: BarChart3 },
  { label: 'Full-Stack Development', icon: Code2 },
  { label: 'Workflow Automation', icon: Workflow },
];

/* ═══════════════════════════════════════════════
   CATEGORIES
   ═══════════════════════════════════════════════ */

const categories: Category[] = [
  {
    step: '01',
    title: 'Artificial Intelligence & Generative AI',
    icon: Brain,
    accent: 'text-indigo-500',
    accentBg: 'bg-indigo-900/[10]',
    accentBorder: 'border-indigo-500/[0.01]',
    primary: true,
    skills: [
      {
        name: 'Generative AI',
        tip: 'Building applications powered by generative models for content creation, code generation, and intelligent assistants.',
      },
      {
        name: 'Large Language Models',
        tip: 'Working with GPT, LLaMA, and open-source LLMs for text generation, reasoning, and conversational AI.',
      },
      {
        name: 'AI Agents',
        tip: 'Developing autonomous AI agents that reason, plan, and execute multi-step tasks.',
      },
      {
        name: 'Multi-Agent Systems',
        tip: 'Orchestrating multiple AI agents to collaborate and solve complex problems together.',
      },
      {
        name: 'Prompt Engineering',
        tip: 'Crafting optimized prompts and system instructions for reliable LLM output.',
      },
      {
        name: 'LangChain',
        tip: 'Building LLM-powered chains, agents, and retrieval pipelines for production AI apps.',
      },
      {
        name: 'Groq API',
        tip: 'Leveraging Groq for ultra-fast LLM inference in real-time AI applications.',
      },
      {
        name: 'RAG Concepts',
        tip: 'Implementing Retrieval-Augmented Generation for knowledge-grounded AI responses.',
      },
      {
        name: 'AI Workflow Automation',
        tip: 'Connecting AI models with business processes through automated pipelines.',
      },
    ],
  },

  {
    step: '02',
    title: 'Machine Learning & Data Science',
    icon: FlaskConical,
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400/[0.08]',
    accentBorder: 'border-violet-400/[0.12]',
    skills: [
      {
        name: 'Python',
        tip: 'Primary language for ML, data science, and backend development.',
      },
      {
        name: 'Pandas',
        tip: 'Data manipulation and analysis for preprocessing ML datasets.',
      },
      {
        name: 'NumPy',
        tip: 'Numerical computing for matrix operations and scientific calculations.',
      },
      {
        name: 'Scikit-learn',
        tip: 'Building classification, regression, and clustering models.',
      },
      {
        name: 'TensorFlow',
        tip: 'Used for deep-learning and image-classification projects.',
      },
      {
        name: 'Keras',
        tip: 'High-level API for rapid neural network prototyping.',
      },
      {
        name: 'Matplotlib',
        tip: 'Creating visualizations for data analysis and model evaluation.',
      },
      {
        name: 'Seaborn',
        tip: 'Statistical data visualization for exploratory analysis.',
      },
      {
        name: 'K-Means',
        tip: 'Unsupervised clustering for customer segmentation and pattern discovery.',
      },
      {
        name: 'DBSCAN',
        tip: 'Density-based clustering for anomaly detection and spatial analysis.',
      },
      {
        name: 'Classification',
        tip: 'Building models for sentiment analysis, spam detection, and category prediction.',
      },
      {
        name: 'Regression',
        tip: 'Predictive modeling for price estimation and trend forecasting.',
      },
      {
        name: 'Recommendation Systems',
        tip: 'Collaborative and content-based filtering for personalized suggestions.',
      },
      {
        name: 'Feature Engineering',
        tip: 'Transforming raw data into meaningful features for better model performance.',
      },
      {
        name: 'Data Preprocessing',
        tip: 'Cleaning, normalizing, and preparing datasets for ML pipelines.',
      },
    ],
  },

  {
    step: '03',
    title: 'Full-Stack Development',
    icon: Code2,
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/[0.08]',
    accentBorder: 'border-cyan-400/[0.12]',
    skills: [
      {
        name: 'JavaScript',
        tip: 'Core language for interactive frontend and Node.js backend development.',
      },
      {
        name: 'React.js',
        tip: 'Building component-driven, interactive user interfaces.',
      },
      {
        name: 'Next.js',
        tip: 'Used to build modern production-oriented full-stack applications.',
      },
      {
        name: 'Vite',
        tip: 'Fast build tool for modern frontend development workflows.',
      },
      {
        name: 'HTML',
        tip: 'Semantic markup for accessible and structured web pages.',
      },
      {
        name: 'CSS',
        tip: 'Styling and layout for responsive web interfaces.',
      },
      {
        name: 'Tailwind CSS',
        tip: 'Utility-first CSS framework for rapid, consistent UI development.',
      },
      {
        name: 'Bootstrap',
        tip: 'Component library for responsive prototyping and layout scaffolding.',
      },
      {
        name: 'Django',
        tip: 'Full-featured Python web framework for backend applications and APIs.',
      },
      {
        name: 'Django REST Framework',
        tip: 'Building robust RESTful APIs for frontend-backend communication.',
      },
      {
        name: 'REST APIs',
        tip: 'Designing and consuming APIs that connect frontends, services, and AI models.',
      },
    ],
  },

  {
    step: '04',
    title: 'Databases',
    icon: Database,
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-400/[0.08]',
    accentBorder: 'border-emerald-400/[0.12]',
    skills: [
      {
        name: 'PostgreSQL',
        tip: 'Primary relational database for production applications and complex queries.',
      },
      {
        name: 'MySQL',
        tip: 'Relational database used in web applications and data storage.',
      },
      {
        name: 'SQLite',
        tip: 'Lightweight database for local development and embedded applications.',
      },
    ],
  },

  {
    step: '05',
    title: 'Automation & Integration',
    icon: Workflow,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400/[0.08]',
    accentBorder: 'border-amber-400/[0.12]',
    skills: [
      {
        name: 'n8n',
        tip: 'Used to build AI-powered automation and multi-agent workflows.',
      },
      {
        name: 'HTTP APIs',
        tip: 'Connecting services and systems through RESTful HTTP communication.',
      },
      {
        name: 'Webhooks',
        tip: 'Event-driven integrations for real-time system communication.',
      },
      {
        name: 'API Integration',
        tip: 'Connecting third-party APIs into applications and automation flows.',
      },
      {
        name: 'Workflow Automation',
        tip: 'Designing end-to-end automated pipelines for business processes.',
      },
      {
        name: 'WhatsApp Integration',
        tip: 'Connecting AI assistants and chatbots to WhatsApp for customer communication.',
      },
    ],
  },

  {
    step: '06',
    title: 'Tools & Platforms',
    icon: Wrench,
    accent: 'text-slate-400',
    accentBg: 'bg-slate-400/[0.06]',
    accentBorder: 'border-slate-400/[0.10]',
    skills: [
      {
        name: 'Git',
        tip: 'Version control for collaborative and individual development workflows.',
      },
      {
        name: 'GitHub',
        tip: 'Code hosting, collaboration, and open-source project management.',
      },
      {
        name: 'VS Code',
        tip: 'Primary code editor with custom extensions and configurations.',
      },
      {
        name: 'Streamlit',
        tip: 'Building interactive data apps and ML dashboards in Python.',
      },
      {
        name: 'Google Colab',
        tip: 'Cloud-based notebooks for ML experimentation and GPU-accelerated training.',
      },
      {
        name: 'Vercel',
        tip: 'Deploying and hosting modern frontend and full-stack applications.',
      },
      {
        name: 'Hugging Face',
        tip: 'Accessing and deploying open-source AI models and datasets.',
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   VIEWPORT HEIGHT
   ═══════════════════════════════════════════════ */

function useViewportHeight() {
  const [vh, setVh] = useState(
    typeof window !== 'undefined'
      ? window.innerHeight
      : 800
  );

  useEffect(() => {
    const update = () => {
      setVh(window.innerHeight);
    };

    window.addEventListener('resize', update, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return vh;
}

/* ═══════════════════════════════════════════════
   SCROLL ROW
   ═══════════════════════════════════════════════ */

function ScrollRow({
  children,
  sensitivity = 0.6,
  gapClassName = 'gap-2.5',
}: {
  children: ReactNode;
  sensitivity?: number;
  gapClassName?: string;
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);

  const rawScroll = useMotionValue(0);

  const smoothScroll = useSpring(rawScroll, {
    stiffness: 300,
    damping: 50,
    mass: 0.4,
  });

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSingleWidth(
          measureRef.current.scrollWidth
        );
      }
    };

    measure();

    const ro = new ResizeObserver(measure);

    if (measureRef.current) {
      ro.observe(measureRef.current);
    }

    window.addEventListener(
      'resize',
      measure,
      { passive: true }
    );

    return () => {
      ro.disconnect();

      window.removeEventListener(
        'resize',
        measure
      );
    };
  }, [children]);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf: number | null = null;

    const onScroll = () => {
      if (raf !== null) return;

      raf = requestAnimationFrame(() => {
        raf = null;

        const currentY = window.scrollY;

        rawScroll.set(
          rawScroll.get() +
            (currentY - lastY) *
              sensitivity
        );

        lastY = currentY;
      });
    };

    lastY = window.scrollY;

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );

      if (raf !== null) {
        cancelAnimationFrame(raf);
      }
    };
  }, [rawScroll, sensitivity]);

  const x = useTransform(
    smoothScroll,
    (value) => {
      if (!singleWidth) return 0;

      const wrapped =
        ((value % singleWidth) +
          singleWidth) %
        singleWidth;

      return -singleWidth + wrapped;
    }
  );

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]
      "
    >
      <motion.div
        className={`flex w-max shrink-0 ${gapClassName}`}
        style={{
          x,
          willChange: 'transform',
        }}
      >
        <div
          ref={measureRef}
          className={`flex shrink-0 ${gapClassName}`}
        >
          {children}
        </div>

        <div
          className={`flex shrink-0 ${gapClassName}`}
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SKILL BADGE
   FIXED TOOLTIP
   ═══════════════════════════════════════════════ */

function SkillBadge({
  skill,
  accent,
}: {
  skill: Skill;
  accent: string;
}) {
  const badgeRef =
    useRef<HTMLDivElement>(null);

  const tooltipRef =
    useRef<HTMLDivElement>(null);

  const [showTooltip, setShowTooltip] =
    useState(false);

  const [position, setPosition] =
    useState({
      left: 0,
      top: 0,
      arrowLeft: 50,
    });

  const updateTooltipPosition =
    useCallback(() => {
      const badge = badgeRef.current;

      if (!badge) return;

      const badgeRect =
        badge.getBoundingClientRect();

      const tooltipWidth =
        Math.min(
          240,
          window.innerWidth - 32
        );

      const gap = 10;

      /*
       * Find the card that contains
       * the hovered skill.
       */
      const card =
        badge.closest(
          '[data-skill-card]'
        ) as HTMLElement | null;

      const cardRect =
        card?.getBoundingClientRect();

      /*
       * Center tooltip over badge.
       */
      let left =
        badgeRect.left +
        badgeRect.width / 2 -
        tooltipWidth / 2;

      /*
       * Keep tooltip inside card.
       */
      const minLeft = cardRect
        ? cardRect.left + 16
        : 16;

      const maxLeft = cardRect
        ? cardRect.right -
          tooltipWidth -
          16
        : window.innerWidth -
          tooltipWidth -
          16;

      left = Math.max(
        minLeft,
        Math.min(
          left,
          Math.max(minLeft, maxLeft)
        )
      );

      /*
       * Arrow points to badge center.
       */
      const arrowLeft =
        badgeRect.left +
        badgeRect.width / 2 -
        left;

      /*
       * Default position above badge.
       */
      let top =
        badgeRect.top -
        gap -
        90;

      /*
       * If tooltip would go above
       * the visible card, move below.
       */
      const tooltipHeight =
        tooltipRef.current
          ?.getBoundingClientRect()
          .height || 90;

      if (
        top < 12 ||
        (cardRect &&
          top <
            cardRect.top + 12)
      ) {
        top =
          badgeRect.bottom + gap;
      }

      /*
       * Keep tooltip vertically
       * inside the card/viewport.
       */
      if (cardRect) {
        const maxTop =
          cardRect.bottom -
          tooltipHeight -
          12;

        if (top > maxTop) {
          top = Math.max(
            cardRect.top + 12,
            maxTop
          );
        }
      } else {
        const maxTop =
          window.innerHeight -
          tooltipHeight -
          12;

        top = Math.min(
          top,
          maxTop
        );
      }

      setPosition({
        left,
        top,
        arrowLeft: Math.max(
          14,
          Math.min(
            arrowLeft,
            tooltipWidth - 14
          )
        ),
      });
    }, []);

  useEffect(() => {
    if (!showTooltip) return;

    const update = () => {
      updateTooltipPosition();
    };

    update();

    window.addEventListener(
      'resize',
      update,
      { passive: true }
    );

    window.addEventListener(
      'scroll',
      update,
      {
        passive: true,
        capture: true,
      }
    );

    return () => {
      window.removeEventListener(
        'resize',
        update
      );

      window.removeEventListener(
        'scroll',
        update,
        true
      );
    };
  }, [
    showTooltip,
    updateTooltipPosition,
  ]);

  return (
    <div
      ref={badgeRef}
      className="relative"
      onMouseEnter={() => {
        setShowTooltip(true);

        requestAnimationFrame(() => {
          updateTooltipPosition();
        });
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
      onFocus={() => {
        setShowTooltip(true);

        requestAnimationFrame(() => {
          updateTooltipPosition();
        });
      }}
      onBlur={() => {
        setShowTooltip(false);
      }}
    >
      {/* Skill badge */}
      <div
        className="
          px-3
          py-[7px]
          rounded-lg
          border
          border-white/[0.05]
          bg-white/[0.015]
          text-[12px]
          text-slate-400
          font-medium
          cursor-default
          select-none
          whitespace-nowrap
          transition-all
          duration-200
          ease-out
          hover:bg-white/[0.04]
          hover:text-slate-300
          hover:border-white/[0.08]
          hover:scale-[1.04]
          hover:-translate-y-0.5
        "
      >
        {skill.name}
      </div>

      {/* Tooltip */}
      {showTooltip &&
        typeof document !==
          'undefined' &&
        createPortal(
          <div
            ref={tooltipRef}
            className="
              fixed
              z-[9999]
              pointer-events-none
              opacity-100
              translate-y-0
              scale-100
              transition-all
              duration-150
              ease-out
            "
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              width:
                'min(240px, calc(100vw - 32px))',
            }}
          >
            <div
              className="
                relative
                w-full
                rounded-lg
                px-3.5
                py-2.5
                shadow-xl
                shadow-black/30
                bg-[rgba(11,15,23,0.94)]
                backdrop-blur-xl
                border
                border-white/[0.08]
              "
            >
              <p
                className={`
                  text-[11px]
                  font-semibold
                  ${accent}
                  mb-1
                `}
              >
                {skill.name}
              </p>

              <p
                className="
                  text-[11px]
                  text-slate-400
                  leading-relaxed
                "
              >
                {skill.tip}
              </p>

              {/* Tooltip arrow */}
              <div
                className="
                  absolute
                  -bottom-1
                  w-2
                  h-2
                  bg-[rgba(11,15,23,0.94)]
                  border-r
                  border-b
                  border-white/[0.08]
                  rotate-45
                "
                style={{
                  left:
                    `${position.arrowLeft}px`,
                  transform:
                    'translateX(-50%) rotate(45deg)',
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */

function HeaderBlock({
  inView,
}: {
  inView: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          x: -70,
        }}
        animate={
          inView
            ? {
                opacity: 1,
                x: 0,
              }
            : {}
        }
        transition={{
          duration: 0.7,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="mb-5"
      >
        <span
          className="
            inline-block
            text-[11px]
            font-mono
            font-medium
            tracking-[0.2em]
            uppercase
            text-slate-500
            mb-3
          "
        >
          // Skills
        </span>

        <h2
          className="
            font-display
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            text-white
            tracking-tight
          "
        >
          Skills & Technologies
        </h2>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          x: 70,
        }}
        animate={
          inView
            ? {
                opacity: 1,
                x: 0,
              }
            : {}
        }
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          text-slate-400
          text-[15px]
          max-w-2xl
          mb-12
          lg:mb-14
        "
      >
        The tools and technologies I use
        to build intelligent, scalable,
        and practical digital solutions.
      </motion.p>
    </>
  );
}

/* ═══════════════════════════════════════════════
   CORE EXPERTISE LABEL
   ═══════════════════════════════════════════════ */

function CoreExpertiseLabel({
  coreInView,
}: {
  coreInView: boolean;
}) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={
        coreInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        text-[11px]
        font-mono
        font-medium
        tracking-[0.2em]
        uppercase
        text-slate-600
        mb-5
      "
    >
      // Core Expertise
    </motion.p>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SKILLS SECTION
   ═══════════════════════════════════════════════ */

export default function Skills() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const coreRef =
    useRef<HTMLDivElement>(null);

  const inView = useInView(
    sectionRef,
    {
      once: true,
      margin: '-60px',
    }
  );

  const coreInView = useInView(
    coreRef,
    {
      once: true,
      margin: '-40px',
    }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="
        relative
        py-24
        lg:py-32
      "
    >
      {/* Ambient background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-dark
          via-surface/20
          to-dark
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-1/3
          -right-64
          w-[400px]
          h-[400px]
          rounded-full
          bg-primary/[0.012]
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Header + Core */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-8
          relative
        "
      >
        <HeaderBlock
          inView={inView}
        />

        <div
          ref={coreRef}
          className="
            mb-14
            lg:mb-16
          "
        >
          <CoreExpertiseLabel
            coreInView={coreInView}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={
              coreInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              flex
              flex-col
              gap-3
              -mx-5
              sm:-mx-6
              lg:-mx-8
              px-5
              sm:px-6
              lg:px-8
            "
          >
            <ScrollRow
              sensitivity={0.6}
            >
              {coreExpertise.map(
                ({
                  label,
                  icon: Icon,
                }) => (
                  <div
                    key={label}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-primary/[0.12]
                      bg-primary/[0.04]
                      text-[13px]
                      font-medium
                      text-slate-200
                      select-none
                      whitespace-nowrap
                    "
                  >
                    <Icon
                      size={14}
                      className="
                        text-primary-light
                        opacity-70
                      "
                    />

                    {label}
                  </div>
                )
              )}
            </ScrollRow>

            <ScrollRow
              sensitivity={-0.6}
            >
              {[
                ...coreExpertise,
              ]
                .reverse()
                .map(
                  ({
                    label,
                    icon: Icon,
                  }) => (
                    <div
                      key={label}
                      className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.015]
                        text-[13px]
                        font-medium
                        text-slate-400
                        select-none
                        whitespace-nowrap
                      "
                    >
                      <Icon
                        size={14}
                        className="opacity-50"
                      />

                      {label}
                    </div>
                  )
                )}
            </ScrollRow>
          </motion.div>
        </div>
      </div>

      {/* Category scroll stage */}
      <CategoryScrollStage
        categories={categories}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CATEGORY SCROLL STAGE
   ═══════════════════════════════════════════════ */

function CategoryScrollStage({
  categories,
}: {
  categories: Category[];
}) {
  const stageRef =
    useRef<HTMLDivElement>(null);

  const total =
    categories.length;

  const vh =
    useViewportHeight();

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] = useState(1);

  const [
    isActive,
    setIsActive,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  const lastIndex =
    useRef(0);

  const lastProgress =
    useRef(0);

  const frameRef =
    useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkMobile();

    window.addEventListener(
      'resize',
      checkMobile,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'resize',
        checkMobile
      );

      if (
        frameRef.current !== null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
  }, []);

  const update =
    useCallback(() => {
      frameRef.current = null;

      const stage =
        stageRef.current;

      if (!stage) return;

      const rect =
        stage.getBoundingClientRect();

      const scrollDistance =
        Math.max(
          1,
          rect.height - vh
        );

      const rawProgress =
        -rect.top /
        scrollDistance;

      const progress =
        Math.max(
          0,
          Math.min(
            1,
            rawProgress
          )
        );

      const currentlyActive =
        rect.top <= 0 &&
        rect.bottom >= vh;

      setIsActive(
        (prev) =>
          prev === currentlyActive
            ? prev
            : currentlyActive
      );

      if (
        progress >
        lastProgress.current +
          0.001
      ) {
        setDirection(1);
      } else if (
        progress <
        lastProgress.current -
          0.001
      ) {
        setDirection(-1);
      }

      lastProgress.current =
        progress;

      const calculatedIndex =
        Math.min(
          total - 1,
          Math.floor(
            progress * total
          )
        );

      if (
        calculatedIndex !==
        lastIndex.current
      ) {
        lastIndex.current =
          calculatedIndex;

        setActiveIndex(
          calculatedIndex
        );
      }
    }, [total, vh]);

  useEffect(() => {
    const requestUpdate =
      () => {
        if (
          frameRef.current === null
        ) {
          frameRef.current =
            requestAnimationFrame(
              update
            );
        }
      };

    update();

    window.addEventListener(
      'scroll',
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      requestUpdate,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        requestUpdate
      );

      window.removeEventListener(
        'resize',
        requestUpdate
      );

      if (
        frameRef.current !== null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
  }, [update]);

  /* ═════════════════════════════════════════════
     MOBILE
     ═════════════════════════════════════════════ */

  if (
    mounted &&
    isMobile
  ) {
    return (
      <div
        className="
          px-5
          sm:px-6
          flex
          flex-col
          gap-5
          mt-4
        "
      >
        {categories.map(
          (category, i) => (
            <MobileCard
              key={category.step}
              category={category}
              index={i}
            />
          )
        )}
      </div>
    );
  }

  /* ═════════════════════════════════════════════
     DESKTOP
     ═════════════════════════════════════════════ */

  return (
    <>
      <div
        ref={stageRef}
        className="
          relative
          w-full
        "
        style={{
          height:
            `${total * 100}vh`,
        }}
      />

      {mounted &&
        isActive &&
        createPortal(
          <FixedCategoryDisplay
            categories={categories}
            activeIndex={activeIndex}
            direction={direction}
          />,
          document.body
        )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════ */

function MobileCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const ref =
    useRef<HTMLDivElement>(null);

  const inView = useInView(
    ref,
    {
      once: true,
      margin: '-40px',
    }
  );

  const {
    step,
    title,
    icon: Icon,
    accent,
    accentBg,
    accentBorder,
    primary,
    skills,
  } = category;

  return (
    <motion.div
      ref={ref}
      data-skill-card
      initial={{
        opacity: 0,
        y: 32,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={`
        relative
        rounded-2xl
        bg-white/[0.025]
        backdrop-blur-xl
        shadow-xl
        shadow-black/20
        p-5
        border
        ${
          primary
            ? accentBorder
            : 'border-white/[0.06]'
        }
      `}
    >
      {/* Header */}
      <div
        className="
          flex
          items-start
          gap-3
          mb-5
        "
      >
        <div
          className={`
            w-10
            h-10
            rounded-xl
            ${accentBg}
            flex
            items-center
            justify-center
            shrink-0
          `}
        >
          <Icon
            size={20}
            className={accent}
          />
        </div>

        <div
          className="
            flex-1
            min-w-0
          "
        >
          <div
            className="
              flex
              items-start
              gap-2
            "
          >
            <span
              className="
                text-[11px]
                font-mono
                text-primary-light/50
                font-medium
                tracking-wider
                shrink-0
                pt-0.5
              "
            >
              {step}
            </span>

            <h3
              className="
                font-display
                text-base
                font-semibold
                text-white
                tracking-tight
                leading-tight
              "
            >
              {title}
            </h3>
          </div>
        </div>

        {primary && (
          <span
            className="
              inline-flex
              items-center
              gap-1
              px-2
              py-0.5
              rounded-md
              bg-primary/[0.08]
              text-[10px]
              font-semibold
              text-primary-light
              tracking-wider
              uppercase
              shrink-0
            "
          >
            <Sparkles size={9} />
            Primary
          </span>
        )}
      </div>

      {/* Skills */}
      <div
        className="
          flex
          flex-wrap
          gap-1.5
        "
      >
        {skills.map(
          (skill) => (
            <SkillBadge
              key={skill.name}
              skill={skill}
              accent={accent}
            />
          )
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   FIXED CATEGORY DISPLAY
   ═══════════════════════════════════════════════ */

function FixedCategoryDisplay({
  categories,
  activeIndex,
  direction,
}: {
  categories: Category[];
  activeIndex: number;
  direction: number;
}) {
  const category =
    categories[activeIndex];

  return (
    <div
      className="
        fixed
        inset-0
        z-[40]
        w-screen
        h-screen
        overflow-hidden
        pointer-events-none
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-dark/[0.03]
          pointer-events-none
        "
      />

      {/* Card area */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          px-5
          sm:px-6
          lg:px-8
          pt-16
          pb-20
        "
      >
        <AnimatePresence
          initial={false}
          mode="sync"
        >
          <LockedCategoryCard
            key={category.step}
            category={category}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Counter */}
      <motion.div
        key={`counter-${activeIndex}`}
        initial={{
          opacity: 0,
          y: -8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="
          absolute
          top-7
          right-5
          sm:right-6
          lg:right-8
          font-mono
          text-[11px]
          text-slate-500
          z-50
        "
      >
        <span
          className="
            text-slate-300
          "
        >
          {String(
            activeIndex + 1
          ).padStart(2, '0')}
        </span>

        {' / '}

        {String(
          categories.length
        ).padStart(2, '0')}
      </motion.div>

      {/* Progress dots */}
      <div
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          z-50
        "
      >
        {categories.map(
          (item, index) => (
            <motion.div
              key={item.step}
              animate={{
                width:
                  index === activeIndex
                    ? 32
                    : 6,
                opacity:
                  index === activeIndex
                    ? 1
                    : 0.35,
              }}
              transition={{
                duration: 0.35,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                h-1.5
                rounded-full
                bg-primary-light
              "
            />
          )
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LOCKED CATEGORY CARD
   ═══════════════════════════════════════════════ */

function LockedCategoryCard({
  category,
  direction,
}: {
  category: Category;
  direction: number;
}) {
  const {
    step,
    title,
    icon: Icon,
    accent,
    accentBg,
    accentBorder,
    primary,
    skills,
  } = category;

  const enterY =
    direction > 0
      ? 48
      : -48;

  const exitY =
    direction > 0
      ? -48
      : 48;

  return (
    <motion.div
      data-skill-card
      initial={{
        opacity: 0,
        y: enterY,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: exitY,
        scale: 0.97,
      }}
      transition={{
        opacity: {
          duration: 0.35,
          ease: 'easeOut',
        },
        y: {
          duration: 0.55,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        },
        scale: {
          duration: 0.55,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        },
      }}
      className="
        relative
        w-full
        max-w-2xl
        rounded-3xl
        bg-white/[0.025]
        backdrop-blur-xl
        shadow-2xl
        shadow-black/25
        p-6
        sm:p-8
        lg:p-10
        pointer-events-auto
        max-h-[calc(100dvh-120px)]
        overflow-y-auto
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-white/10
      "
    >
      {/* Border */}
      <div
        className={`
          absolute
          inset-0
          rounded-3xl
          pointer-events-none
          ${
            primary
              ? `border ${accentBorder}`
              : 'border border-white/[0.06]'
          }
        `}
      />

      {/* Header */}
      <div
        className="
          relative
          flex
          items-start
          gap-3
          sm:gap-4
          mb-6
          sm:mb-7
        "
      >
        {/* Icon */}
        <div
          className={`
            w-11
            h-11
            sm:w-14
            sm:h-14
            rounded-2xl
            ${accentBg}
            flex
            items-center
            justify-center
            shrink-0
          `}
        >
          <Icon
            size={24}
            className={accent}
          />
        </div>

        {/* Title */}
        <div
          className="
            flex-1
            min-w-0
          "
        >
          <div
            className="
              flex
              items-start
              gap-2
              sm:gap-3
            "
          >
            <span
              className="
                text-[11px]
                sm:text-[12px]
                font-mono
                text-primary-light/50
                font-medium
                tracking-wider
                shrink-0
                pt-1
              "
            >
              {step}
            </span>

            <h3
              className="
                font-display
                text-lg
                sm:text-xl
                lg:text-2xl
                font-semibold
                text-white
                tracking-tight
                leading-tight
              "
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Primary badge */}
        {primary && (
          <span
            className="
              hidden
              sm:inline-flex
              items-center
              gap-1
              px-2.5
              py-1
              rounded-md
              bg-primary/[0.08]
              text-[10px]
              font-semibold
              text-primary-light
              tracking-wider
              uppercase
              shrink-0
            "
          >
            <Sparkles size={9} />
            Primary
          </span>
        )}
      </div>

      {/* Skills */}
      <div
        className="
          relative
          flex
          flex-wrap
          gap-1.5
          sm:gap-2
        "
      >
        {skills.map(
          (skill, index) => (
            <motion.div
              key={skill.name}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  0.1 +
                  index *
                    0.015,
                duration: 0.25,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <SkillBadge
                skill={skill}
                accent={accent}
              />
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}