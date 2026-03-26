import Link from "next/link";
import { SearchExplorer } from "@/components/search-explorer";
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
  summary: string;
  stepsLabel: string;
  lead?: ContentRecord;
  items: ContentRecord[];
};

function TrackBlock({ index, title, summary, stepsLabel, lead, items }: TrackBlockProps) {
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
          <p className="max-w-[44ch] text-sm leading-7 text-cloud/80 md:text-base">{summary}</p>
          <Link
            href={lead.route}
            className="inline-flex items-center gap-2 border-b border-cobalt/50 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-cobalt transition hover:border-cobalt hover:text-paper"
          >
            시작 문서 열기
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
  if (!lab) return null;

  const entries = [lab, script, handout, runPrompt].filter(Boolean) as ContentRecord[];

  return (
    <section className="border-t border-line py-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">Quick Mission</p>
          <h2 className="font-display text-3xl tracking-[-0.04em] text-paper md:text-5xl">1시간 세션</h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-7 text-cloud/75">
          기존 프로젝트 읽기부터 reviewer, browser verifier, D3 미니 적용까지 60분 안에 한 번 돌리는 세션입니다.
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

function TrackShelf({ title, items }: { title: string; items: ContentRecord[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-fog">{title}</p>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cobalt">Vibe Coding Lecture Site</p>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
              <h1 className="max-w-[10ch] font-display text-5xl leading-[0.92] tracking-[-0.06em] text-paper md:text-8xl">
                바이브 코딩 실전 트랙
              </h1>
              <div className="space-y-4">
                <p className="text-sm leading-7 text-cloud/80 md:text-base">
                  이 사이트는 수강생이 웹에서 바로 읽고 따라가는 강의용 입구입니다. 기존 프로젝트 투입, UI/Tailwind,
                  D3, MCP 오케스트레이션을 트랙별로 따라갑니다.
                </p>
                <div className="grid gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:grid-cols-3">
                  <span>기존 프로젝트 우선</span>
                  <span>복붙 프롬프트 중심</span>
                  <span>웹에서 바로 진행</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line py-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt">&gt; choose your track</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">4 tracks</p>
          </div>

          <TrackBlock
            index="01"
            title="Onboarding"
            summary="기존 프로젝트를 읽고, 범위를 잠그고, AGENTS.md를 쓰고, 첫 작은 패치까지 가는 흐름입니다."
            stepsLabel={`${data.onboarding.length} steps`}
            lead={data.onboarding[0]}
            items={data.onboarding}
          />
          <TrackBlock
            index="02"
            title="UI / Tailwind"
            summary="레이아웃 위계, anti-dashboard 규칙, 반응형, 접근성, 톤 리뷰를 UI 작업 순서대로 묶었습니다."
            stepsLabel={`${data.ui.length} prompts`}
            lead={data.ui[0]}
            items={data.ui}
          />
          <TrackBlock
            index="03"
            title="D3"
            summary="choose, scales, axis, join, tooltip, interaction, cleanup 순서로 D3를 기존 프로젝트에 붙이는 트랙입니다."
            stepsLabel={`${data.d3.length} prompts`}
            lead={data.d3[0]}
            items={data.d3}
          />
          <TrackBlock
            index="04"
            title="MCP / Orchestration"
            summary="explorer, builder, reviewer, browser verifier를 어떻게 나눌지와 tool call 순서를 묶어둔 트랙입니다."
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
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-fog">검색</p>
            <p className="max-w-[42ch] text-sm leading-7 text-cloud/75">
              문서를 하나씩 뒤지는 대신 바로 필요한 프롬프트를 찾을 수 있게 검색을 남겼습니다. 다만 시작은 위 트랙 중 하나를
              고르는 쪽이 더 빠릅니다.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:pt-9">/ 키로 바로 검색</p>
          <div className="md:col-span-2">
            <SearchExplorer items={data.all} />
          </div>
        </section>

        <div className="grid gap-8 py-5 md:grid-cols-2">
          <TrackShelf title="추가 해설 문서" items={data.playbooks.filter((entry) => entry.route !== oneHourLab?.route)} />
          <TrackShelf title="출처 / 참고 자료" items={data.sources} />
        </div>
      </div>
    </main>
  );
}
