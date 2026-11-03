"use client";

/**
 * Footer — premium sticky-bottom footer (mt-auto pushes it down naturally
 * on long pages) with quick navigation, socials and a gradient hairline.
 */

import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { navLinks, siteConfig } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: siteConfig.github, Icon: Github },
    { label: "LinkedIn", href: siteConfig.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
  ];

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-[#060607]">
      {/* gradient hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-full shadow-[0_0_22px_rgba(168,85,247,0.4)] ring-2 ring-purple-400/50">
                <Image
                  src="/images/profile.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover object-top"
                />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(label === "Email"
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:text-purple-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* quick navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
              Navigate
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {[...navLinks, { label: "Certifications", href: "#certifications" }].map(
                (link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      <span className="h-px w-3 bg-purple-400/40 transition-all duration-300 group-hover:w-5 group-hover:bg-purple-400" />
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* contact summary */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-zinc-400 transition-colors hover:text-cyan-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition-colors hover:text-cyan-300"
                >
                  {siteConfig.github.replace("https://", "")}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition-colors hover:text-cyan-300"
                >
                  {siteConfig.linkedin.replace("https://www.", "")}
                </a>
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center rounded-full border border-purple-400/40 bg-purple-500/10 px-5 py-2 text-xs font-semibold text-purple-200 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-200"
            >
              Start a conversation
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-6 pb-2 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700">
            Built with Next.js · Three.js · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
