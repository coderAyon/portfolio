import { ArrowUpRight, Download } from "lucide-react";

import PageCTA from "../components/PageCTA";
import PageHero from "../components/PageHero";
import { cvAssetUrl } from "../data/portfolio";
import Profile from "../sections/Profile";

export default function ProfilePage({ onNavigate }) {
  return (
    <>
      <PageHero eyebrow="Visit Profile" title="Welcome to Profile" titleClassName="profile-welcome-title">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:-translate-y-1 hover:bg-white"
            onClick={() => onNavigate("home", "contact")}
          >
            Contact Ayon
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <a
            href={cvAssetUrl}
            download="Ayon-Roy-CV.pdf"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.065] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-frost transition hover:-translate-y-1 hover:border-violet-aura/60 hover:bg-white/[0.1]"
          >
            Download CV
            <Download className="h-4 w-4" />
          </a>
        </div>
      </PageHero>
      <Profile />
      <PageCTA onNavigate={onNavigate} label="Start a Project" />
    </>
  );
}
