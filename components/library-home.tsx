"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import {
  buildCopyPayload,
  getArchiveRecords,
  getArtifactTypeLabel,
  getRiskLabel,
  getScenarioDefinition,
  getScenarioRecords,
  getScenarioVerificationSet,
  stripOrdinalTitle,
  WAR_ROOM_SCENARIOS
} from "@/lib/content/workbench";
import type { ContentRecord } from "@/lib/content/types";

type HomeData = {
  all: ContentRecord[];
  onboarding: ContentRecord[];
  roles: ContentRecord[];
  ui: ContentRecord[];
  d3: ContentRecord[];
  playbooks: ContentRecord[];
  sources: ContentRecord[];
};

function compactLine(text: string, limit = 110) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function MetaPill({ label }: { label: string }) {
  return (
    <span className="war-pill rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
      {label}
    </span>
  );
}

function CollectionCard({
  item,
  language,
  onCopy
}: {
  item: ContentRecord;
  language: "en" | "ko";
  onCopy: () => void;
}) {
  const localized = getLocalizedRecord(item, language);

  return (
    <article className="collection-card">
      <div className="flex flex-wrap gap-2">
        <MetaPill label={getArtifactTypeLabel(item.artifactType, language)} />
        <MetaPill label={getRiskLabel(item.riskLevel, language)} />
      </div>
      <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
        {stripOrdinalTitle(localized.title)}
      </h3>
      <p className="mt-3 text-sm leading-7 text-cloud">{compactLine(localized.summary, 120)}</p>
      <p className="mt-4 text-sm leading-7 text-paper">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
          {language === "ko" ? "언제 쓰는지" : "When"}
        </span>{" "}
        {compactLine(localized.situationLead ?? localized.summary, 84)}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <CopyPromptButton
          value={buildCopyPayload(item, language, false)}
          onCopy={onCopy}
          className="ghost-button"
          defaultLabel={language === "ko" ? "프롬프트 복사" : "Copy prompt"}
          copiedLabel={language === "ko" ? "복사됨" : "Copied"}
        />
        <Link href={item.route} className="quiet-link">
          {language === "ko" ? "읽기" : "Read"}
        </Link>
      </div>
    </article>
  );
}

