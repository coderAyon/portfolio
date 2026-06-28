import { ArrowUpRight } from "lucide-react";

import Reveal from "./Reveal";

export default function PageCTA({ onNavigate, label = "Start a Project" }) {
  return (
    <section className="px-5 pb-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="page-cta">
          <div className="motion-item">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-violet-aura">Next Step</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-frost sm:text-5xl">
              Build the next polished visual story for your portfolio.
            </h2>
          </div>
          <button
            className="motion-item inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:-translate-y-1 hover:bg-white"
            style={{ "--item-delay": "140ms" }}
            onClick={() => onNavigate("home", "contact")}
          >
            {label}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
