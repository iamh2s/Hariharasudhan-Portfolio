
import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  School,
  Sparkles,
  MapPin,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

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
   ========================================================= */

const certificates: CertificateItem[] = [
  {
    id: "guvi-ai-ml",
    title: "Artificial Intelligence and Machine Learning",
    issuer: "IIT-M Guvi",
    date: "2025",
    description:
      "Certification in Artificial Intelligence and Machine Learning from IIT-M Guvi.",
    skills: ["Artificial Intelligence", "Machine Learning"],
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
   ANIMATIONS
   No blur filters or backdrop filters.
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
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN EDUCATION COMPONENT
   ========================================================= */

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#080b12] py-20 sm:py-24 md:py-28 lg:py-32"
    >
      {/* Subtle static background accents */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-40 h-64 w-64 rounded-full bg-violet-500/[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-0 h-64 w-64 rounded-full bg-pink-500/[0.03]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12 sm:mb-14 md:mb-16"
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-3 flex items-center gap-2"
          >
            <span className="h-px w-7 bg-violet-400" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
              // Education & Certifications
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Education &{" "}
            <span className="text-violet-400">Certifications</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
          >
            My academic background and professional learning journey in
            computer science, artificial intelligence, and machine learning.
          </motion.p>
        </motion.div>

        {/* EDUCATION SECTION */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16 sm:mb-20"
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <School size={21} className="text-violet-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                Education
              </h3>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Academic journey
              </p>
            </div>
          </motion.div>

          {/* Education timeline */}

          <div className="relative ml-1 sm:ml-2">
            <div className="absolute bottom-5 left-[17px] top-5 w-px bg-violet-400/30 sm:left-[19px]" />

            <div className="space-y-6 sm:space-y-7">
              {educationData.map((education, index) => (
                <EducationCard
                  key={education.id}
                  education={education}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CERTIFICATIONS SECTION */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-400/20 bg-pink-500/10">
              <Award size={21} className="text-pink-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                Certifications
              </h3>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Professional learning
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* LEARNING STATEMENT */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d111b] sm:mt-12"
        >
          <div className="flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <BookOpen size={20} className="text-violet-400" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white sm:text-base">
                  Always learning. Always building.
                </h4>

                <p className="mt-2 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
                  I continuously explore new technologies and apply what I
                  learn through practical projects.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-1">
              <Sparkles size={16} className="text-violet-400" />

              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                Learning Never Stops
              </span>
            </div>
          </div>
        </motion.div>
      </div>
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
      transition={{ delay: index * 0.1 }}
      className="relative pl-12 sm:pl-14"
    >
      {/* Timeline icon */}

      <div className="absolute left-0 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-[#080b12] sm:h-10 sm:w-10">
        <GraduationCap size={18} className="text-violet-400" />
      </div>

      {/* Education card */}

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d111b] transition-colors duration-300 hover:border-violet-400/30 sm:rounded-2xl"
      >
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h4 className="text-base font-semibold leading-snug text-white sm:text-lg">
                {education.degree}
              </h4>

              <p className="mt-2 text-sm font-medium text-violet-300 sm:text-base">
                {education.institution}
              </p>
            </div>

            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 sm:text-sm">
              <CalendarDays size={14} className="text-violet-400" />

              <span>{education.duration}</span>
            </div>
          </div>

          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 sm:text-sm">
              <MapPin size={14} className="text-violet-400" />

              {education.location}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            {education.description}
          </p>
        </div>

        {/* Bottom accent */}

        <div className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet-400 via-pink-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
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
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d111b] transition-colors duration-300 hover:border-pink-400/30"
    >
      <div className="flex h-full flex-col p-5 sm:p-6">
        {/* Icon and date */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-400/20 bg-pink-500/10">
            <Award size={21} className="text-pink-400" />
          </div>

          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-300">
            {certificate.date}
          </span>
        </div>

        {/* Certificate title */}

        <h4 className="mt-5 text-base font-semibold leading-snug text-white sm:text-lg">
          {certificate.title}
        </h4>

        <p className="mt-2 text-sm font-medium text-violet-300">
          {certificate.issuer}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {certificate.description}
        </p>

        {/* Skills */}

        <div className="mt-4 flex flex-wrap gap-2">
          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer */}

        <div className="mt-auto flex items-center gap-2 pt-6 text-xs font-medium text-slate-300">
          <Award size={14} className="text-pink-400" />

          <span>Certification</span>
        </div>
      </div>

      {/* Hover accent */}

      <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-pink-400 via-violet-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}
