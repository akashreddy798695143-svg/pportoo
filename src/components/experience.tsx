"use client";

/**
 * Experience — premium internship cards with 3D tilt, animated borders
 * and skill chips. Durations are editable placeholders until provided.
 */

import { Briefcase, Sparkles } from "lucide-react";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Experience"
    >
      <div
        aria-hidden
        className="orb right-[-8%] top-[35%] h-72 w-72 animate-float-slow bg-cyan-500/10"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="05"
          kicker="EXPERIENCE"
          title={
            <>
              Hands-on <span className="text-gradient">Experience</span>
            </>
          }
          description="Internships that shaped my practical engineering skills."
        />

        <div className="grid gap-7 md:grid-cols-2">
          {experience.map((job, i) => {
            const isPlaceholder = job.period.startsWith("[");
            return (
              <Reveal key={job.org} delay={i * 0.1} className="h-full">
                <TiltCard max={5} className="h-full rounded-3xl">
                  <article className="animated-border card-glow flex h-full flex-col rounded-3xl glass p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] tracking-wider ${
                          isPlaceholder
                            ? "placeholder-edit border border-dashed border-white/15 bg-transparent text-zinc-500"
                            : "border border-cyan-400/35 bg-cyan-500/10 text-cyan-300"
                        }`}
                        title={
                          isPlaceholder
                            ? "Editable — update in src/data/portfolio.ts"
                            : undefined
                        }
                      >
                        {job.period}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold text-white sm:text-2xl">
                      {job.role}
                    </h3>

                    <p className="mt-1.5 text-sm font-semibold text-cyan-300">
                      @ {job.org}
                    </p>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                      {job.description}
                    </p>

                    <div className="mt-6 border-t border-white/[0.07] pt-5">
                      <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                        <Sparkles className="h-3 w-3 text-purple-300" />
                        Skills learned
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-purple-400/20 bg-purple-500/[0.07] px-3 py-1 text-xs text-purple-200/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
