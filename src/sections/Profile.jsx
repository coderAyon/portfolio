import { useEffect, useState } from "react";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

import Reveal from "../components/Reveal";
import { defaultProfile, readSavedProfile } from "../data/portfolio";

export default function Profile() {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const storedProfile = readSavedProfile();
    setProfile(storedProfile);
  }, []);

  const profileStats = [
    ["Role", profile.role],
    ["Address", profile.address],
    ["Academic", profile.academicProgram],
  ];

  return (
    <section id="profile" className="section-wrap profile-section">
      <div className="section-glow left-[8%] top-16" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <Reveal className="h-full">
            <article className="profile-identity-card profile-identity-card-main">
              <div className="motion-item profile-avatar">
                {profile.photoDataUrl || profile.photoUrl ? (
                  <img src={profile.photoDataUrl || profile.photoUrl} alt={`${profile.name} profile`} />
                ) : (
                  <span>AR</span>
                )}
              </div>
              <p className="motion-item profile-kicker mt-7 text-xs font-bold uppercase tracking-[0.38em] text-violet-aura" style={{ "--item-delay": "90ms" }}>Public Profile</p>
              <h2 className="motion-item profile-name mt-4 font-display text-5xl font-bold leading-none text-frost sm:text-6xl" style={{ "--item-delay": "160ms" }}>{profile.name}</h2>
              <p className="motion-item mt-5 text-lg leading-8 text-white/68" style={{ "--item-delay": "230ms" }}>{profile.bio}</p>
              <div className="mt-8 grid gap-3">
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="motion-item profile-info-line" style={{ "--item-delay": "310ms" }}>
                  <Phone className="h-5 w-5" />
                  <span>{profile.phone}</span>
                </a>
                <a href={`mailto:${profile.email}`} className="motion-item profile-info-line" style={{ "--item-delay": "380ms" }}>
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </a>
                <div className="motion-item profile-info-line" style={{ "--item-delay": "450ms" }}>
                  <MapPin className="h-5 w-5" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="profile-detail-column grid gap-5">
            <Reveal delay={0.08}>
              <div className="profile-summary-grid">
                {profileStats.map(([label, value], index) => (
                  <div key={label} className="motion-item profile-summary-card" style={{ "--item-delay": `${index * 90}ms` }}>
                    <p>{label}</p>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="profile-academic-card">
                <div className="flex items-center gap-3 text-violet-aura">
                  <BookOpen className="h-5 w-5" />
                  <p className="text-xs font-bold uppercase tracking-[0.34em]">Academic Information</p>
                </div>
                <div className="profile-academic-list">
                  {[
                    ["Program", profile.academicProgram],
                    ["Focus", profile.academicFocus],
                    ["Status", profile.academicStatus],
                    ["Study", "Studied CSE at Gono Bishwabidyalay"],
                  ].map(([label, value], index) => (
                    <div key={label} className="motion-item profile-academic-row" style={{ "--item-delay": `${120 + index * 80}ms` }}>
                      <span>{label}</span>
                      <p>{value}</p>
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
