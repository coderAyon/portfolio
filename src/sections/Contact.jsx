import { useMemo } from "react";
import { ArrowUpRight, Facebook, Github, Instagram, Linkedin, Mail, Star } from "lucide-react";

import Reveal from "../components/Reveal";

export default function Contact() {
  const socials = useMemo(
    () => [
      { label: "GitHub", icon: Github, href: "https://github.com/coderAyon" },
      { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ayon-roy-7ab549389/" },
      { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/ayon_zehen" },
      { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587760349999" },
      { label: "Fiverr", icon: Star, href: "https://www.fiverr.com/sam_plus?public_mode=true" },
      { label: "Email", icon: Mail, href: "mailto:ayonr169@gmail.com" },
    ],
    [],
  );

  return (
    <section id="contact" className="section-wrap contact-section pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="contact-shell relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-aura/30 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="motion-item mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">Contact</p>
                <h2 className="motion-item max-w-3xl font-display text-4xl font-bold leading-tight text-frost sm:text-6xl" style={{ "--item-delay": "100ms" }}>
                  Let&apos;s turn your next visual idea into something magnetic.
                </h2>
                <p className="motion-item mt-6 max-w-2xl text-lg leading-8 text-white/64" style={{ "--item-delay": "200ms" }}>
                  Available for graphics design work, creative direction experiments, and future web-based portfolio showcases.
                </p>
              </div>
              <div className="contact-actions grid gap-3">
                <a href="mailto:ayonr169@gmail.com" className="motion-item group inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:bg-white" style={{ "--item-delay": "260ms" }}>
                  <Mail className="h-4 w-4" />
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <div id="social links" className="grid grid-cols-2 gap-3">
                  {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="motion-item social-link"
                        style={{ "--item-delay": `${340 + index * 55}ms` }}
                        aria-label={social.label}
                        title={social.label}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <footer className="flex flex-col gap-4 py-10 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Ayon Roy. Designed for a cinematic first impression.</p>
          <a href="#home" className="font-semibold text-white/62 transition hover:text-white">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
