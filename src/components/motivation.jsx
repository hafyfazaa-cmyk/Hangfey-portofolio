import { useEffect, useRef, useState } from "react";
import "./motivation.css";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

// Tiap blok: waktu mulai (detik) + teks dalam dua bahasa
const LYRICS = [
  {
    start: 0,
    id: `Pernah nggak sih...
kita melihat diri kita sendiri,
terus bertanya...
"Sebenarnya aku bisa nggak, ya?"
Kadang kita terlalu fokus sama hasil orang lain,
sampai lupa...
kalau kita sendiri juga sedang berproses.
Dan aku juga pernah ada di posisi itu.`,
    en: `Have you ever...
looked at yourself,
and asked...
"Am I really capable, or not?"
Sometimes we focus too much on other people's results,
until we forget...
that we're also in the middle of our own process.
And I've been in that place too.`,
  },
  {
    start: 25,
    id: `Pernah merasa capek.
Pernah merasa tertinggal.
Pernah merasa apa yang aku lakukan
nggak akan membawa aku ke mana-mana.
Sampai akhirnya,
aku berpikir untuk menyerah.
Tapi setelah dipikir-pikir lagi...
menyerah ternyata nggak membuat semuanya menjadi lebih baik.`,
    en: `There were times I felt exhausted.
Times I felt left behind.
Times I felt like what I was doing
wasn't leading anywhere.
Until eventually,
I thought about giving up.
But after thinking it over again...
giving up never actually made things better.`,
  },
  {
    start: 55,
    id: `Justru dari situ aku sadar...
kita semua sebenarnya mulai dari nol.
Nggak ada yang langsung jago.
Nggak ada yang langsung bisa.
Dan nggak ada yang langsung mendapatkan
apa yang mereka inginkan.
Aku pun masih belajar.
Masih sering salah.
Masih sering merasa kurang.
Tapi mungkin...
memang seperti itulah prosesnya.`,
    en: `That's when I realized...
we all really start from zero.
No one is instantly skilled.
No one is instantly capable.
And no one instantly gets
what they're hoping for.
I'm still learning too.
Still making mistakes often.
Still feeling like I'm not enough.
But maybe...
that's simply how the process works.`,
  },
  {
    start: 85,
    id: `Dulu aku pikir desain itu susah.
Ngoding juga susah.
Menggambar pun rasanya susah banget.
Kadang sudah mencoba,
hasilnya masih jauh dari yang aku bayangkan.
Tapi semakin aku mencoba...
aku mulai sadar,
ternyata bukan karena aku nggak bisa.
Aku cuma...
belum terbiasa.`,
    en: `I used to think design was hard.
Coding felt hard too.
Even drawing felt really difficult.
Sometimes I'd try,
and the result was still far from what I imagined.
But the more I kept trying...
I began to realize,
it wasn't that I couldn't do it.
I just...
wasn't used to it yet.`,
  },
  {
    start: 115,
    id: `Karena sesuatu yang sulit
kalau terus dipelajari,
perlahan akan menjadi lebih mudah.
Satu kesalahan diperbaiki.
Satu kemampuan bertambah.
Satu langkah kecil dilakukan.
Dan tanpa kita sadari...
diri kita yang sekarang
sudah berbeda dengan diri kita yang dulu.`,
    en: `Because something difficult,
when you keep learning it,
slowly becomes easier.
One mistake gets corrected.
One skill grows a little more.
One small step gets taken.
And without realizing it...
the person we are now
is already different from who we were before.`,
  },
  {
    start: 145,
    id: `Jadi untuk kalian yang sedang membaca ini...
jangan menyerah, ya.
Kalau sekarang masih sulit,
nggak apa-apa.
Kalau hasilnya belum sesuai harapan,
nggak apa-apa.
Kalau kalian masih merasa belum hebat,
juga nggak apa-apa.
Karena kalian nggak harus langsung hebat.
Kalian hanya perlu...
terus berjalan.`,
    en: `So to anyone reading this right now...
please don't give up.
If things still feel hard,
that's okay.
If the results aren't what you hoped for yet,
that's okay.
If you still feel like you're not great yet,
that's okay too.
Because you don't have to be great right away.
You just need...
to keep moving forward.`,
  },
  {
    start: 175,
    id: `Aku tahu rasanya ingin berhenti.
Aku pernah merasakannya.
Tapi sekarang aku memilih
untuk terus maju.
Bukan karena aku sudah hebat.
Tapi karena aku masih punya
sesuatu yang ingin aku capai.
Masih ada tujuan.
Masih ada mimpi.
Dan masih ada banyak hal
yang ingin aku pelajari.`,
    en: `I know what it feels like to want to stop.
I've felt it myself.
But right now I choose
to keep moving forward.
Not because I'm already great.
But because I still have
something I want to achieve.
There's still a goal.
Still a dream.
And still so much
I want to learn.`,
  },
  {
    start: 200,
    id: `Mungkin perjalanan ini masih panjang.
Mungkin akan ada hari
di mana aku kembali merasa lelah.
Tapi kali ini...
aku nggak mau menyerah
hanya karena semuanya terasa sulit.
Karena aku percaya...
usaha yang kita lakukan hari ini,
suatu saat akan menjadi bagian
dari sesuatu yang kita banggakan.`,
    en: `Maybe this journey is still long.
Maybe there will be days
where I feel tired all over again.
But this time...
I don't want to give up
just because everything feels hard.
Because I believe...
the effort we put in today
will one day become part
of something we're proud of.`,
  },
  {
    start: 225,
    id: `Jadi...
untuk kamu yang sedang berjuang,
semangat.
Jangan menyerah.
Pelan-pelan saja.
Yang penting...
tetap maju.`,
    en: `So...
to you who are still fighting,
stay strong.
Don't give up.
Take it slow.
What matters most...
is that you keep moving forward.`,
  },
];

