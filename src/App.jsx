import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Dribbble,
  GraduationCap,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Layers3,
  Mail,
  MessageCircle,
  Palette,
  PenTool,
  Quote,
  Smartphone,
  Sparkle,
  Star,
} from "lucide-react";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

const navItems = [
  { label: "About", page: "home", section: "about" },
  { label: "Skills", page: "home", section: "skills" },
  { label: "Projects", page: "projects" },
  { label: "Reviews", page: "reviews" },
  { label: "Timeline", page: "home", section: "timeline" },
  { label: "Contact", page: "home", section: "contact" },
];

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  if (window.location.pathname.startsWith("/projects")) return "projects";
  if (window.location.pathname.startsWith("/reviews")) return "reviews";
  return "home";
}

function pageHref(item) {
  if (item.page === "projects") return "/projects";
  if (item.page === "reviews") return "/reviews";
  return item.section ? `/#${item.section}` : "/";
}

const skills = [
  {
    icon: Palette,
    label: "Brand Visuals",
    text: "Logo concepts, identity systems, and polished social media visuals built with an editorial eye.",
  },
  {
    icon: Layers3,
    label: "Compositions",
    text: "Layer-rich posters, thumbnails, product graphics, and premium digital art direction.",
  },
  {
    icon: PenTool,
    label: "Design Tools",
    text: "Practical creative workflow across Photoshop-style editing, vector thinking, and layout systems.",
  },
  {
    icon: Code2,
    label: "CS Foundation",
    text: "A growing technical base that helps design ideas become interactive, structured web experiences.",
  },
];

const projectCategories = [
  {
    id: "android",
    label: "Android App",
    icon: Smartphone,
    summary: "Mobile app concepts, UI flows, feature screens, and future APK/product case studies.",
    projects: [
      {
        title: "Android App Case Study",
        type: "Future Mobile Project",
        accent: "from-violet-500 to-fuchsia-400",
        text: "Add app screenshots, splash screens, feature flows, and mobile UI previews here.",
      },
      {
        title: "Dashboard Mobile UI",
        type: "Future App Interface",
        accent: "from-cyan-300 to-violet-400",
        text: "Prepared for Android dashboard visuals, authentication screens, and component states.",
      },
      {
        title: "Utility App Concept",
        type: "Future Prototype",
        accent: "from-slate-100 to-violet-300",
        text: "A slot for a practical app idea with screen-by-screen storytelling and outcomes.",
      },
    ],
  },
  {
    id: "website",
    label: "Website Development",
    icon: Globe2,
    summary: "Landing pages, portfolios, business websites, interactive sections, and responsive builds.",
    projects: [
      {
        title: "Premium Portfolio Website",
        type: "Future Web Build",
        accent: "from-violet-400 to-indigo-500",
        text: "Showcase responsive website screenshots, live links, and design-to-code breakdowns.",
      },
      {
        title: "Business Landing Page",
        type: "Future Website",
        accent: "from-fuchsia-400 to-violet-500",
        text: "A dedicated space for service pages, brand websites, and conversion-focused UI work.",
      },
      {
        title: "Interactive Web Experience",
        type: "Future 3D Web",
        accent: "from-cyan-300 to-purple-500",
        text: "Use this for immersive web experiments, motion concepts, and Three.js interactions.",
      },
    ],
  },
  {
    id: "graphics",
    label: "Graphics Design",
    icon: Palette,
    summary: "Brand visuals, social media design, thumbnails, posters, and Fiverr client graphics.",
    projects: [
      {
        title: "Visual Identity System",
        type: "Future Design Case Study",
        accent: "from-violet-500 to-fuchsia-400",
        text: "A premium brand direction slot ready for logos, identity systems, and client concepts.",
      },
      {
        title: "Social Design Pack",
        type: "Future Image Set",
        accent: "from-cyan-300 to-violet-400",
        text: "Upload future social posts, thumbnails, banners, and creative campaign screenshots.",
      },
      {
        title: "Poster & Thumbnail Series",
        type: "Future Graphics Work",
        accent: "from-slate-100 to-violet-300",
        text: "Prepared for high-impact graphics, poster compositions, and polished Fiverr deliverables.",
      },
    ],
  },
];

