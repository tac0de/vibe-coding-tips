"use client";

import { useState } from "react";

export function CopyPromptButton({ value }: { value: string }) {
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
      {copied ? "Copied" : "Copy Prompt"}
    </button>
  );
}
