import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Download,
  ExternalLink,
  Facebook,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  PenTool,
  Phone,
  Smartphone,
  Sparkle,
  Star,
  UserRound,
  X,
} from "lucide-react";

const navItems = [
  { label: "About", page: "home", section: "about" },
  { label: "Projects", page: "projects" },
  { label: "Reviews", page: "reviews" },
  { label: "Profile", page: "profile" },
  { label: "Contact", page: "home", section: "contact" },
];

const appBasePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const appAssetBase = import.meta.env.BASE_URL || "/";
const MOBILE_MOTION_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MotionPreferenceContext = createContext({
  isMobile: false,
  prefersReducedMotion: false,
  reduceMotion: false,
});

function assetHref(path) {
  return `${appAssetBase}${path.replace(/^\/+/, "")}`;
}

function getMediaQueryMatch(query) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(query).matches;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => getMediaQueryMatch(query));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);
    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}

function useMotionPreferences() {
  return useContext(MotionPreferenceContext);
}

function stripBasePath(pathname) {
  if (!appBasePath) return pathname;
  if (pathname === appBasePath) return "/";
  if (pathname.startsWith(`${appBasePath}/`)) return pathname.slice(appBasePath.length) || "/";
  return pathname;
}

function routePath(page) {
  if (page === "projects") return "/projects";
  if (page === "reviews") return "/reviews";
  if (page === "profile") return "/profile";
  return "/";
}

function routeHref(page, section) {
  const path = routePath(page);
  const basePath = appBasePath || "";
  const href = `${basePath}${path}`;
  return section ? `${href}#${section}` : href;
}

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const pathname = stripBasePath(window.location.pathname);
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/reviews")) return "reviews";
  if (pathname.startsWith("/profile")) return "profile";
  return "home";
}

function pageHref(item) {
  return routeHref(item.page, item.section);
}

function normalizePage(page) {
  return page === "projects" || page === "reviews" || page === "profile" ? page : "home";
}

