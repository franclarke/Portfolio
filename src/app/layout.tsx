import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ViewModeProvider } from "@/lib/viewMode";
import { MotionTierProvider } from "@/lib/motion";
import Header from "@/components/layout/Header";
import ExperimentConsole from "@/components/ui/ExperimentConsole";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Fran Clarke — AI/ML Engineer",
  description:
    "AI/ML Engineer specializing in Computer Vision, ML Applied, and Football Analytics. Building intelligent systems that add signal where there's noise.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Computer Vision",
    "Football Analytics",
    "YOLOv10",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Fran Clarke" }],
  openGraph: {
    title: "Fran Clarke — AI/ML Engineer",
    description:
      "Computer Vision, ML Applied, and Football Analytics. Building intelligent systems.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <MotionTierProvider>
          <ViewModeProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Header />
            {children}
            <ExperimentConsole />
          </ViewModeProvider>
        </MotionTierProvider>
      </body>
    </html>
  );
}
