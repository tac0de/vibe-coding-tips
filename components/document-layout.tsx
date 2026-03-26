"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import {
  buildCopyPayload,
  buildDossierBundlePayload,
  buildDossierChapters,
  getArtifactTypeLabel,
  getDifficultyLabel,
  getLegacySurfaceLabel,
  getLinkText,
  getRiskLabel,
  getScenarioDefinition,
  getTargetArchitectureLabel,
  stripOrdinalTitle
} from "@/lib/content/workbench";
import type { ContentLink, ContentRecord } from "@/lib/content/types";

function MetaPill({ label }: { label: string }) {
  return (
    <span className="war-pill rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
      {label}
    </span>
  );
}

function LinkCard({ item, language }: { item: ContentLink; language: "en" | "ko" }) {
  const localized = getLinkText(item, language);

  return (
    <Link href={item.route} className="lab-list-item block">
      <p className="font-display text-xl tracking-[-0.03em] text-paper">{localized.title}</p>
      <p className="mt-1 text-sm leading-6 text-cloud">{localized.summary}</p>
    </Link>
  );
}

export function DocumentLayout({
  document,
  catalog
}: {
  document: ContentRecord | null;
  catalog: ContentRecord[];
}) {
  const { language, t } = useSiteLanguage();
  const { completed, markViewed, toggleCompleted, isCompleted } = useReadingProgress();
  const { toggleFavorite, toggleQueue, markCopied, isFavorite, isQueued, queue } = useWorkbenchState();
  const [tab, setTab] = useState<"overview" | "promptSet" | "variants" | "verification" | "notes">("overview");
  const localized = document ? getLocalizedRecord(document, language) : null;
  const scenario = document ? getScenarioDefinition(document.scenario) : null;
  const chapters = useMemo(() => (document ? buildDossierChapters(document, catalog, language) : []), [catalog, document, language]);

  useEffect(() => {
    if (!document) return;
    markViewed(document.route);
  }, [document, markViewed]);

  if (!document || !localized) return null;

  const completedState = isCompleted(document.route);
  const dossierTitle = scenario?.dossierTitle[language] ?? stripOrdinalTitle(localized.title);

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_420px]">
          <article className="space-y-6">
            <nav className="war-frame flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fog md:px-7">
              <Link href="/" className="transition hover:text-paper">
                {t("War room", "war room")}
              </Link>
              {document.prevLink ? (
                <Link href={document.prevLink.route} className="transition hover:text-paper">
                  {t("Previous", "이전")}
                </Link>
              ) : null}
              {document.nextLink ? (
                <Link href={document.nextLink.route} className="transition hover:text-paper">
                  {t("Next", "다음")}
                </Link>
              ) : null}
              <span className="ml-auto">
                <LanguageToggle />
              </span>
            </nav>

            <section className="war-frame overflow-hidden px-5 py-6 md:px-8 md:py-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <MetaPill label={getArtifactTypeLabel(document.artifactType, language)} />
                    <MetaPill label={getRiskLabel(document.riskLevel, language)} />
                    <MetaPill label={getLegacySurfaceLabel(document.legacySurface, language)} />
                    <MetaPill label={getTargetArchitectureLabel(document.targetArchitecture, language)} />
                    <MetaPill label={getDifficultyLabel(document.difficulty, language)} />
                  </div>

                  <div className="space-y-4">
                    <p className="eyebrow">{scenario?.labels[language] ?? document.scenario}</p>
                    <h1 className="max-w-[13ch] font-display text-5xl leading-[0.88] tracking-[-0.06em] text-paper md:text-8xl">
                      {stripOrdinalTitle(localized.title)}
                    </h1>
                    <p className="max-w-[68ch] text-base leading-8 text-cloud md:text-lg">{localized.summary}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="threat-card p-4">
                      <p className="eyebrow text-fog">{t("When to use", "When to use")}</p>
                      <p className="mt-3 text-sm leading-7 text-paper">{localized.situationLead ?? localized.summary}</p>
                    </div>
                    <div className="threat-card p-4">
                      <p className="eyebrow text-fog">{t("Primary risk", "Primary risk")}</p>
                      <p className="mt-3 text-sm leading-7 text-paper">{scenario?.risks[language] ?? getRiskLabel(document.riskLevel, language)}</p>
                    </div>
                    <div className="threat-card p-4">
                      <p className="eyebrow text-fog">{t("Target architecture", "Target architecture")}</p>
                      <p className="mt-3 text-sm leading-7 text-paper">{getTargetArchitectureLabel(document.targetArchitecture, language)}</p>
                    </div>
                  </div>
                </div>

                <div className="war-side-panel p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow">{t("Migration console", "Migration console")}</p>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                      {document.timeToUse}m
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, false)}
                      onCopy={() => markCopied(document.route)}
                      className="action-button w-full justify-center"
                      defaultLabel={document.promptBlock ? t("Copy current prompt", "현재 프롬프트 복사") : t("Copy notes", "노트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildDossierBundlePayload(dossierTitle, chapters, language)}
                      onCopy={() => markCopied(document.route)}
                      className="ghost-button w-full justify-center"
                      defaultLabel={t("Copy full dossier set", "전체 dossier 세트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, true)}
                      onCopy={() => markCopied(document.route)}
                      className="ghost-button w-full justify-center"
                      defaultLabel={t("Copy with migration context", "마이그레이션 컨텍스트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <button type="button" onClick={() => toggleQueue(document.route)} className="ghost-button w-full justify-center">
                      {isQueued(document.route) ? t("In battle stack", "battle stack 적재됨") : t("Add battle stack", "battle stack 적재")}
                    </button>
                    <button type="button" onClick={() => toggleFavorite(document.route)} className="ghost-button w-full justify-center">
                      {isFavorite(document.route) ? t("Pinned ops tray", "ops tray 고정됨") : t("Pin ops tray", "ops tray 고정")}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompleted(document.route)}
                      className={`ghost-button w-full justify-center ${completedState ? "border-cobalt text-paper" : ""}`}
                    >
                      {completedState ? t("Gate closed", "게이트 종료") : t("Mark gate", "게이트 체크")}
                    </button>
                  </div>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="eyebrow text-fog">{t("Current run", "Current run")}</p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div>
                        <p className="font-display text-3xl text-paper">{queue.length}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("stack", "stack")}</p>
                      </div>
                      <div>
                        <p className="font-display text-3xl text-paper">{completed.length}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("gates", "gates")}</p>
                      </div>
                      <div>
                        <p className="font-display text-3xl text-paper">{chapters.length}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("chapters", "chapters")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="war-frame px-5 py-5 md:px-7">
              <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
                {([
                  ["overview", t("Overview", "Overview")],
                  ["promptSet", t("Prompt Set", "Prompt Set")],
                  ["variants", t("Variants", "Variants")],
                  ["verification", t("Verification", "Verification")],
                  ["notes", t("Notes", "Notes")]
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTab(value)}
                    className={`war-tab rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                      tab === value
                        ? "war-tab-active"
                        : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "overview" ? (
                <div className="grid gap-4 pt-6 lg:grid-cols-3">
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Dossier summary", "Dossier summary")}</p>
                    <p className="mt-3 text-sm leading-7 text-paper">
                      {scenario?.dossierSummary[language] ?? localized.summary}
                    </p>
                  </div>
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Expected output", "Expected output")}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-paper">
                      {(localized.summaryPoints.length > 0 ? localized.summaryPoints : [t("Map the surface before changing the surface.", "표면을 바꾸기 전에 구조를 먼저 매핑한다.")])
                        .slice(0, 4)
                        .map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Failure patterns", "Failure patterns")}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-paper">
                      {(localized.failurePoints.length > 0 ? localized.failurePoints : [t("Do not replace styles before isolating ownership boundaries.", "소유 경계를 분리하기 전에 스타일 치환부터 하지 않는다.")])
                        .slice(0, 4)
                        .map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {tab === "promptSet" ? (
                <div className="grid gap-5 pt-6">
                  {chapters.map((chapter) => (
                    <section key={chapter.id} className="dossier-card">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="eyebrow">{chapter.title}</p>
                          <p className="mt-2 text-sm leading-7 text-cloud">
                            {t("Copy chapter-level prompts or open each source dossier.", "챕터 단위 프롬프트를 복사하거나 각 원본 dossier를 연다.")}
                          </p>
                        </div>
                        <CopyPromptButton
                          value={buildDossierBundlePayload(chapter.title, [chapter], language)}
                          onCopy={() => markCopied(document.route)}
                          className="ghost-button"
                          defaultLabel={t("Copy chapter", "챕터 복사")}
                          copiedLabel={t("Copied", "복사됨")}
                        />
                      </div>
                      <div className="grid gap-3 lg:grid-cols-2">
                        {chapter.docs.map((item) => {
                          const itemLocalized = getLocalizedRecord(item, language);
                          return (
                            <div key={item.route} className="lab-panel p-4">
                              <div className="flex flex-wrap gap-2">
                                <MetaPill label={getArtifactTypeLabel(item.artifactType, language)} />
                                <MetaPill label={getRiskLabel(item.riskLevel, language)} />
                              </div>
                              <p className="mt-4 font-display text-2xl text-paper">{stripOrdinalTitle(itemLocalized.title)}</p>
                              <p className="mt-2 text-sm leading-7 text-cloud">{itemLocalized.summary}</p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <CopyPromptButton
                                  value={buildCopyPayload(item, language, false)}
                                  onCopy={() => markCopied(item.route)}
                                  className="ghost-button"
                                  defaultLabel={t("Copy prompt", "프롬프트 복사")}
                                  copiedLabel={t("Copied", "복사됨")}
                                />
                                <Link href={item.route} className="ghost-button">
                                  {t("Open source", "원본 열기")}
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              ) : null}

              {tab === "variants" ? (
                <div className="grid gap-4 pt-6 lg:grid-cols-2">
                  {(document.variantLinks.length > 0 ? document.variantLinks : document.dossierLinks).map((item) => (
                    <LinkCard key={item.route} item={item} language={language} />
                  ))}
                  {document.variantLinks.length === 0 && document.dossierLinks.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">
                      {t("No variants are mapped yet for this dossier.", "이 dossier에 아직 매핑된 변형 세트가 없다.")}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {tab === "verification" ? (
                <div className="grid gap-4 pt-6 lg:grid-cols-2">
                  {document.verificationLinks.map((item) => (
                    <LinkCard key={item.route} item={item} language={language} />
                  ))}
                  {document.verificationLinks.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">
                      {t("Verification set is not linked yet.", "검증 세트가 아직 연결되지 않았다.")}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {tab === "notes" ? (
                <div className="pt-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="eyebrow">{t("Field notes", "Field notes")}</p>
                      <p className="mt-2 text-sm leading-7 text-cloud">
                        {t("Original notes stay here as full context and fallback evidence.", "원본 노트는 전체 맥락과 백업 근거로 여기 유지한다.")}
                      </p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                      {localized.toc.length} {t("sections", "sections")}
                    </span>
                  </div>
                  <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: localized.html }} />
                </div>
              ) : null}
            </section>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <section className="war-frame px-5 py-5 md:px-6">
              <p className="eyebrow">{t("Related dossiers", "Related dossiers")}</p>
              <div className="mt-4 grid gap-3">
                {document.dossierLinks.slice(0, 4).map((item) => (
                  <LinkCard key={item.route} item={item} language={language} />
                ))}
                {document.dossierLinks.length === 0 ? (
                  <p className="text-sm leading-7 text-cloud">{t("No related dossier mapped.", "연결된 dossier가 없다.")}</p>
                ) : null}
              </div>
            </section>

            <section className="war-frame px-5 py-5 md:px-6">
              <p className="eyebrow">{t("Verification rails", "Verification rails")}</p>
              <div className="mt-4 grid gap-3">
                {document.verificationLinks.slice(0, 4).map((item) => (
                  <LinkCard key={item.route} item={item} language={language} />
                ))}
              </div>
            </section>

            {localized.toc.length > 0 ? (
              <section className="war-frame px-5 py-5 md:px-6">
                <p className="eyebrow">{t("Sections", "Sections")}</p>
                <div className="mt-4 grid gap-2">
                  {localized.toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="lab-list-item block">
                      <p className="text-sm leading-6 text-paper">{item.title}</p>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
