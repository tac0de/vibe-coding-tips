import type { Metadata } from "next";
import { JetBrains_Mono, Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";
import { ReadingProgressProvider } from "@/components/reading-progress";
import { SiteLanguageProvider } from "@/components/site-language";
import { WorkbenchStateProvider } from "@/components/workbench-state";
import "./globals.css";

const display = Nanum_Myeongjo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"]
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
  title: "Minimal Prompt Library for UI Agent Work",
  description:
    "A minimal prompt collection for UI developers directing agents across legacy CSS, D3, browser verification, and visual quality control."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <SiteLanguageProvider>
          <ReadingProgressProvider>
            <WorkbenchStateProvider>{children}</WorkbenchStateProvider>
          </ReadingProgressProvider>
        </SiteLanguageProvider>
      </body>
    </html>
  );
}
