import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Certifications from "@/components/certifications";
import Resume from "@/components/resume";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
