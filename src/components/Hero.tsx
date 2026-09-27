import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

/* =========================================================
   CONSTANTS
========================================================= */

const PERSONAL_VIDEO = '/hero-video.mp4';
const GITHUB_URL = 'https://github.com/iamh2s';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hariharasudhan01112004/';
const RESUME_URL = '/Hariharasudhan_AIML_Resume_final.pdf';

const ROLES = [
  'AI Engineer',
  'Freelancer',
  'Generative AI Developer',
  'Full-Stack Developer',
  'Machine Learning Engineer',
  'Freelancer',
];

const SPECIALIZATIONS = [
  'Generative AI',
  'Machine Learning',
  'Full-Stack Development',
];

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.385.6.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.006.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12 24 5.373 18.627 0 12 0Z" />
    </svg>
  );
}

/* =========================================================
   LINKEDIN ICON
========================================================= */

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

/* =========================================================
   FADE UP
========================================================= */

function fadeUp(delay: number) {
  return {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.65, ease: 'easeOut' as const },
    },
  };
}

/* =========================================================
   TYPING ROLE
========================================================= */

function TypingRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[index];
    const speed = deleting ? 30 : 60;

    if (!deleting && text === currentRole) {
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(
        deleting
          ? currentRole.slice(0, text.length - 1)
          : currentRole.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="text-primary-light">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="ml-0.5 inline-block h-[1em] w-[2px] bg-primary-light align-middle"
      />
    </span>
  );
}

/* =========================================================
   3D TILT CARD
========================================================= */

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="noise relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[45%] top-0 hidden h-full w-px bg-white/[0.02] lg:block" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-10 lg:grid-cols-[50%_50%] lg:gap-10 xl:gap-14">

          {/* LEFT CONTENT */}
          <motion.div
            className="order-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* STATUS */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="mb-5"
            >
              <motion.span
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.12)' }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:text-[11px]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </motion.span>
            </motion.div>

            {/* NAME */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="mb-4 overflow-hidden"
            >
              <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl lg:text-[3.1rem] xl:text-5xl">
                <span className="mr-3 inline-block">P.S.</span>
                <span className="inline-block">Hariharasudhan</span>
              </h1>
            </motion.div>

            {/* TYPING ROLE */}
            <motion.div
              variants={fadeUp(0.45)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="mb-4"
            >
              <div className="h-6 text-[14px] font-medium sm:text-[15px]">
                <TypingRole />
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium sm:text-[12px]">
                {SPECIALIZATIONS.map((specialization, index) => (
                  <span key={specialization} className="text-slate-500">
                    {index > 0 && <span className="mr-2 text-white/10">·</span>}
                    {specialization}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp(0.6)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="mb-6 max-w-lg text-[14px] leading-relaxed text-slate-400 sm:text-[15px]"
            >
              Building intelligent AI systems, automation workflows,
              machine-learning applications, and modern full-stack products.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              variants={fadeUp(0.75)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              {/* View Projects */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-dark transition-colors hover:bg-slate-100 sm:px-6 sm:py-3"
              >
                <span>View Projects</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              {/* View Resume — opens in new tab, no download */}
            
            {/* SOCIAL ICONS */}
            <motion.div
              variants={fadeUp(0.9)}
              initial="hidden"
              animate={started ? 'visible' : 'hidden'}
              className="flex items-center gap-3"
            >
              {/* GitHub */}
              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-white transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.1]"
              >
                <GithubIcon size={19} />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-white transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.1]"
              >
                <LinkedinIcon size={19} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            className="order-2 flex items-center justify-center lg:justify-end lg:-translate-x-8 xl:-translate-x-10"
            initial={{ opacity: 0, y: 40 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px] xl:max-w-[400px]"
            >
              {/* AMBIENT GLOW */}
              <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-cyan-500/[0.04] opacity-70 blur-2xl" />

              {/* VIDEO */}
              <TiltCard>
                <div className="video-container relative aspect-[4/6] w-full overflow-hidden rounded-[1.25rem] bg-dark-lighter shadow-2xl shadow-black/40">
    <video
  autoPlay
  muted
  playsInline
  className="h-full w-full object-cover"
  onLoadedMetadata={(event) => {
    const video = event.currentTarget;

    // Start from the last 7 seconds
    video.currentTime = Math.max(0, video.duration - 9);

    video.play().catch(() => {});
  }}
  onTimeUpdate={(event) => {
    const video = event.currentTarget;

    const startTime = Math.max(0, video.duration - 7);

    if (video.currentTime >= video.duration - 0.05) {
      const playCount = Number(video.dataset.playCount || '0') + 1;
      video.dataset.playCount = String(playCount);

      if (playCount < 1) {
        // Restart the last 7 seconds
        video.currentTime = startTime;
        video.play().catch(() => {});
      } else {
        // Stop after 3 plays
        video.pause();
      }
    }
  }}
>
  <source src={PERSONAL_VIDEO} type="video/mp4" />
</video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/10 via-transparent to-dark/30" />
                </div>
              </TiltCard>

              {/* TOP LEFT CORNER */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={started ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute -left-2 -top-2 h-5 w-5 rounded-tl-md border-l border-t border-white/[0.12]"
              />

              {/* BOTTOM RIGHT CORNER */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={started ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="absolute -bottom-2 -right-2 h-5 w-5 rounded-br-md border-b border-r border-white/[0.12]"
              />

              {/* FLOATING LABEL */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 1.3, duration: 0.5, ease: 'easeOut' }}
                className="absolute -left-3 bottom-12 sm:-left-4"
              >
                <div className="glass flex items-center gap-2 rounded-lg px-3 py-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    AI Engineer
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-600 transition-colors hover:text-slate-400"
        >
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex h-7 w-4 justify-center rounded-full border border-slate-800 pt-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="h-1.5 w-0.5 rounded-full bg-slate-600"
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}