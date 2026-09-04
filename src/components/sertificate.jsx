import { useState } from "react";
import "./sertificate.css";
import { useScrollReveal } from "./useScrollReveal";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

// Detail nilai kompetensi untuk sertifikat UI/UX Designer Tingkat Pemula
const UIUX_HARD_SKILLS = [
  { name: "Pemahaman Dasar Antarmuka dan Pengalaman Pengguna", score: 90 },
  { name: "Identifikasi Kebutuhan dan Karakteristik Pengguna", score: 91 },
  { name: "Pengenalan Lingkungan Kerja Figma", score: 94 },
  { name: "Penyusunan Wireframe Antarmuka Digital", score: 94 },
  { name: "Penerapan Prinsip Tata Letak dan Hierarki Visual", score: 89 },
  { name: "Penggunaan Warna dan Tipografi Dasar", score: 93 },
  { name: "Perancangan Komponen Antarmuka Dasar", score: 92 },
  { name: "Penyusunan Alur Pengguna Sederhana", score: 91 },
  { name: "Pembuatan Prototipe Statis Menggunakan Figma", score: 95 },
  { name: "Penyajian dan Komunikasi Hasil Desain", score: 88 },
  { name: "Proyek Mini Desain UI/UX Tingkat Pemula", score: 93 },
];

const UIUX_SOFT_SKILLS = [
  { name: "Kemampuan berempati", score: 94 },
  { name: "Keterampilan komunikasi visual", score: 93 },
  { name: "Ketelitian dan perhatian terhadap detail design", score: 95 },
  { name: "Kreativitas dan inovasi dalam design", score: 92 },
  { name: "Kreativitas dan inovasi dalam design", score: 96 },
  { name: "Kemampuan berpikir kritis", score: 94 },
];

// Detail nilai kompetensi untuk sertifikat Front End Developers Tingkat Dasar
const FRONTEND_HARD_SKILLS = [
  { name: "Memahami dasar HTML, CSS, dan JavaScript", score: 86 },
  { name: "Membuat komponen React JS (functional component)", score: 86 },
  { name: "Menggunakan props dan state pada React", score: 86 },
  { name: "Menerapkan React hooks dasar (useState, useEffect)", score: 86 },
  { name: "Membuat routing antar halaman (React Router)", score: 86 },
  { name: "Melakukan styling antarmuka dengan CSS/Tailwind", score: 86 },
  { name: "Menghubungkan aplikasi ke database melalui API (fetch/axios)", score: 86 },
  { name: "Menampilkan dan mengelola data dari database pada UI", score: 86 },
];

const FRONTEND_SOFT_SKILLS = [
  { name: "Berpikir logis dan analitis dalam pemecahan masalah", score: 86 },
  { name: "Kreativitas dalam mendesain antarmuka", score: 86 },
  { name: "Ketelitian dalam debugging program", score: 86 },
  { name: "Kemampuan bekerja sama dalam tim (kolaborasi proyek)", score: 86 },
];

// Detail nilai kompetensi untuk sertifikat UI/UX Desainer Tingkat Dasar (v2)
const UIUX_V2_HARD_SKILLS = [
  { name: "Memahami prinsip dasar desain UI/UX", score: 88 },
  { name: "Membuat wireframe rancangan aplikasi/website", score: 88 },
  { name: "Menentukan tata letak (layout) dan grid system", score: 88 },
  { name: "Memilih kombinasi warna dan tipografi yang sesuai", score: 88 },
  { name: "Membuat desain antarmuka menggunakan Figma", score: 88 },
  { name: "Membuat prototipe interaktif (clickable prototype)", score: 88 },
  { name: "Menerapkan konsep user flow dan navigasi", score: 88 },
  { name: "Melakukan evaluasi desain berdasarkan usability sederhana", score: 88 },
];

const UIUX_V2_SOFT_SKILLS = [
  { name: "Kreativitas dan inovasi dalam desain", score: 87 },
  { name: "Empati terhadap kebutuhan pengguna (user-centered thinking)", score: 87 },
  { name: "Komunikasi visual yang efektif", score: 87 },
  { name: "Kemampuan menerima dan mengolah masukan (feedback)", score: 87 },
];

