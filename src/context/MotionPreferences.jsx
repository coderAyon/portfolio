import { createContext, useContext } from "react";

export const MOBILE_MOTION_QUERY = "(max-width: 767px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const MotionPreferenceContext = createContext({
  isMobile: false,
  prefersReducedMotion: false,
  reduceMotion: false,
});

export function useMotionPreferences() {
  return useContext(MotionPreferenceContext);
}
