import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const INTERACTIVE = 'a, button, input, textarea, [data-hover]';

const cfg = { damping: 28, stiffness: 320, mass: 0.4 };
const trailCfg = { damping: 18, stiffness: 150, mass: 0.6 };

/* Glow hue cycles via CSS (no JS per frame) */
const GLOW_CSS = `
@keyframes cursorGlowHue {
  from { filter: blur(24px) hue-rotate(0deg); }
  to   { filter: blur(24px) hue-rotate(360deg); }
}
.cursor-glow { animation: cursorGlowHue 20s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .cursor-glow { animation: none; }
}
`;

const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Wrapper: on touch devices nothing below is ever mounted */
export default function CustomCursor() {
  const [enabled] = useState(hasFinePointer);
  return enabled ? <Cursor /> : null;
}

function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, cfg);
  const dotY = useSpring(mouseY, cfg);
  const trailX = useSpring(mouseX, trailCfg);
  const trailY = useSpring(mouseY, trailCfg);

  useEffect(() => {
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!shown) {
        shown = true;
        setVisible(true);
      }
    };

    // Event delegation: one listener instead of one per element
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      <style>{GLOW_CSS}</style>

      {/* Glow trail */}
      <motion.div
        className="cursor-glow fixed top-0 left-0 rounded-full pointer-events-none z-[9997] blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 60,
          height: 60,
          backgroundColor: 'hsla(240, 70%, 65%, 0.15)',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border mix-blend-difference"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderWidth: 1,
          borderColor: hovering
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(255,255,255,0.12)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 350 }}
      />
    </>
  );
}