const CERTIFICATES = [
  {
    id: "penghargaan-ikhlas",
    category: "penghargaan",
    title: "The Most Ikhlas Student",
    provider: "SMK Skill Village Islamic School",
    badge: null,
    image: "/certificates/penghargaan-ikhlas-student.jpg",
    hasDetail: false,
  },
  {
    id: "uiux-designer-pemula",
    category: "uiux",
    title: "UI/UX Designer Tingkat Pemula",
    provider: "Skillage Academy x SMK Skill Village",
    badge: "Sangat Kompeten",
    image: "/certificates/uiux-designer-pemula-front.jpg",
    hasDetail: true,
    hardSkills: UIUX_HARD_SKILLS,
    hardSkillScore: 91,
    hardSkillLabel: "Sangat Kompeten",
    softSkills: UIUX_SOFT_SKILLS,
    softSkillScore: 94,
    softSkillLabel: "Teladan Profesional",
  },
  {
    id: "frontend-developers-dasar",
    category: "frontend",
    title: "Front End Developers Tingkat Dasar",
    provider: "Skillage Academy x SMK Skill Village",
    badge: "Kompeten",
    image: "/certificates/frontend-developers-dasar-front.jpg",
    hasDetail: true,
    hardSkills: FRONTEND_HARD_SKILLS,
    hardSkillScore: 86,
    hardSkillLabel: "Kompeten",
    softSkills: FRONTEND_SOFT_SKILLS,
    softSkillScore: 86,
    softSkillLabel: "Telah Terbentuk",
  },
  {
    id: "uiux-desainer-dasar-v2",
    category: "uiux",
    title: "UI/UX Desainer Tingkat Dasar",
    provider: "Skillage Academy x SMK Skill Village",
    badge: "Kompeten",
    image: "/certificates/uiux-desainer-dasar-v2-front.jpg",
    hasDetail: true,
    hardSkills: UIUX_V2_HARD_SKILLS,
    hardSkillScore: 88,
    hardSkillLabel: "Kompeten",
    softSkills: UIUX_V2_SOFT_SKILLS,
    softSkillScore: 87,
    softSkillLabel: "Telah Terbentuk",
  },
  {
    id: "surat-referensi-kompetensi-kerja",
    category: "penghargaan",
    title: "Surat Referensi Kompetensi Kerja",
    provider: "PT. Phoenix Cendekia Indonesia",
    badge: "Junior Back End Developer",
    image: "/certificates/surat-referensi-kompetensi-kerja.jpg",
    hasDetail: false,
  },
  {
    id: "canva-graphic-design-essentials",
    category: "canva",
    title: "Graphic Design Essentials",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-graphic-design-essentials.jpg",
    hasDetail: false,
  },
  {
    id: "canva-essentials",
    category: "canva",
    title: "Canva Essentials",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-essentials.jpg",
    hasDetail: false,
  },
  {
    id: "canva-visual-suite",
    category: "canva",
    title: "Meet Canva's Visual Suite",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-visual-suite.jpg",
    hasDetail: false,
  },
  {
    id: "canva-konten-memikat",
    category: "canva",
    title: "Buat Konten Memikat",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-konten-memikat.jpg",
    hasDetail: false,
  },
  {
    id: "canva-dasar-guru",
    category: "canva",
    title: "Pengetahuan Dasar Guru",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-dasar-guru.jpg",
    hasDetail: false,
  },
  {
    id: "canva-perkenalan-visual",
    category: "canva",
    title: "Perkenalan Aplikasi Visual Canva",
    provider: "Canva Design School",
    badge: "Certified",
    image: "/certificates/canva-perkenalan-visual.jpg",
    hasDetail: false,
  },
];

function CertificateModal({ cert, onClose, t }) {
  const [tab, setTab] = useState("sertificate");

  if (!cert) return null;

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-header">
          {cert.hasDetail ? (
            <div className="cert-modal-tabs">
              <button
                className={tab === "sertificate" ? "active" : ""}
                onClick={() => setTab("sertificate")}
              >
                {t.tabCertificate}
              </button>
              <button
                className={tab === "kompetensi" ? "active" : ""}
                onClick={() => setTab("kompetensi")}
              >
                {t.tabCompetency}
              </button>
            </div>
          ) : (
            <span className="cert-modal-title-plain">{cert.title}</span>
          )}

          <button className="cert-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cert-modal-body">
          {tab === "sertificate" || !cert.hasDetail ? (
            <img src={cert.image} alt={cert.title} className="cert-modal-img" />
          ) : (
            <div className="cert-kompetensi">
              <div className="cert-kompetensi-block">
                <div className="cert-kompetensi-block-header">
                  <h4>{t.hardSkillHeader}</h4>
                  <span className="cert-score-pill">
                    {cert.hardSkillScore} · {cert.hardSkillLabel}
                  </span>
                </div>
                <table>
                  <tbody>
                    {cert.hardSkills.map((item, i) => (
                      <tr key={i}>
                        <td className="cert-kompetensi-no">{i + 1}</td>
                        <td>{item.name}</td>
                        <td className="cert-kompetensi-score">{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cert-kompetensi-block">
                <div className="cert-kompetensi-block-header">
                  <h4>{t.softSkillHeader}</h4>
                  <span className="cert-score-pill">
                    {cert.softSkillScore} · {cert.softSkillLabel}
                  </span>
                </div>
                <table>
                  <tbody>
                    {cert.softSkills.map((item, i) => (
                      <tr key={i}>
                        <td className="cert-kompetensi-no">{i + 1}</td>
                        <td>{item.name}</td>
                        <td className="cert-kompetensi-score">{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Sertificate() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedCert, setSelectedCert] = useState(null);
  const [ref, visible] = useScrollReveal();
  const { language } = useLanguage();
  const t = translations[language].sertificate;

  const CATEGORIES = [
    { id: "semua", label: t.filterAll },
    { id: "uiux", label: t.filterUiux },
    { id: "canva", label: t.filterCanva },
    { id: "frontend", label: t.filterFrontend },
    { id: "penghargaan", label: t.filterAward },
  ];

  const filtered =
    activeCategory === "semua"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeCategory);

  return (
    <section className="sertificate" id="certificate">
      <h2>{t.title}</h2>

      <div className="cert-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cert-filter-btn ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div ref={ref} className={`cert-grid ${visible ? "is-visible" : ""}`}>
        {filtered.length === 0 ? (
          <p className="cert-empty">{t.emptyState}</p>
        ) : (
          filtered.map((cert) => (
            <div
              className="cert-card"
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-card-img-wrap">
                <img src={cert.image} alt={cert.title} />
              </div>

              <div className="cert-card-body">
                <span className={`cert-tag cert-tag-${cert.category}`}>
                  {t.categoryLabels[cert.category]}
                </span>

                <h3>{cert.title}</h3>
                <p className="cert-provider">{cert.provider}</p>

                {cert.badge && (
                  <span className="cert-badge">{cert.badge}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
        t={t}
      />
    </section>
  );
}

export default Sertificate;