function afterRoutePaint(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

let smoothScrollRestoreTimer = null;

function temporarilyDisableSmoothScroll(duration = 320) {
  if (typeof document === "undefined") return;

  if (smoothScrollRestoreTimer) {
    window.clearTimeout(smoothScrollRestoreTimer);
  }

  document.documentElement.classList.add("route-changing");
  smoothScrollRestoreTimer = window.setTimeout(() => {
    document.documentElement.classList.remove("route-changing");
    smoothScrollRestoreTimer = null;
  }, duration);
}

function scrollToTopIfNeeded(behavior = "auto") {
  if (typeof window === "undefined") return;
  if (Math.abs(window.scrollY) < 2 && Math.abs(window.scrollX) < 2) return;
  window.scrollTo({ top: 0, left: 0, behavior });
}

function scrollSectionIntoViewIfNeeded(section, behavior = "auto") {
  if (typeof document === "undefined" || !section) return;

  const element = document.getElementById(section);
  if (!element) return;

  const top = element.getBoundingClientRect().top;
  if (Math.abs(top) < 2) return;

  element.scrollIntoView({ behavior, block: "start" });
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
    summary: "Downloadable Android apps with clean previews, APK sizes, and direct install files.",
    projects: [
      {
        title: "Cashify",
        type: "Android Finance App",
        accent: "from-emerald-400 to-orange-500",
        text: "A simple cash-flow companion for tracking daily money movement and personal balances.",
        appPreviewImage: assetHref("apps/previews/cashify.png?v=20260627"),
        apkUrl: assetHref("apps/apks/cashify.apk"),
        apkSize: "42 MB",
      },
      {
        title: "Notes",
        type: "Android Utility App",
        accent: "from-cyan-300 to-sky-500",
        text: "A focused note-taking app for quick writing, lightweight organization, and everyday reminders.",
        appPreviewImage: assetHref("apps/previews/notes.png?v=20260627"),
        apkUrl: assetHref("apps/apks/notes.apk"),
        apkSize: "28 MB",
      },
      {
        title: "Unit Converter App",
        type: "Android Calculator App",
        accent: "from-lime-300 to-orange-500",
        text: "A practical converter for common units with fast inputs, clear results, and a clean mobile flow.",
        appPreviewImage: assetHref("apps/previews/unit-converter.png?v=20260627"),
        apkUrl: assetHref("apps/apks/unit-converter.apk"),
        apkSize: "9 MB",
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
        title: "LMS Website",
        header: "Learning Management System",
        type: "Live Website Project",
        status: "Repo + Live",
        accent: "from-violet-400 to-fuchsia-500",
        text: "A live LMS website with a course-focused header, learning sections, and a polished responsive interface.",
        description:
          "This LMS website presents a learning platform experience with a clear header, course-focused messaging, structured content sections, and a responsive layout that can grow into a full education product showcase.",
        details: [
          "Modern landing-page header for an LMS brand",
          "Responsive website structure for desktop and mobile",
          "Ready for project screenshots, UI breakdowns, and future feature notes",
        ],
        previewImage: assetHref("projects/lms-preview.png?v=20260626b"),
        repoUrl: "https://github.com/coderAyon/LMS-Website",
        liveUrl: "https://coderayon.github.io/LMS-Website/",
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

const fiverrReviews = Array.from({ length: 10 }, (_, index) => ({
  image: assetHref(`reviews/fiverr-review-${String(index + 1).padStart(2, "0")}.png`),
  alt: `Fiverr client review screenshot ${index + 1}`,
}));

const graphicsAssetVersion = "20260625";

const createGraphicsSamples = ({ id, label, count, folder, prefix, orientation = "landscape" }) =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `${id}-${number}`,
      title: `${label} Work ${number}`,
      label,
      number,
      orientation,
      image: assetHref(`graphics/${folder}/${prefix}-${number}.jpg?v=${graphicsAssetVersion}`),
      note: "Portfolio showcase",
    };
  });

const graphicsWorkTypes = [
  {
    id: "logo",
    label: "Logo",
    summary: "Logo marks, brand symbols, monograms, and identity concepts ready for client-proof presentation.",
    accent: "from-violet-400 to-fuchsia-500",
    samples: createGraphicsSamples({
      id: "logo",
      label: "Logo",
      count: 16,
      folder: "logo",
      prefix: "logo",
    }),
  },
  {
    id: "business-card",
    label: "Business card",
    summary: "Business card layouts, print-ready identity pieces, and premium stationery compositions.",
    accent: "from-cyan-300 to-violet-500",
    samples: createGraphicsSamples({
      id: "business-card",
      label: "Business card",
      count: 10,
      folder: "business-card",
      prefix: "business-card",
    }),
  },
  {
    id: "t-shirt",
    label: "T shirt",
    summary: "T-shirt graphics, apparel mockups, merch visuals, and bold wearable design concepts.",
    accent: "from-fuchsia-400 to-purple-600",
    samples: createGraphicsSamples({
      id: "t-shirt",
      label: "T shirt",
      count: 8,
      folder: "t-shirt",
      prefix: "t-shirt",
      orientation: "portrait",
    }),
  },
];

const cvAssetUrl = assetHref("profile/ayon-roy-cv.pdf");
const profilePhotoUrl = assetHref("profile/ayon-roy-profile.jpg?v=20260625");

const defaultProfile = {
  name: "Ayon Roy",
  role: "Computer Science Student / Graphics Designer",
  address: "Manikganj, Khalpar, Dhaka, Bangladesh",
  phone: "+880 1630802119",
  phoneAlt: "+880 1569199502",
  email: "ayonr169@gmail.com",
  academicProgram: "Computer Science Student",
  academicFocus: "Graphics design, web interfaces, creative technology, and portfolio projects",
  academicStatus: "Learning, building, and preparing stronger client-ready case studies",
  bio: "I create futuristic visual identities and interactive portfolio experiences with a growing computer science foundation.",
  photoUrl: profilePhotoUrl,
  photoDataUrl: "",
};

function readSavedProfile() {
  return defaultProfile;
}

function broadcastProfileUpdate(profile) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ayon-profile-updated", { detail: profile }));
}

function AnimatedScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-frost shadow-[0_0_18px_rgba(157,101,255,.9)]" style={{ scaleX }} />;
}

