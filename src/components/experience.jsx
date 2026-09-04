import { useLayoutEffect, useRef, useState } from "react";
import "./experience.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

const EXPERIENCES = [
  {
    id: "magang-it",
    status: "current",
    statusLabel: "CURRENT",
    date: "Jun 2026 - Present",
    company: "PT. Brantas Abipraya",
    location: "Jakarta Timur, Indonesia",
    mode: "On Site/WFO",
    duration: "6 months",
    accent: "#1a237e",
  },
  {
    id: "skillage-mengajar",
    status: "past",
    statusLabel: "PAST",
    date: "April 2026",
    company: "SMPN 3 Cikarang",
    location: "Bekasi, Indonesia",
    mode: "School Event",
    duration: "1 Day",
    accent: "#f4c400",
  },
  {
    id: "web-skillage-edupark",
    status: "past",
    statusLabel: "PAST",
    date: "Mar 2026 - Jun 2026",
    company: "SMK Skill Village Islamic School",
    location: "Bogor, Indonesia",
    mode: "School Event",
    duration: "4 Month",
    accent: "#2e7d32",
  },
  {
    id: "design-e-tahfidz",
    status: "past",
    statusLabel: "PAST",
    date: "Maret 2026",
    company: "SMK Skill Village Islamic School",
    location: "Bogor, Indonesia",
    mode: "School Event",
    duration: "1 day",
    accent: "#8d6e00",
  },
  {
    id: "children-book-illustration",
    status: "past",
    statusLabel: "PAST",
    date: "Oct 2024 - Feb 2025",
    company: "PKBM Piwulang Becik",
    location: "Semarang, Indonesia",
    mode: "On Site/WFO",
    duration: "4 Months",
    accent: "#e65100",
  },
];

// Ubah warna hex jadi rgba dengan opacity rendah, dipakai untuk background badge
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ExperienceCard({ exp, dotRef, itemT }) {
  const [ref, visible] = useScrollReveal();

  const accentVars = {
    "--accent": exp.accent,
    "--accent-bg": hexToRgba(exp.accent, 0.14),
    "--accent-glow": hexToRgba(exp.accent, 0.32),
  };

  return (
    <div className="exp-item">
      <div className="exp-dot-outer" style={accentVars} ref={dotRef}>
        <span className="exp-dot-inner"></span>
      </div>

      <div
        className={`exp-card ${visible ? "is-visible" : ""}`}
        style={accentVars}
        ref={ref}
      >
        <div className="exp-card-top">
          <span className="exp-status">{exp.statusLabel}</span>
          <span className="exp-date">{exp.date}</span>
        </div>

        <div className="exp-card-heading">
          <span className="exp-company">{exp.company}</span>
          <h3>{itemT.title}</h3>
        </div>

        <div className="exp-card-body">
          <div className="exp-meta">
            <span>{itemT.type}</span>
            <span>{exp.location}</span>
            <span>{exp.mode}</span>
            <span>{exp.duration}</span>
          </div>

          <ul className="exp-bullets">
            {itemT.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const timelineRef = useRef(null);
  const firstDotRef = useRef(null);
  const lastDotRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });
  const { language } = useLanguage();
  const t = translations[language].experience;

  useLayoutEffect(() => {
    function updateLine() {
      const container = timelineRef.current;
      const firstDot = firstDotRef.current;
      const lastDot = lastDotRef.current;
      if (!container || !firstDot || !lastDot) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      const top = firstRect.top - containerRect.top + firstRect.height / 2;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;

      setLineStyle({ top, height: bottom - top });
    }

    updateLine();
    window.addEventListener("resize", updateLine);
    window.addEventListener("load", updateLine);

    return () => {
      window.removeEventListener("resize", updateLine);
      window.removeEventListener("load", updateLine);
    };
  }, [language]);

  return (
    <section className="experience" id="experience">
      <h2>{t.title}</h2>

      <div className="exp-timeline" ref={timelineRef}>
        <div
          className="exp-line"
          style={{
            top: `${lineStyle.top}px`,
            height: `${lineStyle.height}px`,
          }}
        ></div>

        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard
            exp={exp}
            key={exp.id}
            itemT={t.items[exp.id]}
            dotRef={
              i === 0
                ? firstDotRef
                : i === EXPERIENCES.length - 1
                ? lastDotRef
                : null
            }
          />
        ))}
      </div>

      <div className="cv-section">
        <p className="cv-label">{t.cvLabel}</p>

        <div className="cv-buttons">
          <a
            className="cv-btn"
            href={`${import.meta.env.BASE_URL}cv/CV-Hafy-Faza-Aqila-English.pdf`}
            download
          >
            <span className="cv-icon">⬇</span>
            <span className="cv-btn-text">
              <strong>{t.cvEnglish}</strong>
              <small>{t.cvDownload}</small>
            </span>
          </a>

          <a
            className="cv-btn"
            href={`${import.meta.env.BASE_URL}cv/CV-Hafy-Faza-Aqila-Indonesia.pdf`}
            download
          >
            <span className="cv-icon">⬇</span>
            <span className="cv-btn-text">
              <strong>{t.cvIndonesia}</strong>
              <small>{t.cvDownload}</small>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Experience;