import "./contact.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

const CONTACTS = [
  {
    id: "email",
    accent: "#e85d42",
    accentBg: "rgba(232, 93, 66, 0.12)",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/gmail.svg",
    lines: [{ text: "hafy.faza.a@gmail.com", href: "mailto:hafy.faza.a@gmail.com" }],
  },
  {
    id: "instagram",
    accent: "#c0328f",
    accentBg: "rgba(192, 50, 143, 0.10)",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/instagram.svg",
    lines: [
      { text: "@hafyfaza", href: "https://instagram.com/hafyfaza" },
      { text: "@hafey.uiux", href: "https://instagram.com/hafey.uiux" },
    ],
  },
  {
    id: "linkedin",
    accent: "#0a66c2",
    accentBg: "rgba(10, 102, 194, 0.10)",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/linkedin.svg",
    lines: [
      {
        text: "hafy faza aqila",
        href: "https://linkedin.com/in/hafy-faza-aqila",
      },
    ],
  },
  {
    id: "github",
    accent: "#333333",
    accentBg: "rgba(51, 51, 51, 0.08)",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/github.svg",
    lines: [{ text: "hafyfazaa", href: "https://github.com/hafyfazaa" }],
  },
];

function ContactCard({ contact }) {
  const [ref, visible] = useScrollReveal();
  const mainHref = contact.lines[0].href;

  return (
    <a
      href={mainHref}
      target={mainHref.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`contact-card ${visible ? "is-visible" : ""}`}
      ref={ref}
      style={{
        "--accent": contact.accent,
        "--accent-bg": contact.accentBg,
      }}
    >
      <span className="contact-icon-ring">
        <img src={contact.icon} alt={contact.id} className="contact-icon" />
      </span>

      <span className="contact-lines">
        {contact.lines.map((line, i) =>
          contact.lines.length > 1 ? (
            <a
              key={i}
              href={line.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-subline"
              onClick={(e) => e.stopPropagation()}
            >
              {line.text}
            </a>
          ) : (
            <span key={i} className="contact-subline">
              {line.text}
            </span>
          )
        )}
      </span>
    </a>
  );
}

function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section className="contact" id="contact">
      <h2>{t.title}</h2>

      <div className="contact-list">
        {CONTACTS.map((c) => (
          <ContactCard contact={c} key={c.id} />
        ))}
      </div>
    </section>
  );
}

export default Contact;