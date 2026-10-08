import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Filter,
  X,
  Crown,
  Sparkles,
  Gem,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   TYPES
========================================================= */

type EventType =
  | "Wedding"
  | "Puberty"
  | "Baby Shower"
  | "Housewarming"
  | "Ear Piercing"
  | "Birthday"
  | "Baby Naming"
  | "Engagement"
  | "Reception"
  | "Graduation"
  | "Religious"
  | "Other";

type InvitationTier =
  | "Classic"
  | "Velvet Bloom"
  | "Royal Heritage";

type InvitationProject = {
  id: number;
  title: string;
  event: EventType;
  tier: InvitationTier;
  image: string;
  description: string;
  link: string;
};

/* =========================================================
   EVENT OPTIONS
========================================================= */

const EVENT_OPTIONS: Array<"All" | EventType> = [
  "All",
  "Wedding",
  "Engagement",
  "Reception",
  "Puberty",
  "Baby Shower",
  "Baby Naming",
  "Ear Piercing",
  "Birthday",
  "Housewarming",
  "Graduation",
  "Religious",
  "Other",
];

/* =========================================================
   TIER OPTIONS
========================================================= */

const TIER_OPTIONS: Array<"All" | InvitationTier> = [
  "All",
  "Classic",
  "Velvet Bloom",
  "Royal Heritage",
];

/* =========================================================
   TIER INFORMATION
========================================================= */

const TIER_INFO: Record<
  InvitationTier,
  {
    label: string;
    shortLabel: string;
    description: string;
    tagline: string;
  }
> = {
  Classic: {
    label: "Classic",
    shortLabel: "CLASSIC",
    description:
      "Simple, elegant and beautifully focused on the essential event details.",
    tagline: "Timeless Elegance",
  },

  "Velvet Bloom": {
    label: "Velvet Bloom",
    shortLabel: "VELVET BLOOM",
    description:
      "Rich visual experiences with photographs, refined animations and immersive design.",
    tagline: "Cinematic Romance",
  },

  "Royal Heritage": {
    label: "Royal Heritage",
    shortLabel: "ROYAL HERITAGE",
    description:
      "The complete premium experience with photos, videos, advanced interactions and exclusive features.",
    tagline: "The Grand Experience",
  },
};

/* =========================================================
   TIER VISUAL SYSTEM
========================================================= */

const TIER_STYLES: Record<
  InvitationTier,
  {
    card: string;
    imageOverlay: string;
    badge: string;
    event: string;
    title: string;
    description: string;
    divider: string;
    button: string;
    icon: string;
    glow: string;
    accent: string;
    accentSoft: string;
    orb: string;
    iconBg: string;
    ribbon: string;
  }
