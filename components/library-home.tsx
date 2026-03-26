"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import { buildCopyPayload, getArtifactTypeLabel, getRiskLabel, stripOrdinalTitle } from "@/lib/content/workbench";
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

function PromptCard({
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
      <h3 className="mt-5 font-display text-[2rem] tracking-[-0.04em] text-paper">
        {stripOrdinalTitle(localized.title)}
      </h3>
      <p className="mt-3 text-sm leading-7 text-cloud">{localized.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <CopyPromptButton
          value={buildCopyPayload(item, language, false)}
          onCopy={onCopy}
          className="ghost-button"
          defaultLabel={language === "ko" ? "복사" : "Copy"}
          copiedLabel={language === "ko" ? "복사됨" : "Copied"}
        />
        <Link href={item.route} className="quiet-link">
          {language === "ko" ? "열기" : "Open"}
        </Link>
      </div>
    </article>
  );
}

function collectByFiles(records: ContentRecord[], fileNames: string[]) {
  const byName = new Map(records.map((item) => [item.path.split("/").pop() ?? "", item]));
  return fileNames.map((fileName) => byName.get(fileName)).filter(Boolean) as ContentRecord[];
}

export function LibraryHome({ data }: { data: HomeData }) {
  const { language, t } = useSiteLanguage();
  const { markCopied } = useWorkbenchState();
  const rootRef = useRef<HTMLElement | null>(null);

  const d3Lead = useMemo(
    () =>
      data.playbooks.find((item) => item.path.endsWith("d3-playbook.md")) ??
      data.d3.find((item) => item.isDossier) ??
      data.d3[0] ??
      null,
    [data.d3, data.playbooks]
  );

  const d3Main = useMemo(
    () =>
      collectByFiles(data.d3, [
        "01-choose-d3-vs-chart-library.md",
        "02-design-scales.md",
        "04-structure-data-join.md",
        "05-add-tooltip.md",
        "09-react-d3-boundary.md",
        "13-interaction-qa.md"
      ]),
    [data.d3]
  );

  const uiSupport = useMemo(
    () =>
      [
        ...collectByFiles(data.ui, [
          "create-design-brief.md",
          "landing-first-screen.md",
          "accessibility-audit.md",
          "review-ui-tone.md"
        ]),
        ...data.playbooks.filter((item) => item.path.endsWith("ui-vibe-coding.md"))
      ]
        .filter((item, index, self) => self.findIndex((candidate) => candidate.route === item.route) === index)
        .slice(0, 4),
    [data.playbooks, data.ui]
  );

  const quietLinks = useMemo(
    () =>
      [...data.playbooks, ...data.onboarding, ...data.sources]
        .filter((item) => item.route !== d3Lead?.route)
        .slice(0, 6),
    [d3Lead?.route, data.onboarding, data.playbooks, data.sources]
  );

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-motion='intro']",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.44, ease: "power2.out", stagger: 0.05 }
      );
      gsap.fromTo(
        "[data-motion='cards']",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.36, ease: "power2.out", stagger: 0.04, delay: 0.06 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <main ref={rootRef} className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1120px] px-4 pb-20 pt-5 md:px-8 md:pb-28 md:pt-10">
        <section className="paper-frame px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[720px]">
              <p data-motion="intro" className="eyebrow">
                {t("D3 prompt library", "D3 프롬프트 라이브러리")}
              </p>
              <h1 data-motion="intro" className="mt-4 max-w-[10ch] font-display text-5xl leading-[0.96] tracking-[-0.06em] text-paper md:text-7xl">
                {t("D3.js work, prompt first.", "D3.js 작업은 프롬프트부터 정리한다.")}
              </h1>
              <p data-motion="intro" className="mt-5 max-w-[48ch] text-base leading-8 text-cloud md:text-lg">
                {t("Pick the prompt, copy it, then move to the next one.", "프롬프트를 고르고, 복사하고, 다음 프롬프트로 넘어간다.")}
              </p>
            </div>
            <div data-motion="intro">
              <LanguageToggle />
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-8">
          <section className="paper-frame px-6 py-7 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{t("D3 collection", "D3 컬렉션")}</p>
                <h2 data-motion="intro" className="mt-3 font-display text-4xl tracking-[-0.05em] text-paper md:text-5xl">
                  {t("For the next D3 class", "다음 D3 강의용 핵심 세트")}
                </h2>
              </div>
              {d3Lead ? (
                <div data-motion="intro" className="max-w-[34ch] text-sm leading-7 text-cloud">
                  <Link href={d3Lead.route} className="transition hover:text-paper">
                    {getLocalizedRecord(d3Lead, language).summary}
                  </Link>
                </div>
              ) : null}
            </div>

            {d3Lead ? (
              <div data-motion="cards" className="mt-8 border-b border-line pb-6">
                <PromptCard item={d3Lead} language={language} onCopy={() => markCopied(d3Lead.route)} />
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {d3Main.map((item) => (
                <div key={item.route} data-motion="cards">
                  <PromptCard item={item} language={language} onCopy={() => markCopied(item.route)} />
                </div>
              ))}
            </div>
          </section>

          <section className="paper-frame px-6 py-7 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">{t("UI support", "UI 보조 프롬프트")}</p>
                <p className="mt-3 max-w-[42ch] text-sm leading-7 text-cloud">
                  {t("Use these when the D3 work touches layout, hierarchy, or visual tone.", "D3 작업이 레이아웃, hierarchy, 시각 톤까지 건드릴 때 같이 쓴다.")}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {uiSupport.map((item) => (
                <div key={item.route} data-motion="cards">
                  <PromptCard item={item} language={language} onCopy={() => markCopied(item.route)} />
                </div>
              ))}
            </div>
          </section>

          <section className="paper-frame px-6 py-6 md:px-8">
            <p className="eyebrow">{t("More", "더 보기")}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {quietLinks.map((item) => (
                <Link key={item.route} href={item.route} className="quiet-link" data-motion="cards">
                  {stripOrdinalTitle(getLocalizedRecord(item, language).title)}
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
