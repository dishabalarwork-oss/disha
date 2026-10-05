import Wirewood from "@/components/Wirewood";
import ProjectNavigation from "@/components/ProjectNavigation";

export const metadata = {
  title: "Book Project - Disha Balar",
  description: "A publication design project by Disha Balar.",
};

export default function BookProjectPage() {
  return (
    <main>
      <Wirewood />
      <ProjectNavigation 
        prevProject={{ title: "APP", route: "/works/app" }}
        nextProject={{ title: "MEGHALAYA", route: "/works/meghalaya" }}
      />
    </main>
  );
}
