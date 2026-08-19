import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="py-2 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent origin-center"
        style={{ scaleX, opacity }}
      />
    </div>
  );
}
