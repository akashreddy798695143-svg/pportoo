"use client";

/**
 * Resume — a clean, structured CV view. Renders a downloadable resume card
 * and a visual resume summary. When a PDF is provided (public/resume.pdf),
 * the Download button opens the actual PDF.
 */

import { Download, Briefcase, Award, GraduationCap, Code2, Mail, Github, Linkedin } from "lucide-react";
import { siteConfig, education, experience, certifications, skillGroups } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const LEVEL_COLORS: Record<string, string> = {
  Expert: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
  Advanced: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
  Intermediate: "bg-amber-500/10 text-amber-300 border-amber-400/30",
  Beginner: "bg-zinc-500/10 text-zinc-300 border-zinc-400/30",
};

function LevelBadge({ level }: { level: string }) {
  return (
    <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner)}>
      {level}
    </span>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="relative overflow-hidden py-24 md:py-32" aria-label="Resume and CV">
      <div
        aria-hidden
        className="orb left-[30%] top-[40%] h-80 w-80 animate-float-slow bg-purple-600/12"
      />
      <div
        aria-hidden
        className="orb right-[-8%] top-[60%] h-72 w-72 animate-float-slow bg-cyan-500/10"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="07"
          kicker="RESUME"
          title={<>My <span className="text-gradient">Resume</span></>}
          description="A structured summary of my professional background, skills, and experience."
        />

        {/* Download Card */}
        <Reveal className="mb-14 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10">
                <Download className="h-6 w-6 text-purple-300" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-white">Resume & CV</p>
                <p className="text-sm text-zinc-400">
                  {siteConfig.resumeUrl
                    ? <>Download my latest resume (PDF) — <span className="font-mono text-xs text-purple-300">{siteConfig.resumeUrl}</span></>
                    : <>Download my resume PDF (coming soon)</>}
                </p>
              </div>
            </div>
            {siteConfig.resumeUrl ? (
              <a
                href={siteConfig.resumeUrl}
                download="Akash_Reddy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-200 transition-all duration-300 opacity-50 cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            ✅ Resume PDF is live — click “Download PDF” to save your CV (served from <span className="font-mono text-xs text-cyan-300">{siteConfig.resumeUrl}</span>).
          </p>
        </Reveal>

        {/* Two-column grid for resume content */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left column */}
          <div className="space-y-8">
            {/* Contact */}
            <Reveal>
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">Contact</h3>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-zinc-300 transition-colors hover:text-cyan-300">
                    <Mail className="h-3.5 w-3.5 text-cyan-400/60" />
                    <span className="truncate">{siteConfig.email}</span>
                  </a>
                  <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-300 transition-colors hover:text-cyan-300">
                    <Github className="h-3.5 w-3.5 text-cyan-400/60" />
                    <span className="truncate">{siteConfig.github.replace("https://", "")}</span>
                  </a>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-300 transition-colors hover:text-cyan-300">
                    <Linkedin className="h-3.5 w-3.5 text-cyan-400/60" />
                    <span className="truncate">{siteConfig.linkedin.replace("https://www.", "")}</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal>
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">Core Skills</h3>
                </div>
                <div className="mt-4 grid gap-2">
                  {skillGroups.map((group) => (
                    <div key={group.title} className="rounded-xl bg-white/[0.03] p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{group.title}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span key={skill.name} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300">
                            {skill.name}
                            {skill.level ? <LevelBadge level={skill.level} /> : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Education */}
            <Reveal>
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">Education</h3>
                </div>
                <div className="mt-4 space-y-4">
                  {education.map((item, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.03] p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        {item.period && (
                          <span className="font-mono text-[10px] text-zinc-500">{item.period}</span>
                        )}
                      </div>
                      {item.field && <p className="mt-0.5 text-xs text-zinc-400">{item.field}</p>}
                      {item.score && <p className="mt-0.5 text-xs font-mono text-zinc-400">{item.score}</p>}
                      <p className="mt-1 text-xs text-zinc-500">{item.org}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Experience */}
            <Reveal>
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">Experience</h3>
                </div>
                <div className="mt-4 space-y-4">
                  {experience.map((job, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">{job.role}</h4>
                        <span className="font-mono text-[10px] text-zinc-500">{job.org}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{job.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.skills.map((skill) => (
                          <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Certifications */}
            <Reveal>
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <Award className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">Certifications</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3">
                      <Award className="h-4 w-4 text-cyan-400/60" />
                      <div>
                        <p className="text-sm font-medium text-white">{cert.title}</p>
                        <p className="text-xs text-zinc-400">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}