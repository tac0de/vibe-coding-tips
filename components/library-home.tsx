import Link from "next/link";
import { CopyPromptButton } from "@/components/copy-prompt-button";
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

function SequenceRows({
  eyebrow,
  title,
  items,
  compact = false
}: {
  eyebrow: string;
  title: string;
  items: ContentRecord[];
  compact?: boolean;
}) {
  return (
    <section className="border-t border-line pt-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">{eyebrow}</p>
        <h2 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">{title}</h2>
      </div>
      <div className="grid gap-0.5">
        {items.map((item, index) => (
          <Link
            key={item.route}
            href={item.route}
            className="grid gap-2 border-b border-line py-3 transition hover:bg-white/40 md:grid-cols-[72px_minmax(0,1fr)_auto]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              {item.order ? String(item.order).padStart(2, "0") : String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-1">
              <p className={compact ? "font-display text-xl tracking-[-0.025em]" : "font-display text-2xl tracking-[-0.03em]"}>
                {item.title.replace(/^\d+\.\s*/, "")}
              </p>
              <p className="max-w-measure text-sm leading-7 text-smoke">{item.summary}</p>
            </div>
            <span className="self-start font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
              {item.promptBlock ? "copy-ready" : item.kind}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuickCopyStrip({ items }: { items: ContentRecord[] }) {
  return (
    <section className="border-y border-line py-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Quick Copy</p>
          <h2 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">자주 바로 붙이는 프롬프트</h2>
        </div>
        <p className="max-w-[36ch] text-sm leading-7 text-smoke">
          전체 문서를 읽기 전에 바로 복붙해서 흐름을 시작할 수 있는 프롬프트만 먼저 뽑았다.
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
            {item.promptBlock ? (
              <div className="flex items-start gap-4 md:justify-end">
                <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">{item.domain}</p>
                <CopyPromptButton value={item.promptBlock} />
              </div>
            ) : null}
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

export function LibraryHome({ data }: { data: HomeData }) {
  const quickCopyRoutes = new Set([
    "/prompts/onboarding/02-lock-scope",
    "/prompts/roles/builder",
    "/prompts/ui/landing-first-screen",
    "/prompts/ui/anti-dashboard-rules",
    "/prompts/d3/05-add-tooltip",
    "/prompts/d3/09-react-d3-boundary"
  ]);

  const quickCopy = data.all.filter((item) => quickCopyRoutes.has(item.route));

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10">
        <header className="grid gap-8 border-b border-line pb-8 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">Editorial Prompt Library / Existing Project First</p>
            <h1 className="max-w-[11ch] font-display text-5xl leading-none tracking-[-0.055em] md:text-[6.5rem]">
              Step by step prompts for real UI work.
            </h1>
          </div>
          <div className="space-y-4 md:justify-self-end">
            <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">
              기존 UI 프로젝트에 Codex를 붙일 때 필요한 온보딩, Tailwind 정리, D3 구현, reviewer 흐름을
              생각 없이 따라가게 정리한 프롬프트 라이브러리다.
            </p>
            <div className="grid gap-2 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke md:grid-cols-3">
              <span>39 prompts</span>
              <span>step flow</span>
              <span>copy ready</span>
            </div>
          </div>
        </header>

        <SearchExplorer items={data.all} />

        <section className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div className="space-y-8">
            <SequenceRows eyebrow="Start Here" title="Existing Project Flow" items={data.onboarding} />
            <QuickCopyStrip items={quickCopy} />
          </div>

          <div className="space-y-8 md:sticky md:top-6">
            <DenseShelf eyebrow="Roles" title="Who Should Run This" items={data.roles} />
            <DenseShelf eyebrow="Playbooks" title="Read Only If Needed" items={data.playbooks} />
            <DenseShelf eyebrow="Sources" title="Primary References" items={data.sources} />
          </div>
        </section>

        <section className="grid gap-10 border-t border-line pt-6 md:grid-cols-2">
          <SequenceRows eyebrow="UI / Tailwind" title="Refine Layout, Tone, And Review" items={data.ui} compact />
          <SequenceRows eyebrow="D3" title="Build Interaction In Order" items={data.d3} compact />
        </section>
      </div>
    </main>
  );
}
