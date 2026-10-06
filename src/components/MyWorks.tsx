import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Filter,
  X,
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
    description: string;
  }
> = {
  Classic: {
    label: "Classic",
    description:
      "Simple, elegant and beautifully focused on the essential event details.",
  },

  "Velvet Bloom": {
    label: "Velvet Bloom",
    description:
      "Rich visual experiences with photographs, refined animations and immersive design.",
  },

  "Royal Heritage": {
    label: "Royal Heritage",
    description:
      "The complete premium experience with photos, videos, advanced interactions and exclusive features.",
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
    title: "Elegant Wedding",
    event: "Wedding",
    tier: "Classic",
    image: "/images/projects/wedding-classic.jpg",
    description:
      "A clean and elegant invitation focused on the essential wedding details.",
    link: "#",
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
    image: "https://keerthana-puberty.vercel.app/images/gallery-family.jpg",
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
    <button
      type="button"
      onClick={onClick}
      className={`
        whitespace-nowrap
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
            ? "border-white/20 bg-white text-dark shadow-lg shadow-white/[0.05]"
            : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: InvitationProject;
  index: number;
}) {
  const tierDescription =
    TIER_INFO[project.tier].description;

  const hasLink =
    project.link.trim() !== "" &&
    project.link !== "#";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        transition-colors
        duration-300
        hover:border-white/[0.14]
        hover:bg-white/[0.035]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">

        <img
          src={project.image}
          alt={`${project.title} invitation`}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        {/* IMAGE OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* =================================================
            TIER
        ================================================= */}

        <div className="absolute left-4 top-4">
          <span
            className="
              rounded-full
              border
              border-white/10
              bg-black/40
              px-3
              py-1.5
              text-[10px]
              font-medium
              uppercase
              tracking-wider
              text-white
              backdrop-blur-md
            "
          >
            {project.tier}
          </span>
        </div>

        {/* =================================================
            EVENT
        ================================================= */}

        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
            {project.event}
          </span>
        </div>

        {/* =================================================
            DESKTOP OPEN ICON
            Hover -> appears
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
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/50
              text-white
              backdrop-blur-md

              opacity-100

              transition-all
              duration-300

              hover:scale-110
              hover:border-white/40
              hover:bg-black/70

              sm:opacity-0
              sm:group-hover:opacity-100
            "
          >
            <ArrowUpRight size={17} />
          </a>
        )}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-4">
          <div className="w-full">

            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {project.description}
            </p>

          </div>
        </div>

        {/* =================================================
            TIER DESCRIPTION
        ================================================= */}

        <div className="mt-5 border-t border-white/[0.06] pt-4">

          <p className="text-xs leading-relaxed text-slate-500">
            {tierDescription}
          </p>

        </div>

        {/* =================================================
            OPEN INVITATION BUTTON
            Mobile + Desktop
        ================================================= */}

        {hasLink && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.10]
              bg-white/[0.04]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300

              hover:border-white/[0.25]
              hover:bg-white/[0.08]
              hover:shadow-lg
              hover:shadow-black/20

              active:scale-[0.98]
            "
          >
            <span>Open Invitation</span>

            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        )}

      </div>
    </motion.article>
  );
}

/* =========================================================
   MY WORKS
========================================================= */

export default function MyWorks() {
  /* =======================================================
     FILTER STATE
  ======================================================= */

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
    <main className="min-h-screen w-full overflow-hidden bg-dark text-white">

      <div className="mx-auto min-h-screen max-w-7xl px-5 py-8 sm:px-8 lg:px-12">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex items-center justify-between"
        >

          {/* BACK */}

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

            <span>
              Back to Home
            </span>
          </Link>

          {/* MOBILE FILTER */}

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

            <span>
              Filters
            </span>

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
            HEADER
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
            duration: 0.7,
            delay: 0.1,
          }}
          className="mt-16 max-w-3xl"
        >

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary-light">
            Digital Invitations
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            My Works
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Explore our collection of beautifully crafted digital
            invitations, designed for every special occasion.
          </p>

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
            duration: 0.6,
            delay: 0.25,
          }}
          className="mt-12 hidden lg:block"
        >

          {/* EVENT FILTER */}

          <div>

            <div className="mb-4 flex items-center gap-2">

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

          {/* TIER FILTER */}

          <div className="mt-7">

            <div className="mb-4 flex items-center gap-2">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Experience
              </span>

              <div className="h-px flex-1 bg-white/[0.05]" />

            </div>

            <div className="flex flex-wrap gap-2">

              {TIER_OPTIONS.map((tier) => (
                <FilterButton
                  key={tier}
                  active={
                    selectedTier === tier
                  }
                  onClick={() =>
                    setSelectedTier(tier)
                  }
                >
                  {tier === "All"
                    ? "All Experiences"
                    : tier}
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

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

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

                {/* EVENT */}

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

                {/* TIER */}

                <p className="mb-3 mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Experience
                </p>

                <div className="flex flex-wrap gap-2">

                  {TIER_OPTIONS.map((tier) => (
                    <FilterButton
                      key={tier}
                      active={
                        selectedTier === tier
                      }
                      onClick={() =>
                        setSelectedTier(tier)
                      }
                    >
                      {tier === "All"
                        ? "All Experiences"
                        : tier}
                    </FilterButton>
                  ))}

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            ACTIVE FILTER SUMMARY
        ================================================= */}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">

          <p className="text-sm text-slate-500">

            <span className="text-white">
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

        </div>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <motion.div
          layout
          className="
            mt-6
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
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

            <div className="rounded-full border border-white/[0.07] bg-white/[0.02] p-4">

              <Filter
                size={22}
                className="text-slate-500"
              />

            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              No invitations found
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              There are no invitations matching the selected
              event and experience.
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
                text-dark
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
            y: 25,
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
            duration: 0.7,
          }}
          className="
            mt-20
            rounded-3xl
            border
            border-white/[0.07]
            bg-white/[0.02]
            p-8
            text-center
            sm:p-12
          "
        >

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary-light">
            Have an event coming up?
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Let&apos;s create something memorable.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Choose the experience that fits your celebration.
            Contact us for customization, availability and pricing.
          </p>

          <a
            href="mailto:hello@example.com"
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
              text-dark
              transition-colors
              hover:bg-slate-100
            "
          >
            Contact Us

            <ArrowUpRight size={16} />
          </a>

        </motion.div>

      </div>
    </main>
  );
}