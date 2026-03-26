"use client";

import Link from "next/link";
import { useEffect } from "react";
import { DocumentReader } from "@/components/document-reader";
import { useReadingProgress } from "@/components/reading-progress";
import { SequenceStrip } from "@/components/sequence-strip";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { getLocalizedLink, getLocalizedRecord } from "@/lib/content/localize";
import type { ContentRecord } from "@/lib/content/types";

function getSidebarTone(document: ContentRecord) {
  if (document.kind === "source") {
    return {
      icon: "↗",
      badge: { en: "source file", ko: "출처 파일" },
      summaryLabel: { en: "why this matters", ko: "왜 중요한지" },
      relatedLabel: { en: "linked documents", ko: "연결 문서" },
      progressLabel: "source trail",
      accentClass: "text-[#d29a58]",
      railClass: "border-[#d29a58]/55",
      panelClass: "border-[#d29a58]/35 bg-[#d29a58]/[0.07]"
    };
  }

  if (document.kind === "playbook") {
    return {
      icon: "//",
      badge: { en: "playbook", ko: "플레이북" },
      summaryLabel: { en: "core ideas", ko: "핵심 개념" },
      relatedLabel: { en: "keep reading", ko: "이어 읽기" },
      progressLabel: "playbook flow",
      accentClass: "text-cobalt",
      railClass: "border-cobalt/55",
      panelClass: "border-cobalt/35 bg-cobalt/[0.07]"
    };
  }

  return {
    icon: ">",
    badge: { en: "prompt", ko: "프롬프트" },
    summaryLabel: { en: "execution checks", ko: "실행 체크" },
    relatedLabel: { en: "next prompts", ko: "다음 프롬프트" },
    progressLabel: "prompt track",
    accentClass: "text-[#74a2ff]",
    railClass: "border-[#74a2ff]/55",
    panelClass: "border-[#74a2ff]/35 bg-[#74a2ff]/[0.07]"
  };
}

