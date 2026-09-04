import "./hero.css";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="hero" id="home">
      <div className="hero-photo">
        <img src="/foto ganteng.jpg" alt="Hafy Faza Aqila" />
      </div>

      <h1>Hafy Faza Aqila</h1>

      <p>
        {t.description}
        <br />
        <span>{t.interest1}</span> {language === "id" ? "dan" : "and"}{" "}
        <span>{t.interest2}</span>.
      </p>
    </section>
  );
}

export default Hero;