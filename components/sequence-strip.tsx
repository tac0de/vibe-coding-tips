"use client";

import Link from "next/link";
import clsx from "clsx";
import type { ContentLink } from "@/lib/content/types";

type Props = {
  title: string;
  items: ContentLink[];
  activeRoute?: string;
};

export function SequenceStrip({ title, items, activeRoute }: Props) {
  if (items.length <= 1) return null;

  return (
    <section className="space-y-3 border-y border-line py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">{title}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">{items.length} steps</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {items.map((item, index) => {
          const isActive = item.route === activeRoute;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={clsx(
                "min-w-[220px] border-b px-0 py-3 transition",
                isActive
                  ? "border-cobalt text-paper"
                  : "border-line text-fog hover:border-cobalt hover:bg-white/[0.03] hover:text-paper"
              )}
            >
              <div className="space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
                  {String(item.order ?? index + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-lg tracking-[-0.02em]">{item.title.replace(/^\d+\.\s*/, "")}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
