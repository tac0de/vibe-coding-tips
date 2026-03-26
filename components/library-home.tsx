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
  const verificationSet = useMemo(() => getScenarioVerificationSet(data.all, selectedScenario), [data.all, selectedScenario]);
  const archiveRecords = useMemo(() => getArchiveRecords(data.all).slice(0, 6), [data.all]);
  const recentReads = useMemo(
    () => recentViewed.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, recentViewed]
  );
  const leadLocalized = lead ? getLocalizedRecord(lead, language) : null;
  const flow = useMemo(() => {
    const dossierRecords = scenarioRecords.filter((item) => item.isDossier);
    const start = dossierRecords[0] ?? scenarioRecords[0] ?? null;
    const direct = dossierRecords[1] ?? scenarioRecords[1] ?? start;
    const verify = verificationSet[0] ?? scenarioRecords[2] ?? direct;
    return { start, direct, verify };
  }, [scenarioRecords, verificationSet]);

  const utilityNotes = [
    t(
      "UI developers usually need language for mood, hierarchy, responsiveness, and browser polish before they need code.",
      "UI 개발자는 코드보다 먼저 mood, hierarchy, responsiveness, browser polish를 말할 수 있어야 한다."
    ),
    t(
      "Each flow starts with a prompt that frames the scene, then moves to direction and verification so the agent does not drift into generic output.",
      "각 플로우는 장면을 잡는 프롬프트로 시작하고, 그 다음 디렉션과 검증으로 이어져 결과가 양산형으로 흐르지 않게 한다."
    )
  ];

  const scenarioLibrary = scenarioRecords.filter((item) => item.isDossier).slice(0, 6);

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
                  <p className="eyebrow">{t("Selected Problem", "선택된 문제")}</p>
                  <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] text-paper md:text-6xl">
                    {scenario.labels[language]}
                  </h2>
                </div>
                <p className="max-w-[34ch] text-sm leading-7 text-cloud">{scenario.summary[language]}</p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {flow.start ? (
                  <article className="collection-card">
                    <p className="eyebrow">{t("1. Start Here", "1. 먼저 이걸 쓴다")}</p>
                    <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                      {stripOrdinalTitle(getLocalizedRecord(flow.start, language).title)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-cloud">{getLocalizedRecord(flow.start, language).summary}</p>
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
                  <article className="collection-card">
                    <p className="eyebrow">{t("2. Lock Direction", "2. 방향을 잠근다")}</p>
                    <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                      {stripOrdinalTitle(getLocalizedRecord(flow.direct, language).title)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-cloud">{getLocalizedRecord(flow.direct, language).summary}</p>
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
                  <article className="collection-card">
                    <p className="eyebrow">{t("3. Check In Browser", "3. 브라우저에서 확인")}</p>
                    <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-paper">
                      {stripOrdinalTitle(getLocalizedRecord(flow.verify, language).title)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-cloud">{getLocalizedRecord(flow.verify, language).summary}</p>
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
                  <p className="eyebrow">{t("Useful For UI Developers", "UI 개발자에게 왜 유용한가")}</p>
                  <p className="mt-3 max-w-[48ch] text-sm leading-7 text-cloud">
                    {t(
                      "This collection is meant for people who need to direct visual quality, not just ask for implementation.",
                      "이 컬렉션은 구현만 요청하는 사람이 아니라 시각 품질을 지시해야 하는 사람을 위한 구조다."
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {utilityNotes.map((item) => (
                  <article key={item} className="thesis-card">
                    <p className="eyebrow">{t("Reason", "이유")}</p>
                    <p className="mt-4 text-sm leading-8 text-paper">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="paper-frame px-6 py-7 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{t("Prompt Library", "프롬프트 라이브러리")}</p>
                  <p className="mt-3 max-w-[44ch] text-sm leading-7 text-cloud">
                    {t(
                      "After the first flow, use this section to open adjacent dossiers for the same UI problem.",
                      "첫 플로우를 탄 뒤, 같은 UI 문제에 딸린 인접 dossier를 여기서 이어서 연다."
                    )}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {scenarioLibrary.length} {t("texts", "texts")}
                </span>
              </div>

              <div className="mt-8 grid gap-4">
                {scenarioLibrary.map((item) => (
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
              <p className="eyebrow">{t("Continue Reading", "이어서 읽기")}</p>
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
