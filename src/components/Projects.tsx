import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  BarChart3,
  Bot,
  ChevronRight,
  ExternalLink,
  Fish,
  Leaf,
  Mic,
  Plus,
  Sparkles,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryTags: string[];
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  impact: string[];
  impactHighlight: string;
  keyCapabilities: string[];
  architecture?: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
}

/* =========================================================
   MEDIA QUERY HOOK
========================================================= */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "AI & GenAI",
  "Automation",
  "Full Stack",
  "Machine Learning",
];

/* =========================================================
   GLOBE ICON
========================================================= */

function GlobeIcon({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
      <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
    </svg>
  );
}

/* =========================================================
   PROJECT DATA
========================================================= */

const projects: Project[] = [
  {
    id: "giriuk",
    title: "GiriUK AI Customer Support",
    subtitle: "Multi-Agent AI Automation System",
    category: "AI & GenAI",
    categoryTags: ["Generative AI", "Multi-Agent Systems", "Automation"],
    technologies: ["n8n", "LLMs", "AI Agents", "WhatsApp", "HTTP APIs", "Intent Routing"],
    icon: Bot,
    accent: "text-indigo-400",
    accentBg: "bg-indigo-400/[0.08]",
    featured: true,
    overview:
      "Developed a multi-agent AI customer support automation system for GIRI UK that enables intelligent customer interactions through WhatsApp. The system uses an AI-powered routing layer to identify customer intent and direct requests to specialized agents for product information, order-related queries, customer support, and general questions.",
    problem:
      "Traditional customer-support workflows can require repetitive manual handling of common customer questions and routing requests to the appropriate team or process.",
    solution:
      "Designed an AI-driven workflow where incoming WhatsApp messages are analyzed by a routing agent and forwarded to specialized AI agents based on the customer's intent.",
    impact: [
      "Automates repetitive customer-support interactions",
      "Reduces the need for manual query classification",
      "Provides structured routing for different customer intents",
      "Creates a scalable foundation for AI-powered customer service",
      "Connects conversational AI with business APIs and data",
      "Enables faster and more consistent responses to common queries",
    ],
    impactHighlight:
      "Automated customer-support workflows through intelligent AI routing and specialized agents.",
    keyCapabilities: [
      "WhatsApp customer interaction",
      "AI intent classification",
      "Multi-agent architecture",
      "Intelligent request routing",
      "Product queries",
      "Order queries",
      "Customer support",
      "HTTP API integration",
      "Automated AI responses",
    ],
    architecture:
      "Customer → WhatsApp → AI Router → Specialized Agent → GIRI UK API/Data → AI Response → Customer",
  },
  {
    id: "abrandr",
    title: "Abrandr Solutions",
    subtitle: "Modern Full-Stack Business Platform",
    category: "Full Stack",
    categoryTags: ["Full-Stack Development"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Framer Motion"],
    icon: GlobeIcon,
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400/[0.08]",
    featured: true,
    overview:
      "Developed a modern full-stack business platform for Abrandr Solutions using a production-oriented Next.js architecture.",
    problem:
      "Businesses require modern digital platforms that provide a professional user experience while maintaining a scalable technical foundation for dynamic content and future expansion.",
    solution:
      "Built a responsive Next.js application combining modern frontend design, database integration, ORM-based data management, and interactive motion effects.",
    impact: [
      "Established a modern digital presence for the business",
      "Created a scalable foundation for future functionality",
      "Integrated structured database management",
      "Improved content flexibility through dynamic architecture",
      "Delivered a responsive experience across devices",
      "Demonstrated production-oriented full-stack development",
    ],
    impactHighlight:
      "Delivered a modern, scalable full-stack web platform designed for real-world business use.",
    keyCapabilities: [
      "Responsive UI",
      "Next.js architecture",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Dynamic content",
      "Framer Motion",
      "Modern responsive design",
    ],
  },
  {
    id: "talentiq",
    title: "TalentIQ",
    subtitle: "AI-Powered Talent Intelligence Platform",
    category: "Machine Learning",
    categoryTags: ["AI", "Machine Learning", "HR Technology"],
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "LangChain", "Groq API", "LLMs"],
    icon: Users,
    accent: "text-violet-400",
    accentBg: "bg-violet-400/[0.08]",
    featured: true,
    overview:
      "Developed an AI-powered talent intelligence platform designed to help organizations analyze workforce data, evaluate candidates, analyze resumes, and generate HR insights.",
    problem:
      "HR teams often work with large amounts of employee and candidate information that can be difficult to analyze manually and consistently.",
    solution:
      "Developed a centralized AI/ML platform combining predictive models, employee analytics, resume analysis, clustering, sentiment analysis, and AI-assisted interaction.",
    impact: [
      "Centralizes multiple HR intelligence capabilities into one platform",
      "Helps transform employee data into actionable insights",
      "Automates parts of candidate and resume analysis",
      "Supports data-driven workforce analysis",
      "Enables predictive analysis of employee-related outcomes",
      "Provides an AI interface for interacting with HR information",
    ],
    impactHighlight:
      "Combined AI, machine learning, and workforce analytics into a unified HR intelligence platform.",
    keyCapabilities: [
      "Resume analysis",
      "Candidate evaluation",
      "Attrition prediction",
      "Performance prediction",
      "Employee clustering",
      "Sentiment analysis",
      "HR analytics dashboard",
      "AI chatbot",
    ],
  },
  {
    id: "serene-leaf",
    title: "Serene Leaf Tea House",
    subtitle: "Full-Stack E-Commerce Platform",
    category: "Full Stack",
    categoryTags: ["Full-Stack Development", "E-Commerce"],
    technologies: ["React", "Vite", "Tailwind CSS", "Django", "Django REST Framework", "SQLite"],
    icon: Utensils,
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400/[0.08]",
    overview:
      "Built a full-stack e-commerce platform for a tea house using a React frontend and Django REST API backend.",
    problem:
      "A modern retail business requires a digital platform that can present products through an interactive interface while maintaining a structured backend for managing application data.",
    solution:
      "Developed a full-stack architecture separating the frontend experience from backend API services.",
    impact: [
      "Created a complete digital storefront experience",
      "Connected a modern frontend with a backend API",
      "Demonstrated full-stack application architecture",
      "Established structured product and application data management",
      "Created a foundation that can be extended with additional e-commerce functionality",
    ],
    impactHighlight:
      "Transformed a traditional business concept into a modern full-stack digital platform.",
    keyCapabilities: [
      "Responsive interface",
      "Product management",
      "REST APIs",
      "Django backend",
      "Database integration",
      "React frontend",
      "Frontend/backend communication",
    ],
  },
  {
    id: "fish-classification",
    title: "Multi-Class Fish Classification",
    subtitle: "Deep Learning Computer Vision",
    category: "Machine Learning",
    categoryTags: ["Deep Learning", "Computer Vision"],
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "MobileNetV2", "Streamlit"],
    icon: Fish,
    accent: "text-blue-400",
    accentBg: "bg-blue-400/[0.08]",
    overview:
      "Developed a deep-learning computer vision application for classifying fish images across multiple species.",
    problem:
      "Manual image-based species identification can be time-consuming and requires domain knowledge.",
    solution:
      "Developed and evaluated CNN-based image-classification models and explored transfer learning using MobileNetV2.",
    impact: [
      "Automated image-based fish classification",
      "Reduced dependence on manual visual classification",
      "Demonstrated practical application of deep learning",
      "Compared CNN and transfer-learning approaches",
      "Converted a machine-learning model into an interactive application through Streamlit",
    ],
    impactHighlight:
      "Applied computer vision and transfer learning to automate multi-class image classification.",
    keyCapabilities: [
      "11-class classification",
      "CNN",
      "Transfer learning",
      "MobileNetV2",
      "Image preprocessing",
      "Model evaluation",
      "Streamlit deployment",
    ],
  },
  {
    id: "restaurant-recommender",
    title: "Restaurant Recommendation System",
    subtitle: "ML-Powered Discovery Engine",
    category: "Machine Learning",
    categoryTags: ["Machine Learning", "Recommendation Systems"],
    technologies: ["Python", "Pandas", "Scikit-learn", "KMeans", "Cosine Similarity", "Streamlit"],
    icon: BarChart3,
    accent: "text-amber-400",
    accentBg: "bg-amber-400/[0.08]",
    overview:
      "Developed a machine-learning-based restaurant recommendation system that analyzes restaurant characteristics and generates relevant recommendations.",
    problem:
      "Users can face difficulty identifying suitable restaurants when dealing with large numbers of available options.",
    solution:
      "Used data preprocessing, feature engineering, clustering, and similarity-based techniques to build a recommendation workflow.",
    impact: [
      "Converts restaurant data into personalized recommendations",
      "Reduces the effort required to discover relevant restaurants",
      "Demonstrates practical use of clustering and similarity algorithms",
      "Provides an interactive recommendation experience",
      "Applies machine learning to a real-world decision-support problem",
    ],
    impactHighlight:
      "Applied machine learning to simplify restaurant discovery through data-driven recommendations.",
    keyCapabilities: [
      "Data preprocessing",
      "Feature engineering",
      "K-Means clustering",
      "Cosine similarity",
      "Recommendation engine",
      "Streamlit interface",
    ],
  },
  {
    id: "victorh",
    title: "VictorH",
    subtitle: "AI Voice Assistant",
    category: "AI & GenAI",
    categoryTags: ["Artificial Intelligence", "Voice AI", "Conversational AI"],
    technologies: ["Python", "Groq API", "LLaMA", "Speech Recognition", "Text-to-Speech", "AI Assistant"],
    icon: Mic,
    accent: "text-rose-400",
    accentBg: "bg-rose-400/[0.08]",
    overview:
      "Developed VictorH, a Python-based AI voice assistant designed to provide natural voice-based interaction and assist users with information, questions, and computer-related tasks.",
    problem:
      "Traditional software interfaces require users to interact through keyboards, screens, or predefined commands. Voice interfaces provide a more natural way to interact with software.",
    solution:
      "Built a voice-driven AI assistant that accepts spoken input, processes the request using an LLM, generates an intelligent response, and converts the response back into speech.",
    impact: [
      "Demonstrates practical implementation of conversational AI",
      "Enables more natural human-computer interaction",
      "Combines voice technologies with modern LLM capabilities",
      "Provides a foundation for developing personalized AI assistants",
      "Demonstrates integration of multiple AI components into a single application",
    ],
    impactHighlight:
      "Created an interactive voice-based AI assistant by combining speech recognition, LLMs, and speech synthesis.",
    keyCapabilities: [
      "Voice-based interaction",
      "Natural-language understanding",
      "LLM-powered responses",
      "Speech recognition",
      "Text-to-speech responses",
      "AI-powered assistance",
      "Computer/system command interaction",
    ],
    architecture:
      "User Voice → Speech Recognition → LLM → AI Response → Text-to-Speech → User",
  },
  {
    id: "gogreen-trust",
    title: "GoGreen Trust",
    subtitle: "Full-Stack Environmental Platform",
    category: "Full Stack",
    categoryTags: ["Full-Stack Development", "Web Application"],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Bootstrap", "Django", "Django REST Framework"],
    icon: Leaf,
    accent: "text-green-400",
    accentBg: "bg-green-400/[0.08]",
    overview:
      "Developed GoGreen Trust, a full-stack web platform focused on creating a modern digital presence for an environmentally focused organization.",
    problem:
      "Organizations need modern digital platforms to communicate their mission, services, initiatives, and information effectively while providing visitors with an accessible and responsive experience.",
    solution:
      "Built a full-stack web application with a modern frontend and backend API architecture, connecting the user interface with structured backend services.",
    impact: [
      "Created a modern digital platform for organizational communication",
      "Improved accessibility of information through a responsive web interface",
      "Demonstrated complete frontend and backend integration",
      "Established a scalable foundation for future platform functionality",
      "Applied full-stack development practices to a real-world organizational use case",
    ],
    impactHighlight:
      "Transformed an organizational concept into a responsive full-stack digital platform.",
    keyCapabilities: [
      "Responsive web interface",
      "React-based frontend",
      "Django backend",
      "REST API integration",
      "Structured application architecture",
      "Responsive design",
      "Modern UI components",
      "Frontend/backend communication",
    ],
    architecture: "React Frontend → REST API → Django Backend → Database",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const sectionContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 55, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const smallFadeUp = {
  hidden: { opacity: 0, y: 25, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 80, scale: 0.94, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0z" />
    </svg>
  );
}

/* =========================================================
   PROJECTS (MAIN EXPORT)
========================================================= */

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (p) => p.category === activeFilter || p.categoryTags.includes(activeFilter)
    );
  }, [activeFilter]);

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <>
      <section
        id="projects"
        className="
          relative isolate
          w-full min-w-0 max-w-full
          overflow-x-hidden
          py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40
        "
      >
        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute inset-0 -z-10 w-full max-w-full overflow-hidden">
          <div className="
            absolute -left-20 top-1/4
            h-48 w-48 rounded-full
            bg-primary/[0.035] blur-[90px]
            sm:h-80 sm:w-80
            lg:h-[500px] lg:w-[500px]
          " />
          <div className="
            absolute -right-16 bottom-1/3
            h-44 w-44 rounded-full
            bg-accent/[0.025] blur-[85px]
            sm:h-72 sm:w-72
            lg:h-[450px] lg:w-[450px]
          " />
        </div>

        {/* CONTENT */}
        <div className="relative mx-auto w-full min-w-0 max-w-7xl px-3 sm:px-6 lg:px-8">

          {/* HEADER */}
          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8 w-full min-w-0 sm:mb-10 md:mb-12"
          >
            <motion.div
              variants={smallFadeUp}
              className="mb-3 flex items-center gap-2"
            >
              <span className="h-px w-6 shrink-0 bg-primary/60 sm:w-7" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 sm:text-[10px]">
                // Projects
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="
                break-words font-display
                text-2xl font-bold leading-tight tracking-tight text-white
                sm:text-3xl md:text-4xl lg:text-5xl
              "
            >
              Featured Projects
            </motion.h2>

            <motion.p
              variants={smallFadeUp}
              className="
                mt-4 w-full max-w-2xl break-words
                text-xs leading-relaxed text-slate-400
                sm:text-sm md:text-[14px] lg:text-[15px]
              "
            >
              Building practical solutions that combine AI, automation, machine
              learning, and modern full-stack engineering.
            </motion.p>
          </motion.div>

          {/* FILTERS */}
          <div className="mb-8 w-full min-w-0 overflow-hidden sm:mb-10 md:mb-12">
            <motion.div
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="
                flex w-full min-w-0 flex-wrap gap-1.5
              "
            >
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <motion.button
                    key={category}
                    variants={smallFadeUp}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      relative shrink-0 whitespace-nowrap rounded-lg
                      px-3 py-2 text-[10px] font-medium
                      transition-colors duration-300
                      sm:px-4 sm:text-[11px] md:text-[12px]
                      ${isActive ? "text-white" : "text-slate-500 hover:text-slate-300"}
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeProjectFilter"
                        className="
                          absolute inset-0 rounded-lg
                          border border-white/[0.06] bg-white/[0.07]
                        "
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* PROJECT GRID */}
          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.04 }}
            className="
              grid w-full min-w-0 max-w-full
              grid-cols-1 gap-4
              sm:grid-cols-2 sm:gap-5
              lg:grid-cols-3 lg:gap-5
              xl:gap-6
            "
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardReveal}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    y: 30,
                    scale: 0.96,
                    filter: "blur(6px)",
                    transition: { duration: 0.3 },
                  }}
                  className="min-w-0 max-w-full overflow-hidden"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    isMobile={isMobile}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}

              {activeFilter === "All" && (
                <motion.div
                  key="more-projects"
                  variants={cardReveal}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  className="min-w-0 max-w-full overflow-hidden"
                >
                  <MoreProjectsCard isMobile={isMobile} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes projectBlob {
          0%   { transform: translate(-100%, -100%); }
          25%  { transform: translate(0%, -100%); }
          50%  { transform: translate(0%, 0%); }
          75%  { transform: translate(-100%, 0%); }
          100% { transform: translate(-100%, -100%); }
        }
        @keyframes projectBlobTwo {
          0%   { transform: translate(0%, 0%) scale(0.9); }
          50%  { transform: translate(-40%, 25%) scale(1.1); }
          100% { transform: translate(0%, 0%) scale(0.9); }
        }
        .project-gradient-blob     { animation: projectBlob    6s linear      infinite; }
        .project-gradient-blob-two { animation: projectBlobTwo 8s ease-in-out infinite; }
        .github-gradient-blob      { animation: projectBlob    6s linear      infinite; }
        .github-gradient-blob-two  { animation: projectBlobTwo 8s ease-in-out infinite; }

        @media (max-width: 767px) {
          .project-gradient-blob,
          .project-gradient-blob-two,
          .github-gradient-blob,
          .github-gradient-blob-two {
            animation: none !important;
            transform: none !important;
            will-change: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-gradient-blob,
          .project-gradient-blob-two,
          .github-gradient-blob,
          .github-gradient-blob-two {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index: _index,
  isMobile,
  onClick,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
  onClick: () => void;
}) {
  const { title, subtitle, categoryTags, technologies, overview, icon: Icon, accent, accentBg, featured } = project;

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3.5, -3.5]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3.5, 3.5]), { stiffness: 180, damping: 24 });
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    mouseX.set(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)));
    mouseY.set(Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)));
  };

  const resetMouse = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      onClick={onClick}
      style={isMobile ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={isMobile ? undefined : { scale: 1.01 }}
      whileTap={{ scale: isMobile ? 1 : 0.99 }}
      className="
        group relative flex h-full
        min-h-[240px] w-full min-w-0 max-w-full
        cursor-pointer touch-manipulation overflow-hidden
        rounded-xl border border-white/[0.06] bg-white/[0.01] p-[2px]
        sm:min-h-[265px] sm:rounded-2xl
        lg:min-h-[280px]
      "
    >
      {/* GLOW BLOBS */}
      <div className="
        project-gradient-blob pointer-events-none
        absolute left-1/2 top-1/2
        h-32 w-32 rounded-full
        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
        opacity-40 blur-[22px]
        sm:h-44 sm:w-44 lg:h-56 lg:w-56
      " />
      <div className="
        project-gradient-blob-two pointer-events-none
        absolute left-1/2 top-1/2
        h-24 w-24 rounded-full
        bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
        opacity-20 blur-[28px]
        sm:h-36 sm:w-36 lg:h-44 lg:w-44
      " />

      {/* CARD BG */}
      <div className="absolute inset-[2px] rounded-[10px] border border-white/[0.08] bg-[#080b12]/95 sm:rounded-[14px]" />

      {/* DESKTOP CURSOR GLOW */}
      {!isMobile && (
        <motion.div
          className="
            pointer-events-none absolute inset-[2px] rounded-[10px]
            opacity-0 transition-opacity duration-300 group-hover:opacity-100
            sm:rounded-[14px]
          "
          style={{
            background: `radial-gradient(180px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-10 flex h-full w-full min-w-0 max-w-full flex-col p-4 sm:p-5 lg:p-6">

        {/* HEADER */}
        <div className="mb-3 flex w-full min-w-0 items-start justify-between gap-2 sm:mb-4">
          <div className="flex min-w-0 max-w-[calc(100%-44px)] items-center gap-2.5 sm:gap-3">
            <div className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border border-white/[0.05] ${accentBg}
              sm:h-10 sm:w-10 sm:rounded-xl
            `}>
              <Icon size={17} className={accent} />
            </div>
            <div className="min-w-0 flex-1">
              <h3
                title={title}
                className="
                  overflow-hidden text-ellipsis whitespace-nowrap
                  font-display text-[13px] font-semibold tracking-tight text-white
                  sm:text-[14px] lg:text-[15px]
                "
              >
                {title}
              </h3>
              <p
                title={subtitle}
                className="
                  overflow-hidden text-ellipsis whitespace-nowrap
                  text-[10px] text-slate-500 sm:text-[11px]
                "
              >
                {subtitle}
              </p>
            </div>
          </div>

          {featured && (
            <span className="
              flex h-6 shrink-0 items-center rounded-md
              border border-white/[0.06] bg-white/[0.04]
              px-1.5 text-[8px] text-slate-300
            ">
              <Sparkles size={8} />
              <span className="ml-1 hidden sm:inline">Featured</span>
            </span>
          )}
        </div>

        {/* CATEGORY TAGS */}
        <div className="mb-3 flex w-full min-w-0 flex-wrap gap-1 sm:mb-4">
          {categoryTags.map((tag) => (
            <span
              key={tag}
              title={tag}
              className="
                max-w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap
                rounded-md border border-white/[0.04] bg-white/[0.035]
                px-1.5 py-0.5 text-[8px] text-slate-400
                sm:px-2 sm:text-[9px]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* OVERVIEW */}
        <p className="
          mb-4 min-w-0 max-w-full break-words
          text-[11px] leading-relaxed text-slate-400
          [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden
          sm:mb-5 sm:text-[12px] lg:text-[13px]
        ">
          {overview}
        </p>

        {/* TECHNOLOGIES */}
        <div className="mb-4 flex w-full min-w-0 flex-wrap gap-1 sm:mb-5 sm:gap-1.5">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              title={tech}
              className="
                max-w-[46%] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap
                rounded-lg border border-white/[0.06] bg-white/[0.025]
                px-2 py-1 text-[8px] text-slate-400
                sm:px-2.5 sm:text-[9px] lg:text-[10px]
              "
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="
              shrink-0 rounded-lg border border-white/[0.06] bg-white/[0.025]
              px-2 py-1 text-[8px] text-slate-500
            ">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="
          mt-auto flex min-w-0 items-center gap-1.5
          text-[10px] font-medium text-primary-light
          sm:text-[11px] lg:text-[12px]
        ">
          <span className="truncate">View Case Study</span>
          <ArrowRight size={11} className="shrink-0" />
        </div>
      </div>

      {/* BORDER HOVER */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-xl border border-white/[0.04]
        transition-all duration-500 group-hover:border-white/[0.15]
        sm:rounded-2xl
      " />
    </motion.div>
  );
}

/* =========================================================
   MORE PROJECTS / GITHUB CARD
========================================================= */

function MoreProjectsCard({ isMobile }: { isMobile: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3.5, -3.5]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3.5, 3.5]), { stiffness: 180, damping: 24 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    mouseX.set(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)));
    mouseY.set(Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)));
  };

  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.a
      ref={cardRef}
      href="https://github.com/iamh2s"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={isMobile ? undefined : { scale: 1.01 }}
      whileTap={{ scale: isMobile ? 1 : 0.99 }}
      className="
        group relative flex h-full
        min-h-[240px] w-full min-w-0 max-w-full
        cursor-pointer touch-manipulation items-center justify-center
        overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01] p-[2px]
        sm:min-h-[265px] sm:rounded-2xl lg:min-h-[280px]
      "
    >
      <div className="
        github-gradient-blob pointer-events-none absolute left-1/2 top-1/2
        h-32 w-32 rounded-full
        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
        opacity-40 blur-[22px]
        sm:h-44 sm:w-44 lg:h-56 lg:w-56
      " />
      <div className="
        github-gradient-blob-two pointer-events-none absolute left-1/2 top-1/2
        h-24 w-24 rounded-full
        bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
        opacity-20 blur-[28px]
        sm:h-36 sm:w-36 lg:h-44 lg:w-44
      " />
      <div className="absolute inset-[2px] rounded-[10px] border border-white/[0.08] bg-[#080b12]/95 sm:rounded-[14px]" />

      <div className="relative z-10 flex min-w-0 max-w-full flex-col items-center justify-center px-5 py-8 text-center sm:px-6 sm:py-10">
        <div className="
          relative mb-5 flex h-14 w-14 shrink-0
          items-center justify-center rounded-xl
          border border-white/[0.12] bg-white/[0.06] text-white
          sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl
        ">
          <Plus size={26} strokeWidth={1.8} />
          <div className="
            absolute -bottom-2 -right-2
            flex h-7 w-7 items-center justify-center
            rounded-lg border border-white/[0.1] bg-[#0d1117] text-white
          ">
            <GithubIcon size={13} />
          </div>
        </div>

        <h3 className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
          More Projects
        </h3>

        <p className="mt-2 w-full max-w-[230px] break-words text-[11px] leading-relaxed text-slate-400 sm:text-[12px]">
          Explore more projects, experiments and open-source work on GitHub.
        </p>

        <div className="mt-5 inline-flex max-w-full items-center gap-2 text-[11px] font-medium text-white sm:mt-6 sm:text-[12px]">
          <GithubIcon size={14} />
          <span>View GitHub</span>
          <ArrowRight size={12} className="shrink-0" />
        </div>
      </div>
    </motion.a>
  );
}

