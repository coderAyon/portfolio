import { motion, useScroll, useSpring } from "framer-motion";

import { useMotionPreferences } from "../context/MotionPreferences";

function AnimatedScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-frost shadow-[0_0_18px_rgba(157,101,255,.9)]" style={{ scaleX }} />;
}

export default function ScrollProgress() {
  const { reduceMotion } = useMotionPreferences();
  return reduceMotion ? null : <AnimatedScrollProgress />;
}
