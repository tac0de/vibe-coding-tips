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
  buildDossierBundlePayload,
  buildDossierChapters,
  getArtifactTypeLabel,
  getLinkText,
  getRiskLabel,
  stripOrdinalTitle
} from "@/lib/content/workbench";
import type { ContentLink, ContentRecord } from "@/lib/content/types";

function compactLine(text: string, limit = 120) {
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

function RelatedLink({ item, language }: { item: ContentLink; language: "en" | "ko" }) {
  const localized = getLinkText(item, language);

  return (
    <Link href={item.route} className="index-entry block">
      <p className="font-display text-xl tracking-[-0.03em] text-paper">{localized.title}</p>
      <p className="mt-1 text-sm leading-6 text-cloud">{compactLine(localized.summary, 94)}</p>
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
  const { markViewed } = useReadingProgress();
  const { markCopied } = useWorkbenchState();
  const [tab, setTab] = useState<"abstract" | "promptSet" | "variants" | "verification" | "notes">("abstract");
  const rootRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const localized = document ? getLocalizedRecord(document, language) : null;
  const chapters = useMemo(() => (document ? buildDossierChapters(document, catalog, language) : []), [catalog, document, language]);

  useEffect(() => {
    if (!document) return;
    markViewed(document.route);
  }, [document, markViewed]);

  useEffect(() => {
    if (!document || !rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-motion='detail-hero']",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out", stagger: 0.06 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [document, language]);

  useEffect(() => {
    if (!document || !panelRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panelRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }, [document, tab]);

  if (!document || !localized) return null;

  const bundleTitle = stripOrdinalTitle(localized.title);
  const nextActions = chapters
    .map((chapter) => ({ id: chapter.id, doc: chapter.docs[0] ?? null }))
    .filter((item) => item.doc)
    .slice(0, 3) as Array<{ id: string; doc: ContentRecord }>;
  const relatedLinks = [...document.dossierLinks, ...document.variantLinks].filter(
    (item, index, self) => self.findIndex((candidate) => candidate.route === item.route) === index
  );

  return (
    <main ref={rootRef} className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1180px] px-4 pb-20 pt-5 md:px-8 md:pb-28 md:pt-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.04fr)_320px]">
          <article className="space-y-8">
            <nav
              data-motion="detail-hero"
              className="paper-frame flex flex-wrap items-center gap-x-5 gap-y-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fog md:px-8"
            >
              <Link href="/" className="transition hover:text-paper">
                {t("Collection", "컬렉션")}
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

            <section data-motion="detail-hero" className="paper-frame px-6 py-8 md:px-10 md:py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <MetaPill label={getArtifactTypeLabel(document.artifactType, language)} />
                    <MetaPill label={getRiskLabel(document.riskLevel, language)} />
                    <MetaPill label={`${document.timeToUse}m`} />
                  </div>

                  <h1 className="mt-6 max-w-[12ch] font-display text-5xl leading-[0.92] tracking-[-0.07em] text-paper md:text-8xl">
                    {bundleTitle}
                  </h1>
                  <p className="mt-6 max-w-[60ch] text-lg leading-8 text-cloud">{localized.summary}</p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <article className="thesis-card">
                      <p className="eyebrow">{t("When To Use", "언제 읽는가")}</p>
                      <p className="mt-4 text-sm leading-7 text-paper">{compactLine(localized.situationLead ?? localized.summary, 84)}</p>
                    </article>
                    <article className="thesis-card">
                      <p className="eyebrow">{t("Good Output", "좋은 출력")}</p>
                      <p className="mt-4 text-sm leading-7 text-paper">
                        {compactLine(
                          localized.summaryPoints[0] ??
                            t("The result should narrow the scene before generating surface.", "결과는 표면을 만들기 전에 장면을 먼저 좁혀야 한다."),
                          84
                        )}
                      </p>
                    </article>
                    <article className="thesis-card">
                      <p className="eyebrow">{t("Failure Pattern", "실패 패턴")}</p>
                      <p className="mt-4 text-sm leading-7 text-paper">
                        {compactLine(
                          localized.failurePoints[0] ??
                            t("Generic output that sounds right but does not direct execution.", "그럴듯해 보이지만 실행을 지시하지 못하는 일반론적 출력."),
                          84
                        )}
                      </p>
                    </article>
                  </div>
                </div>

                <aside data-motion="detail-hero" className="index-panel p-6">
                  <p className="eyebrow">{t("Actions", "액션")}</p>
                  <div className="mt-5 grid gap-3">
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, false)}
                      onCopy={() => markCopied(document.route)}
                      className="action-button w-full justify-center"
                      defaultLabel={document.promptBlock ? t("Copy prompt", "프롬프트 복사") : t("Copy text", "본문 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildDossierBundlePayload(bundleTitle, chapters, language)}
                      onCopy={() => markCopied(document.route)}
                      className="ghost-button w-full justify-center"
                      defaultLabel={t("Copy dossier set", "dossier 세트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, true)}
                      onCopy={() => markCopied(document.route)}
                      className="ghost-button w-full justify-center"
                      defaultLabel={t("Copy with context", "컨텍스트 포함 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                  </div>
                </aside>
              </div>
            </section>

            <section className="paper-frame px-6 py-7 md:px-8">
              <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
                {([
                  ["abstract", t("Abstract", "초록")],
                  ["promptSet", t("Prompt Set", "프롬프트 세트")],
                  ["variants", t("Variants", "변형")],
                  ["verification", t("Verification", "검증")],
                  ["notes", t("Notes", "원문")]
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTab(value)}
                    className={`war-tab rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                      tab === value ? "war-tab-active" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div ref={panelRef}>
                {tab === "abstract" ? (
                  <div className="grid gap-4 pt-8">
                    <section className="collection-card">
                      <p className="eyebrow">{t("Suggested Flow", "추천 플로우")}</p>
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {nextActions.map((item, index) => {
                          const nextLocalized = getLocalizedRecord(item.doc, language);
                          return (
                            <article key={item.id} className="essay-panel p-5">
                              <p className="eyebrow">{language === "ko" ? `${index + 1}. 다음 액션` : `${index + 1}. Next move`}</p>
                              <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-paper">
                                {stripOrdinalTitle(nextLocalized.title)}
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-cloud">{compactLine(nextLocalized.summary, 96)}</p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                <CopyPromptButton
                                  value={buildCopyPayload(item.doc, language, false)}
                                  onCopy={() => markCopied(item.doc.route)}
                                  className="ghost-button"
                                  defaultLabel={t("Copy prompt", "프롬프트 복사")}
                                  copiedLabel={t("Copied", "복사됨")}
                                />
                                <Link href={item.doc.route} className="quiet-link">
                                  {t("Read", "읽기")}
                                </Link>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                      {nextActions.length === 0 ? (
                        <p className="mt-5 text-sm leading-7 text-cloud">{t("No linked next steps yet.", "아직 연결된 다음 액션이 없다.")}</p>
                      ) : null}
                    </section>
                  </div>
                ) : null}

                {tab === "promptSet" ? (
                  <div className="grid gap-5 pt-8">
                    {chapters.map((chapter) => (
                      <section key={chapter.id} className="collection-card">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="eyebrow">{chapter.title}</p>
                            <p className="mt-3 text-sm leading-7 text-cloud">
                              {t(
                                "Each chapter groups prompts that belong to the same move.",
                                "각 챕터는 같은 작업 흐름에 속한 프롬프트를 묶는다."
                              )}
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

                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                          {chapter.docs.map((item) => {
                            const itemLocalized = getLocalizedRecord(item, language);
                            return (
                              <article key={item.route} className="essay-panel p-5">
                                <div className="flex flex-wrap gap-2">
                                  <MetaPill label={getArtifactTypeLabel(item.artifactType, language)} />
                                  <MetaPill label={getRiskLabel(item.riskLevel, language)} />
                                </div>
                                <h3 className="mt-5 font-display text-2xl tracking-[-0.04em] text-paper">
                                  {stripOrdinalTitle(itemLocalized.title)}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-cloud">{compactLine(itemLocalized.summary, 104)}</p>
                                <p className="mt-4 text-sm leading-7 text-paper">
                                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("When", "언제")}</span>{" "}
                                  {compactLine(itemLocalized.situationLead ?? itemLocalized.summary, 80)}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                  <CopyPromptButton
                                    value={buildCopyPayload(item, language, false)}
                                    onCopy={() => markCopied(item.route)}
                                    className="ghost-button"
                                    defaultLabel={t("Copy prompt", "프롬프트 복사")}
                                    copiedLabel={t("Copied", "복사됨")}
                                  />
                                  <Link href={item.route} className="quiet-link">
                                    {t("Read source", "원문 읽기")}
                                  </Link>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : null}

                {tab === "variants" ? (
                  <div className="grid gap-3 pt-8">
                    {(document.variantLinks.length > 0 ? document.variantLinks : document.dossierLinks).map((item) => (
                      <RelatedLink key={item.route} item={item} language={language} />
                    ))}
                    {document.variantLinks.length === 0 && document.dossierLinks.length === 0 ? (
                      <p className="text-sm leading-7 text-cloud">{t("No variants are linked yet.", "아직 연결된 변형 문서가 없다.")}</p>
                    ) : null}
                  </div>
                ) : null}

                {tab === "verification" ? (
                  <div className="grid gap-3 pt-8">
                    <article className="essay-panel p-5">
                      <p className="eyebrow">{t("Verification", "검증")}</p>
                      <p className="mt-4 text-sm leading-8 text-paper">
                        {t(
                          "Open this tab after the first patch. The point is to check browser impression, spacing rhythm, and interaction regressions.",
                          "이 탭은 첫 패치 뒤에 연다. 브라우저 인상, spacing rhythm, interaction 회귀를 확인하는 데 목적이 있다."
                        )}
                      </p>
                    </article>
                    {document.verificationLinks.map((item) => (
                      <RelatedLink key={item.route} item={item} language={language} />
                    ))}
                    {document.verificationLinks.length === 0 ? (
                      <p className="text-sm leading-7 text-cloud">{t("No verification notes are linked yet.", "아직 연결된 검증 노트가 없다.")}</p>
                    ) : null}
                  </div>
                ) : null}

                {tab === "notes" ? (
                  <div className="pt-8">
                    <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: localized.html }} />
                  </div>
                ) : null}
              </div>
            </section>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
            <section className="index-panel p-6">
              <p className="eyebrow">{t("Next", "다음")}</p>
              <div className="mt-5 grid gap-2">
                {nextActions.map((item) => {
                  const nextLocalized = getLocalizedRecord(item.doc, language);
                  return (
                    <Link key={item.doc.route} href={item.doc.route} className="index-entry block">
                      <p className="font-display text-xl tracking-[-0.03em] text-paper">
                        {stripOrdinalTitle(nextLocalized.title)}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-cloud">{compactLine(nextLocalized.summary, 86)}</p>
                    </Link>
                  );
                })}
                {nextActions.length === 0 ? (
                  <p className="text-sm leading-7 text-cloud">{t("No next actions are linked yet.", "아직 연결된 다음 액션이 없다.")}</p>
                ) : null}
              </div>
            </section>

            <section className="index-panel p-6">
              <p className="eyebrow">{t("Related", "관련 문서")}</p>
              <div className="mt-5 grid gap-2">
                {relatedLinks.slice(0, 5).map((item) => (
                  <RelatedLink key={item.route} item={item} language={language} />
                ))}
                {relatedLinks.length === 0 ? (
                  <p className="text-sm leading-7 text-cloud">{t("No related texts are linked yet.", "아직 연결된 관련 문서가 없다.")}</p>
                ) : null}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
