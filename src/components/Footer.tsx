
import { ArrowUp, Heart } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top accent line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight text-white"
            aria-label="H2S - Back to home"
          >
            H2S<span className="text-primary">.</span>
          </a>

          {/* Navigation links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-5 gap-y-3"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-slate-500 transition-colors duration-150 hover:text-slate-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-slate-400 transition-colors duration-150 hover:border-white/[0.12] hover:text-white"
          >
            <ArrowUp size={15} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/[0.05] pt-6 text-center">
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} P.S. Hariharasudhan.
            </span>

            <span>Crafted with</span>

            <Heart
              size={12}
              aria-label="love"
              className="fill-red-500/60 text-red-500/60"
            />

            <span>and code.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
