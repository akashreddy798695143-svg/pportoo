"use client";

/**
 * SectionHeading — consistent premium header for every section:
 * mono kicker (index + label), display title, optional description.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "relative mb-14 md:mb-20",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.35em] text-purple-300/80 sm:text-xs",
            centered && "justify-center"
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-400" />
          </span>
          {index} · {kicker}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.22}>
        <div
          aria-hidden
          className={cn(
            "mt-7 h-px w-28 bg-gradient-to-r from-transparent via-purple-400/80 to-transparent",
            centered && "mx-auto"
          )}
        />
      </Reveal>
    </div>
  );
}
