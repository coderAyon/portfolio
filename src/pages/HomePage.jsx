import About from "../sections/About";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import Skills from "../sections/Skills";

export default function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