export function DocumentLayout({ document }: { document: ContentRecord | null }) {
  const { language, t } = useSiteLanguage();
  const { completed, markViewed, toggleCompleted, isCompleted } = useReadingProgress();

  useEffect(() => {
    if (!document) return;
    markViewed(document.route);
  }, [document, markViewed]);

  if (!document) return null;

  const localized = getLocalizedRecord(document, language);
  const sidebarTone = getSidebarTone(document);
  const completedState = isCompleted(document.route);
  const progressLabel =
    document.sequenceIndex && document.sequenceTotal
      ? `${document.domain.toUpperCase()} TRACK ${document.sequenceIndex} / ${document.sequenceTotal}`
      : `${document.domain.toUpperCase()} / ${document.kind.toUpperCase()}`;

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_320px] md:px-8 md:pb-24 md:pt-10">
        <article className={`space-y-8 border-l pl-0 md:pl-6 ${sidebarTone.railClass}`}>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
            <Link href="/" className="transition hover:text-paper">
              {t("Home", "홈")}
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
            <div className="ml-auto">
              <LanguageToggle />
            </div>
          </nav>

          <header className="space-y-4 border-b border-line pb-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em]">
              <span className={sidebarTone.accentClass}>{sidebarTone.icon}</span>
              <span className={sidebarTone.accentClass}>{progressLabel}</span>
              <span className="text-fog">{t(sidebarTone.badge.en, sidebarTone.badge.ko)}</span>
            </div>
            <h1 className="max-w-[14ch] font-display text-4xl leading-none tracking-[-0.045em] md:text-7xl">
              {localized.title}
            </h1>
            <p className="max-w-measure text-sm leading-7 text-cloud md:text-base">{localized.summary}</p>
            <div className="grid gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:grid-cols-4">
              <span>{document.kind}</span>
              <span>{document.domain}</span>
              <span>{document.promptBlock ? t("compact default", "compact 기본") : t("read compact", "compact 읽기")}</span>
              <button
                type="button"
                onClick={() => toggleCompleted(document.route)}
                className={`text-left transition ${completedState ? "text-paper" : "hover:text-paper"}`}
              >
                {completedState ? t("marked complete", "완료됨") : t("mark complete", "완료 체크")}
              </button>
            </div>
          </header>

          {document.sequenceLinks.length > 1 ? (
            <SequenceStrip title={sidebarTone.progressLabel} items={document.sequenceLinks} activeRoute={document.route} />
          ) : null}

          <section className={`grid gap-4 border-y border-line py-5 md:grid-cols-3 ${sidebarTone.panelClass}`}>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {document.kind === "source"
                  ? t("Why this source", "왜 보는지")
                  : document.kind === "playbook"
                    ? t("What you learn", "무엇을 배우는지")
                    : t("Use this when", "언제 쓰는지")}
              </p>
              <p className="text-sm leading-7 text-paper">{localized.situationLead ?? localized.summary}</p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {document.kind === "source"
                  ? t("Used in", "어떤 문서에 쓰는지")
                  : document.kind === "playbook"
                    ? t("Core concept", "핵심 개념")
                    : t("Expected output", "기대 출력")}
              </p>
              <p className="text-sm leading-7 text-paper">
                {localized.summaryPoints[0] ??
                  t("Read the checklist first and then execute the step.", "체크리스트를 먼저 읽고 실행한다.")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                {document.kind === "source"
                  ? t("Related links", "관련 링크")
                  : document.kind === "playbook"
                    ? t("Read next", "다음 읽기")
                    : t("Next prompt", "다음 프롬프트")}
              </p>
              <p className="text-sm leading-7 text-paper">
                {document.nextLink ? (
                  <Link href={document.nextLink.route} className="border-b border-cobalt/40 text-cobalt">
                    {getLocalizedLink(document.nextLink, language).title.replace(/^\d+\.\s*/, "")}
                  </Link>
                ) : (
                  t("Continue with the related documents in the sidebar.", "사이드바의 연결 문서로 이어서 진행한다.")
                )}
              </p>
            </div>
          </section>

          <DocumentReader
            language={language}
            html={localized.html}
            promptBlock={localized.promptBlock}
            situationLead={localized.situationLead}
            summaryPoints={localized.summaryPoints}
            failurePoints={localized.failurePoints}
            nextLink={document.nextLink}
          />
        </article>

        <aside className="space-y-8 md:sticky md:top-6 md:self-start">
          <section className="border-t border-line pt-4">
            <p className={`font-mono text-[11px] uppercase tracking-[0.28em] ${sidebarTone.accentClass}`}>
              {t(sidebarTone.badge.en, sidebarTone.badge.ko)}
            </p>
            <div className={`mt-3 border-l-2 border border-line px-4 py-4 ${sidebarTone.railClass} ${sidebarTone.panelClass}`}>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-[0.28em] ${sidebarTone.accentClass}`}>
                  {sidebarTone.icon}
                </span>
                <p className="font-display text-2xl tracking-[-0.025em]">
                  {localized.title.replace(/^\d+\.\s*/, "")}
                </p>
              </div>
              <p className="mt-2 text-sm leading-7 text-cloud">{localized.summary}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">{progressLabel}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                {completed.includes(document.route) ? t("completed", "완료됨") : t("in progress", "진행 중")}
              </p>
            </div>
          </section>

          {document.prevLink ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">{t("Previous", "이전")}</p>
              <Link
                href={document.prevLink.route}
                className={`mt-3 block border-l-2 border border-line px-4 py-3 hover:bg-white/[0.03] ${sidebarTone.railClass} ${sidebarTone.panelClass}`}
              >
                <p className="font-display text-2xl tracking-[-0.025em]">
                  {getLocalizedLink(document.prevLink, language).title.replace(/^\d+\.\s*/, "")}
                </p>
                <p className="text-sm text-cloud">{getLocalizedLink(document.prevLink, language).summary}</p>
              </Link>
            </section>
          ) : null}

          {document.nextLink ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
                {document.kind === "prompt"
                  ? t("Next prompt", "다음 프롬프트")
                  : document.kind === "playbook"
                    ? t("Read next", "다음 읽기")
                    : t("Linked doc", "연결 문서")}
              </p>
              <Link
                href={document.nextLink.route}
                className={`mt-3 block border-l-2 border border-line px-4 py-3 hover:bg-white/[0.03] ${sidebarTone.railClass} ${sidebarTone.panelClass}`}
              >
                <p className="font-display text-2xl tracking-[-0.025em]">
                  {getLocalizedLink(document.nextLink, language).title.replace(/^\d+\.\s*/, "")}
                </p>
                <p className="text-sm text-cloud">{getLocalizedLink(document.nextLink, language).summary}</p>
              </Link>
            </section>
          ) : null}

          <section className="border-t border-line pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
              {t(sidebarTone.summaryLabel.en, sidebarTone.summaryLabel.ko)}
            </p>
            <div className={`mt-3 space-y-4 border-l-2 border border-line px-4 py-4 text-sm leading-7 text-cloud ${sidebarTone.railClass} ${sidebarTone.panelClass}`}>
              {localized.summaryPoints.length > 0 ? (
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper">
                    {document.kind === "source"
                      ? t("Key links", "핵심 링크")
                      : document.kind === "playbook"
                        ? t("Core concept", "핵심 개념")
                        : t("Expected output", "기대 출력")}
                  </p>
                  <ul className="space-y-2">
                    {localized.summaryPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {localized.failurePoints.length > 0 ? (
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper">
                    {document.kind === "source" ? t("Caution", "주의") : t("Failure patterns", "실패 패턴")}
                  </p>
                  <ul className="space-y-2">
                    {localized.failurePoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>

          {localized.toc.length > 0 ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">{t("Sections", "섹션")}</p>
              <div className={`mt-3 grid gap-2 border-l-2 border border-line px-4 py-4 text-sm text-cloud ${sidebarTone.railClass}`}>
                {localized.toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="border-b border-line py-2 hover:text-paper">
                    {item.title}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {document.relatedRoutes.length > 0 ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
                {t(sidebarTone.relatedLabel.en, sidebarTone.relatedLabel.ko)}
              </p>
              <div className="mt-3 grid gap-2">
                {document.relatedRoutes.map((item) => {
                  const localizedLink = getLocalizedLink(item, language);
                  return (
                    <Link
                      key={item.route}
                      href={item.route}
                      className={`border-l-2 border border-line px-4 py-3 hover:bg-white/[0.03] ${sidebarTone.railClass} ${sidebarTone.panelClass}`}
                    >
                      <p className="font-display text-xl tracking-[-0.025em]">{localizedLink.title}</p>
                      <p className="text-sm text-cloud">{localizedLink.summary}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
