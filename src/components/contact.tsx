"use client";

/**
 * Contact — validated contact form posting to /api/contact (messages are
 * persisted to the database, and optionally emailed when RESEND_API_KEY is
 * configured). Success/error feedback is real — no fake submissions.
 */

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import Magnetic from "@/components/magnetic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2)
    errors.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (form.subject.trim().length < 3)
    errors.subject = "Please add a subject (at least 3 characters).";
  if (form.message.trim().length < 10)
    errors.message = "Your message should be at least 10 characters.";
  return errors;
}

const inputClasses = (hasError?: string) =>
  cn(
    "rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors",
    hasError
      ? "border-rose-500/60 focus-visible:ring-rose-500/40"
      : "border-white/10 focus-visible:border-purple-400/50 focus-visible:ring-purple-500/30"
  );

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("sending");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        fields?: Partial<Record<keyof FormState, string>>;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setServerMessage(
          data.message ?? "Message received — I'll get back to you soon."
        );
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(data.message ?? "Unable to send your message right now.");
        if (data.fields) setErrors(data.fields);
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error — please check your connection and try again."
      );
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      toast({
        title: "Email copied",
        description: siteConfig.email,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually.",
      });
    }
  };

  const channels = [
    {
      label: "EMAIL",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
      action: (
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      ),
    },
    {
      label: "GITHUB",
      value: siteConfig.github.replace("https://", ""),
      href: siteConfig.github,
      Icon: Github,
      external: true,
    },
    {
      label: "LINKEDIN",
      value: siteConfig.linkedin.replace("https://www.", ""),
      href: siteConfig.linkedin,
      Icon: Linkedin,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Contact"
    >
      <div
        aria-hidden
        className="orb left-[20%] bottom-[0%] h-80 w-80 animate-float-slow bg-purple-600/15"
      />
      <div
        aria-hidden
        className="orb right-[5%] top-[10%] h-64 w-64 animate-float-slow bg-cyan-500/10"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="07"
          kicker="CONTACT"
          title={
            <>
              Let&apos;s <span className="text-gradient">Connect</span>
            </>
          }
          description="Have an idea or opportunity? Let's build something amazing together."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* channels */}
          <div className="flex flex-col gap-4">
            {channels.map(({ label, value, href, Icon, external, action }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="card-glow flex items-center gap-4 rounded-2xl glass p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-cyan-500/10 text-purple-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
                      {label}
                    </p>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-0.5 block truncate text-sm font-medium text-zinc-200 transition-colors hover:text-purple-300"
                    >
                      {value}
                    </a>
                  </div>
                  {action}
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm leading-relaxed text-zinc-400">
                  <span className="font-semibold text-zinc-200">
                    Prefer email?
                  </span>{" "}
                  Reach me directly at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-gradient-cyan font-medium"
                  >
                    {siteConfig.email}
                  </a>{" "}
                  — messages sent through this form land in the same place.
                </p>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <div className="animated-border always rounded-3xl glass-strong p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-zinc-300">
                      Full Name
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClasses(errors.name)}
                    />
                    {errors.name && (
                      <FieldError id="contact-name-error" message={errors.name} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-zinc-300">
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={update("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClasses(errors.email)}
                    />
                    {errors.email && (
                      <FieldError id="contact-email-error" message={errors.email} />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-zinc-300">
                    Subject
                  </Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="Internship opportunity / Project idea"
                    value={form.subject}
                    onChange={update("subject")}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={inputClasses(errors.subject)}
                  />
                  {errors.subject && (
                    <FieldError id="contact-subject-error" message={errors.subject} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-zinc-300">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your idea or opportunity…"
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={cn(inputClasses(errors.message), "resize-none")}
                  />
                  {errors.message && (
                    <FieldError id="contact-message-error" message={errors.message} />
                  )}
                </div>

                {/* real status feedback */}
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {serverMessage}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {serverMessage}
                  </motion.p>
                )}

                <Magnetic strength={0.15} className="block">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={status === "sending" ? undefined : { scale: 1.015 }}
                    whileTap={status === "sending" ? undefined : { scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-[length:200%_auto] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_36px_-10px_rgba(168,85,247,0.7)] transition-[background-position,box-shadow,opacity] duration-500 hover:bg-right hover:shadow-[0_16px_44px_-10px_rgba(168,85,247,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </Magnetic>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <motion.p
      id={id}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="text-xs text-rose-400"
    >
      {message}
    </motion.p>
  );
}
