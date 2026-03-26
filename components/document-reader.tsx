"use client";

import { useMemo, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";

type Props = {
  html: string;
  promptBlock?: string | null;
};

export function DocumentReader({ html, promptBlock }: Props) {
  const [mode, setMode] = useState<"prompt" | "notes">(promptBlock ? "prompt" : "notes");
  const hasPrompt = Boolean(promptBlock);

  const notesLabel = useMemo(() => (hasPrompt ? "Notes Only" : "Document"), [hasPrompt]);

  return (
    <div className="space-y-6">
      {hasPrompt ? (
        <section className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("prompt")}
              className={`border-b px-0 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition ${
                mode === "prompt" ? "border-cobalt text-ink" : "border-transparent text-smoke hover:text-ink"
              }`}
            >
              Prompt Only
            </button>
            <button
              type="button"
              onClick={() => setMode("notes")}
              className={`border-b px-0 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition ${
                mode === "notes" ? "border-cobalt text-ink" : "border-transparent text-smoke hover:text-ink"
              }`}
            >
              {notesLabel}
            </button>
          </div>
          <div className="grid gap-1 text-sm text-smoke md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              Copy button lives in prompt view only
            </p>
            <p>문서 설명보다 복붙 실행이 먼저 필요하면 Prompt Only부터 본다.</p>
          </div>
        </section>
      ) : null}

      {hasPrompt && mode === "prompt" ? (
        <section className="border-y border-line py-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Prompt First</p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] md:text-4xl">바로 복붙할 프롬프트</h2>
            </div>
            <CopyPromptButton value={promptBlock ?? ""} />
          </div>
          <pre className="overflow-x-auto border border-ink/10 bg-ink px-4 py-4 text-[13px] leading-7 text-paper">
            <code>{promptBlock}</code>
          </pre>
        </section>
      ) : null}

      {mode === "notes" || !hasPrompt ? (
        <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      ) : null}
    </div>
  );
}
