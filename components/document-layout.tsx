import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentReader } from "@/components/document-reader";
import { SequenceStrip } from "@/components/sequence-strip";
import type { ContentRecord } from "@/lib/content/types";

function getSidebarTone(document: ContentRecord) {
  if (document.kind === "source") {
    return {
      badge: "출처 문서",
      summaryLabel: "핵심 출처",
      relatedLabel: "같이 볼 문서",
      accentClass: "text-[#8a4b14]"
    };
  }

  if (document.kind === "playbook") {
    return {
      badge: "해설 문서",
      summaryLabel: "핵심 요약",
      relatedLabel: "이어 읽기",
      accentClass: "text-cobalt"
    };
  }

  return {
    badge: "실행 문서",
    summaryLabel: "실행 체크",
    relatedLabel: "다음 프롬프트",
    accentClass: "text-[#216047]"
  };
}

export function DocumentLayout({ document }: { document: ContentRecord | null }) {
  if (!document) notFound();
  const sidebarTone = getSidebarTone(document);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_300px] md:px-8 md:pb-24 md:pt-10">
        <article className="space-y-8">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            {document.prevLink ? (
              <Link href={document.prevLink.route} className="transition hover:text-ink">
                Previous
              </Link>
            ) : null}
            {document.nextLink ? (
              <Link href={document.nextLink.route} className="transition hover:text-ink">
                Next
              </Link>
            ) : null}
          </nav>

          <header className="space-y-4 border-b border-line pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">
              {document.domain} / {document.kind}
            </p>
            <h1 className="max-w-[14ch] font-display text-4xl leading-none tracking-[-0.045em] md:text-7xl">
              {document.title}
            </h1>
            <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">{document.summary}</p>
            <div className="grid gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke md:grid-cols-3">
              <span>{document.kind}</span>
              <span>{document.domain}</span>
              <span>{document.promptBlock ? "prompt first" : "read first"}</span>
            </div>
          </header>

          {document.sequenceLinks.length > 1 ? (
            <SequenceStrip title={`${document.domain} sequence`} items={document.sequenceLinks} activeRoute={document.route} />
          ) : null}

          <section className="grid gap-4 border-y border-line py-5 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Use This When</p>
              <p className="text-sm leading-7 text-ink">{document.situationLead ?? document.summary}</p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Aim For</p>
              <p className="text-sm leading-7 text-ink">
                {document.summaryPoints[0] ?? "좋은 출력 기준을 먼저 읽고 프롬프트를 붙인다."}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Then Do</p>
              <p className="text-sm leading-7 text-ink">
                {document.nextLink ? (
                  <Link href={document.nextLink.route} className="border-b border-cobalt/40 text-cobalt">
                    {document.nextLink.title.replace(/^\d+\.\s*/, "")}
                  </Link>
                ) : (
                  "관련 문서 또는 summary rail을 이어서 본다."
                )}
              </p>
            </div>
          </section>

          <DocumentReader
            html={document.html}
            promptBlock={document.promptBlock}
            situationLead={document.situationLead}
            summaryPoints={document.summaryPoints}
            failurePoints={document.failurePoints}
            nextLink={document.nextLink}
          />
        </article>

        <aside className="space-y-8 md:sticky md:top-6 md:self-start">
          <section className="border-t border-line pt-4">
            <p className={`font-mono text-[11px] uppercase tracking-[0.28em] ${sidebarTone.accentClass}`}>{sidebarTone.badge}</p>
            <div className="mt-3 border-b border-line pb-4">
              <p className="font-display text-2xl tracking-[-0.025em]">{document.title.replace(/^\d+\.\s*/, "")}</p>
              <p className="mt-2 text-sm leading-7 text-smoke">{document.summary}</p>
            </div>
          </section>

          {document.prevLink ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Previous</p>
              <Link href={document.prevLink.route} className="mt-3 block border-b border-line py-3 hover:bg-white/35">
                <p className="font-display text-2xl tracking-[-0.025em]">{document.prevLink.title.replace(/^\d+\.\s*/, "")}</p>
                <p className="text-sm text-smoke">{document.prevLink.summary}</p>
              </Link>
            </section>
          ) : null}

          {document.nextLink ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Next Action</p>
              <Link href={document.nextLink.route} className="mt-3 block border-b border-line py-3 hover:bg-white/35">
                <p className="font-display text-2xl tracking-[-0.025em]">{document.nextLink.title.replace(/^\d+\.\s*/, "")}</p>
                <p className="text-sm text-smoke">{document.nextLink.summary}</p>
              </Link>
            </section>
          ) : null}

          <section className="border-t border-line pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">{sidebarTone.summaryLabel}</p>
            <div className="mt-3 space-y-4 text-sm leading-7 text-smoke">
              {document.summaryPoints.length > 0 ? (
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink">Good Output</p>
                  <ul className="space-y-2">
                    {document.summaryPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {document.failurePoints.length > 0 ? (
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink">Failure Pattern</p>
                  <ul className="space-y-2">
                    {document.failurePoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>

          {document.toc.length > 0 ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Sections</p>
              <div className="mt-3 grid gap-2 text-sm text-smoke">
                {document.toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="border-b border-line py-2 hover:text-ink">
                    {item.title}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {document.relatedRoutes.length > 0 ? (
            <section className="border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">{sidebarTone.relatedLabel}</p>
              <div className="mt-3 grid gap-2">
                {document.relatedRoutes.map((item) => (
                  <Link key={item.route} href={item.route} className="border-b border-line py-3 hover:bg-white/35">
                    <p className="font-display text-xl tracking-[-0.025em]">{item.title}</p>
                    <p className="text-sm text-smoke">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
