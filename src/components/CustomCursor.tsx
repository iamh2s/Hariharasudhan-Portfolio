import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cfg = { damping: 28, stiffness: 320, mass: 0.4 };
  const trailCfg = { damping: 18, stiffness: 150, mass: 0.6 };

  const dotX = useSpring(mouseX, cfg);
  const dotY = useSpring(mouseY, cfg);
  const trailX = useSpring(mouseX, trailCfg);
  const trailY = useSpring(mouseY, trailCfg);

  /* Glow hue slowly cycles */
  const glowHue = useMotionValue(0);
  const glowColor = useTransform(glowHue, (h) => `hsla(${h}, 70%, 65%, 0.15)`);

  useEffect(() => {
    let frame: number;
    let hue = 240;
    const tick = () => {
      hue = (hue + 0.3) % 360;
      glowHue.set(hue);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [glowHue]);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    window.addEventListener('mousemove', move);

    const attach = () => {
      document.querySelectorAll('a, button, input, textarea, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      obs.disconnect();
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 60,
          height: 60,
          backgroundColor: glowColor,
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
          borderColor: hovering ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)',
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
