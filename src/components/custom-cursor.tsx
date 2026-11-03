"use client";

/**
 * CustomCursor — desktop-only layered cursor:
 * a fast gradient dot + a lagging glass ring that expands over
 * interactive elements. Restores the native cursor over text fields.
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Defer by one frame so we don't call setState synchronously in the effect
    const raf = requestAnimationFrame(() => setEnabled(true));
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const overText = !!target.closest("input, textarea, select");
      const overInteractive = !!target.closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      );
      setHovering(overInteractive && !overText);
      document.body.classList.toggle("cursor-hidden", overText);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor", "cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* fast gradient dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x, y }}
      >
        <div
          className={`h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-300 shadow-[0_0_14px_rgba(168,85,247,0.9)] transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          } ${hovering ? "scale-0" : "scale-100"}`}
        />
      </motion.div>

      {/* lagging glass ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[1px]"
          animate={{
            width: hovering ? 58 : 34,
            height: hovering ? 58 : 34,
            opacity: visible ? (hovering ? 1 : 0.65) : 0,
            scale: pressed ? 0.82 : 1,
            borderColor: hovering
              ? "rgba(34,211,238,0.75)"
              : "rgba(168,85,247,0.55)",
            backgroundColor: hovering
              ? "rgba(168,85,247,0.10)"
              : "rgba(168,85,247,0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
