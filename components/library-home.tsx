"use client";

import Link from "next/link";
import { SearchExplorer } from "@/components/search-explorer";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
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
  stepsLabel: string;
  lead?: ContentRecord;
  items: ContentRecord[];
};

function TrackBlock({ index, title, summaryEn, summaryKo, stepsLabel, lead, items }: TrackBlockProps) {
  const { t } = useSiteLanguage();

  if (!lead) return null;

  return (
    <section className="border-t border-line py-5">
      <div className="grid gap-4 md:grid-cols-[100px_minmax(0,1fr)_220px] md:items-start">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">{index}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">{stepsLabel}</p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-cloud">{title}</p>
          <p className="max-w-[44ch] text-sm leading-7 text-cloud/80 md:text-base">{t(summaryEn, summaryKo)}</p>
          <Link
            href={lead.route}
            className="inline-flex items-center gap-2 border-b border-cobalt/50 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-cobalt transition hover:border-cobalt hover:text-paper"
          >
            {t("Open start doc", "시작 문서 열기")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="space-y-2 border-l border-line/80 pl-0 md:pl-4">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.route}
              href={item.route}
              className="block border-b border-line/80 py-2 transition hover:border-cobalt/50 hover:text-paper"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                {String(item.order ?? 0).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm leading-6 text-cloud">{item.title.replace(/^\d+\.\s*/, "")}</p>
            </Link>
          ))}
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
  const { t } = useSiteLanguage();

  if (!lab) return null;

  const entries = [lab, script, handout, runPrompt].filter(Boolean) as ContentRecord[];

  return (
    <section className="border-t border-line py-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">{t("Quick Mission", "1시간 세션")}</p>
          <h2 className="font-display text-3xl tracking-[-0.04em] text-paper md:text-5xl">{t("One hour lab", "1시간 세션")}</h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-7 text-cloud/75">
          {t(
            "A compact 60-minute run through existing-project reading, review flow, browser verification, and a D3 mini task.",
            "기존 프로젝트 읽기부터 reviewer, browser verifier, D3 미니 적용까지 60분 안에 한 번 돌리는 세션입니다."
          )}
        </p>
      </div>
      <div className="grid gap-2">
        {entries.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="grid gap-3 border-b border-line/80 py-3 transition hover:border-cobalt/50 hover:bg-white/[0.02] md:grid-cols-[180px_minmax(0,1fr)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">{item.kind}</p>
            <div>
              <p className="font-display text-xl tracking-[-0.025em] text-paper">{item.title.replace(/^\d+\.\s*/, "")}</p>
              <p className="text-sm leading-7 text-cloud/75">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrackShelf({ titleEn, titleKo, items }: { titleEn: string; titleKo: string; items: ContentRecord[] }) {
  const { t } = useSiteLanguage();

  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-fog">{t(titleEn, titleKo)}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">{items.length} docs</p>
      </div>
      <div className="grid gap-2">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="grid gap-3 border-b border-line/80 py-3 transition hover:border-cobalt/50 hover:text-paper md:grid-cols-[70px_minmax(0,1fr)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              {String(item.order ?? 0).padStart(2, "0")}
            </p>
            <div>
              <p className="font-display text-lg tracking-[-0.02em] text-paper">{item.title.replace(/^\d+\.\s*/, "")}</p>
              <p className="text-sm leading-7 text-cloud/75">{item.summary}</p>
            </div>
          </Link>
        ))}
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
                {t("Vibe Coding Lecture Site", "바이브 코딩 강의 사이트")}
              </p>
              <LanguageToggle />
            </div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
              <h1 className="max-w-[10ch] font-display text-5xl leading-[0.92] tracking-[-0.06em] text-paper md:text-8xl">
                {t("Tracks for real agent work", "바이브 코딩 실전 트랙")}
              </h1>
              <div className="space-y-4">
                <p className="text-sm leading-7 text-cloud/80 md:text-base">
                  {t(
                    "This site is the student-facing workshop entry. Follow one track at a time: existing project onboarding, UI/Tailwind, D3, or MCP orchestration.",
                    "이 사이트는 수강생이 웹에서 바로 읽고 따라가는 강의용 입구입니다. 기존 프로젝트 투입, UI/Tailwind, D3, MCP 오케스트레이션을 트랙별로 따라갑니다."
                  )}
                </p>
                <div className="grid gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:grid-cols-3">
                  <span>{t("existing project first", "기존 프로젝트 우선")}</span>
                  <span>{t("copy-ready prompts", "복붙 프롬프트 중심")}</span>
                  <span>{t("run on the web", "웹에서 바로 진행")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line py-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">{t("> choose your track", "> 트랙 선택")}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">4 tracks</p>
          </div>

          <TrackBlock
            index="01"
            title="Onboarding"
            summaryEn="Read the existing project, lock scope, write AGENTS.md, and land the first small patch."
            summaryKo="기존 프로젝트를 읽고, 범위를 잠그고, AGENTS.md를 쓰고, 첫 작은 패치까지 가는 흐름입니다."
            stepsLabel={`${data.onboarding.length} steps`}
            lead={data.onboarding[0]}
            items={data.onboarding}
          />
          <TrackBlock
            index="02"
            title="UI / Tailwind"
            summaryEn="Move through hierarchy, anti-dashboard rules, responsive fixes, accessibility, and UI tone review."
            summaryKo="레이아웃 위계, anti-dashboard 규칙, 반응형, 접근성, 톤 리뷰를 UI 작업 순서대로 묶었습니다."
            stepsLabel={`${data.ui.length} prompts`}
            lead={data.ui[0]}
            items={data.ui}
          />
          <TrackBlock
            index="03"
            title="D3"
            summaryEn="Go from choosing D3 to scales, axis, join, tooltip, interaction, and cleanup in order."
            summaryKo="choose, scales, axis, join, tooltip, interaction, cleanup 순서로 D3를 기존 프로젝트에 붙이는 트랙입니다."
            stepsLabel={`${data.d3.length} prompts`}
            lead={data.d3[0]}
            items={data.d3}
          />
          <TrackBlock
            index="04"
            title="MCP / Orchestration"
            summaryEn="Split explorer, builder, reviewer, and browser verifier roles and tighten tool call order."
            summaryKo="explorer, builder, reviewer, browser verifier를 어떻게 나눌지와 tool call 순서를 묶어둔 트랙입니다."
            stepsLabel={`${Math.max(data.roles.length, 1)} tracks`}
            lead={orchestrationLead}
            items={[...data.roles, ...(orchestrationLead && !data.roles.find((item) => item.route === orchestrationLead.route) ? [orchestrationLead] : [])]}
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
                "Use search when you already know the task. If you are starting cold, picking one of the tracks above is faster.",
                "문서를 하나씩 뒤지는 대신 바로 필요한 프롬프트를 찾을 수 있게 검색을 남겼습니다. 다만 시작은 위 트랙 중 하나를 고르는 쪽이 더 빠릅니다."
              )}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:pt-9">{t("press / to search", "/ 키로 바로 검색")}</p>
          <div className="md:col-span-2">
            <SearchExplorer items={data.all} />
          </div>
        </section>

        <div className="grid gap-8 py-5 md:grid-cols-2">
          <TrackShelf titleEn="Further reading" titleKo="추가 해설 문서" items={data.playbooks.filter((entry) => entry.route !== oneHourLab?.route)} />
          <TrackShelf titleEn="Sources and references" titleKo="출처 / 참고 자료" items={data.sources} />
        </div>
      </div>
    </main>
  );
}
