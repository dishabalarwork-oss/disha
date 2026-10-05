import Hero from "@/components/Hero";
import Positioning from "@/components/Positioning";
import SkillsSlab from "@/components/SkillsSlab";
import WorksGallery from "@/components/WorksGallery";
import Experience from "@/components/Experience";
import Modelling from "@/components/Modelling";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <SkillsSlab />
      <WorksGallery />
      <Experience />
      <Modelling />
      <Skills />
      <Contact />
    </>
  );
}