function ScrollProgress() {
  const { reduceMotion } = useMotionPreferences();
  return reduceMotion ? null : <AnimatedScrollProgress />;
}

function Reveal({ children, delay = 0, className = "" }) {
  const { isMobile, reduceMotion } = useMotionPreferences();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const revealClassName = ["reveal-motion", className].filter(Boolean).join(" ");
  const revealDelay = isMobile ? Math.min(delay, 0.08) : delay;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: isMobile ? 16 : 28,
        scale: isMobile ? 0.992 : 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, margin: isMobile ? "-6% 0px -6% 0px" : "-10% 0px -10% 0px", amount: 0.16 }}
      transition={{ duration: isMobile ? 0.42 : 0.62, delay: revealDelay, ease: [0.16, 1, 0.3, 1] }}
      className={revealClassName}
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
  const [navProfile, setNavProfile] = useState(defaultProfile);
  const { reduceMotion } = useMotionPreferences();

  useEffect(() => {
    setNavProfile(readSavedProfile());

    const handleProfileUpdate = (event) => {
      setNavProfile(event.detail ?? readSavedProfile());
    };

    window.addEventListener("ayon-profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("ayon-profile-updated", handleProfileUpdate);
    };
  }, []);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-40 px-4 sm:top-6"
    >
      <nav className="site-nav mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 sm:px-5">
        <a
          href={routeHref("home")}
          className="flex items-center gap-3"
          aria-label="Ayon Roy home"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home");
            setOpen(false);
          }}
        >
          <span className="nav-avatar" aria-hidden="true">
            {navProfile.photoDataUrl || navProfile.photoUrl ? <img src={navProfile.photoDataUrl || navProfile.photoUrl} alt="" /> : <span>AR</span>}
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
            href={routeHref("home", "contact")}
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
            initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="mx-auto mt-3 grid max-w-6xl gap-1 rounded-3xl border border-white/10 bg-night/95 p-3 shadow-glass lg:hidden"
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

const heroPhotoVersion = "20260625c";
const heroCoverPhotos = [2, 1, 6].map((photoNumber, index) => {
  const number = String(photoNumber).padStart(2, "0");
  return {
    src: assetHref(`profile/coverflow/ayon-cover-${number}.jpg?v=${heroPhotoVersion}`),
    alt: `Ayon Roy portrait ${index + 1}`,
  };
});

