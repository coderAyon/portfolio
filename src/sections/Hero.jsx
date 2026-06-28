import { ArrowUpRight, UserRound } from "lucide-react";

import HeroCoverflow from "../components/HeroCoverflow";
import { useMotionPreferences } from "../context/MotionPreferences";
import { routeHref } from "../lib/routing";

export default function Hero({ onNavigate }) {
  const { isMobile } = useMotionPreferences();

  return (
    <section id="home" className="relative min-h-[100svh] overflow-clip bg-night">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night to-transparent" />
      {!isMobile ? (
        <div className="absolute inset-0">
          <HeroCoverflow className="hero-coverflow-desktop" />
        </div>
      ) : null}
      <div className="hero-readability absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.22]" />
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pb-28 pt-32 sm:px-6 lg:px-8">
        <div className="hero-copy-block hero-copy-enter max-w-4xl">
          <div className="motion-item mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/72 shadow-glass">
            <span className="h-2 w-2 rounded-full bg-[#1dbf73] shadow-[0_0_16px_rgba(29,191,115,.95)]" />
            Welcome to premium productivity
          </div>
          <h1 className="motion-item max-w-5xl text-balance font-display text-6xl font-bold leading-[0.92] text-frost sm:text-7xl md:text-8xl lg:text-[8.8rem]" style={{ "--item-delay": "120ms" }}>
            Ayon Roy
          </h1>
          <p className="motion-item mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl" style={{ "--item-delay": "240ms" }}>
            I shape bold digital visuals with a futuristic design language, blending graphic design instinct with a growing computer science foundation.
          </p>
          <div className="motion-item mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--item-delay": "360ms" }}>
            <a
              href={routeHref("projects")}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition duration-300 hover:-translate-y-1 hover:bg-white"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("projects");
              }}
            >
              Explore Work
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href={routeHref("home", "contact")}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.055] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-frost transition duration-300 hover:-translate-y-1 hover:border-violet-aura/50 hover:bg-white/[0.085]"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("home", "contact");
              }}
            >
              Contact
            </a>
            <a
              href={routeHref("profile")}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-violet-aura/35 bg-violet-aura/12 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-frost shadow-aura transition duration-300 hover:-translate-y-1 hover:border-frost/50 hover:bg-violet-aura/20"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("profile");
              }}
            >
              Visit Profile
              <UserRound className="h-4 w-4" />
            </a>
          </div>
          {isMobile ? <HeroCoverflow className="hero-coverflow-mobile" /> : null}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-52 bg-gradient-to-t from-night via-night/80 to-transparent" />
      <div className="absolute bottom-9 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/45 md:flex">
        <span className="h-px w-12 bg-white/20" />
        Scroll
        <span className="h-px w-12 bg-white/20" />
      </div>
    </section>
  );
}
