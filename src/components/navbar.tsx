"use client";

/**
 * Navbar — transparent → glassmorphism sticky navigation with an animated
 * active-section pill, smooth scrolling, and an animated mobile menu.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("Home");
  const [open, setOpen] = useState(false);

  // Glass background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator via IntersectionObserver (center-band detection)
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "home" ? "Home" : entry.target.id);
          }
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Capitalize section ids like "experience" → "Experience"
  const isActive = (label: string) =>
    active.toLowerCase() === label.toLowerCase();

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0a0c]/75 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} — back to top`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-500 font-display text-sm font-bold tracking-wide text-white shadow-[0_0_22px_rgba(168,85,247,0.45)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.55)]">
            {siteConfig.initials}
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-white sm:block">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive(link.label) ? "true" : undefined}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                  isActive(link.label)
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {isActive(link.label) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-purple-400/30 bg-purple-500/10 shadow-[0_0_18px_rgba(168,85,247,0.25)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-full border border-purple-400/40 bg-purple-500/10 px-5 py-2 text-[13.5px] font-semibold text-purple-200 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] lg:inline-flex"
        >
          Let&apos;s Talk
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 backdrop-blur-md transition-colors hover:border-purple-400/40 hover:text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#0b0b0d]/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors",
                        isActive(link.label)
                          ? "bg-purple-500/10 text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                      <span className="font-mono text-[10px] tracking-widest text-purple-300/50">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
