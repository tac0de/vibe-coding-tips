"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import clsx from "clsx";
import type { ContentRecord } from "@/lib/content/types";

type Props = {
  items: ContentRecord[];
};

export function SearchExplorer({ items }: Props) {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return items
      .filter((item) =>
        [item.title, item.summary, item.tags.join(" "), item.body].join(" ").toLowerCase().includes(normalized)
      )
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "prompt" ? -1 : 1;
        return (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title);
      })
      .slice(0, 24);
  }, [items, query]);

  return (
    <section className="border-y border-line py-6">
      <div className="flex flex-col gap-5">
        <label className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Search the library</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search prompts, playbooks, sources"
          className="w-full border-b border-ink bg-transparent px-0 py-3 font-display text-2xl tracking-[-0.03em] text-ink outline-none placeholder:text-smoke/70 md:text-4xl"
        />
        {hasQuery ? (
          <div className="grid gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              {results.length} results / prompt first
            </p>
            {results.map((item) => (
              <Link
                key={item.route}
                href={item.route}
                className={clsx(
                  "grid gap-2 border-b border-line py-3 transition hover:border-ink hover:bg-white/30 md:grid-cols-[160px_minmax(0,1fr)_160px]",
                  item.kind === "prompt" && "hover:text-cobalt"
                )}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
                  {item.domain} / {item.kind}
                </span>
                <div className="space-y-1">
                  <p className="font-display text-xl tracking-[-0.025em]">{item.title}</p>
                  <p className="text-sm text-smoke">{item.summary}</p>
                </div>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
                  {item.promptBlock ? "copy-ready / " : ""}
                  {item.tags.slice(0, 2).join(" / ")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="max-w-measure text-sm leading-7 text-smoke">
            검색어를 입력하면 prompt, playbook, source를 한 번에 좁혀 볼 수 있다. 기본 탐색은 아래 흐름 섹션에서
            시작하는 쪽이 더 빠르다.
          </p>
        )}
      </div>
    </section>
  );
}
