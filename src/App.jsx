import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Sertificate from "./components/sertificate";
import Experience from "./components/experience";
import Contact from "./components/contact";
import { LanguageProvider } from "./components/LanguageContext";
import Motivation from "./components/motivation";
import Footer from "./components/footer";

function App() {
  return (
    <>
       <LanguageProvider>
      <Navbar />
      <Hero />
     <About />
    <Projects />
    <Skills />
    <Sertificate />
    <Experience />
    <Contact />
    <Motivation />
    <Footer />
    </LanguageProvider>
    </>
  );
}

export default App;