"use client";

/**
 * Projects — large premium 3D-tilt cards with animated conic-gradient
 * borders, AI-generated preview imagery, tech tags and live demo links.
 * External links open in a new tab. GitHub button renders only when a
 * real repository URL is configured.
 */

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import Magnetic from "@/components/magnetic";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Featured projects"
    >
      <div
        aria-hidden
        className="orb right-[-10%] top-[10%] h-80 w-80 animate-float-slow bg-purple-600/15"
      />
      <div
        aria-hidden
        className="orb bottom-[5%] left-[-8%] h-72 w-72 animate-float-slow bg-cyan-500/10"
        style={{ animationDelay: "-5s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="03"
          kicker="PORTFOLIO"
          title={
            <>
              Featured <span className="text-gradient">Projects</span>
            </>
          }
          description="Selected work — real products, live on the web."
        />

        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.05}>
              <TiltCard max={4} className="rounded-3xl">
                <article className="animated-border card-glow group relative overflow-hidden rounded-3xl glass">
                  <div className="grid lg:grid-cols-[1.15fr_1fr]">
                    {/* preview image */}
                    <div className="relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[400px]">
                      <Image
                        src={project.image}
                        alt={`${project.title} — project preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                        priority={i === 0}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b0b0e]/85"
                      />
                      <span
                        aria-hidden
                        className="absolute left-5 top-4 select-none font-display text-6xl font-extrabold leading-none text-white/[0.08] md:text-7xl"
                      >
                        {project.id}
                      </span>
                    </div>

                    {/* content */}
                    <div
                      className="relative flex flex-col justify-center gap-4 p-6 sm:p-9 lg:p-10"
                      style={{ transform: "translateZ(34px)" }}
                    >
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-purple-300">
                        Project {project.id}
                      </span>

                      <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="text-gradient-cyan text-sm font-semibold sm:text-base">
                        {project.tagline}
                      </p>

                      <p className="text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 transition-colors duration-300 group-hover:border-cyan-400/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3.5">
                        <Magnetic strength={0.25}>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(168,85,247,0.65)] transition-shadow duration-300 hover:shadow-[0_10px_36px_-8px_rgba(168,85,247,0.9)]"
                          >
                            Live Demo
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Magnetic>

                        {project.githubUrl ? (
                          <Magnetic strength={0.25}>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-200"
                            >
                              <Github className="h-4 w-4" />
                              GitHub
                            </a>
                          </Magnetic>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