> = {
  /* =======================================================
     CLASSIC
  ======================================================= */

  Classic: {
    card:
      "border-[#d8c39a]/20 bg-[#f8f3e7]/[0.035] hover:border-[#e4c982]/50 hover:bg-[#f8f3e7]/[0.065]",

    imageOverlay:
      "bg-gradient-to-t from-[#17130d]/95 via-[#17130d]/15 to-transparent",

    badge:
      "border-[#d8c39a]/40 bg-[#17130d]/75 text-[#f3dfb0]",

    event: "text-[#e5cf9b]/90",

    title: "text-[#fff7e3]",

    description: "text-[#cfc4aa]",

    divider: "border-[#d8c39a]/15",

    button:
      "border-[#d8c39a]/30 bg-[#d8c39a]/[0.08] text-[#f3dfb0] hover:border-[#e8cc81]/70 hover:bg-[#d8c39a]/[0.18]",

    icon: "text-[#e5cf9b]",

    glow: "shadow-[0_25px_80px_rgba(216,195,154,0.10)]",

    accent: "#e5cf9b",

    accentSoft: "rgba(229,207,155,0.15)",

    orb:
      "bg-[radial-gradient(circle,rgba(229,207,155,0.22),transparent_70%)]",

    iconBg:
      "border-[#d8c39a]/25 bg-[#d8c39a]/[0.08]",

    ribbon:
      "bg-gradient-to-r from-[#a88745] via-[#f0d58e] to-[#a88745]",
  },

  /* =======================================================
     VELVET BLOOM
  ======================================================= */

  "Velvet Bloom": {
    card:
      "border-[#8f3048]/30 bg-[#3b1220]/[0.18] hover:border-[#d66b84]/60 hover:bg-[#4a1627]/[0.30]",

    imageOverlay:
      "bg-gradient-to-t from-[#210912]/95 via-[#4a1627]/15 to-transparent",

    badge:
      "border-[#c75b73]/40 bg-[#210912]/80 text-[#f2a9b9]",

    event: "text-[#e58ca1]/90",

    title: "text-[#ffe9ee]",

    description: "text-[#d8aab5]",

    divider: "border-[#c75b73]/20",

    button:
      "border-[#c75b73]/35 bg-[#8f3048]/20 text-[#ffd8e0] hover:border-[#e8849b]/70 hover:bg-[#8f3048]/40",

    icon: "text-[#ef9caf]",

    glow: "shadow-[0_25px_90px_rgba(143,48,72,0.24)]",

    accent: "#ef9caf",

    accentSoft: "rgba(239,156,175,0.15)",

    orb:
      "bg-[radial-gradient(circle,rgba(239,156,175,0.20),transparent_70%)]",

    iconBg:
      "border-[#c75b73]/30 bg-[#8f3048]/[0.14]",

    ribbon:
      "bg-gradient-to-r from-[#6d2035] via-[#e08a9e] to-[#6d2035]",
  },

  /* =======================================================
     ROYAL HERITAGE
  ======================================================= */

  "Royal Heritage": {
    card:
      "border-[#b9934b]/30 bg-[#111a2e]/[0.38] hover:border-[#e3c56f]/70 hover:bg-[#17233d]/[0.60]",

    imageOverlay:
      "bg-gradient-to-t from-[#080d18]/95 via-[#15213a]/10 to-transparent",

    badge:
      "border-[#d7b86a]/45 bg-[#080d18]/80 text-[#e5c879]",

    event: "text-[#d9bc70]/95",

    title: "text-[#fff5d6]",

    description: "text-[#c4b99f]",

    divider: "border-[#d7b86a]/20",

    button:
      "border-[#d7b86a]/35 bg-[#b9934b]/[0.10] text-[#f1d88f] hover:border-[#f0d27c]/80 hover:bg-[#b9934b]/[0.22]",

    icon: "text-[#e6c978]",

    glow: "shadow-[0_30px_110px_rgba(185,147,75,0.24)]",

    accent: "#e6c978",

    accentSoft: "rgba(230,201,120,0.16)",

    orb:
      "bg-[radial-gradient(circle,rgba(230,201,120,0.22),transparent_70%)]",

    iconBg:
      "border-[#d7b86a]/35 bg-[#b9934b]/[0.12]",

    ribbon:
      "bg-gradient-to-r from-[#76551d] via-[#f0d47b] to-[#76551d]",
  },
};

/* =========================================================
   PROJECT DATA
========================================================= */

