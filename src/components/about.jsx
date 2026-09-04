import "./about.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

function About() {
  const [ref, visible] = useScrollReveal();
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section className="about" id="about">
      <div ref={ref} className={`about-inner ${visible ? "is-visible" : ""}`}>
        <div className="about-image">
          <img src="/About me.png" alt="Hafy Faza Aqila" className="img-about" />
        </div>

        <div className="about-content">
          <h2>{t.title}</h2>

          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>

          <div className="edu-card edu-current">
            <div className="edu-top">
              <img src="/logo skillvillage.png" alt="" className="edu-logo" />
              <span className="edu-name">SMK Skill Village Islamic School</span>
              <span className="edu-detail">{t.eduCurrentMajor}</span>
              <span className="edu-detail">{t.eduCurrentGrade}</span>
            </div>
            <div className="edu-bottom">{t.eduCurrentNote}</div>
          </div>

          <div className="edu-card edu-smp">
            <div className="edu-top">
              <img src="/logo smp ip.png" alt="" className="edu-logo" />
              <span className="edu-name">SMP IPBS Tunas Bangsa</span>
              <span className="edu-detail">{t.eduSmpInterest}</span>
            </div>
            <div className="edu-bottom">{t.eduSmpNote}</div>
          </div>

          <div className="edu-card edu-sd">
            <div className="edu-top">
              <img src="/logo sd muh.png" alt="" className="edu-logo" />
              <span className="edu-name">SD Muhamadiyah 1 Muntilan</span>
              <span className="edu-detail">{t.eduSdInterest}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;