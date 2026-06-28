import PageCTA from "../components/PageCTA";
import Reviews from "../sections/Reviews";

export default function ReviewsPage({ onNavigate }) {
  return (
    <>
      <Reviews />
      <PageCTA onNavigate={onNavigate} label="Work With Me" />
    </>
  );
}