const INVITATION_PROJECTS: InvitationProject[] = [
  {
    id: 1,
    title: "Ajay & Susmi",
    event: "Wedding",
    tier: "Velvet Bloom",
    image:
      "https://ajaywedssusmi.vercel.app/images/gallery/02.jpg",
    description:
      "A complete cinematic wedding invitation experience with rich visual storytelling.",
    link: "https://ajaywedssusmi.vercel.app/",
  },

  {
    id: 2,
    title: "Ram & Janu",
    event: "Wedding",
    tier: "Classic",
    image:
      "https://ramandjanuclassic.vercel.app/images/couple.png",
    description:
      "An elegant wedding invitation featuring beautiful photography and immersive animations.",
    link: "https://ramandjanuclassic.vercel.app/",
  },

  {
    id: 3,
    title: "Karthick & Meenachi",
    event: "Wedding",
    tier: "Royal Heritage",
    image: "https://karthickmeenachiweddinginvitation.vercel.app/images/gallery-couple2.jpg",
    description:
      "A luxurious invitation experience designed with sophisticated royal aesthetics.",
    link: "https://karthickmeenachiweddinginvitation.vercel.app/",
  },

  {
    id: 4,
    title: "Baby Shower Celebration",
    event: "Baby Shower",
    tier: "Velvet Bloom",
    image: "/images/projects/baby-shower.jpg",
    description:
      "A beautiful baby shower experience with photographs and elegant animations.",
    link: "#",
  },

  {
    id: 5,
    title: "Baby Naming Ceremony",
    event: "Baby Naming",
    tier: "Classic",
    image: "/images/projects/baby-naming.jpg",
    description:
      "A simple and graceful digital invitation for a traditional naming ceremony.",
    link: "#",
  },

  {
    id: 6,
    title: "Housewarming Ceremony",
    event: "Housewarming",
    tier: "Classic",
    image: "/images/projects/housewarming.jpg",
    description:
      "A minimal invitation for a memorable new-home celebration.",
    link: "#",
  },

  {
    id: 7,
    title: "Keerthana Manjal Neerattu Vizha",
    event: "Puberty",
    tier: "Velvet Bloom",
    image:
      "https://keerthana-puberty.vercel.app/images/gallery-family.jpg",
    description:
      "A traditional celebration presented through a rich digital invitation experience.",
    link: "https://keerthana-puberty.vercel.app",
  },

  {
    id: 8,
    title: "Ear Piercing Ceremony",
    event: "Ear Piercing",
    tier: "Velvet Bloom",
    image: "/images/projects/ear-piercing.jpg",
    description:
      "A beautiful traditional invitation with photographs and elegant motion.",
    link: "#",
  },

  {
    id: 9,
    title: "Birthday Celebration",
    event: "Birthday",
    tier: "Velvet Bloom",
    image: "/images/projects/birthday.jpg",
    description:
      "A vibrant and memorable digital birthday invitation experience.",
    link: "#",
  },

  {
    id: 10,
    title: "Engagement Celebration",
    event: "Engagement",
    tier: "Royal Heritage",
    image: "/images/projects/engagement.jpg",
    description:
      "A luxurious engagement invitation with immersive storytelling.",
    link: "#",
  },

  {
    id: 11,
    title: "Reception Invitation",
    event: "Reception",
    tier: "Classic",
    image: "/images/projects/reception.jpg",
    description:
      "A sophisticated and simple reception invitation.",
    link: "#",
  },

  {
    id: 12,
    title: "Graduation Celebration",
    event: "Graduation",
    tier: "Classic",
    image: "/images/projects/graduation.jpg",
    description:
      "A clean digital invitation celebrating an important milestone.",
    link: "#",
  },
];

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`
        relative whitespace-nowrap
        overflow-hidden
        rounded-full
        border
        px-4
        py-2
        text-xs
        font-medium
        transition-all
        duration-300

        ${
          active
            ? "border-white/20 bg-white text-[#111] shadow-lg shadow-white/[0.05]"
            : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
        }
      `}
    >
      {active && (
        <motion.span
          layoutId="activeFilter"
          className="absolute inset-0 bg-white"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* =========================================================
   TIER ICON
========================================================= */

function TierIcon({
  tier,
  size = 17,
}: {
  tier: InvitationTier;
  size?: number;
}) {
  if (tier === "Classic") {
    return <Star size={size} strokeWidth={1.5} />;
  }

  if (tier === "Velvet Bloom") {
    return <Sparkles size={size} strokeWidth={1.5} />;
  }

  return <Crown size={size} strokeWidth={1.5} />;
}

/* =========================================================
   CINEMATIC CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: InvitationProject;
  index: number;
}) {
  const tierDescription = TIER_INFO[project.tier].description;
  const tierTagline = TIER_INFO[project.tier].tagline;
  const tierStyle = TIER_STYLES[project.tier];

  const hasLink =
    project.link.trim() !== "" && project.link !== "#";

  /* =======================================================
     3D MOUSE TILT
  ======================================================= */

  const cardRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    {
      stiffness: 220,
      damping: 25,
      mass: 0.6,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
    {
      stiffness: 220,
      damping: 25,
      mass: 0.6,
    }
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const element = cardRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.94,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(6px)",
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`
        group
        relative
        overflow-visible
        rounded-[26px]
        ${tierStyle.glow}
      `}
    >
      {/* =====================================================
          OUTER GLOW
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          -inset-[1px]
          rounded-[27px]
          opacity-0
          blur-xl
          transition-opacity
          duration-700
          group-hover:opacity-100
          ${tierStyle.orb}
        `}
      />

      {/* =====================================================
          CARD BODY
      ===================================================== */}

      <div
        className={`
          relative
          h-full
          overflow-hidden
          rounded-[26px]
          border
          ${tierStyle.card}
          backdrop-blur-xl
          transition-all
          duration-700
        `}
      >
        {/* ===================================================
            CINEMATIC LIGHT SWEEP
        =================================================== */}

        <motion.div
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            z-30
            w-[35%]
            -skew-x-[22deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.10]
            to-transparent
            mix-blend-screen
          "
        />

        {/* ===================================================
            TOP TIER RIBBON
        =================================================== */}

        <div
          className={`
            absolute
            left-1/2
            top-0
            z-40
            h-[2px]
            w-0
            -translate-x-1/2
            opacity-0
            transition-all
            duration-700
            group-hover:w-3/4
            group-hover:opacity-100
            ${tierStyle.ribbon}
          `}
        />

        {/* ===================================================
            IMAGE
        =================================================== */}

        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Image */}
          <motion.img
            src={project.image}
            alt={`${project.title} invitation`}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1200ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:scale-[1.10]
            "
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          {/* Dark cinematic overlay */}
          <div
            className={`
              pointer-events-none
              absolute
              inset-0
              ${tierStyle.imageOverlay}
            `}
          />

          {/* Subtle vignette */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]
              opacity-70
            "
          />

          {/* =================================================
              FLOATING TIER ICON
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25 + index * 0.08,
            }}
            className={`
              absolute
              right-4
              top-4
              z-20
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              backdrop-blur-xl
              ${tierStyle.iconBg}
              ${tierStyle.icon}
            `}
          >
            <TierIcon tier={project.tier} size={17} />
          </motion.div>

          {/* =================================================
              TIER BADGE
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.35 + index * 0.08,
            }}
            className="absolute left-4 top-4 z-20"
          >
            <span
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                backdrop-blur-xl
                ${tierStyle.badge}
              `}
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-current
                  shadow-[0_0_8px_currentColor]
                "
              />

              {project.tier}
            </span>
          </motion.div>

          {/* =================================================
              BOTTOM IMAGE INFO
          ================================================= */}

          <div className="absolute bottom-4 left-4 right-4 z-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.45 + index * 0.08,
              }}
            >
              <p
                className={`
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  ${tierStyle.event}
                `}
              >
                {project.event}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/55">
                {tierTagline}
              </p>
            </motion.div>
          </div>

          {/* =================================================
              OPEN ICON
          ================================================= */}

          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="
                absolute
                bottom-4
                right-4
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                text-white
                opacity-100
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-110
                hover:border-white/50
                hover:bg-black/65
                sm:opacity-0
                sm:group-hover:opacity-100
              "
            >
              <ArrowUpRight size={17} />
            </a>
          )}
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="relative p-5 sm:p-6">
          {/* Decorative glow */}
          <div
            className={`
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              blur-3xl
              opacity-0
              transition-opacity
              duration-700
              group-hover:opacity-100
              ${tierStyle.orb}
            `}
          />

          {/* Title */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.45 + index * 0.08,
              }}
            >
              <h3
                className={`
                  text-lg
                  font-semibold
                  tracking-tight
                  ${tierStyle.title}
                `}
              >
                {project.title}
              </h3>

              <p
                className={`
                  mt-2
                  text-sm
                  leading-relaxed
                  ${tierStyle.description}
                `}
              >
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* =================================================
              TIER MINI HEADER
          ================================================= */}

          <div
            className={`
              relative
              z-10
              mt-5
              flex
              items-center
              gap-3
              border-t
              pt-4
              ${tierStyle.divider}
            `}
          >
            <div
              className={`
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                ${tierStyle.iconBg}
                ${tierStyle.icon}
              `}
            >
              <TierIcon tier={project.tier} size={14} />
            </div>

            <div>
              <p
                className={`
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  ${tierStyle.icon}
                `}
              >
                {TIER_INFO[project.tier].shortLabel}
              </p>

              <p className="mt-0.5 text-[10px] text-white/40">
                Invitation Experience
              </p>
            </div>
          </div>

          {/* =================================================
              TIER DESCRIPTION
          ================================================= */}

          <div className="relative z-10 mt-4">
            <p
              className={`
                text-xs
                leading-relaxed
                ${tierStyle.description}
                opacity-80
              `}
            >
              {tierDescription}
            </p>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          {hasLink && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className={`
                group/button
                relative
                z-10
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-xl
                border
                px-5
                py-3
                text-sm
                font-semibold
                transition-all
                duration-500
                ${tierStyle.button}
              `}
            >
              {/* Button shimmer */}
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-full
                  w-1/2
                  skew-x-[-20deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  transition-all
                  duration-700
                  group-hover/button:left-[130%]
                "
              />

              <span className="relative z-10">
                Explore Invitation
              </span>

              <ArrowUpRight
                size={16}
                className={`
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover/button:-translate-y-0.5
                  group-hover/button:translate-x-0.5
                  ${tierStyle.icon}
                `}
              />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   MY WORKS
========================================================= */

export default function MyWorks() {
  const [selectedEvent, setSelectedEvent] =
    useState<"All" | EventType>("All");

  const [selectedTier, setSelectedTier] =
    useState<"All" | InvitationTier>("All");

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    return INVITATION_PROJECTS.filter((project) => {
      const eventMatch =
        selectedEvent === "All" ||
        project.event === selectedEvent;

      const tierMatch =
        selectedTier === "All" ||
        project.tier === selectedTier;

      return eventMatch && tierMatch;
    });
  }, [selectedEvent, selectedTier]);

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSelectedEvent("All");
    setSelectedTier("All");
  };

  const hasActiveFilters =
    selectedEvent !== "All" ||
    selectedTier !== "All";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#08090c] text-white">
      {/* ===================================================
          CINEMATIC BACKGROUND
      =================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base */}
        <div className="absolute inset-0 bg-[#08090c]" />

        {/* Top glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-300px]
            h-[650px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-white/[0.025]
            blur-[140px]
          "
        />

        {/* Gold atmosphere */}
        <div
          className="
            absolute
            left-[5%]
            top-[20%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-[#c9a85c]/[0.025]
            blur-[120px]
          "
        />

        {/* Burgundy atmosphere */}
        <div
          className="
            absolute
            right-[0%]
            top-[45%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#8f3048]/[0.035]
            blur-[140px]
          "
        />

        {/* Subtle grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      <div className="mx-auto min-h-screen max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        {/* =================================================
            TOP BAR
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-between"
        >
          {/* Back */}
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.02]
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-400
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-white/[0.18]
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <ArrowLeft
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            <span>Back to Home</span>
          </Link>

          {/* Mobile filter */}
          <button
            type="button"
            onClick={() =>
              setMobileFilterOpen(
                (value) => !value
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.02]
              px-4
              py-2.5
              text-sm
              text-slate-400
              transition-all
              hover:border-white/[0.16]
              hover:text-white
              lg:hidden
            "
          >
            <Filter size={16} />

            <span>Filters</span>

            <ChevronDown
              size={15}
              className={`
                transition-transform
                duration-300
                ${
                  mobileFilterOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
        </motion.div>

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-20 max-w-3xl"
        >
          <motion.p
            initial={{
              opacity: 0,
              letterSpacing: "0.1em",
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.3em",
            }}
            transition={{
              duration: 1,
              delay: 0.35,
            }}
            className="mb-4 text-xs font-medium uppercase text-primary-light"
          >
            Digital Invitations
          </motion.p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            My Works
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Explore a collection of beautifully crafted
            digital invitations, each designed with its
            own level of elegance, emotion and cinematic
            storytelling.
          </p>
        </motion.div>

        {/* =================================================
            TIER SHOWCASE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.45,
          }}
          className="
            mt-12
            grid
            gap-3
            md:grid-cols-3
          "
        >
          {(
            [
              "Classic",
              "Velvet Bloom",
              "Royal Heritage",
            ] as InvitationTier[]
          ).map((tier, index) => {
            const style = TIER_STYLES[tier];

            return (
              <motion.button
                key={tier}
                type="button"
                onClick={() =>
                  setSelectedTier(tier)
                }
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition-all
                  duration-500
                  ${
                    selectedTier === tier
                      ? style.card
                      : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14]"
                  }
                `}
              >
                {/* Glow */}
                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    ${style.orb}
                  `}
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      ${style.iconBg}
                      ${style.icon}
                    `}
                  >
                    <TierIcon
                      tier={tier}
                      size={18}
                    />
                  </div>

                  <div>
                    <p
                      className={`
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        ${
                          selectedTier === tier
                            ? style.icon
                            : "text-white/50"
                        }
                      `}
                    >
                      {tier}
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      {TIER_INFO[tier].tagline}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {selectedTier === tier && (
                  <motion.div
                    layoutId="tierIndicator"
                    className={`
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-1/3
                      -translate-x-1/2
                      ${style.ribbon}
                    `}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* =================================================
            DESKTOP FILTERS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.55,
          }}
          className="mt-10 hidden lg:block"
        >
          {/* Event */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Event
              </span>

              <div className="h-px flex-1 bg-white/[0.05]" />
            </div>

            <div className="flex flex-wrap gap-2">
              {EVENT_OPTIONS.map((event) => (
                <FilterButton
                  key={event}
                  active={
                    selectedEvent === event
                  }
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                >
                  {event === "All"
                    ? "All Events"
                    : event}
                </FilterButton>
              ))}
            </div>
          </div>
        </motion.div>

        {/* =================================================
            MOBILE FILTER PANEL
        ================================================= */}

        <AnimatePresence>
          {mobileFilterOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="mt-6 overflow-hidden lg:hidden"
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.02]
                  p-5
                  backdrop-blur-xl
                "
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter
                      size={16}
                      className="text-slate-400"
                    />

                    <span className="text-sm font-semibold text-white">
                      Filters
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileFilterOpen(false)
                    }
                    className="text-slate-500 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Event
                </p>

                <div className="flex flex-wrap gap-2">
                  {EVENT_OPTIONS.map((event) => (
                    <FilterButton
                      key={event}
                      active={
                        selectedEvent === event
                      }
                      onClick={() =>
                        setSelectedEvent(event)
                      }
                    >
                      {event === "All"
                        ? "All Events"
                        : event}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <motion.div
          layout
          className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
        >
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-white">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1
              ? "invitation"
              : "invitations"}{" "}
            found
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-slate-500
                transition-colors
                hover:text-white
              "
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </motion.div>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <motion.div
          layout
          className="
            mt-6
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
          style={{
            perspective: 1600,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* =================================================
            NO RESULTS
        ================================================= */}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.02]
                p-4
              "
            >
              <Filter
                size={22}
                className="text-slate-500"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              No invitations found
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              There are no invitations matching the
              selected event and experience.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-5
                rounded-xl
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-[#111]
                transition-colors
                hover:bg-slate-100
              "
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* =================================================
            CONTACT CTA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.9,
          }}
          className="
            relative
            mt-24
            overflow-hidden
            rounded-[30px]
            border
            border-white/[0.07]
            bg-white/[0.02]
            p-8
            text-center
            backdrop-blur-xl
            sm:p-12
          "
        >
          {/* CTA glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-40
              w-80
              -translate-x-1/2
              rounded-full
              bg-[#c9a85c]/[0.08]
              blur-[90px]
            "
          />

          <div className="relative z-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary-light">
              Have an event coming up?
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Let's create something memorable.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              Choose the experience that fits your
              celebration. Contact us for customization,
              availability and pricing.
            </p>

            <motion.a
              href="mailto:hello@example.com"
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-[#111]
                shadow-xl
                shadow-black/20
                transition-all
                hover:bg-slate-100
              "
            >
              Contact Us

              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </main>
  );
}

