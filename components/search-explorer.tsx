"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { ContentRecord } from "@/lib/content/types";

type Props = {
  items: ContentRecord[];
};

export function SearchExplorer({ items }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (!isTypingTarget && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        <label className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">문서 검색</label>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="온보딩, Tailwind, D3, reviewer 프롬프트 검색"
          className="w-full border-b border-line bg-transparent px-0 py-3 font-display text-2xl tracking-[-0.03em] text-paper outline-none placeholder:text-fog/70 md:text-4xl"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
          <span>/ 키로 바로 포커스</span>
          <span>프롬프트 우선 정렬</span>
        </div>
        {hasQuery ? (
          <div className="grid gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">{results.length} results / 프롬프트 우선</p>
            {results.map((item) => (
              <Link
                key={item.route}
                href={item.route}
                className={clsx(
                  "grid gap-2 border-b border-line py-3 transition hover:border-cobalt hover:bg-white/[0.03] md:grid-cols-[160px_minmax(0,1fr)_160px]",
                  item.kind === "prompt" && "hover:text-cobalt"
                )}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">
                  {item.domain} / {item.kind}
                </span>
                <div className="space-y-1">
                  <p className="font-display text-xl tracking-[-0.025em] text-paper">{item.title}</p>
                  <p className="text-sm text-cloud">{item.summary}</p>
                </div>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                  {item.promptBlock ? "prompt / " : ""}
                  {item.tags.slice(0, 2).join(" / ")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="max-w-measure text-sm leading-7 text-cloud">
            검색은 바로 필요한 프롬프트를 찾을 때 쓰고, 처음 시작은 위 트랙 중 하나를 고르는 쪽이 더 빠릅니다.
          </p>
        )}
      </div>
    </section>
  );
}
