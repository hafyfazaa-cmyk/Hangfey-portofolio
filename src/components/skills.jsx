import "./skills.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

const SKILLS = [
  { name: "FIGMA", icon: `${import.meta.env.BASE_URL}skills/logo figma.png` },
  { name: "Canva", icon: `${import.meta.env.BASE_URL}skills/logo canva.png` },
  { name: "Ms. Office", icon: `${import.meta.env.BASE_URL}skills/logo ms office.png` },
  { name: "Clip Studio Paint", icon: `${import.meta.env.BASE_URL}skills/logo clip studio paint.png` },
  { name: "Notion", icon: `${import.meta.env.BASE_URL}skills/logo notion.png` },
  { name: "HTML", icon: `${import.meta.env.BASE_URL}skills/logo html.png` },
  { name: "CSS", icon: `${import.meta.env.BASE_URL}skills/logo css.png` },
  { name: "JS", icon: `${import.meta.env.BASE_URL}skills/logo js.png` },
  { name: "React", icon: `${import.meta.env.BASE_URL}skills/logo react.png` },
  { name: "Tailwind CSS", icon: `${import.meta.env.BASE_URL}skills/logo tailwind.png` },
  { name: "PHP", icon: `${import.meta.env.BASE_URL}skills/logo php.png` },
  { name: "Draw io", icon: `${import.meta.env.BASE_URL}skills/logo draw io.png` },
  { name: "Git Hub", icon: `${import.meta.env.BASE_URL}skills/logo github.png` },
];
function Skills() {
  const [ref, visible] = useScrollReveal();
  const { language } = useLanguage();
  const t = translations[language].skills;

  return (
    <section className="skills" id="skills">
      <h2>{t.title}</h2>

      <div
        ref={ref}
        className={`skills-grid ${visible ? "is-visible" : ""}`}
      >
        {SKILLS.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <img src={skill.icon} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;