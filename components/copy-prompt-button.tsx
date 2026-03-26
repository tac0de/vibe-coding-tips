"use client";

import { useState } from "react";
import { useSiteLanguage } from "@/components/site-language";

export function CopyPromptButton({ value }: { value: string }) {
  const { t } = useSiteLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="border-b border-cobalt/50 pb-1 font-mono text-xs uppercase tracking-[0.22em] text-cobalt transition hover:border-cobalt hover:text-paper"
    >
      {copied ? t("Copied", "복사됨") : t("Copy Prompt", "프롬프트 복사")}
    </button>
  );
}
