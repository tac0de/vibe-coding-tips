"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { useReadingProgress } from "@/components/reading-progress";
import { LanguageToggle, useSiteLanguage } from "@/components/site-language";
import { useWorkbenchState } from "@/components/workbench-state";
import { getLocalizedRecord } from "@/lib/content/localize";
import {
  buildCopyPayload,
  getDifficultyLabel,
  getReadinessLabel,
  getRoleLabel,
  getUseCaseLabel,
  getWorkflowLabel,
  stripOrdinalTitle
} from "@/lib/content/workbench";
import type { ContentDifficulty, ContentRecord } from "@/lib/content/types";

type HomeData = {
  all: ContentRecord[];
  onboarding: ContentRecord[];
  roles: ContentRecord[];
  ui: ContentRecord[];
  d3: ContentRecord[];
  playbooks: ContentRecord[];
  sources: ContentRecord[];
};

type FilterState = {
  useCase: string;
  role: string;
  difficulty: ContentDifficulty | "all";
};

function sortRecords(items: ContentRecord[]) {
  return [...items].sort((a, b) => {
    const featured = Number(b.featured) - Number(a.featured);
    const promptFirst = Number(b.kind === "prompt") - Number(a.kind === "prompt");
    return featured || promptFirst || a.timeToUse - b.timeToUse || (a.order ?? 999) - (b.order ?? 999);
  });
}

function FilterChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition ${
        active
          ? "border-cobalt bg-cobalt text-white"
          : "border-line bg-white/50 text-fog hover:border-cobalt/40 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

function MetaPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line bg-white/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
      {label}
    </span>
  );
}

