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

function AxisNavigator({
  onboarding,
  workshop,
  ui,
  d3
}: {
  onboarding: ContentRecord | undefined;
  workshop: ContentRecord | undefined;
  ui: ContentRecord | undefined;
  d3: ContentRecord | undefined;
}) {
  const items = [
    {
      eyebrow: "01",
      title: "Onboarding",
      summary: "기존 프로젝트 읽기, 범위 잠금, AGENTS.md, 첫 작은 패치부터 시작한다.",
      target: onboarding
    },
    {
      eyebrow: "02",
      title: "One Hour Lab",
      summary: "1시간 내외 실습 세션을 그대로 진행하는 메인 흐름이다.",
      target: workshop
    },
    {
      eyebrow: "03",
      title: "UI / Tailwind",
      summary: "first screen, hierarchy, anti-dashboard, responsive, tone review 순서로 간다.",
      target: ui
    },
    {
      eyebrow: "04",
      title: "D3",
      summary: "choose, scales, axis, join, tooltip, interaction 순서로 붙인다.",
      target: d3
    }
  ].filter((item) => item.target);

  return (
    <section className="border-b border-line pb-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Four Ways In</p>
          <h2 className="mt-2 font-display text-3xl tracking-[-0.04em] md:text-5xl">지금 할 일 기준으로 바로 들어가기</h2>
        </div>
        <p className="max-w-[38ch] text-sm leading-7 text-smoke">
          수강생용 시작 화면입니다. 온보딩, 1시간 세션, UI, D3 중 하나만 골라 바로 시작하면 됩니다.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.target!.route}
            className="group grid min-h-[190px] gap-3 border border-line bg-white/40 px-4 py-5 transition hover:border-cobalt hover:bg-white md:grid-cols-[72px_minmax(0,1fr)] md:px-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cobalt">{item.eyebrow}</p>
            <div className="space-y-1">
              <p className="font-display text-3xl tracking-[-0.04em] transition group-hover:translate-x-0.5">{item.title}</p>
              <p className="max-w-[32ch] text-sm leading-7 text-smoke">{item.summary}</p>
              <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">Open Track</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WorkshopSpotlight({
  lab,
  script,
  handout,
  runPrompt
}: {
  lab: ContentRecord | undefined;
  script: ContentRecord | undefined;
  handout: ContentRecord | undefined;
  runPrompt: ContentRecord | undefined;
}) {
  if (!lab) return null;

  return (
    <section className="border-y border-line py-8">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="space-y-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cobalt">One Hour Lab</p>
          <h2 className="max-w-[12ch] font-display text-4xl leading-none tracking-[-0.05em] md:text-6xl">
            60분 안에 한 사이클 끝내기
          </h2>
          <p className="max-w-[44ch] text-sm leading-7 text-smoke md:text-base">
            기존 UI 프로젝트를 기준으로 읽기, 범위 잠금, 작은 패치, 리뷰, 브라우저 검증, D3 미니 적용까지 한 번에 돌립니다.
          </p>
          <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-3">
            {[
              "Read -> Lock -> Small Patch",
              "Reviewer -> Browser Verify",
              "D3 mini view -> Wrap-up"
            ].map((item, index) => (
              <div key={item} className="border-b border-line pb-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
                  Block {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-2 border-t border-line pt-4">
          <Link href={lab.route} className="border-b border-line py-3 transition hover:bg-white/40">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">Main flow</p>
            <p className="mt-1 font-display text-2xl tracking-[-0.03em]">{lab.title}</p>
            <p className="text-sm text-smoke">{lab.summary}</p>
          </Link>
          {script ? (
            <Link href={script.route} className="border-b border-line py-3 transition hover:bg-white/40">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">Instructor</p>
              <p className="mt-1 font-display text-xl tracking-[-0.025em]">{script.title}</p>
              <p className="text-sm text-smoke">{script.summary}</p>
            </Link>
          ) : null}
          {handout ? (
            <Link href={handout.route} className="border-b border-line py-3 transition hover:bg-white/40">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">Attendee</p>
              <p className="mt-1 font-display text-xl tracking-[-0.025em]">{handout.title}</p>
              <p className="text-sm text-smoke">{handout.summary}</p>
            </Link>
          ) : null}
          {runPrompt ? (
            <Link href={runPrompt.route} className="border-b border-line py-3 transition hover:bg-white/40">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">Copy-ready prompt</p>
              <p className="mt-1 font-display text-xl tracking-[-0.025em]">{runPrompt.title}</p>
              <p className="text-sm text-smoke">{runPrompt.summary}</p>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FlowRunner({
  eyebrow,
  title,
  summary,
  items
}: {
  eyebrow: string;
  title: string;
  summary: string;
  items: ContentRecord[];
}) {
  return (
    <section className="border-t border-line pt-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">{eyebrow}</p>
          <h2 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">{title}</h2>
        </div>
        <p className="max-w-[38ch] text-sm leading-7 text-smoke">{summary}</p>
      </div>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <Link
            key={item.route}
            href={item.route}
            className="grid gap-3 border-b border-line py-4 transition hover:bg-white/40 md:grid-cols-[86px_minmax(0,1fr)_auto]"
          >
            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                Step {String(item.order ?? index + 1).padStart(2, "0")}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">{item.domain}</p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-2xl tracking-[-0.03em]">{item.title.replace(/^\d+\.\s*/, "")}</p>
              <p className="max-w-measure text-sm leading-7 text-smoke">{item.summary}</p>
            </div>
            <div className="self-start font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              {item.promptBlock ? "copy-ready" : item.kind}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuickStartStrip({ items }: { items: ContentRecord[] }) {
  return (
    <section className="border-y border-line py-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Quick Start</p>
          <h2 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">자주 바로 여는 문서</h2>
        </div>
        <p className="max-w-[36ch] text-sm leading-7 text-smoke">
          수업 중 가장 자주 여는 흐름만 먼저 뽑았습니다.
        </p>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.route}
            className="grid gap-3 border-b border-line py-3 md:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="space-y-1">
              <Link href={item.route} className="block">
                <p className="font-display text-xl tracking-[-0.025em]">{item.title.replace(/^\d+\.\s*/, "")}</p>
                <p className="text-sm text-smoke">{item.summary}</p>
              </Link>
            </div>
            <div className="flex items-start gap-4 md:justify-end">
              <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">{item.domain}</p>
              <Link
                href={item.route}
                className="border-b border-transparent pb-1 font-mono text-xs uppercase tracking-[0.22em] text-cobalt transition hover:border-cobalt"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DenseShelf({
  eyebrow,
  title,
  items
}: {
  eyebrow: string;
  title: string;
  items: ContentRecord[];
}) {
  return (
    <section className="border-t border-line pt-5">
      <div className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] md:text-4xl">{title}</h2>
      </div>
      <div className="grid gap-0.5">
        {items.map((item) => (
          <Link key={item.route} href={item.route} className="border-b border-line py-3 transition hover:bg-white/40">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="font-display text-xl tracking-[-0.025em]">{item.title.replace(/^\d+\.\s*/, "")}</p>
                <p className="text-sm text-smoke">{item.summary}</p>
              </div>
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
                {item.tags[0] ?? item.domain}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ReadingTracks({
  ui,
  d3
}: {
  ui: ContentRecord[];
  d3: ContentRecord[];
}) {
  return (
    <section className="border-t border-line pt-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Reading Tracks</p>
          <h2 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">트랙 하나를 고르고 끝까지 따라가기</h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-7 text-smoke">
          UI와 D3는 문서를 섞어 읽기보다, 한 트랙을 끝까지 따라가는 쪽이 더 빠릅니다.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {[{ title: "UI / Tailwind Track", items: ui }, { title: "D3 Track", items: d3 }].map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="font-display text-xl tracking-[-0.025em]">{group.title}</p>
            <div className="grid gap-2">
              {group.items.slice(0, 5).map((item, index) => (
                <Link key={item.route} href={item.route} className="border-b border-line py-3 transition hover:bg-white/40">
                  <div className="flex items-start gap-4">
                    <p className="min-w-10 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                      {String(item.order ?? index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p className="font-display text-lg tracking-[-0.02em]">{item.title.replace(/^\d+\.\s*/, "")}</p>
                      <p className="text-sm text-smoke">{item.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LibraryHome({ data }: { data: HomeData }) {
  const quickStartRoutes = new Set([
    "/prompts/onboarding/02-lock-scope",
    "/prompts/roles/builder",
    "/prompts/ui/landing-first-screen",
    "/prompts/ui/anti-dashboard-rules",
    "/prompts/d3/05-add-tooltip",
    "/prompts/d3/09-react-d3-boundary"
  ]);

  const quickStart = data.all.filter((item) => quickStartRoutes.has(item.route));
  const workshopLab = data.playbooks.find((item) => item.route === "/playbooks/one-hour-agent-lab");
  const workshopScript = data.playbooks.find((item) => item.route === "/playbooks/one-hour-instructor-script");
  const workshopHandout = data.playbooks.find((item) => item.route === "/playbooks/one-hour-attendee-handout");
  const workshopPrompt = data.onboarding.find((item) => item.route === "/prompts/onboarding/12-run-one-hour-agent-lab");
  const promptCount = data.all.filter((item) => item.kind === "prompt").length;
  const onboardingEntry = data.onboarding[0];
  const workshopEntry = workshopLab;
  const uiEntry = data.ui[0];
  const d3Entry = data.d3[0];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10">
        <header className="grid gap-8 border-b border-line pb-8 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">UI Agent Prompt Library</p>
            <h1 className="max-w-[11ch] font-display text-5xl leading-none tracking-[-0.055em] md:text-[6.5rem]">
              실무 UI 작업을 바로 따라가는 프롬프트 모음집
            </h1>
          </div>
          <div className="space-y-4 md:justify-self-end">
            <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">
              기존 UI 프로젝트에 바로 붙이는 흐름만 모았습니다. 온보딩, Tailwind 정리, D3 구현, reviewer, 브라우저 검증 순서대로 따라가면 됩니다.
            </p>
            <div className="grid gap-2 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke md:grid-cols-3">
              <span>{promptCount} prompts</span>
              <span>step flow</span>
              <span>copy ready</span>
            </div>
          </div>
        </header>

        <WorkshopSpotlight
          lab={workshopLab}
          script={workshopScript}
          handout={workshopHandout}
          runPrompt={workshopPrompt}
        />

        <AxisNavigator onboarding={onboardingEntry} workshop={workshopEntry} ui={uiEntry} d3={d3Entry} />

        <SearchExplorer items={data.all} />

        <section className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div className="space-y-8">
            <FlowRunner
              eyebrow="Start Here"
              title="Existing Project Flow"
              summary="기존 프로젝트에 Codex를 붙일 때는 탐색, 범위 잠금, 규칙 문서, 첫 작은 패치, reviewer, browser verify 순서로 가야 한다."
              items={data.onboarding}
            />
            <QuickStartStrip items={quickStart} />
          </div>

          <div className="space-y-8 md:sticky md:top-6">
            <DenseShelf eyebrow="Roles" title="Who Should Run This" items={data.roles} />
            <DenseShelf eyebrow="Playbooks" title="Read Only If Needed" items={data.playbooks} />
            <DenseShelf eyebrow="Sources" title="Primary References" items={data.sources} />
          </div>
        </section>

        <section className="grid gap-10 border-t border-line pt-6 md:grid-cols-2">
          <FlowRunner
            eyebrow="UI / Tailwind"
            title="Refine Layout, Tone, And Review"
            summary="브리프, 첫 화면, 반응형, 접근성, 톤 리뷰, Tailwind cleanup 순서로 좁혀 들어가면 양산형 UI를 피하기 쉽다."
            items={data.ui}
          />
          <FlowRunner
            eyebrow="D3"
            title="Build Interaction In Order"
            summary="choose, scales, axis, join, tooltip, interaction, cleanup 순서를 깨지 않는 것이 D3를 에이전트와 안정적으로 붙이는 핵심이다."
            items={data.d3}
          />
        </section>

        <ReadingTracks ui={data.ui} d3={data.d3} />
      </div>
    </main>
  );
}
