"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ParticleField() {
  const { scrollYProgress } = useScroll();

  /* =========================================================
     PARALLAX
  ========================================================= */

  const orb1Y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -300]
  );

  const orb2Y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 200]
  );

  const orb3Y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -150]
  );

  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        h-[100dvh]
        w-[100vw]
        max-w-[100vw]
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* =====================================================
          ANIMATED GRID
      ===================================================== */}

      <motion.div
        className="
          absolute
          inset-0
          h-full
          w-full
          max-w-full
          overflow-hidden
          grid-bg
          mask-radial
        "
        style={{
          opacity: gridOpacity,
        }}
      />

      {/* =====================================================
          ORB 1
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-[-180px]
          top-[8%]
          h-[360px]
          w-[360px]
          max-w-none
          rounded-full
          sm:left-[-160px]
          sm:h-[430px]
          sm:w-[430px]
          lg:left-[-140px]
          lg:h-[500px]
          lg:w-[500px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.035), transparent 70%)",
          y: orb1Y,
        }}
      />

      {/* =====================================================
          ORB 2
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-[-140px]
          top-[48%]
          h-[300px]
          w-[300px]
          max-w-none
          rounded-full
          sm:right-[-130px]
          sm:h-[350px]
          sm:w-[350px]
          lg:right-[-100px]
          lg:h-[400px]
          lg:w-[400px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.025), transparent 70%)",
          y: orb2Y,
        }}
      />

      {/* =====================================================
          ORB 3
      ===================================================== */}

      <motion.div
        className="
          absolute
          bottom-[-100px]
          left-[25%]
          h-[280px]
          w-[280px]
          max-w-none
          rounded-full
          sm:h-[320px]
          sm:w-[320px]
          lg:left-[30%]
          lg:h-[350px]
          lg:w-[350px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.02), transparent 70%)",
          y: orb3Y,
        }}
      />

      {/* =====================================================
          MOBILE OVERLAY
          Keeps the background visually subtle on small
          screens and avoids expensive large rendering.
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-transparent
          sm:bg-transparent
        "
      />
    </div>
  );
}