export function LibraryHome({ data }: { data: HomeData }) {
  const { language, t } = useSiteLanguage();
  const { recentViewed } = useReadingProgress();
  const { markCopied } = useWorkbenchState();
  const [selectedScenario, setSelectedScenario] = useState<string>("scss-swamp");
  const rootRef = useRef<HTMLElement | null>(null);

  const scenario = getScenarioDefinition(selectedScenario) ?? WAR_ROOM_SCENARIOS[0];
  const scenarioRecords = useMemo(() => getScenarioRecords(data.all, selectedScenario), [data.all, selectedScenario]);
  const verificationSet = useMemo(() => getScenarioVerificationSet(data.all, selectedScenario), [data.all, selectedScenario]);
  const archiveRecords = useMemo(() => getArchiveRecords(data.all).slice(0, 5), [data.all]);
  const recentReads = useMemo(
    () => recentViewed.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, recentViewed]
  );

  const flow = useMemo(() => {
    const dossierRecords = scenarioRecords.filter((item) => item.isDossier);
    const start = dossierRecords[0] ?? scenarioRecords[0] ?? null;
    const direct = dossierRecords[1] ?? scenarioRecords[1] ?? start;
    const verify = verificationSet[0] ?? scenarioRecords[2] ?? direct;
    return { start, direct, verify };
  }, [scenarioRecords, verificationSet]);

  const scenarioLibrary = scenarioRecords.filter((item) => item.isDossier).slice(0, 4);
  const visibleRecent = recentReads.slice(0, 4);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-motion='hero']",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.58, ease: "power2.out", stagger: 0.06 }
      );

      gsap.fromTo(
        "[data-motion='flow']",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out", stagger: 0.08, delay: 0.04 }
      );

      gsap.fromTo(
        "[data-motion='library']",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.46, ease: "power2.out", stagger: 0.04, delay: 0.08 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [language, selectedScenario]);

  return (
    <main ref={rootRef} className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1180px] px-4 pb-20 pt-5 md:px-8 md:pb-28 md:pt-10">
        <section className="paper-frame px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[760px]">
              <p data-motion="hero" className="eyebrow">
                {t("Prompt Library", "프롬프트 라이브러리")}
              </p>
              <h1 data-motion="hero" className="mt-4 max-w-[11ch] font-display text-5xl leading-[0.96] tracking-[-0.06em] text-paper md:text-7xl">
                {t("Choose the next prompt, not the next page.", "다음 페이지가 아니라 다음 프롬프트를 고른다.")}
              </h1>
              <p data-motion="hero" className="mt-5 max-w-[52ch] text-base leading-8 text-cloud md:text-lg">
                {t(
                  "A minimal library for UI developers working with agents on legacy CSS, layout polish, D3 integration, and browser verification.",
                  "레거시 CSS, 레이아웃 정리, D3 통합, 브라우저 검증을 다루는 UI 개발자를 위한 미니멀 프롬프트 라이브러리."
                )}
              </p>
            </div>
            <div data-motion="hero">
              <LanguageToggle />
            </div>
          </div>

          <div data-motion="hero" className="mt-8">
            <p className="eyebrow">{t("Pick the problem", "문제 선택")}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
              {WAR_ROOM_SCENARIOS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedScenario(entry.id)}
                  className={`index-link ${selectedScenario === entry.id ? "index-link-active" : ""}`}
                >
                  <span>{entry.labels[language]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-8">
          <section className="paper-frame px-6 py-7 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{t("Three-step flow", "3단 플로우")}</p>
                <h2 data-motion="flow" className="mt-3 font-display text-4xl tracking-[-0.05em] text-paper md:text-5xl">
                  {scenario.labels[language]}
                </h2>
              </div>
              <p data-motion="flow" className="max-w-[40ch] text-sm leading-7 text-cloud">
                {scenario.summary[language]}
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {flow.start ? (
                <article data-motion="flow" className="collection-card">
                  <p className="eyebrow">{t("1. Start Here", "1. 먼저 이걸 쓴다")}</p>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                    {stripOrdinalTitle(getLocalizedRecord(flow.start, language).title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-cloud">
                    {compactLine(getLocalizedRecord(flow.start, language).summary, 108)}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-paper">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("When", "언제")}</span>{" "}
                    {compactLine(
                      getLocalizedRecord(flow.start, language).situationLead ?? getLocalizedRecord(flow.start, language).summary,
                      78
                    )}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <CopyPromptButton
                      value={buildCopyPayload(flow.start, language, false)}
                      onCopy={() => markCopied(flow.start.route)}
                      className="action-button"
                      defaultLabel={t("Copy first prompt", "첫 프롬프트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <Link href={flow.start.route} className="quiet-link">
                      {t("Read", "읽기")}
                    </Link>
                  </div>
                </article>
              ) : null}

              {flow.direct ? (
                <article data-motion="flow" className="collection-card">
                  <p className="eyebrow">{t("2. Lock Direction", "2. 방향을 잠근다")}</p>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                    {stripOrdinalTitle(getLocalizedRecord(flow.direct, language).title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-cloud">
                    {compactLine(getLocalizedRecord(flow.direct, language).summary, 108)}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-paper">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("Copy", "복사")}</span>{" "}
                    {t(
                      "Use the context bundle when the agent keeps drifting into generic direction.",
                      "에이전트가 일반론으로 흐를 때는 컨텍스트 포함 복사를 먼저 쓴다."
                    )}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <CopyPromptButton
                      value={buildCopyPayload(flow.direct, language, true)}
                      onCopy={() => markCopied(flow.direct.route)}
                      className="ghost-button"
                      defaultLabel={t("Copy with context", "컨텍스트 포함 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <Link href={flow.direct.route} className="quiet-link">
                      {t("Read", "읽기")}
                    </Link>
                  </div>
                </article>
              ) : null}

              {flow.verify ? (
                <article data-motion="flow" className="collection-card">
                  <p className="eyebrow">{t("3. Check In Browser", "3. 브라우저에서 확인")}</p>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                    {stripOrdinalTitle(getLocalizedRecord(flow.verify, language).title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-cloud">
                    {compactLine(getLocalizedRecord(flow.verify, language).summary, 108)}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-paper">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("Next", "다음")}</span>{" "}
                    {t(
                      "Use this after the first patch to catch layout, motion, and interaction regressions in the browser.",
                      "첫 패치 뒤 레이아웃, 모션, 인터랙션 회귀를 브라우저에서 잡을 때 쓴다."
                    )}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <CopyPromptButton
                      value={buildCopyPayload(flow.verify, language, false)}
                      onCopy={() => markCopied(flow.verify.route)}
                      className="ghost-button"
                      defaultLabel={t("Copy verify prompt", "검증 프롬프트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <Link href={flow.verify.route} className="quiet-link">
                      {t("Read", "읽기")}
                    </Link>
                  </div>
                </article>
              ) : null}
            </div>
          </section>

          <section className="paper-frame px-6 py-7 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">{t("Prompt Library", "프롬프트 라이브러리")}</p>
                <p className="mt-3 max-w-[44ch] text-sm leading-7 text-cloud">
                  {t(
                    "Four adjacent texts for the same UI problem. Open them only after the first flow is clear.",
                    "첫 플로우를 정한 뒤에만 여는 보조 텍스트 4개. 같은 UI 문제를 조금 더 세밀하게 밀어갈 때 쓴다."
                  )}
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                {scenarioLibrary.length} {t("texts", "texts")}
              </span>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {scenarioLibrary.map((item) => (
                <div key={item.route} data-motion="library">
                  <CollectionCard item={item} language={language} onCopy={() => markCopied(item.route)} />
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <div>
                <p className="eyebrow">{t("Archive", "아카이브")}</p>
                <p className="mt-3 text-sm leading-7 text-cloud">
                  {t("Secondary references stay available, but they remain quiet.", "보조 자료는 남겨두되, 조용하게 둔다.")}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {archiveRecords.map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <Link key={item.route} href={item.route} className="quiet-link" data-motion="library">
                      {stripOrdinalTitle(localized.title)}
                    </Link>
                  );
                })}
              </div>
            </div>

            {visibleRecent.length > 0 ? (
              <div className="mt-6 border-t border-line pt-6">
                <p className="eyebrow">{t("Recent Reads", "최근 읽은 문서")}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  {visibleRecent.map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <Link key={item.route} href={item.route} className="quiet-link" data-motion="library">
                        {stripOrdinalTitle(localized.title)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </section>
        </section>
      </div>
    </main>
  );
}
