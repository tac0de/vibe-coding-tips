"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { SequenceStrip } from "@/components/sequence-strip";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedLink, getLocalizedRecord } from "@/lib/content/localize";
import {
  buildCopyPayload,
  getDifficultyLabel,
  getReadinessLabel,
  getRoleLabel,
  getUseCaseLabel,
  getWorkflowLabel,
  stripOrdinalTitle
} from "@/lib/content/workbench";
import type { ContentLink, ContentRecord } from "@/lib/content/types";

function MetaPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line bg-white/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
      {label}
    </span>
  );
}

function LinkCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="lab-list-item block">
      <p className="font-display text-xl tracking-[-0.03em] text-paper">{title}</p>
      <p className="mt-1 text-sm leading-6 text-cloud">{description}</p>
    </Link>
  );
}

function RelatedCards({
  items,
  language,
  fallback
}: {
  items: ContentLink[];
  language: "en" | "ko";
  fallback: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm leading-7 text-cloud">{fallback}</p>;
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const localized = getLocalizedLink(item, language);
        return (
          <LinkCard
            key={item.route}
            href={item.route}
            title={stripOrdinalTitle(localized.title)}
            description={localized.summary}
          />
        );
      })}
    </div>
  );
}

export function DocumentLayout({ document }: { document: ContentRecord | null }) {
  const { language, t } = useSiteLanguage();
  const { completed, markViewed, toggleCompleted, isCompleted } = useReadingProgress();
  const { toggleFavorite, toggleQueue, markCopied, isFavorite, isQueued, queue } = useWorkbenchState();
  const [tab, setTab] = useState<"overview" | "prompt" | "workflow" | "notes">("overview");

  useEffect(() => {
    if (!document) return;
    markViewed(document.route);
  }, [document, markViewed]);

  useEffect(() => {
    if (!document?.promptBlock && tab === "prompt") {
      setTab("overview");
    }
  }, [document?.promptBlock, tab]);

  if (!document) return null;

  const localized = getLocalizedRecord(document, language);
  const completedState = isCompleted(document.route);
  const explicit = document.relatedRoutes.filter((item) => item.route !== document.nextLink?.route);
  const togetherLinks =
    explicit.length > 0 ? explicit.slice(0, 4) : document.sequenceLinks.filter((item) => item.route !== document.route).slice(0, 4);

  const queueBadge = queue.length;

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_400px]">
          <article className="space-y-6">
            <nav className="editorial-frame flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fog md:px-7">
              <Link href="/" className="transition hover:text-paper">
                {t("Workbench", "워크벤치")}
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

            <section className="editorial-frame overflow-hidden px-5 py-6 md:px-8 md:py-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <MetaPill label={getUseCaseLabel(document.useCase, language)} />
                    <MetaPill label={getRoleLabel(document.role, language)} />
                    <MetaPill label={getDifficultyLabel(document.difficulty, language)} />
                    <MetaPill label={getReadinessLabel(document.copyReadiness, language)} />
                    <MetaPill label={`${document.timeToUse}m`} />
                  </div>

                  <div className="space-y-4">
                    <p className="eyebrow">{getWorkflowLabel(document.workflowGroup, language)}</p>
                    <h1 className="max-w-[12ch] font-display text-5xl leading-[0.9] tracking-[-0.06em] text-paper md:text-8xl">
                      {stripOrdinalTitle(localized.title)}
                    </h1>
                    <p className="max-w-[64ch] text-base leading-8 text-cloud md:text-lg">{localized.summary}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="lab-panel p-4">
                      <p className="eyebrow text-fog">{t("Use this when", "이럴 때 바로 쓴다")}</p>
                      <p className="mt-3 text-sm leading-7 text-paper">
                        {localized.situationLead ?? localized.summary}
                      </p>
                    </div>
                    <div className="lab-panel p-4">
                      <p className="eyebrow text-fog">{t("Workflow jump", "다음 연결 지점")}</p>
                      <p className="mt-3 text-sm leading-7 text-paper">
                        {document.nextLink
                          ? stripOrdinalTitle(getLocalizedLink(document.nextLink, language).title)
                          : t("Use the related prompts in Workflow tab.", "Workflow 탭의 연결 문서를 이어서 사용한다.")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lab-panel flex flex-col gap-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow">{t("Immediate Actions", "즉시 액션")}</p>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                      {document.kind}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, false)}
                      onCopy={() => markCopied(document.route)}
                      className="action-button w-full justify-center"
                      defaultLabel={document.promptBlock ? t("Copy Prompt", "프롬프트 복사") : t("Copy Notes", "노트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildCopyPayload(document, language, true)}
                      onCopy={() => markCopied(document.route)}
                      className="ghost-button w-full justify-center"
                      defaultLabel={t("Copy With Context", "컨텍스트 포함 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <button type="button" onClick={() => toggleQueue(document.route)} className="ghost-button w-full justify-center">
                      {isQueued(document.route) ? t("Queued For Session", "세션 큐에 담김") : t("Add To Session Queue", "세션 큐 담기")}
                    </button>
                    <button type="button" onClick={() => toggleFavorite(document.route)} className="ghost-button w-full justify-center">
                      {isFavorite(document.route) ? t("Saved In Favorites", "즐겨찾기에 저장됨") : t("Save Favorite", "즐겨찾기 저장")}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompleted(document.route)}
                      className={`ghost-button w-full justify-center ${completedState ? "border-cobalt text-paper" : ""}`}
                    >
                      {completedState ? t("Marked Complete", "완료 체크됨") : t("Mark Complete", "완료 체크")}
                    </button>
                  </div>

                  <div className="border-t border-line pt-4">
                    <p className="eyebrow text-fog">{t("Session state", "세션 상태")}</p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div>
                        <p className="font-display text-3xl text-paper">{queueBadge}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("queue", "큐")}</p>
                      </div>
                      <div>
                        <p className="font-display text-3xl text-paper">{completed.length}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("complete", "완료")}</p>
                      </div>
                      <div>
                        <p className="font-display text-3xl text-paper">{document.sequenceTotal ?? togetherLinks.length}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t("flow size", "플로우 수")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {document.sequenceLinks.length > 1 ? (
              <section className="editorial-frame px-5 py-4 md:px-7">
                <SequenceStrip
                  title={t("workflow lane", "워크플로 라인")}
                  items={document.sequenceLinks}
                  activeRoute={document.route}
                />
              </section>
            ) : null}

            <section className="editorial-frame px-5 py-5 md:px-7">
              <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
                {([
                  ["overview", t("Overview", "Overview")],
                  ["prompt", t("Prompt", "Prompt")],
                  ["workflow", t("Workflow", "Workflow")],
                  ["notes", t("Notes", "Notes")]
                ] as const)
                  .filter(([value]) => value !== "prompt" || document.promptBlock)
                  .map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTab(value)}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                        tab === value
                          ? "border-cobalt bg-cobalt text-white"
                          : "border-line bg-white/55 text-fog hover:border-cobalt/40 hover:text-paper"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
              </div>

              {tab === "overview" ? (
                <div className="grid gap-4 pt-6 lg:grid-cols-3">
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Use this when", "언제 쓰는지")}</p>
                    <p className="mt-3 text-sm leading-7 text-paper">
                      {localized.situationLead ?? localized.summary}
                    </p>
                  </div>
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Expected output", "기대 출력")}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-paper">
                      {(localized.summaryPoints.length > 0
                        ? localized.summaryPoints
                        : [t("Read once, then execute in a small explicit move.", "한 번 읽고 작은 단위로 명시적으로 실행한다.")])
                        .slice(0, 4)
                        .map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Watch for", "주의 포인트")}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-paper">
                      {(localized.failurePoints.length > 0
                        ? localized.failurePoints
                        : [t("Do not widen scope while running this flow.", "이 흐름 실행 중 범위를 넓히지 않는다.")])
                        .slice(0, 4)
                        .map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {tab === "prompt" && document.promptBlock ? (
                <div className="pt-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="eyebrow">{t("Copy-ready prompt", "바로 복붙할 프롬프트")}</p>
                      <p className="mt-2 text-sm leading-7 text-cloud">
                        {t(
                          "Use the raw prompt for fast execution, or copy with context from the action panel.",
                          "빠른 실행은 원본 프롬프트를, 배경까지 넘길 때는 액션 패널의 컨텍스트 포함 복사를 사용한다."
                        )}
                      </p>
                    </div>
                    <CopyPromptButton
                      value={document.promptBlock}
                      onCopy={() => markCopied(document.route)}
                      className="action-button"
                      defaultLabel={t("Copy Prompt", "프롬프트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                  </div>
                  <pre className="overflow-x-auto rounded-[28px] border border-line bg-[#08111f] px-5 py-5 text-[13px] leading-7 text-[#f3efe6]">
                    <code>{document.promptBlock}</code>
                  </pre>
                </div>
              ) : null}

              {tab === "workflow" ? (
                <div className="grid gap-4 pt-6 lg:grid-cols-2">
                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Next best doc", "다음 추천 문서")}</p>
                    <div className="mt-4">
                      {document.nextLink ? (
                        <LinkCard
                          href={document.nextLink.route}
                          title={stripOrdinalTitle(getLocalizedLink(document.nextLink, language).title)}
                          description={getLocalizedLink(document.nextLink, language).summary}
                        />
                      ) : (
                        <p className="text-sm leading-7 text-cloud">
                          {t("There is no single next doc. Use the related set below.", "고정된 다음 문서가 없으니 아래 연결 세트를 사용한다.")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Use together", "같이 쓰는 문서")}</p>
                    <div className="mt-4">
                      <RelatedCards
                        items={togetherLinks}
                        language={language}
                        fallback={t("No related docs are linked yet.", "아직 연결된 문서가 없다.")}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {tab === "notes" ? (
                <div className="pt-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="eyebrow">{t("Reference Notes", "참고 노트")}</p>
                      <p className="mt-2 text-sm leading-7 text-cloud">
                        {t(
                          "Keep this for full background, rationale, and section-level details.",
                          "전체 배경, 근거, 섹션 단위 디테일은 이 노트 뷰에서 본다."
                        )}
                      </p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                      {localized.toc.length} {t("sections", "섹션")}
                    </span>
                  </div>
                  <div className="prose-body max-w-none" dangerouslySetInnerHTML={{ __html: localized.html }} />
                </div>
              ) : null}
            </section>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <section className="editorial-frame px-5 py-5 md:px-6">
              <p className="eyebrow">{t("Execution Checks", "실행 체크")}</p>
              <div className="mt-4 grid gap-3">
                <div className="lab-panel p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                    {completedState ? t("completed", "완료됨") : t("in progress", "진행 중")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-cloud">
                    {t(
                      "Use complete as a workflow marker, not a gamified badge.",
                      "게이미피케이션이 아니라 워크플로 마커로 완료 체크를 사용한다."
                    )}
                  </p>
                </div>

                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Prompt status", "프롬프트 상태")}</p>
                  <p className="mt-3 text-sm leading-7 text-paper">
                    {document.promptBlock
                      ? t("Copy-ready prompt is available.", "즉시 복붙 가능한 프롬프트가 있다.")
                      : t("Use notes or context copy instead of raw prompt.", "원본 프롬프트 대신 노트/컨텍스트 복사를 사용한다.")}
                  </p>
                </div>

                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Session queue", "세션 큐")}</p>
                  <p className="mt-3 text-sm leading-7 text-paper">
                    {isQueued(document.route)
                      ? t("This doc is already in your active session queue.", "이 문서는 현재 세션 큐에 이미 담겨 있다.")
                      : t("Add it when this document belongs to a live demo flow.", "실시간 데모 플로우에 포함될 때 큐에 담는다.")}
                  </p>
                </div>
              </div>
            </section>

            <section className="editorial-frame px-5 py-5 md:px-6">
              <p className="eyebrow">{t("Similar Docs", "유사 문서")}</p>
              <div className="mt-4">
                <RelatedCards
                  items={document.relatedRoutes.slice(0, 4)}
                  language={language}
                  fallback={t("No related documents are linked yet.", "아직 연결된 유사 문서가 없다.")}
                />
              </div>
            </section>

            <section className="editorial-frame px-5 py-5 md:px-6">
              <p className="eyebrow">{t("Use Together", "같이 쓰는 프롬프트")}</p>
              <div className="mt-4">
                <RelatedCards
                  items={togetherLinks}
                  language={language}
                  fallback={t("No adjacent workflow items are available.", "인접 워크플로 문서가 없다.")}
                />
              </div>
            </section>

            {localized.toc.length > 0 ? (
              <section className="editorial-frame px-5 py-5 md:px-6">
                <p className="eyebrow">{t("Sections", "섹션")}</p>
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
