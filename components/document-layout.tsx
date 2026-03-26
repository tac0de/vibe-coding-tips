"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import { buildCopyPayload, getArtifactTypeLabel, getLinkText, getRiskLabel, stripOrdinalTitle } from "@/lib/content/workbench";
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
      <p className="mt-1 text-sm leading-6 text-cloud">{compactLine(localized.summary, 92)}</p>
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
  const [tab, setTab] = useState<"prompt" | "related" | "notes">("prompt");
  const rootRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const localized = document ? getLocalizedRecord(document, language) : null;

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
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out", stagger: 0.05 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [document, language]);

  useEffect(() => {
    if (!document || !panelRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panelRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" });
  }, [document, tab]);

  if (!document || !localized) return null;

  const relatedLinks = [...document.dossierLinks, ...document.variantLinks, ...document.verificationLinks].filter(
    (item, index, self) => self.findIndex((candidate) => candidate.route === item.route) === index
  );
  const nextLinks = relatedLinks.slice(0, 3);
  const relatedPromptDocs = catalog.filter((item) => item.domain === document.domain && item.route !== document.route && item.promptBlock).slice(0, 4);
  const sidebarLinks = [...nextLinks, ...relatedLinks].filter(
    (item, index, self) => self.findIndex((candidate) => candidate.route === item.route) === index
  );

  return (
    <main ref={rootRef} className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1120px] px-4 pb-20 pt-5 md:px-8 md:pb-28 md:pt-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
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
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_248px]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <MetaPill label={getArtifactTypeLabel(document.artifactType, language)} />
                    <MetaPill label={getRiskLabel(document.riskLevel, language)} />
                    <MetaPill label={`${document.timeToUse}m`} />
                  </div>
                  <h1 className="mt-6 max-w-[12ch] font-display text-5xl leading-[0.94] tracking-[-0.07em] text-paper md:text-8xl">
                    {stripOrdinalTitle(localized.title)}
                  </h1>
                  <p className="mt-6 max-w-[56ch] text-lg leading-8 text-cloud">{localized.summary}</p>
                </div>

                <aside data-motion="detail-hero" className="index-panel p-6">
                  <p className="eyebrow">{t("Copy", "복사")}</p>
                  <div className="mt-5 grid gap-3">
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, false)}
                      onCopy={() => markCopied(document.route)}
                      className="action-button w-full justify-center"
                      defaultLabel={document.promptBlock ? t("Copy prompt", "프롬프트 복사") : t("Copy text", "본문 복사")}
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
                  ["prompt", document.promptBlock ? t("Prompt", "프롬프트") : t("Read", "본문")],
                  ["related", t("Related", "관련")],
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

              <div ref={panelRef} className="pt-8">
                {tab === "prompt" ? (
                  document.promptBlock ? (
                    <div className="space-y-4">
                      <pre className="prompt-block overflow-x-auto rounded-[24px] border border-line bg-[#0b1622] px-4 py-4 text-[13px] leading-7 text-paper">
                        <code>{document.promptBlock}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: localized.html }} />
                    </div>
                  )
                ) : null}

                {tab === "related" ? (
                  <div className="grid gap-3">
                    {relatedLinks.length > 0 || relatedPromptDocs.length > 0 ? (
                      <>
                        {relatedPromptDocs.map((item) => {
                          const itemLocalized = getLocalizedRecord(item, language);
                          return (
                            <article key={item.route} className="index-entry">
                              <p className="font-display text-xl tracking-[-0.03em] text-paper">
                                {stripOrdinalTitle(itemLocalized.title)}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-cloud">{compactLine(itemLocalized.summary, 92)}</p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <CopyPromptButton
                                  value={buildCopyPayload(item, language, false)}
                                  onCopy={() => markCopied(item.route)}
                                  className="ghost-button"
                                  defaultLabel={t("Copy prompt", "프롬프트 복사")}
                                  copiedLabel={t("Copied", "복사됨")}
                                />
                                <Link href={item.route} className="quiet-link">
                                  {t("Open", "열기")}
                                </Link>
                              </div>
                            </article>
                          );
                        })}
                        {relatedLinks.map((item) => (
                          <RelatedLink key={item.route} item={item} language={language} />
                        ))}
                      </>
                    ) : (
                      <p className="text-sm leading-7 text-cloud">{t("No related texts are linked yet.", "아직 연결된 관련 문서가 없다.")}</p>
                    )}
                  </div>
                ) : null}

                {tab === "notes" ? <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: localized.html }} /> : null}
              </div>
            </section>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
            <section className="index-panel p-6">
              <p className="eyebrow">{t("Next / Related", "다음 / 관련")}</p>
              <div className="mt-5 grid gap-2">
                {sidebarLinks.length > 0 ? (
                  sidebarLinks.slice(0, 5).map((item) => <RelatedLink key={item.route} item={item} language={language} />)
                ) : (
                  <p className="text-sm leading-7 text-cloud">{t("No linked texts yet.", "아직 연결된 문서가 없다.")}</p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
