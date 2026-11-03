"use client";

/**
 * Education — animated vertical timeline with glowing indicators,
 * alternating card layout on desktop, single column on mobile.
 */

import { GraduationCap, School, MapPin, CalendarDays, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { education } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const timelineIcons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  school: School,
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Education"
    >
      <div
        aria-hidden
        className="orb left-[30%] top-[5%] h-72 w-72 animate-float-slow bg-purple-600/12"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="04"
          kicker="EDUCATION"
          title={
            <>
              My <span className="text-gradient">Education</span>
            </>
          }
        />

        <ol className="relative mx-auto max-w-4xl">
          {/* glowing timeline spine */}
          <span
            aria-hidden
            className="absolute inset-y-2 left-[17px] w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/70 via-white/10 to-cyan-500/70 md:left-1/2"
          />

          {education.map((item, i) => {
            const Icon = timelineIcons[item.icon] ?? GraduationCap;
            const left = i % 2 === 0;
            const isPlaceholder =
              item.org.startsWith("[") || (item.period ?? "").startsWith("[");

            return (
              <li key={item.title} className="relative pb-12 last:pb-0 md:pb-16">
                {/* glowing node */}
                <span className="absolute left-[17px] top-8 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="relative flex h-5 w-5">
                    {item.current && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-40" />
                    )}
                    <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-[#080808] bg-gradient-to-br from-purple-400 to-cyan-400 shadow-[0_0_18px_rgba(168,85,247,0.85)]" />
                  </span>
                </span>

                <Reveal
                  className={cn(
                    "pl-12 md:pl-0",
                    left
                      ? "md:pr-[calc(50%+2.75rem)]"
                      : "md:pl-[calc(50%+2.75rem)]"
                  )}
                >
                  <article
                    className={cn(
                      "card-glow hover-lift rounded-2xl glass p-6 sm:p-7",
                      item.current && "animated-border"
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                        <Icon className="h-5 w-5" />
                      </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.period ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] tracking-wider",
                            item.current
                              ? "border border-cyan-400/35 bg-cyan-500/10 text-cyan-300"
                              : "border border-white/10 bg-white/[0.04] text-zinc-400"
                          )}
                        >
                          <CalendarDays className="h-3 w-3" />
                          {item.period}
                        </span>
                      ) : null}
                      {item.score ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-amber-300">
                          <TrendingUp className="h-3 w-3" />
                          {item.score}
                        </span>
                      ) : null}
                    </div>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold text-white sm:text-2xl">
                      {item.title}
                    </h3>

                    {item.field ? (
                      <p className="mt-1.5 text-sm font-medium text-purple-300">
                        {item.field}
                      </p>
                    ) : null}

                    <p
                      className={cn(
                        "mt-3 inline-flex items-center gap-2 text-sm text-zinc-400",
                        isPlaceholder && "placeholder-edit"
                      )}
                      title={
                        isPlaceholder
                          ? "Editable — update in src/data/portfolio.ts"
                          : undefined
                      }
                    >
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      {item.org}
                    </p>

                    {item.current ? (
                      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-300">
                        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-purple-400" />
                        In Progress
                      </span>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
