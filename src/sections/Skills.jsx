import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";
import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section-wrap relative overflow-clip">
      <div className="section-glow left-[12%] top-20" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Skill Matrix"
          title="Design cards with motion, depth, and a sharper creative identity."
          copy="Built around your current graphics design skill set, with room to grow into front-end and interactive visual work."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Reveal key={skill.label} delay={index * 0.04}>
                <article className="skill-card group">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-violet-aura transition group-hover:border-violet-aura/50 group-hover:text-frost">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-frost">{skill.label}</h3>
                  <p className="mt-4 leading-7 text-white/58">{skill.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