/* =========================================================
   MODAL
========================================================= */

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const {
    title, subtitle, categoryTags, technologies,
    overview, problem, solution, impact, impactHighlight,
    keyCapabilities, architecture, icon: Icon, accent, accentBg, links,
  } = project;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[9999]
        flex items-start justify-center
        h-[100dvh] w-full overflow-x-hidden overflow-y-auto
        bg-black/70 backdrop-blur-sm
        px-2 pt-16 pb-4
        sm:px-5 sm:pt-5 sm:pb-5
        md:p-8
      "
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full min-w-0
          max-w-full
          sm:my-6 sm:max-w-2xl
          md:my-8 md:max-w-3xl
        "
      >
        <div className="
          w-full min-w-0 overflow-hidden
          rounded-xl border border-white/[0.07]
          bg-[#080b12] shadow-2xl shadow-black/60
          sm:rounded-2xl
          [overflow-clip-margin:0]
        ">
          {/* MODAL HEADER */}
          <div className="
            relative min-w-0
            border-b border-white/[0.05]
            px-3 py-4
            sm:px-6 sm:py-6
            md:px-8
          ">
            {/* Close button — always top-right, never overlaps content */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="
                absolute right-2 top-2 z-10
                flex h-7 w-7 shrink-0 items-center justify-center
                rounded-lg border border-white/[0.06] bg-white/[0.06]
                text-slate-400 transition-colors
                hover:bg-white/[0.10] hover:text-white
                sm:right-3 sm:top-3 sm:h-8 sm:w-8
              "
            >
              <X size={14} />
            </button>

            {/* Icon row */}
            <div className="mb-3 flex min-w-0 items-center gap-2.5 pr-9 sm:pr-12">
              <div className={`
                flex h-8 w-8 shrink-0 items-center justify-center
                rounded-lg ${accentBg}
                sm:h-11 sm:w-11 sm:rounded-xl
              `}>
                <Icon size={16} className={`${accent} sm:w-5 sm:h-5`} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="
                  break-words font-display
                  text-[15px] font-bold leading-snug tracking-tight text-white
                  sm:text-xl md:text-2xl
                ">
                  {title}
                </h2>
                <p className="mt-0.5 break-words text-[11px] text-slate-400 sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Category tags on their own line */}
            <div className="flex min-w-0 flex-wrap gap-1 sm:gap-1.5">
              {categoryTags.map((tag) => (
                <span
                  key={tag}
                  className={`
                    max-w-full overflow-hidden text-ellipsis whitespace-nowrap
                    rounded-md ${accentBg} px-2 py-0.5 text-[9px] ${accent}
                    sm:py-1 sm:text-[10px]
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* MODAL BODY */}
          <div className="
            min-w-0 space-y-5
            px-3 py-4
            sm:space-y-6 sm:px-6 sm:py-7
            md:px-8 md:py-8
          ">
            <ModalSection number="01" title="What I Built">
              <p className="break-words text-xs leading-relaxed text-slate-400 sm:text-[14px]">
                {overview}
              </p>
            </ModalSection>

            <ModalSection number="02" title="The Problem">
              <p className="break-words text-xs leading-relaxed text-slate-400 sm:text-[14px]">
                {problem}
              </p>
            </ModalSection>

            <ModalSection number="03" title="The Solution">
              <p className="break-words text-xs leading-relaxed text-slate-400 sm:text-[14px]">
                {solution}
              </p>
            </ModalSection>

            {architecture && (
              <ModalSection number="04" title="Architecture">
                <div className="
                  w-full overflow-x-auto
                  rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 sm:p-4
                  [-webkit-overflow-scrolling:touch]
                ">
                  <p className="w-max font-mono text-[9px] leading-relaxed text-slate-300 sm:text-[11px]">
                    {architecture}
                  </p>
                </div>
              </ModalSection>
            )}

            <ModalSection number={architecture ? "05" : "04"} title="Technologies">
              <div className="flex min-w-0 flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      max-w-full overflow-hidden text-ellipsis whitespace-nowrap
                      rounded-lg border border-white/[0.06] bg-white/[0.025]
                      px-2.5 py-1.5 text-[10px] text-slate-300
                      sm:text-[12px]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ModalSection>

            <ModalSection number={architecture ? "06" : "05"} title="Key Capabilities">
              <div className="grid min-w-0 gap-2 sm:grid-cols-2">
                {keyCapabilities.map((capability) => (
                  <div key={capability} className="flex min-w-0 items-start gap-2">
                    <ChevronRight size={13} className={`mt-0.5 shrink-0 ${accent}`} />
                    <span className="min-w-0 break-words text-xs text-slate-400 sm:text-[13px]">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </ModalSection>

            <ModalSection
              number={architecture ? "07" : "06"}
              title="Impact"
              highlighted
            >
              <div className="
                min-w-0 rounded-xl
                border border-primary/[0.15] bg-primary/[0.04]
                p-3 sm:p-5
              ">
                <p className="mb-4 break-words text-xs font-medium leading-relaxed text-primary-light">
                  {impactHighlight}
                </p>
                <ul className="space-y-2">
                  {impact.map((item) => (
                    <li key={item} className="flex min-w-0 items-start gap-2.5">
                      <Zap size={12} className="mt-0.5 shrink-0 text-primary-light" />
                      <span className="min-w-0 break-words text-xs leading-relaxed text-slate-400 sm:text-[13px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ModalSection>

            {links && (
              <div className="flex min-w-0 flex-wrap gap-3">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex min-w-0 items-center gap-2
                      rounded-xl border border-white/[0.08] bg-white/[0.03]
                      px-4 py-2.5 text-xs text-slate-300
                      hover:bg-white/[0.07] hover:text-white
                    "
                  >
                    <GithubIcon size={14} />
                    <span>View on GitHub</span>
                  </a>
                )}
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex min-w-0 items-center gap-2
                      rounded-xl bg-white
                      px-4 py-2.5 text-xs font-semibold text-black
                      hover:bg-slate-100
                    "
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MODAL SECTION
========================================================= */

function ModalSection({
  number,
  title,
  children,
  highlighted = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  highlighted?: boolean;
}) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex min-w-0 items-center gap-2">
        <span className="shrink-0 font-mono text-[9px] text-primary-light/50">
          {number}
        </span>
        <h3 className={`
          shrink-0 font-display text-[12px] font-semibold
          sm:text-[15px]
          ${highlighted ? "text-primary-light" : "text-white"}
        `}>
          {title}
        </h3>
        <div className="h-px min-w-0 flex-1 bg-white/[0.05]" />
      </div>
      {children}
    </section>
  );
}