"use client";

/**
 * Certifications — glass cards for internship certificates. When a
 * certificate file is configured (public/certificates + portfolio.ts),
 * a "View Certificate" preview button appears automatically.
 */

import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import Magnetic from "@/components/magnetic";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Certifications and achievements"
    >
      <div
        aria-hidden
        className="orb left-[-10%] top-[20%] h-72 w-72 animate-float-slow bg-purple-600/12"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="06"
          kicker="CREDENTIALS"
          title={
            <>
              Certifications &amp; <span className="text-gradient">Achievements</span>
            </>
          }
          description="Recognitions from internships and technical programs."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08} className="h-full">
              <article className="card-glow hover-lift shimmer flex h-full flex-col rounded-2xl glass p-6 sm:p-7">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10">
                  <Award className="h-6 w-6 text-purple-300" />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl border border-purple-400/20 animate-pulse-glow"
                  />
                </span>

                <h3 className="mt-6 font-display text-lg font-bold text-white">
                  {cert.title}
                </h3>

                <p
                  className={`mt-1.5 text-sm text-zinc-400 ${
                    cert.issuer.startsWith("[") ? "placeholder-edit" : ""
                  }`}
                  title={
                    cert.issuer.startsWith("[")
                      ? "Editable — update in src/data/portfolio.ts"
                      : undefined
                  }
                >
                  {cert.issuer}
                </p>

                <div className="mt-auto pt-6">
                  {cert.file ? (
                    <Magnetic strength={0.2}>
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
                      >
                        View Certificate
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Magnetic>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/70" />
                      Available upon request
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
