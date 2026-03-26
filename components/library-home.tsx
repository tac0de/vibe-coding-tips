"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import {
  buildCopyPayload,
  getArchiveRecords,
  getArtifactTypeLabel,
  getDifficultyLabel,
  getLegacySurfaceLabel,
  getRiskLabel,
  getScenarioDefinition,
  getScenarioLead,
  getScenarioRecords,
  getScenarioVerificationSet,
  getTargetArchitectureLabel,
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

function MetaPill({ label }: { label: string }) {
  return (
    <span className="war-pill rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
      {label}
    </span>
  );
}

export function LibraryHome({ data }: { data: HomeData }) {
  const { language, t } = useSiteLanguage();
  const { recentViewed, completed } = useReadingProgress();
  const {
    queue,
    favorites,
    copied,
    recentSearches,
    toggleQueue,
    toggleFavorite,
    markCopied,
    isQueued,
    isFavorite
  } = useWorkbenchState();
  const [selectedScenario, setSelectedScenario] = useState<string>("scss-swamp");

  const scenario = getScenarioDefinition(selectedScenario) ?? WAR_ROOM_SCENARIOS[0];
  const scenarioRecords = useMemo(() => getScenarioRecords(data.all, selectedScenario), [data.all, selectedScenario]);
  const lead = useMemo(() => getScenarioLead(data.all, selectedScenario), [data.all, selectedScenario]);
  const verificationSet = useMemo(() => getScenarioVerificationSet(data.all, selectedScenario), [data.all, selectedScenario]);
  const archiveRecords = useMemo(() => getArchiveRecords(data.all).slice(0, 12), [data.all]);
  const battleStack = useMemo(
    () => queue.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, queue]
  );
  const opsTray = useMemo(
    () => favorites.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, favorites]
  );
  const recentRuns = useMemo(
    () => recentViewed.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, recentViewed]
  );
  const leadLocalized = lead ? getLocalizedRecord(lead, language) : null;

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <section className="war-frame overflow-hidden px-5 py-6 md:px-8 md:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_420px]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="eyebrow">{t("Legacy UI Migration War Room", "Legacy UI Migration War Room")}</p>
                  <h1 className="max-w-[10ch] font-display text-5xl leading-[0.86] tracking-[-0.07em] text-paper md:text-8xl">
                    {t("Break the legacy surface. Rebuild with agents.", "레거시 표면을 부수고 에이전트로 재구축")}
                  </h1>
                </div>
                <LanguageToggle />
              </div>

              <p className="max-w-[66ch] text-base leading-8 text-cloud md:text-lg">
                {t(
                  "This is not a prompt warehouse. It is a migration console for SCSS sprawl, legacy component decomposition, D3 retrofits, and browser verification under real refactor pressure.",
                  "여긴 범용 프롬프트 창고가 아니다. SCSS 확산, 레거시 컴포넌트 분해, D3 레트로핏, 브라우저 검증을 실제 리팩터 압력 아래서 처리하는 마이그레이션 콘솔이다."
                )}
              </p>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="threat-card p-4">
                  <p className="eyebrow text-fog">{t("Current migration run", "현재 마이그레이션 런")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{battleStack.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">{t("Docs queued for the current operation.", "현재 작업에 적재된 문서 수.")}</p>
                </div>
                <div className="threat-card p-4">
                  <p className="eyebrow text-fog">{t("Ops tray", "Ops tray")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{opsTray.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">{t("Pinned dossiers and recurring tools.", "자주 쓰는 dossier 및 도구 보관함.")}</p>
                </div>
                <div className="threat-card p-4">
                  <p className="eyebrow text-fog">{t("Copied bundles", "복사한 번들")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{copied.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">{t("Prompt bundles already taken into action.", "이미 실행으로 가져간 프롬프트 번들 수.")}</p>
                </div>
                <div className="threat-card p-4">
                  <p className="eyebrow text-fog">{t("Completed gates", "완료 게이트")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{completed.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">{t("Checkpoints closed in this browser.", "이 브라우저에서 닫은 체크포인트 수.")}</p>
                </div>
              </div>
            </div>

            <div className="war-side-panel p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{t("Scenario chooser", "전투 시나리오 선택기")}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{WAR_ROOM_SCENARIOS.length} {t("fronts", "전장")}</p>
              </div>

              <div className="mt-4 grid gap-3">
                {WAR_ROOM_SCENARIOS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedScenario(entry.id)}
                    className={`scenario-tile text-left ${selectedScenario === entry.id ? "scenario-tile-active" : ""}`}
                  >
                    <p className="font-display text-2xl tracking-[-0.04em] text-paper">{entry.labels[language]}</p>
                    <p className="mt-2 text-sm leading-7 text-cloud">{entry.summary[language]}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{entry.risks[language]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_440px]">
          <div className="space-y-6">
            <section className="war-frame px-5 py-5 md:px-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">{t("Primary front", "주 전장")}</p>
                  <h2 className="mt-2 font-display text-4xl tracking-[-0.05em] text-paper md:text-6xl">
                    {scenario.labels[language]}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-fog">{t("Recommended dossier", "대표 dossier")}</p>
                  <p className="mt-2 text-sm leading-7 text-cloud">{scenario.dossierTitle[language]}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="lab-panel p-5">
                  <p className="eyebrow text-fog">{t("When to use", "언제 쓰는가")}</p>
                  <p className="mt-3 text-base leading-8 text-paper">{scenario.summary[language]}</p>
                  <p className="mt-4 text-sm leading-7 text-cloud">{scenario.risks[language]}</p>
                </div>

                <div className="threat-card p-5">
                  <p className="eyebrow text-fog">{t("Recommended order", "추천 순서")}</p>
                  <ol className="mt-4 space-y-3">
                    {scenarioRecords.slice(0, 4).map((item, index) => {
                      const localized = getLocalizedRecord(item, language);
                      return (
                        <li key={item.route} className="flex gap-3">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{String(index + 1).padStart(2, "0")}</span>
                          <div className="text-left">
                            <Link href={item.route} className="font-display text-xl text-paper">
                              {stripOrdinalTitle(localized.title)}
                            </Link>
                            <p className="mt-1 text-sm leading-6 text-cloud">{localized.summary}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </section>

            <section className="war-frame px-5 py-5 md:px-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">{t("Dossier shelf", "Dossier shelf")}</p>
                  <p className="mt-2 text-sm leading-7 text-cloud">
                    {t(
                      "These are the long-form bundles to open before you let an agent touch the legacy surface.",
                      "에이전트가 레거시 표면을 건드리기 전에 먼저 여는 긴 프롬프트 묶음."
                    )}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {scenarioRecords.filter((item) => item.isDossier).length} {t("dossiers", "dossiers")}
                </p>
              </div>

              <div className="grid gap-4">
                {scenarioRecords.filter((item) => item.isDossier).slice(0, 6).map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <div key={item.route} className="dossier-card">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            <MetaPill label={getArtifactTypeLabel(item.artifactType, language)} />
                            <MetaPill label={getRiskLabel(item.riskLevel, language)} />
                            <MetaPill label={getLegacySurfaceLabel(item.legacySurface, language)} />
                            <MetaPill label={getTargetArchitectureLabel(item.targetArchitecture, language)} />
                          </div>
                          <p className="mt-4 font-display text-3xl tracking-[-0.04em] text-paper">
                            {stripOrdinalTitle(localized.title)}
                          </p>
                          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-cloud">{localized.summary}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => toggleQueue(item.route)} className="ghost-button">
                            {isQueued(item.route) ? t("In battle stack", "battle stack 적재됨") : t("Add battle stack", "battle stack 적재")}
                          </button>
                          <button type="button" onClick={() => toggleFavorite(item.route)} className="ghost-button">
                            {isFavorite(item.route) ? t("Pinned ops tray", "ops tray 고정됨") : t("Pin ops tray", "ops tray 고정")}
                          </button>
                          <CopyPromptButton
                            value={buildCopyPayload(item, language, true)}
                            onCopy={() => markCopied(item.route)}
                            className="ghost-button"
                            defaultLabel={t("Copy context", "컨텍스트 복사")}
                            copiedLabel={t("Copied", "복사됨")}
                          />
                          <Link href={item.route} className="action-button">
                            {t("Open dossier", "dossier 열기")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <div className="war-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Battle stack", "battle stack")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{battleStack.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {battleStack.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <Link key={item.route} href={item.route} className="lab-list-item block">
                        <p className="eyebrow text-fog">{getScenarioDefinition(item.scenario)?.labels[language] ?? item.scenario}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </Link>
                    );
                  })}
                  {battleStack.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">{t("Queue the dossiers for the current migration run.", "현재 마이그레이션 런에 필요한 dossier를 적재한다.")}</p>
                  ) : null}
                </div>
              </div>

              <div className="war-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Ops tray", "ops tray")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{opsTray.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {opsTray.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <Link key={item.route} href={item.route} className="lab-list-item block">
                        <p className="eyebrow text-fog">{getArtifactTypeLabel(item.artifactType, language)}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </Link>
                    );
                  })}
                  {opsTray.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">{t("Pin recurring dossiers and gates here.", "반복적으로 쓰는 dossier와 gate를 여기에 고정한다.")}</p>
                  ) : null}
                </div>
              </div>

              <div className="war-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Recent runs", "최근 런")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{recentRuns.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {recentRuns.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <Link key={item.route} href={item.route} className="lab-list-item block">
                        <p className="eyebrow text-fog">{getScenarioDefinition(item.scenario)?.labels[language] ?? item.scenario}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </Link>
                    );
                  })}
                  {recentRuns.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">{t("Recent dossier runs land here for quick re-entry.", "최근 dossier 런은 여기에 쌓여 빠르게 재진입할 수 있다.")}</p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            {lead && leadLocalized ? (
              <section className="war-side-panel p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Lead dossier", "대표 dossier")}</p>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                    {lead.timeToUse}m
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <MetaPill label={getRiskLabel(lead.riskLevel, language)} />
                  <MetaPill label={getLegacySurfaceLabel(lead.legacySurface, language)} />
                  <MetaPill label={getTargetArchitectureLabel(lead.targetArchitecture, language)} />
                  <MetaPill label={getDifficultyLabel(lead.difficulty, language)} />
                </div>

                <div className="mt-5">
                  <p className="font-display text-4xl tracking-[-0.05em] text-paper">{stripOrdinalTitle(leadLocalized.title)}</p>
                  <p className="mt-3 text-sm leading-7 text-cloud">{leadLocalized.summary}</p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="threat-card p-4">
                    <p className="eyebrow text-fog">{t("Primary risk", "주요 리스크")}</p>
                    <p className="mt-3 text-sm leading-7 text-paper">{scenario.risks[language]}</p>
                  </div>
                  <div className="threat-card p-4">
                    <p className="eyebrow text-fog">{t("Verification set", "검증 세트")}</p>
                    <div className="mt-3 grid gap-2">
                      {verificationSet.slice(0, 3).map((item) => {
                        const localized = getLocalizedRecord(item, language);
                        return (
                          <Link key={item.route} href={item.route} className="lab-list-item block">
                            <p className="font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                            <p className="mt-1 text-sm leading-6 text-cloud">{localized.summary}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <CopyPromptButton
                    value={buildCopyPayload(lead, language, true)}
                    onCopy={() => markCopied(lead.route)}
                    className="action-button"
                    defaultLabel={t("Copy migration context", "마이그레이션 컨텍스트 복사")}
                    copiedLabel={t("Copied", "복사됨")}
                  />
                  <Link href={lead.route} className="ghost-button">
                    {t("Open lead dossier", "대표 dossier 열기")}
                  </Link>
                </div>
              </section>
            ) : null}

            <section className="war-frame archive-shell px-5 py-5 md:px-6">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{t("Archive / Secondary library", "Archive / Secondary library")}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{archiveRecords.length}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-cloud">
                {t(
                  "Generic docs are still here, but they are no longer driving the front page.",
                  "범용 문서는 남겨두되, 더 이상 프런트 페이지를 끌고 가지 않는다."
                )}
              </p>
              <div className="mt-4 grid gap-2">
                {archiveRecords.slice(0, 8).map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <Link key={item.route} href={item.route} className="lab-list-item block">
                      <p className="eyebrow text-fog">{item.kind}</p>
                      <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                    </Link>
                  );
                })}
              </div>
              {recentSearches.length > 0 ? (
                <div className="mt-5 border-t border-line pt-4">
                  <p className="eyebrow text-fog">{t("Recent search traces", "최근 검색 흔적")}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recentSearches.slice(0, 6).map((item) => (
                      <span key={item} className="rounded-full border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
