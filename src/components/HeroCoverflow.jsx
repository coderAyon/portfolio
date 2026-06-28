import { useEffect, useRef, useState } from "react";

import { useMotionPreferences } from "../context/MotionPreferences";
import { assetHref } from "../lib/assets";

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

function useElementInView(ref) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "160px 0px",
      threshold: 0.01,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

export default function HeroCoverflow({ className = "" }) {
  const shellRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { isMobile, prefersReducedMotion, reduceMotion } = useMotionPreferences();
  const isInView = useElementInView(shellRef);
  const total = heroCoverPhotos.length;

  useEffect(() => {
    if (paused || prefersReducedMotion || !isInView) return undefined;
    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 3600);

    return () => window.clearInterval(timerId);
  }, [isInView, paused, prefersReducedMotion, total]);

  const goTo = (nextIndex) => {
    const next = (nextIndex + total) % total;
    if (next === activeIndex) return;
    setActiveIndex(next);
  };

  return (
    <div
      ref={shellRef}
      className={`hero-coverflow-shell hero-coverflow-mounted ${prefersReducedMotion ? "hero-coverflow-reduced" : ""} ${!isInView ? "hero-coverflow-paused" : ""} ${className}`}
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
          const y = isActive ? (reduceMotion ? 0 : -8) : distance * (isMobile ? 4 : 8);
          const scale = Math.max(0.76, 1 - distance * 0.1);
          const rotateY = reduceMotion ? 0 : offset * -22;
          const depth = reduceMotion ? 0 : distance * -54;
          const opacity = distance > 2 ? 0 : 1 - distance * 0.16;

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
    </div>
  );
}
