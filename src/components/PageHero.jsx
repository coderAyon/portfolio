import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, copy, titleClassName = "", children }) {
  return (
    <section className="page-hero relative overflow-clip px-5 pb-16 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="page-hero-grid absolute inset-0 opacity-35" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="motion-item page-hero-eyebrow mb-5 text-xs font-semibold uppercase tracking-[0.44em] text-violet-aura">{eyebrow}</p>
          <h1 className={`motion-item page-hero-title font-display font-bold text-frost ${titleClassName}`} style={{ "--item-delay": "90ms" }}>{title}</h1>
          {copy ? <p className="motion-item page-hero-copy mt-7 max-w-3xl text-lg leading-8 text-white/66 sm:text-xl" style={{ "--item-delay": "180ms" }}>{copy}</p> : null}
          {children ? <div className="motion-item mt-9" style={{ "--item-delay": "270ms" }}>{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
