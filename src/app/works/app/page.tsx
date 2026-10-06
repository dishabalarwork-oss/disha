import InABit from "@/components/InABit";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCloseButton from "@/components/ProjectCloseButton";

export const metadata = {
  title: "App Design - Disha Balar",
  description: "An app design and prototyping project by Disha Balar.",
};

export default function AppProjectPage() {
  return (
    <main>
      <ProjectCloseButton />
      <InABit />
      <ProjectNavigation 
        prevProject={{ title: "MEGHALAYA", route: "/works/meghalaya" }}
        nextProject={{ title: "BOOK", route: "/works/book" }}
      />
    </main>
  );
}
