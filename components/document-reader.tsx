"use client";

import { useMemo, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useSiteLanguage } from "@/components/site-language";
import { getLocalizedLink } from "@/lib/content/localize";
import type { ContentLink, SiteLanguage } from "@/lib/content/types";

type Props = {
  language: SiteLanguage;
  html: string;
  promptBlock?: string | null;
  situationLead?: string | null;
  summaryPoints: string[];
  failurePoints: string[];
  nextLink?: ContentLink | null;
};

export function DocumentReader({
  language,
  html,
  promptBlock,
  situationLead,
  summaryPoints,
  failurePoints,
  nextLink
}: Props) {
  const { t } = useSiteLanguage();
  const [mode, setMode] = useState<"prompt" | "compact" | "notes">("compact");
  const hasPrompt = Boolean(promptBlock);

  const notesLabel = useMemo(
    () => (hasPrompt ? t("Notes Only", "설명만") : t("Document", "전체 문서")),
    [hasPrompt, t]
  );

  return (
    <div className="space-y-6">
      {hasPrompt ? (
        <section className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {[
              ["compact", t("Compact", "Compact")],
              ["prompt", t("Prompt Only", "Prompt Only")],
              ["notes", notesLabel]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value as "prompt" | "compact" | "notes")}
                className={`border-b px-0 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition ${
                  mode === value ? "border-cobalt text-paper" : "border-transparent text-fog hover:text-paper"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-1 text-sm text-cloud/70 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              {t("Default view: Compact", "기본 보기: Compact")}
            </p>
            <p>
              {t(
                "Read the summary first, then switch to Prompt Only when you want to execute.",
                "먼저 요약을 읽고, 바로 실행할 때만 Prompt Only로 넘어가면 됩니다."
              )}
            </p>
          </div>
        </section>
      ) : null}

      {hasPrompt && mode === "prompt" ? (
        <section className="border-y border-line py-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
                {t("Prompt Only", "Prompt Only")}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] text-paper md:text-4xl">
                {t("Copy-ready prompt", "바로 복붙할 프롬프트")}
              </h2>
            </div>
            <CopyPromptButton value={promptBlock ?? ""} />
          </div>
          <pre className="overflow-x-auto border border-line bg-[#0a0d14] px-4 py-4 text-[13px] leading-7 text-paper">
            <code>{promptBlock}</code>
          </pre>
        </section>
      ) : null}

      {mode === "compact" ? (
        <section className="grid gap-4 border-y border-line py-5 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {t("Use this when", "언제 쓰는지")}
              </p>
              <p className="mt-2 text-sm leading-7 text-paper">
                {situationLead ??
                  t(
                    "Open this when you want to run the document immediately.",
                    "이 문서를 바로 실행해야 할 때 연다."
                  )}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {t("Expected output", "기대 출력")}
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-paper">
                {(summaryPoints.length > 0
                  ? summaryPoints
                  : [t("Read the checklist first and execute in a small patch.", "체크리스트를 먼저 읽고 작은 패치로 실행한다.")]).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {t("Failure patterns", "실패 패턴")}
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-paper">
                {(failurePoints.length > 0
                  ? failurePoints
                  : [t("Do not widen scope or let the builder role do everything.", "범위를 넓히거나 builder 혼자 모든 역할을 맡기지 않는다.")]).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {t("Next doc", "다음 문서")}
              </p>
              <p className="mt-2 text-sm leading-7 text-paper">
                {nextLink
                  ? t(
                      `Continue with ${getLocalizedLink(nextLink, language).title.replace(/^\d+\.\s*/, "")}.`,
                      `${getLocalizedLink(nextLink, language).title.replace(/^\d+\.\s*/, "")}로 이어서 진행한다.`
                    )
                  : t(
                      "If needed, switch to Notes Only and read the full background.",
                      "필요하면 Notes Only로 상세 배경을 읽는다."
                    )}
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
