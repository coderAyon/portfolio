import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import ChromeNav from "./components/ChromeNav";
import ScrollProgress from "./components/ScrollProgress";
import { MOBILE_MOTION_QUERY, MotionPreferenceContext, REDUCED_MOTION_QUERY } from "./context/MotionPreferences";
import { useMediaQuery } from "./hooks/useMediaQuery";
import {
  afterRoutePaint,
  getInitialPage,
  normalizePage,
  routeHref,
  scrollSectionIntoViewIfNeeded,
  scrollToTopIfNeeded,
  temporarilyDisableSmoothScroll,
} from "./lib/routing";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import ReviewsPage from "./pages/ReviewsPage";

export default function App() {
  const isMobile = useMediaQuery(MOBILE_MOTION_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const reduceMotion = prefersReducedMotion || isMobile;
  const motionPreferences = useMemo(
    () => ({ isMobile, prefersReducedMotion, reduceMotion }),
    [isMobile, prefersReducedMotion, reduceMotion],
  );
  const [page, setPage] = useState(getInitialPage);
  const [activeSection, setActiveSection] = useState(() => (typeof window === "undefined" ? "" : window.location.hash.replace("#", "")));
  const [pendingScroll, setPendingScroll] = useState(null);
  const activePage = normalizePage(page);

  const navigate = (nextPage, section) => {
    const target = routeHref(nextPage, section);
    const isRouteChange = normalizePage(page) !== normalizePage(nextPage);

    if (window.location.pathname + window.location.hash !== target) {
      window.history.pushState({ page: nextPage, section }, "", target);
    }

    if (isRouteChange) {
      temporarilyDisableSmoothScroll(220);
    }

    setPage(nextPage);
    setActiveSection(section ?? "");
    setPendingScroll({
      section,
      isRouteChange,
      targetPage: normalizePage(nextPage),
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getInitialPage();
      const isRouteChange = normalizePage(page) !== normalizePage(nextPage);

      if (isRouteChange) {
        temporarilyDisableSmoothScroll(220);
      }

      setPage(nextPage);
      setActiveSection(window.location.hash.replace("#", ""));
      setPendingScroll({
        section: window.location.hash.replace("#", ""),
        isRouteChange,
        targetPage: normalizePage(nextPage),
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [page]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (activePage !== "home") return undefined;
    if (pendingScroll) return undefined;

    let frameId = null;

    const updateSectionFromScroll = () => {
      frameId = null;

      const navBottom = document.querySelector(".site-nav")?.getBoundingClientRect().bottom ?? 0;
      const activationLine = navBottom + Math.min(window.innerHeight * 0.28, 220);
      const lowerLimit = navBottom + 16;
      const sectionIds = ["about", "skills", "contact"];
      let nextSection = "";

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > lowerLimit) {
          nextSection = sectionId;
        }
      });

      setActiveSection((currentSection) => (currentSection === nextSection ? currentSection : nextSection));
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateSectionFromScroll);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [activePage, pendingScroll]);

  useLayoutEffect(() => {
    if (!pendingScroll) return undefined;
    if (!pendingScroll.isRouteChange) return undefined;
    if (activePage !== pendingScroll.targetPage) return undefined;

    temporarilyDisableSmoothScroll(220);

    if (pendingScroll.section) {
      scrollSectionIntoViewIfNeeded(pendingScroll.section, "auto");
    } else {
      scrollToTopIfNeeded("auto");
    }

    setPendingScroll(null);
    return undefined;
  }, [activePage, pendingScroll]);

  useEffect(() => {
    if (!pendingScroll) return undefined;
    if (pendingScroll.isRouteChange) return undefined;

    const timeoutId = window.setTimeout(() => {
      afterRoutePaint(() => {
        const behavior = isMobile ? "auto" : "smooth";

        if (pendingScroll.section) {
          scrollSectionIntoViewIfNeeded(pendingScroll.section, behavior);
        } else {
          scrollToTopIfNeeded(behavior);
        }

        setPendingScroll(null);
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isMobile, pendingScroll]);

  useEffect(() => {
    if (activePage !== "home") return undefined;
    if (pendingScroll) return undefined;

    const section = window.location.hash.replace("#", "");
    if (!section) return undefined;

    const timeoutId = window.setTimeout(() => {
      afterRoutePaint(() => {
        temporarilyDisableSmoothScroll(220);
        scrollSectionIntoViewIfNeeded(section, "auto");
      });
    }, 260);

    return () => window.clearTimeout(timeoutId);
  }, [activePage, pendingScroll]);

  return (
    <MotionPreferenceContext.Provider value={motionPreferences}>
      <main className="min-h-screen overflow-x-clip bg-night text-white antialiased">
        <ScrollProgress />
        <ChromeNav currentPage={activePage} currentSection={activeSection} onNavigate={navigate} />
        <div className="page-transition-layer" key={activePage}>
          {activePage === "projects" ? <ProjectsPage onNavigate={navigate} /> : null}
          {activePage === "reviews" ? <ReviewsPage onNavigate={navigate} /> : null}
          {activePage === "profile" ? <ProfilePage onNavigate={navigate} /> : null}
          {activePage === "home" ? <HomePage onNavigate={navigate} /> : null}
        </div>
        <a
          href="https://wa.me/8801630802119"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-float"
          aria-label="Contact on WhatsApp"
          title="WhatsApp"
        >
          <svg className="whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.02 4C9.4 4 4.02 9.32 4.02 15.88c0 2.09.55 4.13 1.59 5.93L4 28l6.36-1.58a12.1 12.1 0 0 0 5.66 1.4C22.64 27.82 28 22.5 28 15.94 28 9.36 22.64 4 16.02 4Zm0 21.8c-1.74 0-3.44-.46-4.94-1.33l-.35-.2-3.76.93 1-3.62-.23-.37a9.75 9.75 0 0 1-1.5-5.33c0-5.45 4.38-9.86 9.78-9.86 5.4 0 9.8 4.44 9.8 9.92 0 5.43-4.4 9.86-9.8 9.86Zm5.37-7.37c-.29-.14-1.71-.83-1.98-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.28-.02-.44.13-.58.13-.13.29-.33.43-.49.14-.16.19-.28.29-.47.1-.19.05-.35-.02-.49-.07-.14-.64-1.53-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 0.98-1 2.38s1.03 2.76 1.17 2.95c.14.19 2.04 3.08 4.94 4.32.69.29 1.23.47 1.65.6.69.22 1.32.19 1.82.12.56-.08 1.71-.69 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33Z"
            />
          </svg>
        </a>
      </main>
    </MotionPreferenceContext.Provider>
  );
}
