import { useRef } from "react";
import "./projects.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

function ProjectRow({ title, count, cardTitle, cardDesc, viewGallery }) {
  const scrollRef = useRef(null);
  const [revealRef, visible] = useScrollReveal();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`project-row ${visible ? "is-visible" : ""}`}
      ref={revealRef}
    >
      <h3 className="project-row-title">{title}</h3>

      <div className="project-row-wrapper">
        <button
          className="scroll-btn scroll-btn-left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="project-cards" ref={scrollRef}>
          {Array.from({ length: count }).map((_, i) => (
            <div className="project-card" key={i}>
              <div className="project-card-img"></div>

              <div className="project-card-body">
                <h4>{cardTitle}</h4>
                <p>{cardDesc}</p>
              </div>

              <a href="#" className="project-card-link">
                {viewGallery}
              </a>
            </div>
          ))}
        </div>

        <button
          className="scroll-btn scroll-btn-right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  return (
    <section className="projects" id="projects">
      <h2>{t.title}</h2>

      <ProjectRow
        title={t.rowSchool}
        count={5}
        cardTitle={t.cardTitle}
        cardDesc={t.cardDesc}
        viewGallery={t.viewGallery}
      />
      <ProjectRow
        title={t.rowIndependent}
        count={5}
        cardTitle={t.cardTitle}
        cardDesc={t.cardDesc}
        viewGallery={t.viewGallery}
      />
    </section>
  );
}

export default Projects;