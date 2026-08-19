import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <footer ref={ref} className="relative border-t border-white/[0.04]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="font-display font-bold text-lg text-white tracking-tight"
          >
            H2S<span className="text-primary">.</span>
          </motion.a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {links.map((l, i) => (
              <motion.a
                key={l.name}
                href={l.href}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -2, color: '#e2e8f0' }}
                className="text-[13px] text-slate-500 transition-colors font-medium"
              >
                {l.name}
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.a
            href="#home"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/[0.12] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-white/[0.03] text-center"
        >
          <p className="text-[12px] text-slate-600 flex items-center justify-center gap-1.5">
            &copy; {new Date().getFullYear()} P.S. Hariharasudhan. Crafted with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <Heart size={11} className="text-red-500/60 fill-red-500/60" />
            </motion.span>
            and code.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
