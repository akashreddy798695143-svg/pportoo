"use client";

/**
 * About — professional introduction with a 3D-animated portrait card
 * (mouse-reactive tilt, floating badges, orbiting ring), a terminal-style
 * developer card and a 2×2 grid of glassmorphism highlight cards.
 */

import Image from "next/image";
import {
  BadgeCheck,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { about, siteConfig } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";

const highlightIcons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  compass: Compass,
  cpu: Cpu,
  target: Target,
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="About me"
    >
      <div
        aria-hidden
        className="orb right-[-10%] top-[15%] h-72 w-72 animate-float-slow bg-purple-600/15"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="01"
          kicker="ABOUT"
          title={
            <>
              About <span className="text-gradient">Me</span>
            </>
          }
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* intro + highlight cards */}
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-zinc-200 md:text-xl md:leading-relaxed">
                {about.intro}
              </p>
            </Reveal>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {about.highlights.map((item, i) => {
                const Icon = highlightIcons[item.icon] ?? Compass;
                return (
                  <Reveal
                    key={item.title}
                    delay={0.08 + i * 0.08}
                    className="h-full"
                  >
                    <article className="card-glow hover-lift group flex h-full flex-col gap-4 rounded-2xl glass p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300 transition-colors duration-300 group-hover:border-cyan-400/40 group-hover:text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {item.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 3D animated portrait + terminal */}
          <div className="flex flex-col gap-9">
            <Reveal>
              <TiltCard max={9} className="rounded-3xl">
                <div className="animated-border always relative rounded-3xl glass p-3">
                  {/* soft glow behind the frame */}
                  <div
                    aria-hidden
                    className="orb -inset-8 -z-10 bg-purple-600/25"
                  />
                  {/* orbiting dashed ring — 3D accent */}
                  <div
                    aria-hidden
                    className="absolute -right-6 -top-6 h-24 w-24 animate-spin-slow rounded-full border border-dashed border-purple-400/40"
                  />
                  <div
                    aria-hidden
                    className="absolute -bottom-5 -left-5 h-16 w-16 animate-spin-slow rounded-full border border-dashed border-cyan-400/35"
                    style={{ animationDirection: "reverse" }}
                  />

                  <div className="relative aspect-[9/11] overflow-hidden rounded-2xl">
                    <Image
                      src={about.profileImage}
                      alt={`Portrait of ${siteConfig.name}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 ease-out"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-[#080808]/10"
                    />
                    {/* caption */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-display text-lg font-bold text-white">
                        {siteConfig.name}
                      </p>
                      <p className="mt-0.5 text-xs font-medium tracking-wide text-purple-300">
                        B.Tech ECE · Class of 2027 · Full Stack Developer
                      </p>
                    </div>
                  </div>

                  {/* floating badges */}
                  <span className="absolute -left-4 top-8 inline-flex animate-float items-center gap-1.5 rounded-xl glass-strong px-3.5 py-2 text-xs font-semibold text-cyan-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
                    <Code2 className="h-3.5 w-3.5" />
                    Full Stack Developer
                  </span>
                  <span
                    className="absolute -right-4 top-1/3 inline-flex animate-float items-center gap-1.5 rounded-xl glass-strong px-3.5 py-2 text-xs font-semibold text-purple-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
                    style={{ animationDelay: "-2.6s" }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Enthusiast
                  </span>
                  <span
                    className="absolute -bottom-4 left-10 inline-flex animate-float items-center gap-2 rounded-xl glass-strong px-3.5 py-2 text-xs font-semibold text-emerald-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
                    style={{ animationDelay: "-4.4s" }}
                  >
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Open to Work
                  </span>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl glass shadow-[0_24px_70px_-30px_rgba(168,85,247,0.35)]">
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-zinc-500">
                    <Terminal className="h-3.5 w-3.5" />
                    developer — zsh
                  </span>
                </div>
                <div className="space-y-2.5 px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
                  {about.terminal.map((row) => (
                    <div key={row.cmd}>
                      <p>
                        <span className="text-cyan-300">➜</span>{" "}
                        <span className="text-purple-300">~</span>{" "}
                        <span className="text-zinc-200">{row.cmd}</span>
                      </p>
                      <p className="pl-4 text-zinc-500">{row.out}</p>
                    </div>
                  ))}
                  <p>
                    <span className="text-cyan-300">➜</span>{" "}
                    <span className="text-purple-300">~</span>{" "}
                    <span className="ml-1 inline-block h-4 w-2 animate-caret bg-purple-300 align-middle" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
