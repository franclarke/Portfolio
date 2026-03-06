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
  metadataBase: new URL("https://franclarke.dev"),
  title: "Francisco Clarke - Applied AI/ML Engineer",
  description:
    "Applied AI/ML engineer focused on computer vision, generative systems, and production-grade reliability. Building signal from noisy data.",
  keywords: [
    "Applied AI Engineer",
    "ML Engineer",
    "Computer Vision",
    "Generative AI",
    "FastAPI",
    "LoRA",
    "AI Portfolio",
  ],
  authors: [{ name: "Francisco Clarke" }],
  openGraph: {
    title: "Francisco Clarke - Applied AI/ML Engineer",
    description:
      "Computer vision, generative pipelines, and reliability-focused AI systems.",
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
