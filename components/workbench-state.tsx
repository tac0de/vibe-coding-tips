"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type WorkbenchState = {
  favorites: string[];
  queue: string[];
  copied: string[];
  recentSearches: string[];
};

type WorkbenchContextValue = WorkbenchState & {
  toggleFavorite: (route: string) => void;
  toggleQueue: (route: string) => void;
  markCopied: (route: string) => void;
  addRecentSearch: (query: string) => void;
  removeQueue: (route: string) => void;
  clearQueue: () => void;
  isFavorite: (route: string) => boolean;
  isQueued: (route: string) => boolean;
};

const STORAGE_KEY = "vibe-coding-tips:workbench:v1";
const WorkbenchContext = createContext<WorkbenchContextValue | null>(null);

function dedupe(items: string[]) {
  return Array.from(new Set(items));
}

export function WorkbenchStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkbenchState>({
    favorites: [],
    queue: [],
    copied: [],
    recentSearches: []
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<WorkbenchState>;
      setState({
        favorites: Array.isArray(parsed.favorites) ? dedupe(parsed.favorites) : [],
        queue: Array.isArray(parsed.queue) ? dedupe(parsed.queue) : [],
        copied: Array.isArray(parsed.copied) ? dedupe(parsed.copied) : [],
        recentSearches: Array.isArray(parsed.recentSearches) ? dedupe(parsed.recentSearches).slice(0, 8) : []
      });
    } catch {
      setState({
        favorites: [],
        queue: [],
        copied: [],
        recentSearches: []
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<WorkbenchContextValue>(() => {
    const toggleFavorite = (route: string) =>
      setState((current) => ({
        ...current,
        favorites: current.favorites.includes(route)
          ? current.favorites.filter((item) => item !== route)
          : dedupe([route, ...current.favorites])
      }));

    const toggleQueue = (route: string) =>
      setState((current) => ({
        ...current,
        queue: current.queue.includes(route)
          ? current.queue.filter((item) => item !== route)
          : dedupe([...current.queue, route])
      }));

    const removeQueue = (route: string) =>
      setState((current) => ({
        ...current,
        queue: current.queue.filter((item) => item !== route)
      }));

    const clearQueue = () =>
      setState((current) => ({
        ...current,
        queue: []
      }));

    const markCopied = (route: string) =>
      setState((current) => ({
        ...current,
        copied: dedupe([route, ...current.copied]).slice(0, 16)
      }));

    const addRecentSearch = (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      setState((current) => ({
        ...current,
        recentSearches: dedupe([trimmed, ...current.recentSearches]).slice(0, 8)
      }));
    };

    return {
      ...state,
      toggleFavorite,
      toggleQueue,
      markCopied,
      addRecentSearch,
      removeQueue,
      clearQueue,
      isFavorite: (route: string) => state.favorites.includes(route),
      isQueued: (route: string) => state.queue.includes(route)
    };
  }, [state]);

  return <WorkbenchContext.Provider value={value}>{children}</WorkbenchContext.Provider>;
}

export function useWorkbenchState() {
  const context = useContext(WorkbenchContext);
  if (!context) {
    throw new Error("useWorkbenchState must be used within WorkbenchStateProvider");
  }
  return context;
}
