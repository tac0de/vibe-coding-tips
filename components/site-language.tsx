"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type SiteLanguage = "en" | "ko";

type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (value: SiteLanguage) => void;
  t: (en: string, ko: string) => string;
};

const STORAGE_KEY = "vibe-coding-tips:language";

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ko") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (value: SiteLanguage) => {
    setLanguage(value);
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  const value = useMemo<SiteLanguageContextValue>(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      t: (en, ko) => (language === "ko" ? ko : en)
    }),
    [language]
  );

  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);
  if (!context) {
    throw new Error("useSiteLanguage must be used within SiteLanguageProvider");
  }
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useSiteLanguage();

  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "border-b border-cobalt text-paper" : "border-b border-transparent hover:text-paper"}
      >
        EN
      </button>
      <span className="text-fog/60">/</span>
      <button
        type="button"
        onClick={() => setLanguage("ko")}
        className={language === "ko" ? "border-b border-cobalt text-paper" : "border-b border-transparent hover:text-paper"}
      >
        KO
      </button>
    </div>
  );
}