export function LibraryHome({ data }: { data: HomeData }) {
  const { language, t } = useSiteLanguage();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { viewed, completed, recentViewed } = useReadingProgress();
  const {
    favorites,
    queue,
    copied,
    recentSearches,
    toggleFavorite,
    toggleQueue,
    markCopied,
    addRecentSearch,
    isFavorite,
    isQueued
  } = useWorkbenchState();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    useCase: "all",
    role: "all",
    difficulty: "all"
  });
  const deferredQuery = useDeferredValue(query);

  const sortedItems = useMemo(() => sortRecords(data.all), [data.all]);
  const useCases = useMemo(() => Array.from(new Set(sortedItems.map((item) => item.useCase))), [sortedItems]);
  const roles = useMemo(() => Array.from(new Set(sortedItems.map((item) => item.role))), [sortedItems]);
  const featured = useMemo(() => sortedItems.filter((item) => item.featured).slice(0, 6), [sortedItems]);
  const queueItems = useMemo(
    () => queue.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, queue]
  );
  const favoriteItems = useMemo(
    () => favorites.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, favorites]
  );
  const recentItems = useMemo(
    () => recentViewed.map((route) => data.all.find((item) => item.route === route)).filter(Boolean) as ContentRecord[],
    [data.all, recentViewed]
  );

  const filteredItems = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return sortedItems.filter((item) => {
      if (filters.useCase !== "all" && item.useCase !== filters.useCase) return false;
      if (filters.role !== "all" && item.role !== filters.role) return false;
      if (filters.difficulty !== "all" && item.difficulty !== filters.difficulty) return false;

      if (!normalized) return true;

      const localized = getLocalizedRecord(item, language);
      return [
        localized.title,
        localized.summary,
        localized.body,
        item.locales.en.title,
        item.locales.en.summary,
        item.locales.en.body,
        item.tags.join(" "),
        item.useCase,
        item.role,
        item.workflowGroup
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [deferredQuery, filters.difficulty, filters.role, filters.useCase, language, sortedItems]);

  const [selectedRoute, setSelectedRoute] = useState<string>(() => featured[0]?.route ?? data.all[0]?.route ?? "");

  useEffect(() => {
    if (!selectedRoute || filteredItems.some((item) => item.route === selectedRoute)) return;
    setSelectedRoute(filteredItems[0]?.route ?? featured[0]?.route ?? data.all[0]?.route ?? "");
  }, [data.all, featured, filteredItems, selectedRoute]);

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
        return;
      }

      if (!filteredItems.length || isTypingTarget) return;

      const currentIndex = filteredItems.findIndex((item) => item.route === selectedRoute);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, filteredItems.length - 1);
        setSelectedRoute(filteredItems[nextIndex]?.route ?? selectedRoute);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
        setSelectedRoute(filteredItems[prevIndex]?.route ?? selectedRoute);
      }

      if (event.key === "Enter" && selectedRoute) {
        event.preventDefault();
        router.push(selectedRoute);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems, router, selectedRoute]);

  const selected = filteredItems.find((item) => item.route === selectedRoute) ?? featured[0] ?? data.all[0];
  const selectedLocalized = selected ? getLocalizedRecord(selected, language) : null;
  const recommendedGroups = useMemo(
    () =>
      [
        {
          id: "first-codex",
          title: t("First Codex attach", "처음 Codex 붙일 때"),
          summary: t(
            "Start with repo-reading, scope lock, and the first small patch.",
            "레포 읽기, 범위 잠금, 첫 작은 패치까지 빠르게 이어진다."
          ),
          items: sortRecords(
            data.all.filter((item) => ["repo-onboarding", "review-qa"].includes(item.useCase) && item.kind === "prompt")
          ).slice(0, 3)
        },
        {
          id: "ui-pass",
          title: t("Before touching UI", "UI 손보기 직전"),
          summary: t(
            "Open audit, hierarchy, and motion docs as one workflow.",
            "감사, 계층, 모션 문서를 하나의 실행 흐름으로 묶는다."
          ),
          items: sortRecords(data.all.filter((item) => item.useCase === "ui-polish")).slice(0, 3)
        },
        {
          id: "browser-check",
          title: t("Before browser verification", "브라우저 검증 직전"),
          summary: t(
            "Use review, browser verifier, and regression gate together.",
            "리뷰, 브라우저 검증, 회귀 게이트를 함께 꺼낸다."
          ),
          items: sortRecords(
            data.all.filter((item) => ["browser-verification", "review-qa", "agent-orchestration"].includes(item.useCase))
          ).slice(0, 3)
        }
      ].filter((group) => group.items.length > 0),
    [data.all, t]
  );

  return (
    <main className="min-h-screen bg-terminal text-paper">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <section className="editorial-frame overflow-hidden px-5 py-6 md:px-8 md:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_380px]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-2">
                  <p className="eyebrow">{t("Prompt Workbench", "프롬프트 워크벤치")}</p>
                  <h1 className="max-w-[10ch] font-display text-5xl leading-[0.88] tracking-[-0.06em] text-paper md:text-8xl">
                    {t("Search less. Execute faster.", "덜 찾고 더 빨리 실행")}
                  </h1>
                </div>
                <LanguageToggle />
              </div>

              <p className="max-w-[58ch] text-base leading-8 text-cloud md:text-lg">
                {t(
                  "A hands-on prompt workstation for existing repo onboarding, UI passes, browser verification, D3 work, and orchestration. Search, preview, copy, queue, then run.",
                  "기존 레포 투입, UI 패스, 브라우저 검증, D3 작업, 오케스트레이션까지 바로 실행하기 위한 실전 프롬프트 작업대다. 검색하고, 미리 보고, 복사하고, 큐에 담은 뒤 실행한다."
                )}
              </p>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Queue", "세션 큐")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{queue.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">
                    {t("Docs lined up for this session.", "이번 세션에서 이어서 실행할 문서 수.")}
                  </p>
                </div>
                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Favorites", "즐겨찾기")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{favorites.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">
                    {t("Pinned for repeated use.", "반복해서 쓰는 문서 보관함.")}
                  </p>
                </div>
                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Copied", "복사됨")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{copied.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">
                    {t("Prompts already taken into action.", "이미 실행으로 가져간 프롬프트 수.")}
                  </p>
                </div>
                <div className="lab-panel p-4">
                  <p className="eyebrow text-fog">{t("Recent", "최근 열람")}</p>
                  <p className="mt-3 font-display text-4xl text-paper">{viewed.length}</p>
                  <p className="mt-2 text-sm leading-6 text-cloud">
                    {t("Routes opened in this browser.", "이 브라우저에서 연 문서 수.")}
                  </p>
                </div>
              </div>
            </div>

            <div className="lab-panel flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{t("Quick Start", "추천 시작점")}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {t("featured flows", "추천 플로우")}
                </p>
              </div>
              <div className="grid gap-3">
                {featured.slice(0, 4).map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  return (
                    <button
                      key={item.route}
                      type="button"
                      onClick={() => setSelectedRoute(item.route)}
                      className={`rounded-[22px] border p-4 text-left transition ${
                        selectedRoute === item.route
                          ? "border-cobalt bg-cobalt/10"
                          : "border-line bg-white/50 hover:border-cobalt/40 hover:bg-white/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="eyebrow text-fog">{getUseCaseLabel(item.useCase, language)}</p>
                          <p className="mt-2 font-display text-2xl tracking-[-0.03em] text-paper">
                            {stripOrdinalTitle(localized.title)}
                          </p>
                        </div>
                        <span className="rounded-full border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                          {item.timeToUse}m
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-cloud">{localized.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <div className="space-y-6">
            <section className="editorial-frame px-5 py-5 md:px-7">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">{t("Search / Filter / Queue", "검색 / 필터 / 큐")}</p>
                    <p className="mt-2 text-sm leading-7 text-cloud">
                      {t(
                        "Use `/` to focus search. Arrow keys move the preview target. Enter opens the selected document.",
                        "`/` 로 검색창 포커스, 방향키로 미리보기 이동, 엔터로 선택 문서 진입."
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 4).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="rounded-full border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog transition hover:border-cobalt/40 hover:text-paper"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    const value = event.target.value;
                    setQuery(value);
                    if (value.trim().length >= 3) addRecentSearch(value);
                  }}
                  placeholder={t(
                    "Search onboarding, UI review, browser verification, D3, orchestration",
                    "온보딩, UI 리뷰, 브라우저 검증, D3, 오케스트레이션 검색"
                  )}
                  className="w-full border-b border-line bg-transparent pb-4 font-display text-3xl tracking-[-0.04em] text-paper outline-none placeholder:text-fog/60 md:text-5xl"
                />

                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    <FilterChip active={filters.useCase === "all"} onClick={() => setFilters((current) => ({ ...current, useCase: "all" }))}>
                      {t("All use cases", "전체 유스케이스")}
                    </FilterChip>
                    {useCases.map((useCase) => (
                      <FilterChip
                        key={useCase}
                        active={filters.useCase === useCase}
                        onClick={() => setFilters((current) => ({ ...current, useCase }))}
                      >
                        {getUseCaseLabel(useCase, language)}
                      </FilterChip>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <FilterChip active={filters.role === "all"} onClick={() => setFilters((current) => ({ ...current, role: "all" }))}>
                      {t("All roles", "전체 역할")}
                    </FilterChip>
                    {roles.map((role) => (
                      <FilterChip
                        key={role}
                        active={filters.role === role}
                        onClick={() => setFilters((current) => ({ ...current, role }))}
                      >
                        {getRoleLabel(role, language)}
                      </FilterChip>
                    ))}
                    {(["starter", "intermediate", "advanced"] as const).map((difficulty) => (
                      <FilterChip
                        key={difficulty}
                        active={filters.difficulty === difficulty}
                        onClick={() => setFilters((current) => ({ ...current, difficulty }))}
                      >
                        {getDifficultyLabel(difficulty, language)}
                      </FilterChip>
                    ))}
                    <FilterChip
                      active={filters.difficulty === "all"}
                      onClick={() => setFilters((current) => ({ ...current, difficulty: "all" }))}
                    >
                      {t("Any depth", "난이도 전체")}
                    </FilterChip>
                  </div>
                </div>
              </div>
            </section>

            <section className="editorial-frame px-5 py-5 md:px-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">{t("Workbench Feed", "워크벤치 피드")}</p>
                  <p className="mt-2 text-sm leading-7 text-cloud">
                    {t(
                      "Prompt-ready results float to the top. Use queue and favorite controls without leaving the list.",
                      "즉시 실행 가능한 결과가 위로 올라오며, 목록에서 바로 큐/즐겨찾기를 조작할 수 있다."
                    )}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  {t(`${filteredItems.length} results`, `${filteredItems.length}개 결과`)}
                </p>
              </div>

              <div className="grid gap-3">
                {filteredItems.slice(0, 18).map((item) => {
                  const localized = getLocalizedRecord(item, language);
                  const active = item.route === selectedRoute;

                  return (
                    <div
                      key={item.route}
                      className={`rounded-[24px] border p-4 transition ${
                        active ? "border-cobalt bg-cobalt/10" : "border-line bg-white/60 hover:border-cobalt/35 hover:bg-white/80"
                      }`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRoute(item.route);
                            if (query.trim()) addRecentSearch(query);
                          }}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex flex-wrap gap-2">
                            <MetaPill label={getUseCaseLabel(item.useCase, language)} />
                            <MetaPill label={getRoleLabel(item.role, language)} />
                            <MetaPill label={getDifficultyLabel(item.difficulty, language)} />
                            <MetaPill label={getReadinessLabel(item.copyReadiness, language)} />
                          </div>
                          <p className="mt-4 font-display text-3xl tracking-[-0.04em] text-paper">
                            {stripOrdinalTitle(localized.title)}
                          </p>
                          <p className="mt-3 max-w-[68ch] text-sm leading-7 text-cloud">{localized.summary}</p>
                        </button>

                        <div className="flex flex-wrap gap-2 md:justify-end">
                          <button type="button" onClick={() => toggleQueue(item.route)} className="ghost-button">
                            {isQueued(item.route) ? t("Queued", "큐 담김") : t("Add Queue", "큐 담기")}
                          </button>
                          <button type="button" onClick={() => toggleFavorite(item.route)} className="ghost-button">
                            {isFavorite(item.route) ? t("Saved", "저장됨") : t("Favorite", "즐겨찾기")}
                          </button>
                          <Link href={item.route} className="action-button">
                            {t("Open Doc", "문서 열기")}
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-fog">
                        <span>{getWorkflowLabel(item.workflowGroup, language)}</span>
                        <span>•</span>
                        <span>{item.timeToUse}m</span>
                        <span>•</span>
                        <span>{item.kind}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <div className="editorial-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Queue", "세션 큐")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{queueItems.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {queueItems.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <button key={item.route} type="button" onClick={() => setSelectedRoute(item.route)} className="lab-list-item text-left">
                        <p className="eyebrow text-fog">{getUseCaseLabel(item.useCase, language)}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </button>
                    );
                  })}
                  {queueItems.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">
                      {t("Save documents into queue to compose a live session flow.", "문서를 큐에 담아 실제 세션 플로우를 구성한다.")}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="editorial-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Favorites", "즐겨찾기")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{favoriteItems.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {favoriteItems.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <button key={item.route} type="button" onClick={() => setSelectedRoute(item.route)} className="lab-list-item text-left">
                        <p className="eyebrow text-fog">{getRoleLabel(item.role, language)}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </button>
                    );
                  })}
                  {favoriteItems.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">
                      {t("Pin repeated prompts here instead of re-searching every session.", "매번 다시 찾지 않도록 반복 문서를 여기 고정한다.")}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="editorial-frame px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{t("Recent Reads", "최근 열람")}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{recentItems.length}</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {recentItems.slice(0, 4).map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <button key={item.route} type="button" onClick={() => setSelectedRoute(item.route)} className="lab-list-item text-left">
                        <p className="eyebrow text-fog">{item.kind}</p>
                        <p className="mt-2 font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                      </button>
                    );
                  })}
                  {recentItems.length === 0 ? (
                    <p className="text-sm leading-7 text-cloud">
                      {t("Opened documents appear here for quick return.", "열어 본 문서는 여기로 쌓여 빠르게 다시 돌아올 수 있다.")}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            {selected && selectedLocalized ? (
              <section className="editorial-frame overflow-hidden px-5 py-5 md:px-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow">{t("Preview Panel", "미리보기 패널")}</p>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                      {selected.timeToUse}m
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <MetaPill label={getUseCaseLabel(selected.useCase, language)} />
                    <MetaPill label={getRoleLabel(selected.role, language)} />
                    <MetaPill label={getDifficultyLabel(selected.difficulty, language)} />
                    <MetaPill label={getReadinessLabel(selected.copyReadiness, language)} />
                  </div>

                  <div>
                    <p className="font-display text-4xl tracking-[-0.05em] text-paper">
                      {stripOrdinalTitle(selectedLocalized.title)}
                    </p>
                    <p className="mt-3 text-base leading-8 text-cloud">{selectedLocalized.summary}</p>
                  </div>

                  <div className="lab-panel p-4">
                    <p className="eyebrow text-fog">{t("Use this when", "이럴 때 바로 쓴다")}</p>
                    <p className="mt-3 text-sm leading-7 text-paper">
                      {selectedLocalized.situationLead ?? selectedLocalized.summary}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="lab-panel p-4">
                      <p className="eyebrow text-fog">{t("Expected output", "기대 출력")}</p>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-paper">
                        {(selectedLocalized.summaryPoints.length > 0
                          ? selectedLocalized.summaryPoints
                          : [t("Read the doc once, then execute as a small, explicit step.", "문서를 한번 읽고 작은 단위로 실행한다.")]).slice(0, 3).map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="lab-panel p-4">
                      <p className="eyebrow text-fog">{t("Related workflow", "연결 플로우")}</p>
                      <div className="mt-3 space-y-2 text-sm leading-7 text-paper">
                        <p>{getWorkflowLabel(selected.workflowGroup, language)}</p>
                        <p>{selected.nextLink ? stripOrdinalTitle(getLocalizedRecord(data.all.find((item) => item.route === selected.nextLink?.route) ?? selected, language).title) : t("Use the related prompts below.", "아래 연결 문서를 이어서 사용한다.")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <CopyPromptButton
                      value={buildCopyPayload(selected, language, false)}
                      onCopy={() => markCopied(selected.route)}
                      className="action-button"
                      defaultLabel={t("Copy Prompt", "프롬프트 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <CopyPromptButton
                      value={buildCopyPayload(selected, language, true)}
                      onCopy={() => markCopied(selected.route)}
                      className="ghost-button"
                      defaultLabel={t("Copy With Context", "컨텍스트 포함 복사")}
                      copiedLabel={t("Copied", "복사됨")}
                    />
                    <button type="button" onClick={() => toggleQueue(selected.route)} className="ghost-button">
                      {isQueued(selected.route) ? t("Queued", "큐 담김") : t("Add Queue", "큐 담기")}
                    </button>
                    <button type="button" onClick={() => toggleFavorite(selected.route)} className="ghost-button">
                      {isFavorite(selected.route) ? t("Saved", "저장됨") : t("Favorite", "즐겨찾기")}
                    </button>
                    <Link href={selected.route} className="ghost-button">
                      {t("Open Full Doc", "전체 문서 열기")}
                    </Link>
                  </div>

                  <div className="grid gap-3">
                    {recommendedGroups.map((group) => (
                      <div key={group.id} className="lab-panel p-4">
                        <p className="eyebrow text-fog">{group.title}</p>
                        <p className="mt-2 text-sm leading-7 text-cloud">{group.summary}</p>
                        <div className="mt-4 grid gap-2">
                          {group.items.map((item) => {
                            const localized = getLocalizedRecord(item, language);
                            return (
                              <button
                                key={item.route}
                                type="button"
                                onClick={() => setSelectedRoute(item.route)}
                                className="lab-list-item text-left"
                              >
                                <p className="font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                                <p className="mt-1 text-sm leading-6 text-cloud">{localized.summary}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </aside>
        </section>

        <section className="mt-6 editorial-frame px-5 py-5 md:px-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">{t("Suggested Workflows", "추천 워크플로")}</p>
              <p className="mt-2 text-sm leading-7 text-cloud">
                {t(
                  "These packs are assembled around actual execution contexts, not document kind.",
                  "문서 종류가 아니라 실제 실행 맥락 기준으로 묶은 추천 팩."
                )}
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
              {t("interaction max", "interaction max")}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {recommendedGroups.map((group) => (
              <div key={group.id} className="lab-panel p-5">
                <p className="eyebrow text-fog">{group.title}</p>
                <p className="mt-2 text-sm leading-7 text-cloud">{group.summary}</p>
                <div className="mt-4 grid gap-2">
                  {group.items.map((item) => {
                    const localized = getLocalizedRecord(item, language);
                    return (
                      <button key={item.route} type="button" onClick={() => setSelectedRoute(item.route)} className="lab-list-item text-left">
                        <p className="font-display text-xl text-paper">{stripOrdinalTitle(localized.title)}</p>
                        <p className="mt-1 text-sm leading-6 text-cloud">{localized.summary}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
            <span>{t("queue-first planning", "큐 중심 세션 설계")}</span>
            <span>{t("copy-ready prompts first", "즉시 복붙 우선")}</span>
            <span>{t("workflow over doc kind", "문서 종류보다 실행 흐름")}</span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
            {completed.length} {t("completed docs", "완료 문서")} · {recentSearches.length} {t("recent queries", "최근 검색")}
          </div>
        </section>
      </div>
    </main>
  );
}
