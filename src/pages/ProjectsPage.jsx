import PageCTA from "../components/PageCTA";
import Projects from "../sections/Projects";

export default function ProjectsPage({ onNavigate }) {
  return (
    <>
      <Projects />
      <PageCTA onNavigate={onNavigate} label="Contact Ayon" />
    </>
  );
}
