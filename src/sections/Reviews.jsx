import { Star } from "lucide-react";

import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { fiverrReviews } from "../data/portfolio";

function ReviewProofCard({ review, index }) {
  return (
    <article className="review-proof-card" tabIndex={0}>
      <div className="review-proof-topline">
        <span className="inline-flex items-center gap-2">
          <Star className="h-4 w-4 fill-violet-aura text-violet-aura" />
          Fiverr Review
        </span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <img
        className="review-proof-image"
        src={review.image}
        alt={review.alt}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={index < 2 ? "high" : "low"}
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
      />
    </article>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section-wrap reviews-section relative overflow-clip">
      <div className="section-glow right-[8%] top-12" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Fiverr Reviews"
          title="Real client feedback, presented as polished proof."
          copy="A dedicated wall of Fiverr review screenshots, designed to build trust while keeping the portfolio visually premium."
        />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl">
          <div className="review-stats">
            {[
              ["10", "Clients Feedback"],
              ["4.8", "Average Rating"],
              ["Fiverr", "Verified Marketplace"],
            ].map(([value, label], index) => (
              <div key={label} className="motion-item review-stat" style={{ "--item-delay": `${index * 90}ms` }}>
                <span>{value}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="review-proof-grid mt-14">
          {fiverrReviews.map((review, index) => (
            <Reveal key={review.image} delay={(index % 4) * 0.05}>
              <div className="motion-item">
                <ReviewProofCard review={review} index={index} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