function coverOffset(index, activeIndex, total) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function HeroCoverflow({ className = "" }) {
  const shellRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { isMobile, reduceMotion } = useMotionPreferences();
  const isInView = useInView(shellRef, { margin: "160px 0px" });
  const total = heroCoverPhotos.length;

  useEffect(() => {
    if (paused || reduceMotion || !isInView) return undefined;
    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 3200);

    return () => window.clearInterval(timerId);
  }, [isInView, paused, reduceMotion, total]);

  const goTo = (nextIndex) => {
    const next = (nextIndex + total) % total;
    if (next === activeIndex) return;

    setActiveIndex(next);
  };

  return (
    <motion.div
      ref={shellRef}
      className={`hero-coverflow-shell ${reduceMotion ? "hero-coverflow-reduced" : ""} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, x: 34, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-coverflow-glow" aria-hidden="true" />
      <div className="hero-coverflow-orbit hero-coverflow-orbit-one" aria-hidden="true" />
      <div className="hero-coverflow-orbit hero-coverflow-orbit-two" aria-hidden="true" />
      <div className="hero-coverflow-stage" aria-label="Ayon Roy photo carousel">
        {heroCoverPhotos.map((photo, index) => {
          const offset = coverOffset(index, activeIndex, total);
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const x = offset * (isMobile ? 56 : 82);
          const y = isActive ? (reduceMotion ? 0 : -10) : distance * (isMobile ? 4 : 8);
          const scale = Math.max(0.74, 1 - distance * 0.12);
          const rotateY = reduceMotion ? 0 : offset * -28;
          const depth = reduceMotion ? 0 : distance * -72;
          const opacity = distance > 2 ? 0 : 1 - distance * 0.18;

          return (
            <button
              key={photo.src}
              type="button"
              className={`hero-cover-card ${isActive ? "hero-cover-card-active" : ""}`}
              style={{
                zIndex: 20 - distance,
                opacity,
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${depth}px) rotateY(${rotateY}deg) scale(${scale})`,
              }}
              aria-label={`Show photo ${index + 1}`}
              onClick={() => goTo(index)}
              tabIndex={isActive ? 0 : -1}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index === 0 ? "high" : "low"}
              />
              <span className="hero-cover-card-shine" />
            </button>
          );
        })}
      </div>

      <div className="hero-coverflow-dots" aria-label="Photo carousel navigation">
        {heroCoverPhotos.map((photo, index) => (
          <button
            key={`${photo.src}-dot`}
            type="button"
            className={index === activeIndex ? "hero-coverflow-dot-active" : ""}
            aria-label={`Go to photo ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function HeroCoverflowMotionLayer({ heroRef }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -84]);
  const opacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.25]);

  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0">
      <HeroCoverflow className="hero-coverflow-desktop" />
    </motion.div>
  );
}

function Hero({ onNavigate }) {
  const heroRef = useRef(null);
  const { isMobile, reduceMotion } = useMotionPreferences();

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100svh] overflow-clip bg-night">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night to-transparent" />
      {!isMobile && !reduceMotion ? <HeroCoverflowMotionLayer heroRef={heroRef} /> : null}
      {!isMobile && reduceMotion ? (
        <div className="absolute inset-0">
          <HeroCoverflow className="hero-coverflow-desktop" />
        </div>
      ) : null}
      <div className="hero-readability absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.22]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pb-28 pt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0.72, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy-block max-w-4xl"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/72 shadow-glass">
            <span className="h-2 w-2 rounded-full bg-[#1dbf73] shadow-[0_0_16px_rgba(29,191,115,.95)]" />
            Welcome to premium productivity
          </div>
          <h1 className="max-w-5xl text-balance font-display text-6xl font-bold leading-[0.92] text-frost sm:text-7xl md:text-8xl lg:text-[8.8rem]">
            Ayon Roy
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            I shape bold digital visuals with a futuristic design language, blending graphic design instinct with a growing computer science foundation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
    <section id="about" className="section-wrap about-section">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">About Me</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-frost sm:text-5xl">
            A designer with a technical mind and a cinematic eye.
          </h2>
          <p className="mt-8 max-w-2xl font-display text-xl font-bold leading-tight text-frost sm:text-2xl">
            Studied CSE at Gono Bishwabidyalay.
          </p>
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
  const { reduceMotion } = useMotionPreferences();

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
              <Reveal key={skill.label} delay={index * 0.07}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -10, rotateX: 3, rotateY: -3 }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 18 }}
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

function ProjectVisual({ accent, index, project }) {
  const { isMobile, reduceMotion } = useMotionPreferences();
  const simplifyMotion = reduceMotion || isMobile;
  const hasWebsitePreview = Boolean(project?.previewImage);
  const hasAppPreview = Boolean(project?.appPreviewImage);
  const floatingPanelClassName = "absolute left-7 top-8 h-28 w-28 rounded-[2rem] border border-white/14 bg-white/[0.09] shadow-aura";
  const floatingOrbClassName = "absolute bottom-7 right-8 h-36 w-36 rounded-full border border-white/12 bg-gradient-to-br from-white/16 to-white/[0.03]";

  return (
    <div className={`project-visual ${hasWebsitePreview ? "project-visual-website" : ""} ${hasAppPreview ? "project-visual-app" : ""}`}>
      <div className={`project-visual-glow absolute inset-x-8 top-8 h-28 rounded-full bg-gradient-to-r ${accent} opacity-60 blur-3xl`} />
      {project?.header && !hasWebsitePreview && !hasAppPreview ? (
        <div className="project-visual-header">
          <span>{project.status}</span>
          <strong>{project.header}</strong>
          <p>{project.title}</p>
        </div>
      ) : null}
      {hasWebsitePreview ? (
        <>
          <div className="project-browser-frame">
            <div className="project-browser-toolbar" aria-hidden="true">
              <span />
              <span />
              <span />
              <p>Live LMS preview</p>
            </div>
            <img src={project.previewImage} alt={`${project.title} website preview`} loading="lazy" decoding="async" />
          </div>
        </>
      ) : null}
      {hasAppPreview ? (
        <div className="project-app-preview-frame">
          <img
            src={project.appPreviewImage}
            alt={`${project.title} app preview`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index === 0 ? "high" : "low"}
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
          />
        </div>
      ) : null}
      {!hasWebsitePreview && !hasAppPreview && (simplifyMotion ? (
        <div className={floatingPanelClassName} />
      ) : (
        <motion.div
          animate={{ rotate: [0, 4, -3, 0], y: [0, -10, 5, 0] }}
          transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
          className={floatingPanelClassName}
        />
      ))}
      {!hasWebsitePreview && !hasAppPreview && (simplifyMotion ? (
        <div className={floatingOrbClassName} />
      ) : (
        <motion.div
          animate={{ rotate: [0, -8, 5, 0], x: [0, 12, -4, 0] }}
          transition={{ duration: 9 + index, repeat: Infinity, ease: "easeInOut" }}
          className={floatingOrbClassName}
        />
      ))}
      {!hasWebsitePreview && !hasAppPreview ? (
        <>
          <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
          <Sparkle className="absolute right-12 top-12 h-6 w-6 text-frost/70" />
        </>
      ) : null}
    </div>
  );
}

function ProjectDetailsModal({ project, onClose }) {
  const { reduceMotion } = useMotionPreferences();
  const hasPreview = Boolean(project.previewImage);

  useEffect(() => {
    if (!project) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  if (typeof document === "undefined") return null;

  const modal = (
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <button className="project-modal-backdrop" type="button" aria-label="Close project details" onClick={onClose} />
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="project-modal-panel"
      >
        <button className="project-modal-close" type="button" onClick={onClose} aria-label="Close project details">
          <X className="h-5 w-5" />
        </button>
        {!hasPreview ? (
          <div className="project-modal-preview">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-42 blur-3xl`} />
            <div className="project-modal-preview-caption">
              <p>{project.type}</p>
              <h3>{project.header ?? project.title}</h3>
              <span>{project.title}</span>
            </div>
          </div>
        ) : null}
        <div className="project-modal-content">
          <p className="text-xs font-bold uppercase tracking-[0.36em] text-violet-aura">{project.status ?? "Project Details"}</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-frost sm:text-5xl">{project.title}</h2>
          <p className="mt-5 text-base leading-8 text-white/66">{project.description ?? project.text}</p>
          {project.details?.length ? (
            <ul className="project-detail-list">
              {project.details.map((detail) => (
                <li key={detail}>
                  <Sparkle className="h-4 w-4" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="project-modal-actions">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-primary-link">
                View Live
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );

  return createPortal(modal, document.body);
}

function GraphicsSamples() {
  const [activeGraphicsId, setActiveGraphicsId] = useState(graphicsWorkTypes[0].id);
  const { isMobile, reduceMotion } = useMotionPreferences();
  const simplifyMotion = reduceMotion || isMobile;
  const eagerSampleLimit = isMobile ? 1 : 3;
  const activeGraphics = graphicsWorkTypes.find((category) => category.id === activeGraphicsId) ?? graphicsWorkTypes[0];
  const sampleCards = activeGraphics.samples.map((sample, index) => (
    <article
      key={sample.id}
      className="graphics-sample-card"
      style={simplifyMotion ? undefined : { "--sample-delay": `${Math.min(index, 8) * 26}ms` }}
      tabIndex={0}
    >
      <div
        className={`graphics-sample-preview ${
          sample.image
            ? `graphics-sample-preview-image ${sample.orientation === "portrait" ? "graphics-sample-preview-portrait" : ""}`
            : `bg-gradient-to-br ${activeGraphics.accent}`
        }`}
      >
        {sample.image ? (
          <img
            src={sample.image}
            alt={sample.title}
            loading={index < eagerSampleLimit ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index < eagerSampleLimit ? "high" : "low"}
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
          />
        ) : (
          <>
            <div className="graphics-sample-orbit" />
            <div className="graphics-sample-orbit graphics-sample-orbit-two" />
            <span>{sample.number}</span>
          </>
        )}
      </div>
      <div className="graphics-sample-meta">
        <p>{sample.label}</p>
        <h3>{sample.title}</h3>
        <span>{sample.note}</span>
      </div>
    </article>
  ));

  return (
    <div className="mt-12">
      <Reveal className="mx-auto max-w-4xl">
        <div className="graphics-subtabs" role="tablist" aria-label="Graphics design categories">
          {graphicsWorkTypes.map((category) => {
            const active = category.id === activeGraphics.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`graphics-subtab ${active ? "graphics-subtab-active" : ""}`}
                onClick={() => setActiveGraphicsId(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        {simplifyMotion ? (
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58">
            {activeGraphics.summary}
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.p
              key={activeGraphics.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58"
            >
              {activeGraphics.summary}
            </motion.p>
          </AnimatePresence>
        )}
      </Reveal>

      {simplifyMotion ? (
        <div key={activeGraphics.id} className="graphics-sample-grid mt-12">
          {sampleCards}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGraphics.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="graphics-sample-grid mt-12"
          >
            {sampleCards}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const { isMobile, reduceMotion } = useMotionPreferences();
  const simplifyMotion = reduceMotion || isMobile;
  const isDownloadableApp = Boolean(project.apkUrl);
  const content = (
    <>
      <ProjectVisual accent={project.accent} index={index} project={project} />
      <div className={`p-6 ${isDownloadableApp ? "project-app-content" : ""}`}>
        {isDownloadableApp ? (
          <>
            <p className="project-app-type">{project.type}</p>
            <h3 className="project-app-title">{project.title}</h3>
            <p className="project-app-copy">{project.text}</p>
            <div className="project-app-action-row">
              <div className="project-app-size">
                <span>APK Size</span>
                <strong>{project.apkSize}</strong>
              </div>
              <a href={project.apkUrl} download className="project-mini-button project-download-button">
                Download now
                <Download className="h-4 w-4" />
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-violet-aura">{project.type}</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-frost">{project.title}</h3>
            <p className="mt-4 leading-7 text-white/58">{project.text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" className="project-mini-button" onClick={() => onSelect(project)}>
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </button>
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project-icon-link" aria-label={`${project.title} GitHub repo`}>
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-icon-link" aria-label={`${project.title} live website`}>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );

  if (simplifyMotion) {
    return (
      <article className={`project-card ${isDownloadableApp ? "project-app-card" : ""}`}>
        {content}
      </article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.46, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12 }}
      className={`project-card ${isDownloadableApp ? "project-app-card" : ""}`}
    >
      {content}
    </motion.article>
  );
}

function Projects() {
  const [activeCategoryId, setActiveCategoryId] = useState(projectCategories[0].id);
  const [selectedProject, setSelectedProject] = useState(null);
  const { isMobile, reduceMotion } = useMotionPreferences();
  const simplifyMotion = reduceMotion || isMobile;
  const activeCategory = projectCategories.find((category) => category.id === activeCategoryId) ?? projectCategories[0];
  const projectCards = activeCategory.projects.map((project, index) => (
    <ProjectCard key={project.title} project={project} index={index} onSelect={setSelectedProject} />
  ));

  return (
    <section id="projects" className="section-wrap projects-section">
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
          {simplifyMotion ? (
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58">
              {activeCategory.summary}
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58"
              >
                {activeCategory.summary}
              </motion.p>
            </AnimatePresence>
          )}
        </Reveal>
        {activeCategory.id === "graphics" ? (
          <GraphicsSamples />
        ) : simplifyMotion ? (
          <div key={activeCategory.id} className="mt-14 grid gap-6 lg:grid-cols-3">
            {projectCards}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 grid gap-6 lg:grid-cols-3"
            >
              {projectCards}
            </motion.div>
          </AnimatePresence>
        )}
        <AnimatePresence>
          {selectedProject ? <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ReviewProofCard({ review, index }) {
  const { isMobile, reduceMotion } = useMotionPreferences();
  const content = (
    <>
      <div className="review-proof-topline">
        <span className="inline-flex items-center gap-2">
          <Star className="h-4 w-4 fill-violet-aura text-violet-aura" />
          Fiverr Review
        </span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <img
        className="review-proof-image"
        src={review.image}
        alt={review.alt}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={index < 2 ? "high" : "low"}
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
      />
    </>
  );

  if (reduceMotion) {
    return (
      <article className="review-proof-card" tabIndex={0}>
        {content}
      </article>
    );
  }

  return (
    <motion.article
      whileHover={isMobile ? undefined : { y: -10, scale: 1.026 }}
      whileTap={isMobile ? { scale: 0.99 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.55 }}
      className="review-proof-card"
      tabIndex={0}
    >
      {content}
    </motion.article>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section-wrap reviews-section relative overflow-clip">
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
              ["10", "Clients Feedback"],
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
              <ReviewProofCard review={review} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
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
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-violet-aura">Contact</p>
                <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight text-frost sm:text-6xl">
                  Let&apos;s turn your next visual idea into something magnetic.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
                  Available for graphics design work, creative direction experiments, and future web-based portfolio showcases.
                </p>
              </div>
              <div className="contact-actions grid gap-3">
                <a href="mailto:ayonr169@gmail.com" className="group inline-flex items-center justify-center gap-3 rounded-full bg-frost px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-night transition hover:bg-white">
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

function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const { reduceMotion } = useMotionPreferences();

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
            <motion.article
              whileHover={reduceMotion ? undefined : { y: -10, rotateX: 1.5, rotateY: -1.5 }}
              transition={reduceMotion ? { duration: 0 } : undefined}
              className="profile-identity-card profile-identity-card-main"
            >
              <div className="profile-avatar">
                {profile.photoDataUrl || profile.photoUrl ? (
                  <img src={profile.photoDataUrl || profile.photoUrl} alt={`${profile.name} profile`} />
                ) : (
                  <span>AR</span>
                )}
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.38em] text-violet-aura">Public Profile</p>
              <h2 className="mt-4 font-display text-5xl font-bold leading-none text-frost sm:text-6xl">{profile.name}</h2>
              <p className="mt-5 text-lg leading-8 text-white/68">{profile.bio}</p>
              <div className="mt-8 grid gap-3">
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="profile-info-line">
                  <Phone className="h-5 w-5" />
                  <span>{profile.phone}</span>
                </a>
                <a href={`mailto:${profile.email}`} className="profile-info-line">
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </a>
                <div className="profile-info-line">
                  <MapPin className="h-5 w-5" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </motion.article>
          </Reveal>

          <div className="profile-detail-column grid gap-5">
            <Reveal delay={0.08}>
              <div className="profile-summary-grid">
                {profileStats.map(([label, value]) => (
                  <div key={label} className="profile-summary-card">
                    <p>{label}</p>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
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
                  ].map(([label, value]) => (
                    <div key={label} className="profile-academic-row">
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

function PageHero({ eyebrow, title, copy, titleClassName = "", children }) {
  return (
    <section className="page-hero relative overflow-clip px-5 pb-16 pt-36 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-radial-aura" />
      <div className="page-hero-grid absolute inset-0 opacity-35" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="page-hero-eyebrow mb-5 text-xs font-semibold uppercase tracking-[0.44em] text-violet-aura">{eyebrow}</p>
          <h1 className={`page-hero-title font-display font-bold text-frost ${titleClassName}`}>
            {title}
          </h1>
          {copy ? <p className="page-hero-copy mt-7 max-w-3xl text-lg leading-8 text-white/66 sm:text-xl">{copy}</p> : null}
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
      <Contact />
    </>
  );
}

function ProjectsPage({ onNavigate }) {
  return (
    <>
      <Projects />
      <PageCTA onNavigate={onNavigate} label="Contact Ayon" />
    </>
  );
}

function ReviewsPage({ onNavigate }) {
  return (
    <>
      <Reviews />
      <PageCTA onNavigate={onNavigate} label="Work With Me" />
    </>
  );
}

function ProfilePage({ onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="Visit Profile"
        title="Welcome to Profile"
        titleClassName="profile-welcome-title"
      >
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

export default function App() {
  const isMobile = useMediaQuery(MOBILE_MOTION_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const reduceMotion = prefersReducedMotion;
  const motionPreferences = useMemo(
    () => ({ isMobile, prefersReducedMotion, reduceMotion }),
    [isMobile, prefersReducedMotion, reduceMotion],
  );
  const [page, setPage] = useState(getInitialPage);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [exitCompleteCount, setExitCompleteCount] = useState(0);
  const activePage = normalizePage(page);

  const navigate = (nextPage, section) => {
    const target = routeHref(nextPage, section);
    const isRouteChange = normalizePage(page) !== normalizePage(nextPage);

    if (window.location.pathname + window.location.hash !== target) {
      window.history.pushState({ page: nextPage, section }, "", target);
    }

    if (isRouteChange) {
      temporarilyDisableSmoothScroll(760);
      scrollToTopIfNeeded("auto");
    }

    setPage(nextPage);
    setPendingScroll({
      section,
      isRouteChange,
      targetPage: normalizePage(nextPage),
      startExitCompleteCount: exitCompleteCount,
      shouldWaitForExit: isRouteChange && !reduceMotion,
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getInitialPage();
      const isRouteChange = normalizePage(page) !== normalizePage(nextPage);

      if (isRouteChange) {
        temporarilyDisableSmoothScroll(760);
        scrollToTopIfNeeded("auto");
      }

      setPage(nextPage);
      setPendingScroll({
        section: window.location.hash.replace("#", ""),
        isRouteChange,
        targetPage: normalizePage(nextPage),
        startExitCompleteCount: exitCompleteCount,
        shouldWaitForExit: isRouteChange && !reduceMotion,
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [exitCompleteCount, page, reduceMotion]);

  useEffect(() => {
    if (!pendingScroll) return undefined;
    if (pendingScroll.isRouteChange) {
      if (activePage !== pendingScroll.targetPage) return undefined;
      if (pendingScroll.shouldWaitForExit && exitCompleteCount <= pendingScroll.startExitCompleteCount) return undefined;
    }

    const timeoutId = window.setTimeout(
      () => {
        afterRoutePaint(() => {
          const behavior = pendingScroll.isRouteChange ? "auto" : "smooth";

          if (pendingScroll.isRouteChange) {
            temporarilyDisableSmoothScroll(240);
          }

          if (pendingScroll.section) {
            scrollSectionIntoViewIfNeeded(pendingScroll.section, behavior);
          } else {
            scrollToTopIfNeeded(behavior);
          }

          setPendingScroll(null);
        });
      },
      0,
    );

    return () => window.clearTimeout(timeoutId);
  }, [activePage, exitCompleteCount, pendingScroll]);

  useEffect(() => {
    if (activePage !== "home") return undefined;
    if (pendingScroll) return undefined;

    const section = window.location.hash.replace("#", "");
    if (!section) return undefined;

    const timeoutId = window.setTimeout(() => {
      afterRoutePaint(() => {
        temporarilyDisableSmoothScroll(240);
        scrollSectionIntoViewIfNeeded(section, "auto");
      });
    }, 420);

    return () => window.clearTimeout(timeoutId);
  }, [activePage, pendingScroll]);

  const pageContent = (
    <>
      {activePage === "projects" ? <ProjectsPage onNavigate={navigate} /> : null}
      {activePage === "reviews" ? <ReviewsPage onNavigate={navigate} /> : null}
      {activePage === "profile" ? <ProfilePage onNavigate={navigate} /> : null}
      {activePage === "home" ? <HomePage onNavigate={navigate} /> : null}
    </>
  );

  return (
    <MotionPreferenceContext.Provider value={motionPreferences}>
      <main className="min-h-screen overflow-x-clip bg-night text-white antialiased">
        <ScrollProgress />
        <ChromeNav currentPage={activePage} onNavigate={navigate} />
        {reduceMotion ? (
          <div className="page-transition-layer" key={activePage}>
            {pageContent}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => setExitCompleteCount((value) => value + 1)}>
            <motion.div
              className="page-transition-layer"
              key={activePage}
              initial={{ opacity: 0, scale: 0.996 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.998 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {pageContent}
            </motion.div>
          </AnimatePresence>
        )}
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
    </MotionPreferenceContext.Provider>
  );
}
