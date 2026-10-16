
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
    accentBg: "bg-violet-400/10",
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
    accentBg: "bg-cyan-400/10",
  },
];

/* =========================================================
   MAIN EXPERIENCE COMPONENT
   ========================================================= */

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="mb-10 sm:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-7 bg-primary/60" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
              // Experience
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where I've Worked
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            My professional experience across AI engineering, agentic AI,
            automation, and full-stack development.
          </p>
        </div>

        {/* EXPERIENCE TIMELINE */}

        <div className="relative">
          {/* Static timeline */}

          <div className="absolute bottom-0 left-[17px] top-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent sm:left-[19px] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CAREER STATEMENT */}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:mt-12 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/10">
                <Workflow size={18} className="text-primary" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  From development to AI engineering
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Building practical systems by combining software engineering,
                  machine learning, AI agents, and automation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Sparkles size={15} className="text-primary" />

              <span className="font-mono text-[10px] uppercase tracking-wider">
                Growing Through Experience
              </span>
            </div>
          </div>
        </div>
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
    <div className="relative pl-12 sm:pl-14 md:pl-0">
      {/* MOBILE TIMELINE ICON */}

      <div className="absolute left-0 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-[#080b12] sm:h-10 sm:w-10 md:hidden">
        <Icon size={17} className={experience.accent} />
      </div>

      {/* DESKTOP TIMELINE ICON */}

      <div className="absolute left-1/2 top-5 z-10 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-primary/25 bg-[#080b12] md:flex">
        <Icon size={18} className={experience.accent} />
      </div>

      {/* RESPONSIVE TWO-COLUMN LAYOUT */}

      <div className="md:grid md:grid-cols-2 md:gap-16">
        <div
          className={
            isEven
              ? "md:pr-8"
              : "md:col-start-2 md:pl-8"
          }
        >
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0d14] transition-colors duration-200 hover:border-white/20 sm:rounded-2xl">
            <div className="p-5 sm:p-6 lg:p-7">
              {/* COMPANY AND ROLE */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                      {experience.type}
                    </span>

                    {experience.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {experience.company}
                  </h3>

                  <p className={`mt-1 text-sm font-medium ${experience.accent}`}>
                    {experience.role}
                  </p>
                </div>

                <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
                  <CalendarDays size={14} className={experience.accent} />
                  {experience.duration}
                </div>
              </div>

              {/* LOCATION */}

              <p className="mt-4 text-xs text-slate-400 sm:text-sm">
                <span className="mr-2">📍</span>
                {experience.location}
              </p>

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {experience.description}
              </p>

              {/* RESPONSIBILITIES */}

              <div className="mt-6">
                <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Key Contributions
                </h4>

                <ul className="space-y-3">
                  {experience.responsibilities.map((responsibility) => (
                    <li
                      key={responsibility}
                      className="flex items-start gap-2.5"
                    >
                      <ArrowUpRight
                        size={15}
                        className={`mt-0.5 shrink-0 ${experience.accent}`}
                      />

                      <span className="text-xs leading-6 text-slate-300 sm:text-sm">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TECHNOLOGIES */}

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <GitBranch size={14} className="text-slate-400" />

                  <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Technologies
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOOTER */}

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${experience.accentBg}`}
                >
                  <Database size={14} className={experience.accent} />
                </div>

                <span className="text-xs text-slate-400">
                  Professional Experience
                </span>
              </div>
            </div>

            {/* SIMPLE HOVER ACCENT */}

            <div
              className={`absolute bottom-0 left-0 h-px w-full ${experience.accentBg}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
