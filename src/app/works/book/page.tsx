import Wirewood from "@/components/Wirewood";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCloseButton from "@/components/ProjectCloseButton";

export const metadata = {
  title: "Book Project - Disha Balar",
  description: "A publication design project by Disha Balar.",
};

export default function BookProjectPage() {
  return (
    <main>
      <ProjectCloseButton />
      <Wirewood />
      <ProjectNavigation 
        prevProject={{ title: "APP", route: "/works/app" }}
        nextProject={{ title: "MEGHALAYA", route: "/works/meghalaya" }}
      />
    </main>
  );
}
