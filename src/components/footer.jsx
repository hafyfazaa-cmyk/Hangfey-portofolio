import "./footer.css";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {year} Hafy Faza Aqila. {t.rights}
      </p>
    </footer>
  );
}

export default Footer;