import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

import { CustomCursor } from "@/components/ui/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
