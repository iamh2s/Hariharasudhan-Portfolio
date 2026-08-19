import { motion } from 'framer-motion';
import {
  Brain,
  Bot,
  Cpu,
  Code2,
  Sparkles,
  Workflow,
  BarChart3,
  Globe,
} from 'lucide-react';

/* =========================================================
   PROFILE IMAGE
========================================================= */

const PROFILE_IMAGE = '/myphoto.png';

/* =========================================================
   FOCUS AREAS
========================================================= */

const focusAreas = [
  {
    icon: Brain,
    title: 'AI & Generative AI',
    description:
      'Building LLM-powered applications, AI agents, intelligent assistants, and AI-driven solutions.',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-400/[0.08]',
  },
  {
    icon: Workflow,
    title: 'AI Automation',
    description:
      'Designing automated workflows that connect AI models, APIs, business systems, and communication platforms.',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/[0.08]',
  },
  {
    icon: BarChart3,
    title: 'Machine Learning',
    description:
      'Developing predictive models, classification systems, recommendation systems, and data-driven applications.',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400/[0.08]',
  },
  {
    icon: Globe,
    title: 'Full-Stack Development',
    description:
      'Building modern web applications with responsive interfaces, APIs, databases, and production-oriented architectures.',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-400/[0.08]',
  },
];

/* =========================================================
   BUILD PRINCIPLES
========================================================= */

const principles = [
  {
    step: '01',
    title: 'Learn',
    description:
      'Continuously explore emerging technologies and understand how they can solve practical problems.',
  },
  {
    step: '02',
    title: 'Build',
    description:
      'Turn concepts into working applications through hands-on projects and experimentation.',
  },
  {
    step: '03',
    title: 'Improve',
    description:
      'Iterate, optimize, and refine solutions with a focus on usability, reliability, and real-world value.',
  },
];

/* =========================================================
   FLOATING LABELS
========================================================= */

const floatingLabels = [
  {
    text: 'AI Engineer',
    icon: Sparkles,
    position: 'top-6 -right-3 sm:-right-8 lg:-right-10',
    delay: 0.5,
  },
  {
    text: 'GenAI & AI Agents',
    icon: Bot,
    position:
      '-left-2 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2',
    delay: 0.7,
  },
  {
    text: 'Full-Stack Developer',
    icon: Code2,
    position:
      'bottom-10 -right-2 sm:-right-6 lg:-right-8',
    delay: 0.9,
  },
];

/* =========================================================
   HIGHLIGHT TEXT
========================================================= */

