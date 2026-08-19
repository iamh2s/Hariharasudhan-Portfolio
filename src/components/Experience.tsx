"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Database,
  GitBranch,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  motion,
  type Variants,
} from "framer-motion";

/* =========================================================
   TYPES
   ========================================================= */

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  icon: typeof BriefcaseBusiness;
  accent: string;
  accentBg: string;
  current?: boolean;
}

/* =========================================================
   EXPERIENCE DATA
   Based strictly on uploaded resume
   ========================================================= */

const experiences: ExperienceItem[] = [
  {
    id: "abrandr-solutions",
    company: "Abrandr Solutions",
    role: "AI Engineer Intern",
    duration: "Current",
    location: "Chennai, Tamil Nadu",
    type: "Work From Home",
    description:
      "Working as an AI Engineer Intern, contributing to AI automation and agentic AI workflows for real-world applications.",
    responsibilities: [
      "Delivered the GIRI UK AI Chatbot as a production multi-agent system.",
      "Built workflows using n8n, LangChain, and WhatsApp API.",
      "Deployed the AI chatbot system on Hostinger.",
      "Designed agentic workflows with intent routing and customer onboarding.",
      "Implemented multi-agent coordination for a live UK-based client.",
    ],
    technologies: [
      "n8n",
      "LangChain",
      "WhatsApp API",
      "AI Agents",
      "Agentic AI",
      "Hostinger",
    ],
    icon: Sparkles,
    accent: "text-violet-400",
    accentBg: "bg-violet-400/[0.08]",
    current: true,
  },

  {
    id: "etex-solutions",
    company: "Etex Solutions",
    role: "AI Full Stack Development Intern",
    duration: "6 Months",
    location: "Madurai, Tamil Nadu",
    type: "Internship",
    description:
      "Worked on full-stack web application development using React.js for frontend development and Python Django for backend development.",
    responsibilities: [
      "Built and maintained full-stack web applications using React.js and Python Django.",
      "Developed REST APIs for application functionality.",
      "Integrated databases with web applications.",
      "Implemented user authentication and session management.",
      "Collaborated on end-to-end feature development from UI design to backend logic and deployment.",
    ],
    technologies: [
      "React.js",
      "Python",
      "Django",
      "REST APIs",
      "Databases",
      "Authentication",
    ],
    icon: Code2,
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400/[0.08]",
  },
];

/* =========================================================
   ANIMATION VARIANTS
   ========================================================= */

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const experienceReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.95,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   MAIN EXPERIENCE COMPONENT
   ========================================================= */

