
import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   CONSTANTS
   ========================================================= */

const PERSONAL_VIDEO = "/hero-video.mp4";

const GITHUB_URL = "https://github.com/iamh2s";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/hariharasudhan01112004/";

const ROLES = [
  "AI Engineer",
  "Generative AI Developer",
  "Full-Stack Developer",
  "Machine Learning Engineer",
  "AI Automation Developer",
];

const SPECIALIZATIONS = [
  "Generative AI",
  "Machine Learning",
  "Full-Stack Development",
];

/* =========================================================
   SOCIAL ICONS
   ========================================================= */

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.385.6.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.006.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12 24 5.373 18.627 0 12 0Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

/* =========================================================
   ROLE ROTATOR
   Simple interval instead of character-by-character typing.
   ========================================================= */

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROLES.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      className="text-primary-light"
      aria-live="off"
    >
      {ROLES[index]}
    </span>
  );
}

/* =========================================================
   HERO COMPONENT
   ========================================================= */

export default function Hero() {
  return (
    <section
      id="home"
      className="noise relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden"
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[45%] top-0 hidden h-full w-px bg-white/[0.02] lg:block" />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* MAIN CONTENT */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="grid items-center gap-10 lg:min-h-[calc(100vh-80px)] lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* LEFT CONTENT */}

          <div className="order-1 flex flex-col justify-center">
            {/* STATUS */}

            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:text-[11px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>

                Open to opportunities
              </span>
            </div>

            {/* NAME */}

            <h1 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.1rem] xl:text-5xl">
              <span className="mr-3">P.S.</span>
              <span>Hariharasudhan</span>
            </h1>

            {/* ROLE */}

            <div className="mb-4">
              <div className="min-h-6 text-sm font-medium sm:text-base">
                <RoleRotator />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium sm:text-xs">
                {SPECIALIZATIONS.map((specialization, index) => (
                  <span
                    key={specialization}
                    className="text-slate-500"
                  >
                    {index > 0 && (
                      <span className="mr-2 text-white/20">·</span>
                    )}
                    {specialization}
                  </span>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}

            <p className="mb-6 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Building intelligent AI systems, automation workflows,
              machine-learning applications, and modern full-stack products.
            </p>

            {/* ACTION BUTTONS */}

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-dark transition-colors hover:bg-slate-200 sm:px-6 sm:py-3"
              >
                View Projects

                <ArrowRight
                  size={15}
                  className="transition-transform duration-150 group-hover:translate-x-1"
                />
              </a>

              <Link
                to="/my-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-[13px] font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-white sm:px-6 sm:py-3"
              >
                <ExternalLink size={15} />
                My Works
              </Link>
            </div>

            {/* SOCIAL LINKS */}

            <div className="flex items-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <GithubIcon size={19} />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <LinkedinIcon size={19} />
              </a>
            </div>
          </div>

          {/* RIGHT VIDEO */}

          <div className="order-2 flex items-center justify-center lg:justify-end lg:-translate-x-8 xl:-translate-x-10">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px] xl:max-w-[400px]">
              {/* VIDEO */}

              <div className="video-container relative aspect-[4/6] w-full overflow-hidden rounded-[1.25rem] bg-dark-lighter shadow-2xl shadow-black/40">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={undefined}
                  className="h-full w-full object-cover"
                >
                  <source
                    src={PERSONAL_VIDEO}
                    type="video/mp4"
                  />
                  Your browser does not support the video element.
                </video>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/10 via-transparent to-dark/30"
                />
              </div>

              {/* CORNER DETAILS */}

              <div
                aria-hidden="true"
                className="absolute -left-2 -top-2 h-5 w-5 rounded-tl-md border-l border-t border-white/15"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 h-5 w-5 rounded-br-md border-b border-r border-white/15"
              />

              {/* ROLE LABEL */}

              <div className="absolute -left-3 bottom-12 sm:-left-4">
                <div className="glass flex items-center gap-2 rounded-lg px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />

                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    AI Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-600 transition-colors hover:text-slate-400"
        >
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em]">
            Scroll
          </span>

          <div className="flex h-7 w-4 justify-center rounded-full border border-slate-800 pt-1.5">
            <div className="h-1.5 w-0.5 rounded-full bg-slate-600" />
          </div>
        </a>
      </div>
    </section>
  );
}
