import { appBasePath } from "./assets";

export const navItems = [
  { label: "About", page: "home", section: "about" },
  { label: "Projects", page: "projects" },
  { label: "Reviews", page: "reviews" },
  { label: "Profile", page: "profile" },
  { label: "Contact", page: "home", section: "contact" },
];

export function navContextTitle(page, section) {
  if (page === "projects") return "Projects";
  if (page === "reviews") return "Reviews";
  if (page === "profile") return "Profile";
  if (page === "home" && section === "contact") return "Contact";
  if (page === "home" && section === "skills") return "Skills";
  if (page === "home" && section === "about") return "About Me";
  return "";
}

export function stripBasePath(pathname) {
  if (!appBasePath) return pathname;
  if (pathname === appBasePath) return "/";
  if (pathname.startsWith(`${appBasePath}/`)) return pathname.slice(appBasePath.length) || "/";
  return pathname;
}

export function routePath(page) {
  if (page === "projects") return "/projects";
  if (page === "reviews") return "/reviews";
  if (page === "profile") return "/profile";
  return "/";
}

export function routeHref(page, section) {
  const path = routePath(page);
  const basePath = appBasePath || "";
  const href = `${basePath}${path}`;
  return section ? `${href}#${section}` : href;
}

export function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const pathname = stripBasePath(window.location.pathname);
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/reviews")) return "reviews";
  if (pathname.startsWith("/profile")) return "profile";
  return "home";
}

export function pageHref(item) {
  return routeHref(item.page, item.section);
}

export function normalizePage(page) {
  return page === "projects" || page === "reviews" || page === "profile" ? page : "home";
}

export function afterRoutePaint(callback) {
  requestAnimationFrame(() => {
    callback();
  });
}

let smoothScrollRestoreTimer = null;

export function temporarilyDisableSmoothScroll(duration = 320) {
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

export function scrollToTopIfNeeded(behavior = "auto") {
  if (typeof window === "undefined") return;
  if (Math.abs(window.scrollY) < 2 && Math.abs(window.scrollX) < 2) return;
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function scrollSectionIntoViewIfNeeded(section, behavior = "auto") {
  if (typeof document === "undefined" || !section) return;

  const element = document.getElementById(section);
  if (!element) return;

  const top = element.getBoundingClientRect().top;
  const scrollMarginTop = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
  if (Math.abs(top - scrollMarginTop) < 2) return;

  element.scrollIntoView({ behavior, block: "start" });
}
