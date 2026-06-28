import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useMotionPreferences } from "../context/MotionPreferences";
import { defaultProfile, readSavedProfile } from "../data/portfolio";
import { navContextTitle, navItems, pageHref, routeHref } from "../lib/routing";

export default function ChromeNav({ currentPage, currentSection, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [navProfile, setNavProfile] = useState(defaultProfile);
  const { reduceMotion } = useMotionPreferences();
  const currentTitle = navContextTitle(currentPage, currentSection);

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
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
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
          {currentTitle ? <span className="nav-current-label">{currentTitle}</span> : null}
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
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
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
