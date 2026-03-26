import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { ReadingProgressProvider } from "@/components/reading-progress";
import { SiteLanguageProvider } from "@/components/site-language";
import "./globals.css";

const display = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "vibe-coding-tips",
  description: "A terminal-quest lecture site for vibe coding, Codex workflows, Tailwind UI, D3, and MCP orchestration."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <SiteLanguageProvider>
          <ReadingProgressProvider>{children}</ReadingProgressProvider>
        </SiteLanguageProvider>
      </body>
    </html>
  );
}
