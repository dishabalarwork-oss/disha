import Meghalaya from "@/components/Meghalaya";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCloseButton from "@/components/ProjectCloseButton";

export const metadata = {
  title: "Meghalaya Branding - Disha Balar",
  description: "A destination branding project by Disha Balar.",
};

export default function MeghalayaProjectPage() {
  return (
    <main>
      <ProjectCloseButton />
      <Meghalaya />
      <ProjectNavigation 
        prevProject={{ title: "BOOK", route: "/works/book" }}
        nextProject={{ title: "APP", route: "/works/app" }}
      />
    </main>
  );
}
