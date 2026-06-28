import Reveal from "./Reveal";

export default function SectionLabel({ eyebrow, title, copy }) {
  return (
    <Reveal className="mx-auto max-w-4xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">{eyebrow}</p>
      <h2 className="text-balance font-display text-4xl font-bold leading-tight text-frost sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy ? <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">{copy}</p> : null}
    </Reveal>
  );
}
