import Meghalaya from "@/components/Meghalaya";
import ProjectNavigation from "@/components/ProjectNavigation";

export const metadata = {
  title: "Meghalaya Branding - Disha Balar",
  description: "A destination branding project by Disha Balar.",
};

export default function MeghalayaProjectPage() {
  return (
    <main>
      <Meghalaya />
      <ProjectNavigation 
        prevProject={{ title: "BOOK", route: "/works/book" }}
        nextProject={{ title: "APP", route: "/works/app" }}
      />
    </main>
  );
}
