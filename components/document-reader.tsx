"use client";

import { useMemo, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import type { ContentLink } from "@/lib/content/types";

type Props = {
  html: string;
  promptBlock?: string | null;
  situationLead?: string | null;
  summaryPoints: string[];
  failurePoints: string[];
  nextLink?: ContentLink | null;
};

export function DocumentReader({
  html,
  promptBlock,
  situationLead,
  summaryPoints,
  failurePoints,
  nextLink
}: Props) {
  const [mode, setMode] = useState<"prompt" | "compact" | "notes">(promptBlock ? "prompt" : "compact");
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
              onClick={() => setMode("compact")}
              className={`border-b px-0 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition ${
                mode === "compact" ? "border-cobalt text-ink" : "border-transparent text-smoke hover:text-ink"
              }`}
            >
              Compact
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

      {mode === "compact" ? (
        <section className="grid gap-4 border-y border-line py-5 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Use This When</p>
              <p className="mt-2 text-sm leading-7 text-ink">{situationLead ?? "이 문서를 바로 실행해야 할 때 연다."}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Aim For</p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-ink">
                {(summaryPoints.length > 0 ? summaryPoints : ["좋은 출력 기준을 먼저 읽고 작은 패치로 실행한다."]).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Avoid</p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-ink">
                {(failurePoints.length > 0 ? failurePoints : ["범위를 넓히거나 builder 혼자 모든 역할을 맡기지 않는다."]).map(
                  (point) => (
                    <li key={point}>{point}</li>
                  )
                )}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Then Do</p>
              <p className="mt-2 text-sm leading-7 text-ink">
                {nextLink ? `${nextLink.title.replace(/^\d+\.\s*/, "")}로 이어서 진행한다.` : "필요하면 Notes Only로 상세 배경을 읽는다."}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {mode === "notes" || !hasPrompt ? (
        <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      ) : null}
    </div>
  );
}