// Cari blok aktif berdasarkan waktu, lalu hitung berapa karakter
// yang seharusnya sudah "diketik" berdasarkan posisi waktu saat ini
function computeDisplayText(currentTime, language) {
  let idx = -1;
  for (let i = 0; i < LYRICS.length; i++) {
    if (currentTime >= LYRICS[i].start) idx = i;
  }
  if (idx === -1) return "";

  const block = LYRICS[idx];
  const nextStart = LYRICS[idx + 1] ? LYRICS[idx + 1].start : block.start + 25;
  const duration = nextStart - block.start;
  const elapsed = currentTime - block.start;
  const fraction = duration > 0 ? Math.min(1, Math.max(0, elapsed / duration)) : 1;

  const text = language === "id" ? block.id : block.en;
  const charCount = Math.floor(fraction * text.length);
  return text.slice(0, charCount);
}

function Motivation() {
  const audioRef = useRef(null);
  const languageRef = useRef("id");

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const { language } = useLanguage();
  const t = translations[language].motivation;

  // Selalu simpan bahasa terbaru ke ref, supaya event listener yang
  // dipasang sekali (di effect mount) tetap baca bahasa paling baru
  languageRef.current = language;

  // Pasang listener sekali saja saat mount — progres ketik murni
  // mengikuti posisi audio, jadi otomatis berhenti saat di-pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleTimeUpdate() {
      setDisplayedText(computeDisplayText(audio.currentTime, languageRef.current));
    }

    function handleEnded() {
      setIsPlaying(false);
      setHasEnded(true);
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Begitu bahasa diganti, langsung hitung ulang teks di posisi
  // waktu sekarang — jalan baik lagi main maupun lagi di-pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setDisplayedText(computeDisplayText(audio.currentTime, language));
  }, [language]);

  function handlePlayClick() {
    const audio = audioRef.current;
    if (!audio) return;

    if (hasEnded) {
      audio.currentTime = 0;
      setDisplayedText("");
      setHasEnded(false);
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  return (
    <section className="motivation" id="motivation">
      <h2>{t.title}</h2>
      <p className="motivation-subtitle">{t.subtitle}</p>

      <button className="motivation-play-btn" onClick={handlePlayClick}>
        {isPlaying ? "❚❚" : hasEnded ? "↻" : "▶"}
      </button>

      <div className="motivation-text">{displayedText}</div>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/motivasi-jangan-menyerah.mp3`}
        preload="auto"
      ></audio>
    </section>
  );
}

export default Motivation;