
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education & Certificates", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* Track scroll position and active section */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

        let currentSection = "home";

        for (const link of navLinks) {
          const id = link.href.slice(1);
          const element = document.getElementById(id);

          if (element && element.getBoundingClientRect().top <= 180) {
            currentSection = id;
          }
        }

        setActiveSection(currentSection);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Close mobile menu on desktop resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Lock body scrolling while the mobile menu is open */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* Navigate to a section */
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(href.slice(1));

    setIsOpen(false);

    if (!target) return;

    const navbarOffset = 75;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);
    setActiveSection(href.slice(1));
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 w-full">
        <div
          className={`w-full ${
            scrolled
              ? "border-b border-white/[0.06] bg-[#070a10]/95 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:h-[76px] lg:px-8">
            {/* LOGO */}
            <a
              href="#home"
              onClick={(event) => handleNavClick(event, "#home")}
              className="shrink-0 font-display text-lg font-bold tracking-tight text-white transition-colors hover:text-slate-200 sm:text-xl"
              aria-label="H2S home"
            >
              H2S<span className="text-primary">.</span>
            </a>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="hidden flex-1 items-center justify-center md:flex"
            >
              <div className="flex items-center justify-center gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-1 py-1 lg:gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) =>
                        handleNavClick(event, link.href)
                      }
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-lg px-2.5 py-2 text-center text-[10px] font-medium transition-colors duration-150 lg:px-3 lg:text-[11px] xl:px-3.5 xl:text-xs ${
                        isActive
                          ? "border border-white/[0.06] bg-white/[0.07] text-white"
                          : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* DESKTOP SPACER */}
            <div className="hidden w-[42px] shrink-0 md:block lg:w-[50px]" />

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((previous) => !previous)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isOpen && (
        <>
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[55] bg-black/70 md:hidden"
          />

          {/* MENU PANEL */}
          <div
            id="mobile-navigation"
            className="fixed left-3 right-3 top-[76px] z-[60] max-h-[calc(100vh-92px)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#080b12] p-3 shadow-2xl md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) =>
                      handleNavClick(event, link.href)
                    }
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-12 w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-white/[0.06] bg-white/[0.07] text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
