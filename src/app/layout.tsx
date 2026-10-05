import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import GSAPManager from "@/components/GSAPManager";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const manrope = Manrope({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Disha Balar — Communication Designer",
  description: "A communication designer who understands how creative work grows a brand.",
  openGraph: {
    title: "Disha Balar — Communication Designer",
    description: "A communication designer who understands how creative work grows a brand.",
    url: "https://dishabalar.com",
    siteName: "Disha Balar",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${instrumentSerif.variable} ${manrope.variable} ${plexMono.variable} font-body text-ink antialiased`}
      >
        <GSAPManager />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
