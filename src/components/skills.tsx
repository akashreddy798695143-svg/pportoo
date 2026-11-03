"use client";

/**
 * Skills — tech stack grouped by category. Interactive 3D-tilt tiles with
 * gradient borders. Honest qualifiers only (e.g. "Basics") — no fake
 * percentage bars.
 */

import type { ComponentType } from "react";
import { Binary, Database, Network, Server, Shapes } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiCss, SiHtml5, SiJavascript, SiPython } from "react-icons/si";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

const skillIcons: Record<string, IconComponent> = {
  python: SiPython,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  sql: Database as IconComponent,
  dbms: Server as IconComponent,
  dsa: Binary as IconComponent,
  oop: Shapes as IconComponent,
  network: Network as IconComponent,
};

/** Brand colors applied on hover for extra polish */
const iconHoverColors: Record<string, string> = {
  python: "group-hover/tile:text-[#4B8BBE]",
  javascript: "group-hover/tile:text-[#F7DF1E]",
  html: "group-hover/tile:text-[#E34F26]",
  css: "group-hover/tile:text-[#8A63D2]",
};

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32" aria-label="Technical skills">
      <div
        aria-hidden
        className="orb left-[-12%] top-[30%] h-80 w-80 animate-float-slow bg-cyan-500/12"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="02"
          kicker="SKILLS"
          title={
            <>
              My <span className="text-gradient">Tech Stack</span>
            </>
          }
          description="Technologies and computer science fundamentals I work with."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08} className="h-full">
              <div className="card-glow h-full rounded-3xl glass p-6 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        group.accent === "purple"
                          ? "bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                          : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                      )}
                    />
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-600">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.skills.map((skill) => {
                    const Icon = skillIcons[skill.icon];
                    return (
                      <TiltCard
                        key={skill.name}
                        max={11}
                        className="group/tile rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition-colors duration-300 hover:border-purple-400/40 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors duration-300 group-hover/tile:border-purple-400/30">
                            {Icon ? (
                              <Icon className="h-5 w-5 transition-colors duration-300 group-hover/tile:text-purple-300" />
                            ) : null}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-100">
                              {skill.name}
                            </p>
                            {skill.note ? (
                              <span className="mt-1 inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                                {skill.note}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
