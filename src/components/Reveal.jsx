import { useEffect, useRef, useState } from "react";

import { useMotionPreferences } from "../context/MotionPreferences";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { isMobile, reduceMotion } = useMotionPreferences();

  useEffect(() => {
    if (reduceMotion || isMobile) {
      setVisible(true);
      return undefined;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isMobile, reduceMotion]);

  const revealClassName = ["reveal-motion", visible ? "reveal-motion-visible" : "", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={revealClassName} style={visible || isMobile ? undefined : { "--reveal-delay": `${delay}s` }}>
      {children}
    </div>
  );
}
