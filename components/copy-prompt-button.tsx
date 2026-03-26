"use client";

import { useState } from "react";
import { useSiteLanguage } from "@/components/site-language";

type Props = {
  value: string;
  className?: string;
  defaultLabel?: string;
  copiedLabel?: string;
  onCopy?: () => void;
};

export function CopyPromptButton({
  value,
  className,
  defaultLabel,
  copiedLabel,
  onCopy
}: Props) {
  const { t } = useSiteLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    onCopy?.();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ??
        "border-b border-cobalt/50 pb-1 font-mono text-xs uppercase tracking-[0.22em] text-cobalt transition hover:border-cobalt hover:text-paper"
      }
    >
      {copied
        ? copiedLabel ?? t("Copied", "복사됨")
        : defaultLabel ?? t("Copy Prompt", "프롬프트 복사")}
    </button>
  );
}
