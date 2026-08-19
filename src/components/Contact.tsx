import { useRef, useCallback, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* =========================================================
   CONTACT INFORMATION
   ========================================================= */

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "harihari15953@gmail.com",
    href: "mailto:harihari15953@gmail.com",
    copyValue: "harihari15953@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 70104 58527",
    href: "tel:+917010458527",
    copyValue: "+917010458527",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: "https://maps.app.goo.gl/Y9CE1zdaw2WD8Csv8",
    copyValue: null,
  },
];

/* =========================================================
   SPOTLIGHT CARD
   ========================================================= */

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect =
        ref.current.getBoundingClientRect();

      ref.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );

      ref.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Contact() {
  const [copiedField, setCopiedField] =
    useState<string | null>(null);

  const sectionRef =
    useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  /* =======================================================
     COPY CONTACT INFORMATION
     ======================================================= */

  const handleCopy = async (
    label: string,
    copyValue: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        copyValue
      );

      setCopiedField(label);

      setTimeout(() => {
        setCopiedField(null);
      }, 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        py-28
        lg:py-40
      "
    >
      {/* ===================================================
          BACKGROUND
         =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-dark
          via-surface/20
          to-dark
        "
      />

      {/* ===================================================
          CONTAINER
         =================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-5xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            HEADER
           ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
          className="mb-6"
        >
          <span
            className="
              mb-3
              inline-block
              font-mono
              text-[11px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-slate-500
            "
          >
            // Contact
          </span>

          <h2
            className="
              font-display
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Let's Connect
          </h2>
        </motion.div>

        {/* =================================================
            DESCRIPTION
           ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="
            mb-12
            max-w-xl
            text-[15px]
            leading-relaxed
            text-slate-400
          "
        >
          Have a project in mind? I'm always
          open to discussing new AI projects,
          research collaborations, or full-stack
          development opportunities.
        </motion.p>

        {/* =================================================
            CONTACT CONTENT
           ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map(
              ({
                icon: Icon,
                label,
                value,
                href,
                copyValue,
              }) => (
                <div
                  key={label}
                  className="
                    group
                    relative
                    flex
                    min-h-[110px]
                    items-center
                    gap-3.5
                    rounded-xl
                    border
                    border-white/[0.04]
                    bg-white/[0.01]
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/[0.08]
                    hover:bg-white/[0.03]
                  "
                >
                  {/* CONTACT LINK */}

                  <a
                    href={href}
                    className="
                      flex
                      min-w-0
                      flex-1
                      items-center
                      gap-3.5
                    "
                  >
                    {/* ICON */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary/[0.08]
                        transition-all
                        duration-300
                        group-hover:bg-primary/[0.14]
                      "
                    >
                      <Icon
                        size={18}
                        className="text-primary-light"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0">
                      <p
                        className="
                          mb-1
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-slate-600
                        "
                      >
                        {label}
                      </p>

                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        {value}
                      </p>
                    </div>
                  </a>

                  {/* COPY BUTTON */}

                  {copyValue && (
                    <button
                      type="button"
                      aria-label={`Copy ${label}`}
                      onClick={() =>
                        handleCopy(
                          label,
                          copyValue
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition-all
                        duration-200
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      <AnimatePresence
                        mode="wait"
                        initial={false}
                      >
                        {copiedField === label ? (
                          <motion.span
                            key="check"
                            initial={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                          >
                            <Check
                              size={14}
                              className="text-emerald-400"
                            />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                          >
                            <Copy size={14} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          {/* =================================================
              AVAILABILITY CARD
             ================================================= */}

          <SpotlightCard
            className="
              mt-6
              rounded-xl
              border
              border-white/[0.04]
              bg-white/[0.01]
              p-5
              transition-all
              duration-300
              hover:border-white/[0.08]
              hover:bg-white/[0.03]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* LEFT */}

              <div>
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  {/* STATUS DOT */}

                  <span
                    className="
                      relative
                      flex
                      h-2.5
                      w-2.5
                    "
                  >
                    <span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        bg-emerald-400
                        opacity-75
                      "
                    />

                    <span
                      className="
                        relative
                        inline-flex
                        h-2.5
                        w-2.5
                        rounded-full
                        bg-emerald-400
                      "
                    />
                  </span>

                  <span
                    className="
                      text-[13px]
                      font-medium
                      text-emerald-400
                    "
                  >
                    Available for new projects
                  </span>
                </div>

                <p
                  className="
                    text-[13px]
                    leading-relaxed
                    text-slate-500
                  "
                >
                  Open to freelance, contract, and
                  full-time AI engineering roles.
                </p>
              </div>

              {/* EMAIL BUTTON */}

              <a
                href="mailto:harihari15953@gmail.com"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:border-white/[0.12]
                  hover:bg-white/[0.07]
                "
              >
                Email Me
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}