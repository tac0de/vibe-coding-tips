import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { LibraryGate } from "@/components/library-gate";
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
  description: "UI, Tailwind, D3, 그리고 에이전트 작업 흐름을 바로 따라 쓰는 프롬프트 모음집."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <LibraryGate>{children}</LibraryGate>
      </body>
    </html>
  );
}
