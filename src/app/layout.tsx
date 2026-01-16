import type { Metadata } from "next";
import { Manrope, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-zen-old-mincho",
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TubeCourse - Transform YouTube Playlists into Structured Courses",
  description: "AI-powered platform that transforms YouTube playlists into comprehensive, structured learning courses with summaries, quizzes, and key insights.",
  keywords: ["YouTube", "learning", "courses", "AI", "education", "playlist", "summary"],
  authors: [{ name: "TubeCourse Team" }],
  openGraph: {
    title: "TubeCourse - Transform YouTube Playlists into Structured Courses",
    description: "AI-powered platform that transforms YouTube playlists into comprehensive learning courses.",
    type: "website",
    locale: "en_US",
    siteName: "TubeCourse",
  },
  twitter: {
    card: "summary_large_image",
    title: "TubeCourse - Transform YouTube Playlists into Structured Courses",
    description: "AI-powered platform that transforms YouTube playlists into comprehensive learning courses.",
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
        className={`${manrope.variable} ${zenOldMincho.variable} antialiased`}
      >
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
