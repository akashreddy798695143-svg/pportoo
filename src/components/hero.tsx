"use client";

/**
 * Hero — cinematic full-screen landing:
 * R3F 3D scene background, gradient display typography, magnetic CTAs,
 * social links, parallax fade on scroll and an animated scroll indicator.
 */

import { Suspense, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { about, siteConfig } from "@/data/portfolio";
import Magnetic from "@/components/magnetic";
import { useToast } from "@/hooks/use-toast";

/* Heavy WebGL scene — client-only + lazy loaded */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

/** Split the name into words that wrap at word boundaries only. */
function useLetterSteps() {
  return useMemo(() => {
    const words = siteConfig.name.split(" ");
    return words.map((word, i) => ({
      word,
      start: words
        .slice(0, i)
        .reduce((acc, prev) => acc + prev.length + 1, 0),
    }));
  }, []);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const letterSteps = useLetterSteps();

  /* Parallax fade as the hero scrolls away */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 100]);

  const handleResume = () => {
    toast({
      title: "Resume coming soon",
      description:
        "Drop resume.pdf into the /public folder and set resumeUrl in src/data/portfolio.ts to enable one-click download.",
    });
  };

  const socials = [
    { label: "GitHub", href: siteConfig.github, Icon: Github, external: true },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin,
      Icon: Linkedin,
      external: true,
    },
    { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail, external: false },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── 3D scene background ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        {/* vignette so text stays readable */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,transparent_0%,rgba(8,8,8,0.4)_70%,rgba(8,8,8,0.9)_100%)]"
        />
        {/* left readability gradient (desktop) */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.32)_42%,transparent_68%)] md:block"
        />
      </div>

      {/* ── decorative layers ───────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-grid bg-grid-fade opacity-60" />
      <div
        aria-hidden
        className="orb left-[-12%] top-[8%] z-[1] h-72 w-72 animate-float-slow bg-purple-600/25"
      />
      <div
        aria-hidden
        className="orb bottom-[6%] right-[-8%] z-[1] h-80 w-80 animate-float-slow bg-cyan-500/15"
        style={{ animationDelay: "-4s" }}
      />
      {/* bottom fade into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-b from-transparent to-[#080808]"
      />

      {/* ── content ─────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-36 lg:px-8"
      >
        <div className="max-w-3xl">
          {/* availability badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-zinc-300 sm:text-xs">
              <span className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-purple-400/60">
                <Image
                  src={about.profileImage}
                  alt=""
                  width={24}
                  height={24}
                  className="object-cover object-top"
                  priority
                />
              </span>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* heading */}
          <h1 className="mt-8">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.25}
              className="block font-mono text-xs uppercase tracking-[0.45em] text-purple-300/90 sm:text-sm"
            >
              Hello, I&apos;m
            </motion.span>

            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              aria-label={siteConfig.name}
              className="mt-4 block font-display text-5xl font-extrabold leading-[1.06] tracking-tight sm:text-7xl lg:text-8xl"
            >
              {letterSteps.map(({ word, start }, wi) => (
                <span
                  key={`${word}-${wi}`}
                  aria-hidden
                  className="inline-block whitespace-nowrap"
                >
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={`${char}-${ci}`}
                      initial={{ opacity: 0, y: 42, rotateX: -70 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.5 + (start + ci) * 0.04,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="text-gradient animate-gradient inline-block will-change-transform"
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wi < letterSteps.length - 1 ? (
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (start + word.length) * 0.04 }}
                      className="inline-block"
                    >
                      &nbsp;
                    </motion.span>
                  ) : null}
                </span>
              ))}
            </motion.span>
          </h1>

          {/* role */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
            className="mt-7 font-display text-lg font-semibold text-zinc-100 sm:text-xl md:text-2xl"
          >
            Full Stack Developer{" "}
            <span className="mx-1 text-purple-400">|</span> AI Enthusiast{" "}
            <span className="mx-1 text-cyan-400">|</span> Creative Problem
            Solver
          </motion.p>

          {/* description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.9}
            className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.05}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.045 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(168,85,247,0.7)] transition-[background-position,box-shadow] duration-500 hover:bg-right hover:shadow-[0_14px_44px_-10px_rgba(168,85,247,0.85)]"
              >
                <Sparkles className="h-4 w-4" />
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </Magnetic>

            <Magnetic>
              {siteConfig.resumeUrl ? (
                <motion.a
                  href={siteConfig.resumeUrl}
                  download
                  whileHover={{ scale: 1.045 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-200 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </motion.a>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleResume}
                  whileHover={{ scale: 1.045 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-200 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </motion.button>
              )}
            </Magnetic>

            <Magnetic>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.045 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 rounded-full px-3 py-3.5 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:text-purple-300"
              >
                Contact Me
                <ArrowRight className="h-4 w-4 -rotate-45" />
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.2}
            className="mt-11 flex items-center gap-3.5"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-purple-400/60" />
            {socials.map(({ label, href, Icon, external }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="grid h-11 w-11 place-items-center rounded-full glass text-zinc-300 transition-colors duration-300 hover:border-purple-400/50 hover:text-purple-200 hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]"
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
            <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/60" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── scroll indicator ────────────────────────────────── */}
      <motion.a
        href="#about"
        aria-label="Scroll down to the about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-zinc-500 transition-colors hover:text-purple-300"
      >
        <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL</span>
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-current p-1.5 opacity-70">
          <span className="h-1.5 w-1.5 animate-[scrollDot_1.9s_ease-in-out_infinite] rounded-full bg-purple-400" />
        </span>
      </motion.a>
    </section>
  );
}
