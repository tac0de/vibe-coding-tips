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
  getRiskLabel,
  getScenarioDefinition,
  getScenarioLead,
  getScenarioRecords,
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
      <p className="mt-3 text-sm leading-7 text-cloud">{localized.summary}</p>
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

  const scenario = getScenarioDefinition(selectedScenario) ?? WAR_ROOM_SCENARIOS[0];
  const scenarioRecords = useMemo(() => getScenarioRecords(data.all, selectedScenario), [data.all, selectedScenario]);
  const lead = useMemo(() => getScenarioLead(data.all, selectedScenario), [data.all, selectedScenario]);
  const archiveRecords = useMemo(() => getArchiveRecords(data.all).slice(0, 6), [data.all]);
  const recentReads = useMemo(
    () => recentViewed.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, recentViewed]
  );
  const leadLocalized = lead ? getLocalizedRecord(lead, language) : null;

  const thesis = [
    {
      id: "thesis-1",
      title: t("Good vibe coding starts with taste, not speed.", "좋은 바이브코딩은 속도보다 취향에서 시작한다."),
      body: t(
        "A prompt should not merely request output. It should lock the scene, the tension, and the standard of judgment before an agent starts producing surface.",
        "프롬프트는 산출물만 요구하면 안 된다. 에이전트가 표면을 만들기 전에 장면, 긴장감, 판단 기준을 먼저 고정해야 한다."
      )
    },
    {
      id: "thesis-2",
      title: t("Non-developers need language for quality, not syntax.", "비개발자에게 필요한 것은 문법이 아니라 품질을 말하는 언어다."),
      body: t(
        "The collection should help people describe hierarchy, rhythm, friction, and evidence. That is how prompting becomes direction rather than guessing.",
        "이 모음집은 hierarchy, rhythm, friction, evidence를 말할 수 있게 해야 한다. 그래야 프롬프팅이 추측이 아니라 디렉션이 된다."
      )
    },
    {
      id: "thesis-3",
      title: t("Strong prompts read like condensed papers.", "강한 프롬프트는 압축된 논문처럼 읽혀야 한다."),
      body: t(
        "Every dossier here should state when to use it, what failure looks like, what a good output proves, and how to verify the result in the browser.",
        "여기 있는 dossier는 언제 쓰는지, 어떻게 실패하는지, 좋은 출력이 무엇을 증명하는지, 브라우저에서 어떻게 검증하는지를 분명히 말해야 한다."
      )
    }
  ];

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1380px] px-4 pb-20 pt-5 md:px-8 md:pb-28 md:pt-10">
        <section className="paper-frame px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[820px]">
              <p className="eyebrow">{t("Prompt Collection", "프롬프트 컬렉션")}</p>
              <h1 className="mt-4 max-w-[12ch] font-display text-5xl leading-[0.92] tracking-[-0.07em] text-paper md:text-8xl">
                {t("An archive for high-resolution prompting.", "고해상도 프롬프팅을 위한 아카이브.")}
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-8 text-cloud">
                {t(
                  "A curated collection of long-form prompt dossiers and short papers on how to direct agents with taste, evidence, and structural clarity.",
                  "긴 프롬프트 dossier와 바이브코딩 방법론을 묶은 큐레이션 아카이브. 코드 문법보다 장면, 근거, 구조 감각을 먼저 다룬다."
                )}
              </p>
            </div>
            <LanguageToggle />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_340px]">
            <div className="essay-panel p-6 md:p-7">
              <p className="eyebrow">{t("Abstract", "초록")}</p>
              <p className="mt-4 max-w-[66ch] text-base leading-8 text-paper">
                {t(
                  "This site is built as a reading surface first. It collects prompts that help people brief agents for legacy CSS/SCSS migration, D3 integration, UI refinement, and browser verification without collapsing into generic output.",
                  "이 사이트는 먼저 읽히는 화면으로 설계된다. 레거시 CSS/SCSS 마이그레이션, D3 통합, UI 정리, 브라우저 검증을 다룰 때 결과물이 양산형으로 무너지지 않도록 돕는 프롬프트를 모은다."
                )}
              </p>
            </div>

            <aside className="index-panel p-6">
              <p className="eyebrow">{t("Reading Index", "읽기 인덱스")}</p>
              <div className="mt-5 grid gap-2">
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
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_360px]">
          <div className="space-y-8">
            <section className="paper-frame px-6 py-7 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">{t("Selected Theme", "선택된 주제")}</p>
                  <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] text-paper md:text-6xl">
                    {scenario.labels[language]}
                  </h2>
                </div>
                <p className="max-w-[34ch] text-sm leading-7 text-cloud">{scenario.summary[language]}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {thesis.map((item) => (
                  <article key={item.id} className="thesis-card">
                    <p className="eyebrow">{t("Thesis", "테제")}</p>
                    <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-paper">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-cloud">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="paper-frame px-6 py-7 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{t("Prompt Dossiers", "프롬프트 dossier")}</p>
                  <p className="mt-3 max-w-[48ch] text-sm leading-7 text-cloud">
                    {t(
                      "Open these when you need dense prompts with diagnosis, direction, and verification built in.",
                      "진단, 디렉션, 검증이 한 번에 묶인 긴 프롬프트가 필요할 때 여는 문서들."
                    )}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {scenarioRecords.filter((item) => item.isDossier).length} {t("texts", "texts")}
                </span>
              </div>

              <div className="mt-8 grid gap-4">
                {scenarioRecords
                  .filter((item) => item.isDossier)
                  .slice(0, 6)
                  .map((item) => (
                    <CollectionCard
                      key={item.route}
                      item={item}
                      language={language}
                      onCopy={() => markCopied(item.route)}
                    />
                  ))}
              </div>
            </section>

            <section className="paper-frame px-6 py-7 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{t("Archive", "아카이브")}</p>
                  <p className="mt-3 max-w-[44ch] text-sm leading-7 text-cloud">
                    {t(
                      "Secondary materials remain available, but they no longer dominate the first screen.",
                      "보조 자료도 남겨두되, 더 이상 첫 화면을 지배하지는 않는다."
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {archiveRecords.map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <Link key={item.route} href={item.route} className="archive-entry">
                      <p className="eyebrow">{item.kind}</p>
                      <p className="mt-3 font-display text-2xl tracking-[-0.04em] text-paper">
                        {stripOrdinalTitle(localized.title)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
            {lead && leadLocalized ? (
              <section className="index-panel p-6">
                <p className="eyebrow">{t("Lead Reading", "대표 읽기")}</p>
                <h2 className="mt-4 font-display text-4xl tracking-[-0.05em] text-paper">
                  {stripOrdinalTitle(leadLocalized.title)}
                </h2>
                <p className="mt-4 text-sm leading-7 text-cloud">{leadLocalized.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <MetaPill label={getArtifactTypeLabel(lead.artifactType, language)} />
                  <MetaPill label={getRiskLabel(lead.riskLevel, language)} />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <CopyPromptButton
                    value={buildCopyPayload(lead, language, true)}
                    onCopy={() => markCopied(lead.route)}
                    className="action-button"
                    defaultLabel={t("Copy dossier", "dossier 복사")}
                    copiedLabel={t("Copied", "복사됨")}
                  />
                  <Link href={lead.route} className="quiet-link">
                    {t("Open text", "본문 열기")}
                  </Link>
                </div>
              </section>
            ) : null}

            <section className="index-panel p-6">
              <p className="eyebrow">{t("Recently Read", "최근 읽은 문서")}</p>
              <div className="mt-5 grid gap-2">
                {(recentReads.length > 0 ? recentReads.slice(0, 5) : scenarioRecords.slice(0, 5)).map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <Link key={item.route} href={item.route} className="index-entry">
                      <p className="font-display text-xl tracking-[-0.03em] text-paper">
                        {stripOrdinalTitle(localized.title)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
