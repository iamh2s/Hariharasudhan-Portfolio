"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  loading: boolean;
}

const quotes = [
  "Every expert was once a beginner, but they never quit learning.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The best way to predict the future is to create it.",
  "Keep learning, keep building, and never stop improving.",
];

export default function Preloader({
  loading,
}: PreloaderProps) {
  const letters = "HARIHARASUDHAN".split("");

  const [quoteIndex, setQuoteIndex] = useState(0);

  /* =====================================================
     CHANGE QUOTE
     ===================================================== */

  useEffect(() => {
    if (!loading) {
      setQuoteIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setQuoteIndex((previous) =>
        (previous + 1) % quotes.length
      );
    }, 1800);

    return () => {
      window.clearInterval(interval);
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            min-h-screen
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-dark
            px-5
            sm:px-6
          "
        >
          {/* =================================================
              BACKGROUND GLOW
             ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[220px]
              w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-primary/[0.035]
              blur-[90px]
              sm:h-[320px]
              sm:w-[320px]
              sm:blur-[110px]
              md:h-[400px]
              md:w-[400px]
              md:blur-[130px]
            "
          />

          {/* =================================================
              SUBTLE BACKGROUND
             ================================================= */}

          <motion.div
            initial={{
              scaleY: 1,
            }}
            exit={{
              scaleY: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-primary/[0.025]
              via-transparent
              to-transparent
            "
          />

          {/* =================================================
              MAIN CONTENT
             ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              w-full
              max-w-xl
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            {/* =================================================
                LOADING
               ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="
                mb-7
                flex
                items-center
                justify-center
                gap-2
                sm:mb-8
              "
            >
              <span
                className="
                  h-px
                  w-5
                  bg-primary/40
                  sm:w-7
                "
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-slate-600
                  sm:text-[10px]
                  sm:tracking-[0.35em]
                "
              >
                Loading
              </span>

              <span
                className="
                  h-px
                  w-5
                  bg-primary/40
                  sm:w-7
                "
              />
            </motion.div>

            {/* =================================================
                H2S LOGO
               ================================================= */}

            <div
              className="
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >
              <motion.div
                initial={{
                  y: 55,
                  rotateX: 35,
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                animate={{
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  font-display
                  text-5xl
                  font-bold
                  leading-none
                  tracking-[-0.04em]
                  text-white
                  sm:text-6xl
                  md:text-7xl
                "
              >
                H2S
                <span className="text-primary">
                  .
                </span>
              </motion.div>
            </div>

            {/* =================================================
                QUOTE SLIDER
               ================================================= */}

            <div
              className="
                mt-5
                flex
                h-[58px]
                w-full
                max-w-[300px]
                items-center
                justify-center
                overflow-hidden
                sm:mt-6
                sm:h-[60px]
                sm:max-w-[420px]
                md:max-w-[500px]
              "
            >
              <AnimatePresence
                mode="wait"
              >
                <motion.p
                  key={quoteIndex}
                  initial={{
                    opacity: 0,
                    y: 15,
                    filter: "blur(5px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    filter: "blur(5px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    px-2
                    font-display
                    text-[12px]
                    font-medium
                    leading-relaxed
                    text-accent/80
                    sm:text-[13px]
                    md:text-[14px]
                  "
                >
                  “{quotes[quoteIndex]}”
                </motion.p>
              </AnimatePresence>
            </div>

            {/* =================================================
                QUOTE INDICATORS
               ================================================= */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
              "
            >
              {quotes.map(
                (_, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      width:
                        index === quoteIndex
                          ? 18
                          : 4,
                      opacity:
                        index === quoteIndex
                          ? 1
                          : 0.3,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      h-1
                      rounded-full
                      bg-primary
                    "
                  />
                )
              )}
            </div>

            {/* =================================================
                NAME
               ================================================= */}

            <div
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                overflow-hidden
                sm:mt-8
              "
            >
              <div
                className="
                  flex
                  max-w-full
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-[2px]
                  gap-y-1
                  px-2
                "
              >
                {letters.map(
                  (char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      initial={{
                        y: 18,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      transition={{
                        delay:
                          0.75 +
                          index * 0.035,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="
                        font-mono
                        text-[8px]
                        font-medium
                        tracking-[0.12em]
                        text-slate-500
                        sm:text-[9px]
                        sm:tracking-[0.16em]
                        md:text-[10px]
                      "
                    >
                      {char}
                    </motion.span>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                PROGRESS
               ================================================= */}

            <div
              className="
                mt-8
                flex
                w-full
                max-w-[190px]
                flex-col
                items-center
                sm:mt-9
                sm:max-w-[220px]
              "
            >
              <div
                className="
                  relative
                  h-[2px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-white/[0.05]
                "
              >
                <motion.div
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-primary/60
                    via-primary
                    to-accent/70
                  "
                >
                  <motion.div
                    animate={{
                      x: [
                        "-100%",
                        "300%",
                      ],
                    }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      inset-y-0
                      left-0
                      w-1/3
                      bg-white/50
                      blur-[2px]
                    "
                  />
                </motion.div>
              </div>

              {/* STATUS */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.9,
                  duration: 0.4,
                }}
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                "
              >
                <motion.span
                  animate={{
                    opacity: [
                      0.3,
                      1,
                      0.3,
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-primary
                  "
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
                  Initializing
                </span>
              </motion.div>
            </div>
          </div>

          {/* =================================================
              FOOTER
             ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
            className="
              absolute
              bottom-5
              left-0
              right-0
              flex
              items-center
              justify-center
              px-4
              sm:bottom-7
            "
          >
            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.25em]
                text-slate-700
                sm:text-[8px]
              "
            >
              Portfolio • 2026
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}