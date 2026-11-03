"use client";

/**
 * ScrollProgress — thin gradient bar pinned to the top of the viewport,
 * driven by page scroll. Pure flourish, zero interaction cost.
 */

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
