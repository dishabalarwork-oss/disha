import Link from "next/link";

export default function ProjectCloseButton() {
  return (
    <div className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[100] mix-blend-difference">
      <Link 
        href="/#work" 
        className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-transparent outline-none"
        aria-label="Close project"
      >
        <span className="text-white group-hover:text-ink font-mono text-xl leading-none -mt-[2px] block transition-colors duration-300">
          ×
        </span>
      </Link>
    </div>
  );
}