function HighlightedText({
  text,
}: {
  text: string;
}) {
  const keywords = [
    'artificial intelligence',
    'Generative AI',
    'machine learning',
    'AI agents',
    'automation',
    'full-stack development',
    'AI-powered',
    'intelligent automation workflows',
    'machine-learning applications',
    'full-stack web platforms',
    'AI Engineer',
    'Computer Science',
  ];

  const regex = new RegExp(
    `(${keywords.join('|')})`,
    'gi'
  );

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isKeyword = keywords.some(
          (keyword) =>
            keyword.toLowerCase() ===
            part.toLowerCase()
        );

        if (isKeyword) {
          return (
            <span
              key={index}
              className="font-medium text-slate-200"
            >
              {part}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/* =========================================================
   SIMPLE REVEAL
========================================================= */

const revealFromRight = {
  hidden: {
    opacity: 0,
    x: 70,
  },

  visible: {
    opacity: 1,
    x: 0,
  },
};

const revealFromLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,
  },
};

/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  const bioParagraphs = [
    'I am a Computer Science graduate and AI Engineer focused on building intelligent applications that combine artificial intelligence, machine learning, automation, and modern full-stack development.',

    'I enjoy transforming real-world problems into practical technology solutions — from AI-powered customer support systems and intelligent automation workflows to machine-learning applications and full-stack web platforms.',

    'My current focus is on Generative AI, AI agents, workflow automation, machine learning, and building reliable applications that connect AI with real business use cases.',

    'I continuously explore new technologies, experiment with AI systems, and improve my development skills by building practical projects.',
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-64 top-20 h-[450px] w-[450px] rounded-full bg-primary/[0.015] blur-[120px]" />

        <div className="absolute -right-48 bottom-20 h-[350px] w-[350px] rounded-full bg-accent/[0.01] blur-[100px]" />
      </div>

      {/* =====================================================
          MAIN CONTENT

          IMPORTANT:
          No useScroll.
          No sticky.
          No transform connected to page scroll.
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          variants={revealFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
          }}
          className="mb-6"
        >
          <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
            // About
          </span>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            About Me
          </h2>
        </motion.div>

        {/* =================================================
            SUBTITLE
        ================================================== */}

        <motion.p
          variants={revealFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: 'easeOut',
          }}
          className="mb-16 max-w-xl text-[15px] text-slate-400 lg:mb-20"
        >
          Turning ideas into intelligent digital
          solutions.
        </motion.p>

        {/* =================================================
            PORTRAIT + BIO
        ================================================== */}

        <div className="mb-28 grid items-start gap-14 lg:mb-36 lg:grid-cols-[42%_1fr] xl:gap-20">

          {/* =================================================
              PHOTO
          ================================================== */}

          <div className="relative mx-auto w-full max-w-sm lg:mx-0">

            {/* Glow */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
              }}
              className="pointer-events-none absolute -inset-5 rounded-3xl bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.03] blur-2xl"
            />

            {/* =================================================
                PROFILE IMAGE

                No clipPath.
                No parallax.
                No sticky.
            ================================================== */}

            <motion.div
              variants={revealFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.05]"
            >
              <img
                src={PROFILE_IMAGE}
                alt="P.S. Hariharasudhan"
                className="relative z-10 h-full w-full object-cover"
                onError={(event) => {
                  console.error(
                    'Profile image failed to load:',
                    event.currentTarget.src
                  );
                }}
              />

              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-dark/30 via-transparent to-dark/10" />
            </motion.div>

            {/* =================================================
                CORNER MARKS
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                delay: 0.4,
                duration: 0.4,
              }}
              className="absolute -left-2 -top-2 z-30 h-6 w-6 rounded-tl-md border-l border-t border-white/[0.08]"
            />

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                delay: 0.5,
                duration: 0.4,
              }}
              className="absolute -bottom-2 -right-2 z-30 h-6 w-6 rounded-br-md border-b border-r border-white/[0.08]"
            />

            {/* =================================================
                FLOATING LABELS
            ================================================== */}

            {floatingLabels.map(
              ({
                text,
                icon: Icon,
                position,
                delay,
              }) => (
                <motion.div
                  key={text}
                  variants={revealFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay,
                    ease: 'easeOut',
                  }}
                  className={`absolute ${position} z-40 mt-2`}
                >
                  <div className="glass flex items-center gap-2 rounded-lg px-1 py-1 shadow-lg shadow-black/30">
                    <Icon
                      size={12}
                      className="shrink-0 text-primary-light"
                  
                    />

                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-slate-300">
                      {text}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* =================================================
              BIO
          ================================================== */}

          <div className="lg:pt-2">

            {/* Name */}

            <motion.h3
              variants={revealFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: 'easeOut',
              }}
              className="mb-7 font-display text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl"
            >
              P.S. Hariharasudhan
            </motion.h3>

            {/* Paragraphs */}

            {bioParagraphs.map(
              (text, index) => (
                <motion.p
                  key={index}
                  variants={revealFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      0.2 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="mb-4 text-[14.5px] leading-[1.75] text-slate-300"
                >
                  <HighlightedText
                    text={text}
                  />
                </motion.p>
              )
            )}

            {/* Separator */}

            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              className="my-8 h-px max-w-xs origin-left bg-gradient-to-r from-white/[0.06] to-transparent"
            />

            {/* Tags */}

            <motion.div
              variants={revealFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: 'easeOut',
              }}
              className="flex flex-wrap gap-2"
            >
              {[
                'Computer Science Graduate',
                'AI Engineer',
                'Open Source Contributor',
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.01] px-3 py-1.5 text-[11px] font-medium tracking-wide text-slate-500"
                >
                  <Cpu
                    size={10}
                    className="text-primary-light opacity-60"
                  />

                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* =================================================
            WHAT I FOCUS ON
        ================================================== */}

        <div className="mb-28 lg:mb-36">

          <motion.div
            variants={revealFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
            className="mb-10"
          >
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              // Focus
            </span>

            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What I Focus On
            </h3>
          </motion.div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {focusAreas.map(
              (
                {
                  icon: Icon,
                  title,
                  description,
                  accent,
                  accentBg,
                },
                index
              ) => (
                <motion.div
                  key={title}
                  variants={revealFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 transition-colors duration-300 hover:bg-white/[0.025]"
                >
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon
                      size={18}
                      className={accent}
                    />
                  </div>

                  <h4 className="mb-2 font-display text-[15px] font-semibold tracking-tight text-white">
                    {title}
                  </h4>

                  <p className="text-[13px] leading-relaxed text-slate-500">
                    {description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* =================================================
            HOW I BUILD
        ================================================== */}

        <div>

          <motion.div
            variants={revealFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
            className="mb-10"
          >
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              // Approach
            </span>

            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              How I Build
            </h3>
          </motion.div>

          <div className="grid gap-3.5 md:grid-cols-3">
            {principles.map(
              (
                {
                  step,
                  title,
                  description,
                },
                index
              ) => (
                <motion.div
                  key={step}
                  variants={revealFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 transition-colors duration-300 hover:bg-white/[0.025]"
                >
                  {/* Step */}

                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-primary-light/60">
                      {step}
                    </span>

                    <div className="h-px flex-1 bg-white/[0.04] transition-colors group-hover:bg-white/[0.07]" />
                  </div>

                  <h4 className="mb-2.5 font-display text-lg font-semibold tracking-tight text-white">
                    {title}
                  </h4>

                  <p className="text-[13px] leading-relaxed text-slate-500">
                    {description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}