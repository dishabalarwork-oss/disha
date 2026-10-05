import InABit from "@/components/InABit";
import ProjectNavigation from "@/components/ProjectNavigation";

export const metadata = {
  title: "App Design - Disha Balar",
  description: "An app design and prototyping project by Disha Balar.",
};

export default function AppProjectPage() {
  return (
    <main>
      <InABit />
      <ProjectNavigation 
        prevProject={{ title: "MEGHALAYA", route: "/works/meghalaya" }}
        nextProject={{ title: "BOOK", route: "/works/book" }}
      />
    </main>
  );
}
