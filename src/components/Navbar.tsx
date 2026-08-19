"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  {
    name: "Education & Certificates",
    href: "#education",
  },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 40);

      const sections = navLinks.map((link) =>
        link.href.replace("#", "")
      );

      let currentSection = "home";

      for (const section of sections) {
        const element =
          document.getElementById(section);

        if (!element) continue;

        const rect =
          element.getBoundingClientRect();

        if (rect.top <= 180) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* Close mobile menu when resizing to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* Prevent body scrolling when mobile menu is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const targetId = href.replace("#", "");
    const target =
      document.getElementById(targetId);

    if (!target) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    const navbarOffset = 75;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      href
    );
  };

  return (
    <>
      {/* =================================================
          DESKTOP / MOBILE NAVBAR
         ================================================= */}

      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          w-full
        "
      >
        <div
          className={`
            mx-auto
            w-full
            transition-all
            duration-500
            ${
              scrolled
                ? `
                  border-b
                  border-white/[0.06]
                  bg-[#070a10]/85
                  shadow-lg
                  shadow-black/10
                  backdrop-blur-2xl
                `
                : "bg-transparent"
            }
          `}
        >
          <div
            className="
              mx-auto
              flex
              h-[68px]
              w-full
              max-w-7xl
              items-center
              justify-between
              px-4
              sm:h-[72px]
              sm:px-6
              lg:h-[76px]
              lg:px-8
            "
          >
            {/* =================================================
                LOGO
               ================================================= */}

            <a
              href="#home"
              onClick={(event) =>
                handleNavClick(
                  event,
                  "#home"
                )
              }
              className="
                group
                flex
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  font-display
                  text-lg
                  font-bold
                  tracking-tight
                  text-white
                  transition-all
                  duration-300
                  group-hover:text-slate-200
                  sm:text-xl
                  lg:text-[21px]
                "
              >
                H2S
                <span className="text-primary">
                  .
                </span>
              </span>
            </a>

            {/* =================================================
                DESKTOP NAV
               ================================================= */}

            <nav
              aria-label="Main navigation"
              className="
                hidden
                flex-1
                items-center
                justify-center
                md:flex
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-0.5
                  rounded-xl
                  border
                  border-white/[0.04]
                  bg-white/[0.015]
                  px-1
                  py-1
                  backdrop-blur-md
                  lg:gap-1
                "
              >
                {navLinks.map((link) => {
                  const section =
                    link.href.replace(
                      "#",
                      ""
                    );

                  const isActive =
                    activeSection ===
                    section;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) =>
                        handleNavClick(
                          event,
                          link.href
                        )
                      }
                      className="
                        group
                        relative
                        flex
                        min-h-[38px]
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-lg
                        px-2.5
                        py-2
                        text-center
                        text-[10px]
                        font-medium
                        transition-colors
                        duration-300
                        lg:px-3
                        lg:text-[11px]
                        xl:px-3.5
                        xl:text-[12px]
                      "
                    >
                      {/* Active background */}

                      {isActive && (
                        <motion.span
                          layoutId="activeNavbar"
                          className="
                            absolute
                            inset-0
                            rounded-lg
                            border
                            border-white/[0.05]
                            bg-white/[0.07]
                          "
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover background */}

                      <span
                        className="
                          absolute
                          inset-0
                          rounded-lg
                          bg-white/[0.03]
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      <span
                        className={`
                          relative
                          z-10
                          ${
                            isActive
                              ? "text-white"
                              : "text-slate-500 group-hover:text-slate-300"
                          }
                        `}
                      >
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* =================================================
                RIGHT SIDE SPACER
                Keeps desktop nav centered
               ================================================= */}

            <div
              className="
                hidden
                w-[42px]
                shrink-0
                md:block
                lg:w-[50px]
              "
            />

            {/* =================================================
                MOBILE MENU BUTTON
               ================================================= */}

            <motion.button
              type="button"
              aria-label={
                isOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isOpen}
              onClick={() =>
                setIsOpen((previous) => !previous)
              }
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-white/[0.06]
                bg-white/[0.03]
                text-slate-400
                transition-colors
                duration-300
                hover:bg-white/[0.07]
                hover:text-white
                md:hidden
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* =================================================
          MOBILE MENU
         ================================================= */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setIsOpen(false)
              }
              className="
                fixed
                inset-0
                z-[55]
                bg-black/70
                backdrop-blur-sm
                md:hidden
              "
            />

            {/* MENU PANEL */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                fixed
                left-3
                right-3
                top-[76px]
                z-[60]
                max-h-[calc(100vh-92px)]
                overflow-y-auto
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#080b12]/95
                p-3
                shadow-2xl
                shadow-black/40
                backdrop-blur-2xl
                md:hidden
              "
            >
              <nav
                aria-label="Mobile navigation"
                className="
                  flex
                  flex-col
                  items-stretch
                  gap-1
                "
              >
                {navLinks.map(
                  (link, index) => {
                    const section =
                      link.href.replace(
                        "#",
                        ""
                      );

                    const isActive =
                      activeSection ===
                      section;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(event) =>
                          handleNavClick(
                            event,
                            link.href
                          )
                        }
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                        transition={{
                          delay:
                            index * 0.045,
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`
                          flex
                          min-h-[48px]
                          w-full
                          items-center
                          justify-center
                          rounded-xl
                          px-4
                          py-3
                          text-center
                          text-[14px]
                          font-medium
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? `
                                border
                                border-white/[0.06]
                                bg-white/[0.07]
                                text-white
                              `
                              : `
                                text-slate-400
                                hover:bg-white/[0.04]
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {link.name}
                      </motion.a>
                    );
                  }
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}