const fiverrReviews = Array.from({ length: 11 }, (_, index) => ({
  image: `/reviews/fiverr-review-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Fiverr client review screenshot ${index + 1}`,
}));

const timeline = [
  {
    year: "Now",
    title: "Computer Science Student",
    detail: "Building a strong foundation in software thinking while sharpening a creative design practice.",
    icon: GraduationCap,
  },
  {
    year: "Creative Track",
    title: "Graphics Design",
    detail: "Focused on memorable visual systems, polished layouts, and strong first-impression design.",
    icon: BriefcaseBusiness,
  },
  {
    year: "Next",
    title: "Portfolio Projects",
    detail: "Ready to showcase future design images, client work, Fiverr reviews, and case-study stories.",
    icon: BadgeCheck,
  },
];

function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div />
      <span />
      <span />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-frost shadow-[0_0_18px_rgba(157,101,255,.9)]" style={{ scaleX }} />;
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 46,
        scale: 0.96,
        filter: "blur(22px)",
        boxShadow: "0 34px 120px rgba(124, 60, 255, 0.2)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        boxShadow: "0 0 0 rgba(124, 60, 255, 0)",
      }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ eyebrow, title, copy }) {
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

function ChromeNav({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-40 px-4 sm:top-6"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-night/58 px-4 py-3 shadow-glass backdrop-blur-2xl sm:px-5">
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Ayon Roy home"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home");
            setOpen(false);
          }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-sm font-black text-frost shadow-aura">
            AR
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.24em] text-frost sm:block">
            Ayon Roy
          </span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={pageHref(item)}
              className={`nav-link ${currentPage !== "home" && currentPage === item.page ? "nav-link-active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.page, item.section);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden rounded-full bg-frost px-5 py-2.5 text-sm font-bold text-night transition hover:bg-white md:block"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("home", "contact");
            }}
          >
            Let&apos;s talk
          </a>
          <button className="nav-menu-button lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
            <span className={open ? "translate-y-[5px] rotate-45" : ""} />
            <span className={open ? "-translate-y-[5px] -rotate-45" : ""} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="mx-auto mt-3 grid max-w-6xl gap-1 rounded-3xl border border-white/10 bg-night/90 p-3 shadow-glass backdrop-blur-2xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={pageHref(item)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.page, item.section);
                  setOpen(false);
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-white/[0.08] hover:text-white ${
                  currentPage !== "home" && currentPage === item.page ? "text-frost" : "text-white/74"
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ onNavigate }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.25]);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-night">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night to-transparent" />
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Suspense fallback={<HeroFallback />}>
          <HeroScene />
        </Suspense>
      </motion.div>
      <div className="hero-readability absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.22]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pb-28 pt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 38, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-white/72 shadow-glass backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-ion shadow-[0_0_16px_rgba(109,233,255,.9)]" />
            Computer Science Student / Graphics Designer
          </div>
          <h1 className="max-w-5xl text-balance font-display text-6xl font-bold leading-[0.92] text-frost sm:text-7xl md:text-8xl lg:text-[8.8rem]">
            Ayon Roy
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            I shape bold digital visuals with a futuristic design language, blending graphic design instinct with a growing computer science foundation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/projects"
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
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.045] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-frost backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-aura/50 hover:bg-white/[0.075]"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("home", "contact");
              }}
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-night via-night/72 to-transparent" />
      <div className="absolute bottom-9 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/45 md:flex">
        <span className="h-px w-12 bg-white/20" />
        Scroll
        <span className="h-px w-12 bg-white/20" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-wrap">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">About Me</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-frost sm:text-5xl">
            A designer with a technical mind and a cinematic eye.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass-panel p-6 sm:p-8">
            <p className="text-lg leading-8 text-white/70">
              I&apos;m Ayon Roy, a Computer Science student focused on graphics design. My work leans into contrast, atmosphere, and premium composition, with a portfolio system built to evolve as I add real project images and Fiverr proof.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Focus", "Graphics Design"],
                ["Energy", "Futuristic Visuals"],
                ["Next", "Client Case Studies"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
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

function Skills() {
  return (
    <section id="skills" className="section-wrap relative overflow-hidden">
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
              <Reveal key={skill.label} delay={index * 0.07}>
                <motion.article
                  whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="skill-card group"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-violet-aura transition group-hover:border-violet-aura/50 group-hover:text-frost">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-frost">{skill.label}</h3>
                  <p className="mt-4 leading-7 text-white/58">{skill.text}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ accent, index }) {
  return (
    <div className="project-visual">
      <div className={`absolute inset-x-8 top-8 h-28 rounded-full bg-gradient-to-r ${accent} opacity-60 blur-3xl`} />
      <motion.div
        animate={{ rotate: [0, 4, -3, 0], y: [0, -10, 5, 0] }}
        transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-7 top-8 h-28 w-28 rounded-[2rem] border border-white/14 bg-white/[0.08] shadow-aura backdrop-blur-xl"
      />
      <motion.div
        animate={{ rotate: [0, -8, 5, 0], x: [0, 12, -4, 0] }}
        transition={{ duration: 9 + index, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 right-8 h-36 w-36 rounded-full border border-white/12 bg-gradient-to-br from-white/16 to-white/[0.03]"
      />
      <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
      <Sparkle className="absolute right-12 top-12 h-6 w-6 text-frost/70" />
    </div>
  );
}

function Projects() {
  const [activeCategoryId, setActiveCategoryId] = useState(projectCategories[0].id);
  const activeCategory = projectCategories.find((category) => category.id === activeCategoryId) ?? projectCategories[0];

  return (
    <section id="projects" className="section-wrap">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Featured Projects"
          title="A showcase built for future design images, case studies, and client outcomes."
          copy="The cards are intentionally visual-first, so your upcoming design screenshots can replace the abstract placeholders without changing the layout."
        />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl">
          <div className="project-tabs" role="tablist" aria-label="Project categories">
            {projectCategories.map((category) => {
              const Icon = category.icon;
              const active = category.id === activeCategory.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`project-tab ${active ? "project-tab-active" : ""}`}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategory.id}
              initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58"
            >
              {activeCategory.summary}
            </motion.p>
          </AnimatePresence>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 26, scale: 0.98, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(16px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {activeCategory.projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 32, filter: "blur(18px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.52, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12 }}
                className="project-card"
              >
                <ProjectVisual accent={project.accent} index={index} />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-violet-aura">{project.type}</p>
                  <h3 className="mt-4 font-display text-2xl font-bold text-frost">{project.title}</h3>
                  <p className="mt-4 leading-7 text-white/58">{project.text}</p>
                  <button className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-frost">
                    Future Slot <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section-wrap relative overflow-hidden">
      <div className="section-glow right-[8%] top-12" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Fiverr Reviews"
          title="Real client feedback, presented as polished proof."
          copy="A dedicated wall of Fiverr review screenshots, designed to build trust while keeping the portfolio visually premium."
        />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl">
          <div className="review-stats">
            {[
              ["11", "Client Screenshots"],
              ["4.8", "Average Rating"],
              ["Fiverr", "Verified Marketplace"],
            ].map(([value, label]) => (
              <div key={label} className="review-stat">
                <span>{value}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="review-proof-grid mt-14">
          {fiverrReviews.map((review, index) => (
            <Reveal key={review.image} delay={(index % 4) * 0.04}>
              <motion.article whileHover={{ y: -10, scale: 1.01 }} className="review-proof-card">
                <div className="review-proof-topline">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 fill-violet-aura text-violet-aura" />
                    Fiverr Review
                  </span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <img className="review-proof-image" src={review.image} alt={review.alt} loading="lazy" decoding="async" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="section-wrap">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Education & Experience"
          title="A timeline for the student, designer, and future case-study builder."
        />
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-1/2" />
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className={`timeline-item ${index % 2 === 0 ? "md:pr-[55%]" : "md:ml-[55%]"}`}>
                  <div className="timeline-dot">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="glass-panel p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-violet-aura">{item.year}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold text-frost">{item.title}</h3>
                    <p className="mt-4 leading-7 text-white/58">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const socials = useMemo(
    () => [
      { label: "GitHub", icon: Github, href: "https://github.com/" },
      { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" },
      { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
      { label: "Dribbble", icon: Dribbble, href: "https://dribbble.com/" },
      { label: "Fiverr", icon: Star, href: "https://fiverr.com/" },
      { label: "Email", icon: Mail, href: "mailto:hello@ayonroy.com" },
    ],
    [],
  );

  return (
    <section id="contact" className="section-wrap pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="contact-shell relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-aura/30 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">Contact</p>
                <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight text-frost sm:text-6xl">
                  Let&apos;s turn your next visual idea into something magnetic.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
                  Available for graphics design work, creative direction experiments, and future web-based portfolio showcases.
                </p>
              </div>
              <div className="grid gap-3">
                <a href="mailto:hello@ayonroy.com" className="group inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:bg-white">
                  <Mail className="h-4 w-4" />
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <div id="social links" className="grid grid-cols-2 gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="social-link"
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
          <p>© 2026 Ayon Roy. Designed for a cinematic first impression.</p>
          <a href="#home" className="font-semibold text-white/62 transition hover:text-white">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, copy, children }) {
  return (
    <section className="page-hero relative overflow-hidden px-5 pb-16 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="page-hero-grid absolute inset-0 opacity-35" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.44em] text-violet-aura">{eyebrow}</p>
          <h1 className="max-w-5xl text-balance font-display text-5xl font-bold leading-[0.96] text-frost sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/66 sm:text-xl">{copy}</p>
          {children ? <div className="mt-9">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

function PageCTA({ onNavigate, label = "Start a Project" }) {
  return (
    <section className="px-5 pb-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="page-cta">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-violet-aura">Next Step</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-frost sm:text-5xl">
              Build the next polished visual story for your portfolio.
            </h2>
          </div>
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:-translate-y-1 hover:bg-white"
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

function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <About />
      <Skills />
      <Timeline />
      <Contact />
    </>
  );
}

function ProjectsPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="Project Archive"
        title="Selected design worlds, ready for your next case study drop."
        copy="A dedicated project page for future graphics design screenshots, client visuals, social packs, and polished breakdowns."
      >
        <button
          className="inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:-translate-y-1 hover:bg-white"
          onClick={() => onNavigate("home", "contact")}
        >
          Book Design Work
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </PageHero>
      <Projects />
      <PageCTA onNavigate={onNavigate} label="Contact Ayon" />
    </>
  );
}

function ReviewsPage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="Client Proof"
        title="Fiverr reviews and trust signals get their own spotlight."
        copy="A focused reviews page for screenshots, buyer quotes, order proof, and polished testimonial storytelling."
      >
        <button
          className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.055] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-frost backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-aura/60 hover:bg-white/[0.09]"
          onClick={() => onNavigate("projects")}
        >
          View Projects
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </PageHero>
      <Reviews />
      <PageCTA onNavigate={onNavigate} label="Work With Me" />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  const navigate = (nextPage, section) => {
    const path = nextPage === "projects" ? "/projects" : nextPage === "reviews" ? "/reviews" : "/";
    const target = section ? `${path}#${section}` : path;

    if (window.location.pathname + window.location.hash !== target) {
      window.history.pushState({ page: nextPage, section }, "", target);
    }

    setPage(nextPage);

    requestAnimationFrame(() => {
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getInitialPage();
      setPage(nextPage);
      requestAnimationFrame(() => {
        const section = window.location.hash.replace("#", "");
        if (section && nextPage === "home") {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activePage = page === "projects" || page === "reviews" ? page : "home";

  return (
    <main className="min-h-screen overflow-x-hidden bg-night text-white antialiased">
      <ScrollProgress />
      <ChromeNav currentPage={activePage} onNavigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 18, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(16px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {activePage === "projects" ? <ProjectsPage onNavigate={navigate} /> : null}
          {activePage === "reviews" ? <ReviewsPage onNavigate={navigate} /> : null}
          {activePage === "home" ? <HomePage onNavigate={navigate} /> : null}
        </motion.div>
      </AnimatePresence>
      <a
        href="https://wa.me/8801630802119"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Contact on WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
