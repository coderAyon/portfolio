import Reveal from "../components/Reveal";

export default function About() {
  return (
    <section id="about" className="section-wrap about-section">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="motion-item mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">About Me</p>
          <h2 className="motion-item font-display text-4xl font-bold leading-tight text-frost sm:text-5xl" style={{ "--item-delay": "90ms" }}>
            A designer with a technical mind and a cinematic eye.
          </h2>
          <p className="motion-item mt-8 max-w-2xl font-display text-xl font-bold leading-tight text-frost sm:text-2xl" style={{ "--item-delay": "180ms" }}>
            Studied CSE at Gono Bishwabidyalay.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass-panel p-6 sm:p-8">
            <p className="motion-item text-lg leading-8 text-white/70">
              I&apos;m Ayon Roy, a Computer Science student focused on graphics design. My work leans into contrast, atmosphere, and premium composition, with a portfolio system built to evolve as I add real project images and Fiverr proof.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Focus", "Graphics Design"],
                ["Energy", "Futuristic Visuals"],
                ["Next", "Client Case Studies"],
              ].map(([label, value], index) => (
                <div key={label} className="motion-item rounded-3xl border border-white/10 bg-white/[0.035] p-5" style={{ "--item-delay": `${120 + index * 80}ms` }}>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/38">{label}</p>
                  <p className="mt-3 text-lg font-bold text-frost">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