export default function Experience() {
  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        py-20
        sm:py-24
        md:py-28
        lg:py-36
        xl:py-40
      "
    >
      {/* =================================================
          BACKGROUND GLOWS
         ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.65,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          pointer-events-none
          absolute
          -left-48
          top-1/4
          h-[280px]
          w-[280px]
          rounded-full
          bg-primary/[0.035]
          blur-[100px]
          sm:h-[380px]
          sm:w-[380px]
          lg:h-[500px]
          lg:w-[500px]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.65,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        transition={{
          duration: 1.5,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-1/4
          h-[260px]
          w-[260px]
          rounded-full
          bg-accent/[0.025]
          blur-[100px]
          sm:h-[360px]
          sm:w-[360px]
          lg:h-[460px]
          lg:w-[460px]
        "
      />

      {/* =================================================
          CONTAINER
         ================================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            HEADER
           ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mb-10 sm:mb-12 md:mb-14"
        >
          {/* LABEL */}

          <motion.div
            variants={fadeUp}
            className="
              mb-3
              flex
              items-center
              gap-2
            "
          >
            <motion.span
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: 28,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                h-px
                bg-primary/60
              "
            />

            <span
              className="
                font-mono
                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-slate-500
                sm:text-[10px]
              "
            >
              // Experience
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h2
            variants={fadeUp}
            className="
              font-display
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
            "
          >
            Where I've Worked
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            variants={fadeUp}
            className="
              mt-4
              max-w-2xl
              text-[12px]
              leading-relaxed
              text-slate-400
              sm:text-[13px]
              md:text-[14px]
              lg:text-[15px]
            "
          >
            My professional experience across AI
            engineering, agentic AI, automation,
            and full-stack development.
          </motion.p>
        </motion.div>

        {/* =================================================
            EXPERIENCE TIMELINE
           ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="
            relative
          "
        >
          {/* TIMELINE LINE */}

          <motion.div
            initial={{
              scaleY: 0,
              transformOrigin: "top",
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.05,
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute
              bottom-0
              left-[18px]
              top-0
              w-px
              bg-gradient-to-b
              from-primary/50
              via-white/[0.08]
              to-transparent
              sm:left-[23px]
              md:left-1/2
              md:-translate-x-1/2
            "
          />

          <div
            className="
              space-y-8
              sm:space-y-10
              md:space-y-12
            "
          >
            {experiences.map(
              (experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              )
            )}
          </div>
        </motion.div>

        {/* =================================================
            CAREER STATEMENT
           ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 45,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-10
            overflow-hidden
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.015]
            sm:mt-12
            sm:rounded-2xl
          "
        >
          <div
            className="
              relative
              flex
              flex-col
              gap-4
              p-5
              sm:p-6
              md:flex-row
              md:items-center
              md:justify-between
              md:p-7
            "
          >
            {/* GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-44
                w-44
                rounded-full
                bg-primary/[0.05]
                blur-[65px]
              "
            />

            {/* LEFT */}

            <div
              className="
                relative
                z-10
                flex
                items-start
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-primary/[0.06]
                "
              >
                <Workflow
                  size={17}
                  className="text-primary"
                />
              </div>

              <div>
                <p
                  className="
                    text-[12px]
                    font-medium
                    text-white
                    sm:text-[13px]
                  "
                >
                  From development to AI engineering
                </p>

                <p
                  className="
                    mt-1
                    max-w-xl
                    text-[10px]
                    leading-relaxed
                    text-slate-500
                    sm:text-[11px]
                  "
                >
                  Building practical systems by
                  combining software engineering,
                  machine learning, AI agents, and
                  automation.
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-2
                self-start
                md:self-auto
              "
            >
              <Sparkles
                size={13}
                className="text-primary"
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-slate-600
                "
              >
                Growing Through Experience
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE CARD
   ========================================================= */

function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const Icon = experience.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={experienceReveal}
      className="
        relative
        pl-12
        sm:pl-14
        md:pl-0
      "
    >
      {/* =================================================
          TIMELINE DOT - MOBILE
         ================================================= */}

      <div
        className="
          absolute
          left-0
          top-6
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-primary/25
          bg-[#080b12]
          shadow-[0_0_25px_rgba(255,255,255,0.04)]
          sm:h-10
          sm:w-10
          md:hidden
        "
      >
        <Icon
          size={16}
          className={experience.accent}
        />
      </div>

      {/* =================================================
          DESKTOP TIMELINE DOT
         ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-6
          z-20
          hidden
          h-11
          w-11
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-primary/25
          bg-[#080b12]
          shadow-[0_0_30px_rgba(255,255,255,0.05)]
          md:flex
        "
      >
        <Icon
          size={17}
          className={experience.accent}
        />
      </div>

      {/* =================================================
          DESKTOP LAYOUT
         ================================================= */}

      <div
        className="
          md:grid
          md:grid-cols-2
          md:gap-16
        "
      >
        {/* LEFT */}

        <div
          className={
            isEven
              ? "md:pr-8"
              : "md:col-start-2 md:pl-8"
          }
        >
          <ExperienceContent
            experience={experience}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   EXPERIENCE CONTENT
   ========================================================= */

function ExperienceContent({
  experience,
}: {
  experience: ExperienceItem;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.015]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-white/[0.13]
        hover:shadow-[0_0_40px_rgba(255,80,120,0.08)]
        sm:rounded-2xl
      "
    >
      {/* =================================================
          ANIMATED GLOW
         ================================================= */}

      <div
        className="
          experience-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[170px]
          w-[170px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-pink-500
          via-red-500
          to-yellow-500
          opacity-10
          blur-[30px]
          transition-opacity
          duration-500
          group-hover:opacity-40
          sm:h-[210px]
          sm:w-[210px]
        "
      />

      {/* =================================================
          GLASS
         ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[2px]
          rounded-[10px]
          bg-[#080b12]/90
          backdrop-blur-[24px]
          sm:rounded-[14px]
        "
      />

      {/* =================================================
          CONTENT
         ================================================= */}

      <div
        className="
          relative
          z-10
          p-5
          sm:p-6
          lg:p-7
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          {/* COMPANY */}

          <div className="min-w-0">
            <div
              className="
                mb-2
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <span
                className="
                  rounded-md
                  border
                  border-white/[0.05]
                  bg-white/[0.025]
                  px-2
                  py-1
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-wider
                  text-slate-500
                  sm:text-[9px]
                "
              >
                {experience.type}
              </span>

              {experience.current && (
                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    border-emerald-400/10
                    bg-emerald-400/[0.06]
                    px-2
                    py-1
                    text-[8px]
                    font-medium
                    text-emerald-400
                    sm:text-[9px]
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  Current
                </span>
              )}
            </div>

            <h3
              className="
                font-display
                text-[16px]
                font-semibold
                tracking-tight
                text-white
                sm:text-[18px]
                md:text-[20px]
              "
            >
              {experience.company}
            </h3>

            <p
              className={`
                mt-1
                text-[11px]
                font-medium
                ${experience.accent}
                sm:text-[12px]
                md:text-[13px]
              `}
            >
              {experience.role}
            </p>
          </div>

          {/* DATE */}

          <div
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-1.5
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-2.5
              py-1.5
              font-mono
              text-[9px]
              text-slate-400
              sm:text-[10px]
            "
          >
            <CalendarDays size={11} />

            {experience.duration}
          </div>
        </div>

        {/* LOCATION */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              text-[9px]
              text-slate-600
              sm:text-[10px]
            "
          >
            📍
          </span>

          <span
            className="
              text-[10px]
              text-slate-500
              sm:text-[11px]
            "
          >
            {experience.location}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            text-[11px]
            leading-relaxed
            text-slate-400
            sm:text-[12px]
            md:text-[13px]
          "
        >
          {experience.description}
        </p>

        {/* =================================================
            RESPONSIBILITIES
           ================================================= */}

        <div className="mt-5">
          <p
            className="
              mb-3
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-slate-600
              sm:text-[9px]
            "
          >
            Key Contributions
          </p>

          <div className="space-y-2.5">
            {experience.responsibilities.map(
              (responsibility) => (
                <div
                  key={responsibility}
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <ArrowUpRight
                    size={12}
                    className={`
                      mt-0.5
                      shrink-0
                      ${experience.accent}
                    `}
                  />

                  <p
                    className="
                      text-[10px]
                      leading-relaxed
                      text-slate-400
                      sm:text-[11px]
                      md:text-[12px]
                    "
                  >
                    {responsibility}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* =================================================
            TECHNOLOGIES
           ================================================= */}

        <div className="mt-5">
          <div
            className="
              mb-2.5
              flex
              items-center
              gap-2
            "
          >
            <GitBranch
              size={11}
              className="text-slate-600"
            />

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-slate-600
                sm:text-[9px]
              "
            >
              Technologies
            </span>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-1.5
            "
          >
            {experience.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="
                    rounded-lg
                    border
                    border-white/[0.05]
                    bg-white/[0.025]
                    px-2
                    py-1
                    text-[8px]
                    font-medium
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:border-white/[0.08]
                    sm:px-2.5
                    sm:py-1.5
                    sm:text-[9px]
                  "
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>

        {/* =================================================
            BOTTOM INFO
           ================================================= */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-3
            border-t
            border-white/[0.05]
            pt-4
          "
        >
          <div
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              ${experience.accentBg}
            `}
          >
            <Database
              size={12}
              className={
                experience.accent
              }
            />
          </div>

          <span
            className="
              text-[9px]
              text-slate-600
              sm:text-[10px]
            "
          >
            Professional Experience
          </span>
        </div>
      </div>

      {/* =================================================
          BORDER GLOW
         ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          border
          border-white/[0.04]
          transition-all
          duration-500
          group-hover:border-white/[0.14]
          sm:rounded-2xl
        "
      />

      {/* =================================================
          BOTTOM LINE
         ================================================= */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-px
          w-0
          bg-gradient-to-r
          from-primary
          via-primary-light
          to-transparent
          transition-all
          duration-700
          group-hover:w-full
        `}
      />
    </motion.div>
  );
}

/* =========================================================
   CSS ANIMATION
   ========================================================= */

<style>
  {`
    @keyframes experienceBlob {
      0% {
        transform:
          translate(-50%, -50%)
          scale(0.8);
      }

      25% {
        transform:
          translate(-10%, -35%)
          scale(1.08);
      }

      50% {
        transform:
          translate(10%, 10%)
          scale(0.92);
      }

      75% {
        transform:
          translate(-55%, 5%)
          scale(1.06);
      }

      100% {
        transform:
          translate(-50%, -50%)
          scale(0.8);
      }
    }

    .experience-glow {
      animation:
        experienceBlob
        7s
        ease-in-out
        infinite;

      will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
      .experience-glow {
        animation: none;
      }
    }
  `}
</style>