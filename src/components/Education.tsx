"use client";
import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";

import {
  motion,
  type Variants,
} from "framer-motion";

/* =========================================================
   TYPES
   ========================================================= */

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  location: string;
  description: string;
  result?: string;
}

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
}

/* =========================================================
   EDUCATION DATA
   Source: Resume
   ========================================================= */

const educationData: EducationItem[] = [
  {
    id: "bsc-computer-science",
    degree: "B.Sc. Computer Science",
    institution: "The American College",
    duration: "08/2022 – 05/2025",
    location: "Madurai, Tamil Nadu",
    description:
      "Bachelor of Science in Computer Science with an academic foundation in programming, software development, computer science concepts, and modern technology.",
  },
  {
    id: "aiml-guvi",
    degree: "Artificial Intelligence & Machine Learning",
    institution: "IIT-M Guvi",
    duration: "07/2025 – 12/2025",
    location: "Madurai, Tamil Nadu",
    description:
      "Completed an Artificial Intelligence and Machine Learning program covering practical AI/ML concepts and technologies.",
  },
];

/* =========================================================
   CERTIFICATION DATA
   Source: Resume
   ========================================================= */

const certificates: CertificateItem[] = [
  {
    id: "guvi-ai-ml",
    title: "Artificial Intelligence and Machine Learning",
    issuer: "IIT-M Guvi",
    date: "2025",
    description:
      "Certification in Artificial Intelligence and Machine Learning from IIT-M Guvi.",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
    ],
  },
  {
    id: "etex-ai-full-stack",
    title: "AI Full Stack Development",
    issuer: "ETEX",
    date: "2024",
    description:
      "Certification in AI Full Stack Development covering artificial intelligence and full-stack application development.",
    skills: [
      "Artificial Intelligence",
      "Full Stack Development",
      "Web Development",
    ],
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

const fadeUpVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 65,
    scale: 0.95,
    filter: "blur(9px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Education() {
  return (
    <section
      id="education"
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
          BACKGROUND GLOW
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
          -left-44
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
            variants={fadeUpVariants}
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
                delay: 0.1,
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
              // Education & Certifications
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h2
            variants={fadeUpVariants}
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
            Education & Certifications
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            variants={fadeUpVariants}
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
            My academic background and professional
            learning journey in computer science,
            artificial intelligence, and machine
            learning.
          </motion.p>
        </motion.div>

        {/* =================================================
            EDUCATION
           ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mb-14 sm:mb-16 md:mb-20"
        >
          {/* EDUCATION HEADING */}

          <motion.div
            variants={fadeUpVariants}
            className="
              mb-7
              flex
              items-center
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
                bg-white/[0.03]
                shadow-[0_0_25px_rgba(255,255,255,0.02)]
              "
            >
              <School
                size={18}
                className="text-primary"
              />
            </div>

            <div>
              <h3
                className="
                  font-display
                  text-[15px]
                  font-semibold
                  text-white
                  sm:text-[17px]
                  md:text-[18px]
                "
              >
                Education
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-500
                  sm:text-[11px]
                "
              >
                Academic journey
              </p>
            </div>
          </motion.div>

          {/* TIMELINE */}

          <div
            className="
              relative
              ml-1
              sm:ml-2
            "
          >
            {/* TIMELINE LINE */}

            <div
              className="
                absolute
                bottom-0
                left-[17px]
                top-0
                w-px
                bg-gradient-to-b
                from-primary/50
                via-white/[0.08]
                to-transparent
                sm:left-[19px]
              "
            />

            <div className="space-y-6 sm:space-y-7">
              {educationData.map(
                (education, index) => (
                  <EducationCard
                    key={education.id}
                    education={education}
                    index={index}
                  />
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* =================================================
            CERTIFICATIONS
           ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
        >
          {/* CERTIFICATION HEADING */}

          <motion.div
            variants={fadeUpVariants}
            className="
              mb-7
              flex
              items-center
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
                bg-white/[0.03]
                shadow-[0_0_25px_rgba(255,255,255,0.02)]
              "
            >
              <Award
                size={18}
                className="text-accent"
              />
            </div>

            <div>
              <h3
                className="
                  font-display
                  text-[15px]
                  font-semibold
                  text-white
                  sm:text-[17px]
                  md:text-[18px]
                "
              >
                Certifications
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-500
                  sm:text-[11px]
                "
              >
                Professional learning
              </p>
            </div>
          </motion.div>

          {/* CERTIFICATE GRID */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-5
            "
          >
            {certificates.map(
              (certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              )
            )}
          </div>
        </motion.div>

        {/* =================================================
            LEARNING STATEMENT
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
            mt-8
            overflow-hidden
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.015]
            sm:mt-10
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
                -right-16
                -top-20
                h-44
                w-44
                rounded-full
                bg-primary/[0.05]
                blur-[65px]
              "
            />

            {/* TEXT */}

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
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/[0.08]
                  sm:h-10
                  sm:w-10
                "
              >
                <BookOpen
                  size={16}
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
                  Always learning. Always building.
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
                  I continuously explore new
                  technologies and apply what I
                  learn through practical projects.
                </p>
              </div>
            </div>

            {/* BADGE */}

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
                Learning Never Stops
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ANIMATIONS
         ================================================= */}

      <style>
        {`
          @keyframes educationGlow {
            0% {
              transform:
                translate(-50%, -50%)
                scale(0.85);
            }

            25% {
              transform:
                translate(-10%, -35%)
                scale(1.05);
            }

            50% {
              transform:
                translate(10%, 10%)
                scale(0.92);
            }

            75% {
              transform:
                translate(-55%, 5%)
                scale(1.08);
            }

            100% {
              transform:
                translate(-50%, -50%)
                scale(0.85);
            }
          }

          .certificate-glow {
            animation:
              educationGlow
              7s
              ease-in-out
              infinite;
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .certificate-glow {
              animation: none;
            }
          }
        `}
      </style>
    </section>
  );
}

/* =========================================================
   EDUCATION CARD
   ========================================================= */

function EducationCard({
  education,
  index,
}: {
  education: EducationItem;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{
        delay: index * 0.1,
      }}
      className="
        relative
        pl-12
        sm:pl-14
      "
    >
      {/* TIMELINE DOT */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1,
        }}
        className="
          absolute
          left-0
          top-5
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
        "
      >
        <GraduationCap
          size={16}
          className="text-primary"
        />
      </motion.div>

      {/* CARD */}

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
          hover:shadow-[0_0_35px_rgba(255,80,120,0.08)]
          sm:rounded-2xl
        "
      >
        {/* CARD GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-44
            w-44
            rounded-full
            bg-primary/[0.04]
            blur-[70px]
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            p-5
            sm:p-6
            lg:p-7
          "
        >
          {/* TOP */}

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
            {/* TITLE */}

            <div className="min-w-0">
              <h4
                className="
                  font-display
                  text-[15px]
                  font-semibold
                  leading-snug
                  text-white
                  sm:text-[17px]
                  md:text-[18px]
                "
              >
                {education.degree}
              </h4>

              <p
                className="
                  mt-1.5
                  text-[11px]
                  font-medium
                  text-primary-light
                  sm:text-[12px]
                  md:text-[13px]
                "
              >
                {education.institution}
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

              {education.duration}
            </div>
          </div>

          {/* LOCATION */}

          <div
            className="
              mt-4
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
                border-white/[0.04]
                bg-white/[0.025]
                px-2
                py-1
                text-[9px]
                text-slate-500
                sm:text-[10px]
              "
            >
              📍 {education.location}
            </span>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              max-w-3xl
              text-[11px]
              leading-relaxed
              text-slate-400
              sm:text-[12px]
              md:text-[13px]
            "
          >
            {education.description}
          </p>
        </div>

        {/* BOTTOM GLOW LINE */}

        <div
          className="
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
          "
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   CERTIFICATE CARD
   ========================================================= */

function CertificateCard({
  certificate,
  index,
}: {
  certificate: CertificateItem;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{
        delay: index * 0.1,
      }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="
        group
        relative
        flex
        h-full
        min-h-[250px]
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.015]
        backdrop-blur-xl
        sm:min-h-[270px]
        sm:rounded-2xl
      "
    >
      {/* =================================================
          GRADIENT BLOB
         ================================================= */}

      <div
        className="
          certificate-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[150px]
          w-[150px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-pink-500
          via-red-500
          to-yellow-500
          opacity-25
          blur-[30px]
          transition-opacity
          duration-500
          group-hover:opacity-60
          sm:h-[190px]
          sm:w-[190px]
        "
      />

      {/* =================================================
          GLASS LAYER
         ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[2px]
          rounded-[10px]
          bg-[#080b12]/85
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
          flex
          h-full
          flex-col
          p-5
          sm:p-6
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 16,
            }}
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
              text-primary
              shadow-[0_0_25px_rgba(255,255,255,0.02)]
              sm:h-11
              sm:w-11
            "
          >
            <Award size={18} />
          </motion.div>

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
              text-slate-500
              sm:text-[9px]
            "
          >
            {certificate.date}
          </span>
        </div>

        {/* TITLE */}

        <h4
          className="
            mt-5
            font-display
            text-[14px]
            font-semibold
            leading-snug
            text-white
            sm:text-[15px]
            md:text-[16px]
          "
        >
          {certificate.title}
        </h4>

        {/* ISSUER */}

        <p
          className="
            mt-1.5
            text-[10px]
            font-medium
            text-primary-light
            sm:text-[11px]
          "
        >
          {certificate.issuer}
        </p>

        {/* DESCRIPTION */}

        <p
          className="
            mt-3
            text-[10px]
            leading-relaxed
            text-slate-500
            sm:text-[11px]
            md:text-[12px]
          "
        >
          {certificate.description}
        </p>

        {/* SKILLS */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-1.5
          "
        >
          {certificate.skills.map(
            (skill) => (
              <span
                key={skill}
                className="
                  rounded-md
                  border
                  border-white/[0.05]
                  bg-white/[0.025]
                  px-2
                  py-1
                  text-[8px]
                  text-slate-400
                  sm:text-[9px]
                "
              >
                {skill}
              </span>
            )
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-auto
            flex
            items-center
            gap-1.5
            pt-5
            text-[10px]
            font-medium
            text-slate-500
            sm:text-[11px]
          "
        >
          <Award size={11} />

          <span>
            Verified Certification
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
          group-hover:shadow-[0_0_35px_rgba(255,80,120,0.11)]
          sm:rounded-2xl
        "
      />
    </motion.div>
  );
}
