import { useState, useEffect } from "react";
import "./navbar.css";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

const NAV_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "certificate",
  "experience",
  "contact",
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const t = translations[language].navbar;

  useEffect(() => {
    const OFFSET = 120;

    function handleScroll() {
      setScrolled(window.scrollY > 10);

      let current = NAV_IDS[0];
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= OFFSET) current = id;
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
      if (scrolledToBottom) current = NAV_IDS[NAV_IDS.length - 1];

      setActiveSection(current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Tutup menu mobile otomatis begitu salah satu link diklik
  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
         <img
  src={`${import.meta.env.BASE_URL}logo hafey transparant.png`}
  alt="Hafey Portfolio"
/>	
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
          <div className="language">
            <button
              className={language === "en" ? "active" : ""}
              onClick={() => toggleLanguage("en")}
            >
              EN
            </button>
            <button
              className={language === "id" ? "active" : ""}
              onClick={() => toggleLanguage("id")}
            >
              ID
            </button>
          </div>

          <div className="nav-links">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active-link" : ""}
                onClick={handleLinkClick}
              >
                {t[id]}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
}

export default Navbar;