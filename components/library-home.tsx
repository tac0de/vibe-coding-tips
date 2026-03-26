"use client";

import Link from "next/link";
import { SearchExplorer } from "@/components/search-explorer";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { getLocalizedRecord } from "@/lib/content/localize";
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

type TrackBlockProps = {
  index: string;
  title: string;
  summaryEn: string;
  summaryKo: string;
  lead?: ContentRecord;
  items: ContentRecord[];
};

function TrackBlock({ index, title, summaryEn, summaryKo, lead, items }: TrackBlockProps) {
  const { language, t } = useSiteLanguage();
  const { completed, viewed } = useReadingProgress();

  if (!lead) return null;

  const doneCount = items.filter((item) => completed.includes(item.route)).length;
  const viewedCount = items.filter((item) => viewed.includes(item.route)).length;
  const localizedLead = getLocalizedRecord(lead, language);

  return (
    <section className="border-t border-line py-5">
      <div className="grid gap-4 md:grid-cols-[88px_minmax(0,1fr)_240px] md:items-start">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cobalt">{index}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
            {doneCount}/{items.length} {t("done", "완료")}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
            {viewedCount}/{items.length} {t("opened", "열람")}
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-paper">{title}</p>
          <p className="max-w-[34ch] text-sm leading-7 text-cloud/80 md:text-base">{t(summaryEn, summaryKo)}</p>
          <Link
            href={lead.route}
            className="inline-flex items-center gap-2 border-b border-cobalt/50 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-cobalt transition hover:border-cobalt hover:text-paper"
          >
            {t("Start track", "트랙 시작")}
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-xs leading-6 text-fog">{localizedLead.summary}</p>
        </div>

        <div className="space-y-2 border-l border-line/80 pl-0 md:pl-4">
          {items.slice(0, 3).map((item) => {
            const localized = getLocalizedRecord(item, language);
            const isDone = completed.includes(item.route);
            const isOpened = viewed.includes(item.route);

            return (
              <Link
                key={item.route}
                href={item.route}
                className="block border-b border-line/80 py-2 transition hover:border-cobalt/50 hover:text-paper"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {String(item.order ?? 0).padStart(2, "0")} {isDone ? "●" : isOpened ? "◐" : "○"}
                </p>
                <p className="mt-1 text-sm leading-6 text-cloud">{localized.title.replace(/^\d+\.\s*/, "")}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MissionLedger({ data }: { data: HomeData }) {
  const { t } = useSiteLanguage();
  const { viewed, completed, points } = useReadingProgress();

  const badges = [
    viewed.length >= 1 ? { en: "First Open", ko: "첫 열람" } : null,
    completed.length >= 1 ? { en: "First Complete", ko: "첫 완료" } : null,
    data.onboarding.every((item) => completed.includes(item.route)) ? { en: "Onboarding Clear", ko: "온보딩 완료" } : null,
    data.d3.some((item) => completed.includes(item.route)) ? { en: "D3 First Step", ko: "D3 첫 단계" } : null,
    completed.length >= 12 ? { en: "Mission Runner", ko: "미션 러너" } : null
  ].filter(Boolean) as Array<{ en: string; ko: string }>;

  return (
    <section className="border-b border-line py-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">
            {t("Mission Ledger", "진행 현황")}
          </p>
          <p className="max-w-[42ch] text-sm leading-7 text-cloud/75">
            {t(
              "Progress is saved in this browser. Open docs, complete steps, and use the tracks as your mission board.",
              "진행 상태는 이 브라우저에 저장됩니다. 문서를 열고, 단계를 완료하면서 트랙을 미션 보드처럼 따라가면 됩니다."
            )}
          </p>
        </div>
        <div className="grid gap-3 border border-line bg-white/[0.02] p-4">
          <div className="flex items-end justify-between gap-3 border-b border-line pb-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">XP</p>
              <p className="font-display text-4xl tracking-[-0.04em] text-paper">{points}</p>
            </div>
            <div className="text-right text-sm text-cloud">
              <p>{completed.length} {t("completed", "완료")}</p>
              <p>{viewed.length} {t("opened", "열람")}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.length > 0 ? (
              badges.map((badge) => (
                <span
                  key={badge.en}
                  className="border border-cobalt/35 bg-cobalt/[0.08] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
                >
                  {t(badge.en, badge.ko)}
                </span>
              ))
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                {t("Open one doc to start earning progress.", "문서를 하나 열면 진행이 시작됩니다.")}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickMission({
  lab,
  script,
  handout,
  runPrompt
}: {
  lab?: ContentRecord;
  script?: ContentRecord;
  handout?: ContentRecord;
  runPrompt?: ContentRecord;
}) {
  const { language, t } = useSiteLanguage();

  if (!lab) return null;

  const entries = [lab, script, handout, runPrompt].filter(Boolean) as ContentRecord[];

  return (
    <section className="border-t border-line py-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">
            {t("Quick Mission", "빠른 세션")}
          </p>
          <h2 className="font-display text-3xl tracking-[-0.04em] text-paper md:text-5xl">
            {t("60-minute lab", "60분 세션")}
          </h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-7 text-cloud/75">
          {t(
            "Run one compact workshop flow if you need to cover reading, patching, D3, review, and browser verification in a single session.",
            "한 번의 세션으로 읽기, 패치, D3, 리뷰, 브라우저 검증까지 묶어서 보여줄 때 쓰는 압축 트랙입니다."
          )}
        </p>
      </div>
      <div className="grid gap-2">
        {entries.map((item) => {
          const localized = getLocalizedRecord(item, language);
          return (
            <Link
              key={item.route}
              href={item.route}
              className="grid gap-3 border-b border-line/80 py-3 transition hover:border-cobalt/50 hover:bg-white/[0.02] md:grid-cols-[160px_minmax(0,1fr)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">{item.kind}</p>
              <div>
                <p className="font-display text-xl tracking-[-0.025em] text-paper">{localized.title.replace(/^\d+\.\s*/, "")}</p>
                <p className="text-sm leading-7 text-cloud/75">{localized.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function LibraryHome({ data }: { data: HomeData }) {
  const { t } = useSiteLanguage();
  const oneHourLab = data.playbooks.find((entry) => entry.path.endsWith("one-hour-agent-lab.md"));
  const instructorScript = data.playbooks.find((entry) => entry.path.endsWith("one-hour-instructor-script.md"));
  const attendeeHandout = data.playbooks.find((entry) => entry.path.endsWith("one-hour-attendee-handout.md"));
  const runLabPrompt = data.onboarding.find((entry) => entry.path.endsWith("12-run-one-hour-agent-lab.md"));
  const orchestrationLead =
    data.onboarding.find((entry) => entry.path.endsWith("09-subagent-orchestration.md")) ??
    data.roles[0] ??
    data.playbooks.find((entry) => entry.path.endsWith("mcp-orchestration.md"));

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10">
        <section className="border-b border-line pb-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cobalt">
                {t("Terminal Quest for Vibe Coding", "바이브 코딩 터미널 퀘스트")}
              </p>
              <LanguageToggle />
            </div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
              <h1 className="max-w-[10ch] font-display text-5xl leading-[0.9] tracking-[-0.06em] text-paper md:text-8xl">
                {t("Learn fast. Ship with agents.", "빠르게 익히고 에이전트로 밀기")}
              </h1>
              <div className="space-y-4">
                <p className="text-sm leading-7 text-cloud/80 md:text-base">
                  {t(
                    "Pick one track. Move in order. Open the doc, copy the prompt, complete the step, then go next.",
                    "트랙 하나를 고르고 순서대로 진행한다. 문서를 열고, 프롬프트를 복사하고, 단계를 완료한 뒤 다음으로 넘어간다."
                  )}
                </p>
                <div className="grid gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:grid-cols-3">
                  <span>{t("existing project first", "기존 프로젝트 우선")}</span>
                  <span>{t("prompt-driven flow", "프롬프트 중심 진행")}</span>
                  <span>{t("progress saved locally", "진행 상태 로컬 저장")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MissionLedger data={data} />

        <section className="border-b border-line py-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">
              {t("> choose your track", "> 트랙 선택")}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              {t("4 tracks", "4개 트랙")}
            </p>
          </div>

          <TrackBlock
            index="01"
            title="Onboarding"
            summaryEn="Read. Lock scope. Ship first patch."
            summaryKo="읽고, 범위를 잠그고, 첫 패치를 낸다."
            lead={data.onboarding[0]}
            items={data.onboarding}
          />
          <TrackBlock
            index="02"
            title="UI / Tailwind"
            summaryEn="Hierarchy first. Polish later."
            summaryKo="위계부터 잡고, 폴리시는 나중에 한다."
            lead={data.ui[0]}
            items={data.ui}
          />
          <TrackBlock
            index="03"
            title="D3"
            summaryEn="Scale. Join. Interact."
            summaryKo="스케일, 조인, 인터랙션 순서로 간다."
            lead={data.d3[0]}
            items={data.d3}
          />
          <TrackBlock
            index="04"
            title="MCP / Orchestration"
            summaryEn="Split roles. Cut wasted tool calls."
            summaryKo="역할을 나누고, 툴 호출 낭비를 줄인다."
            lead={orchestrationLead}
            items={[
              ...data.roles,
              ...(orchestrationLead && !data.roles.find((item) => item.route === orchestrationLead.route)
                ? [orchestrationLead]
                : [])
            ]}
          />
        </section>

        <QuickMission
          lab={oneHourLab}
          script={instructorScript}
          handout={attendeeHandout}
          runPrompt={runLabPrompt}
        />

        <section className="grid gap-8 border-b border-line py-5 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-fog">{t("Search", "검색")}</p>
            <p className="max-w-[42ch] text-sm leading-7 text-cloud/75">
              {t(
                "Use search when you already know the task. If not, start with one of the tracks above.",
                "찾는 작업이 명확하면 검색을 쓰고, 아니면 위 트랙 중 하나에서 시작하는 편이 빠르다."
              )}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:pt-9">
            {t("press / to search", "/ 키로 바로 검색")}
          </p>
          <div className="md:col-span-2">
            <SearchExplorer items={data.all} />
          </div>
        </section>
      </div>
    </main>
  );
}
