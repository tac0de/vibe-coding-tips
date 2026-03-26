"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ProgressState = {
  viewed: string[];
  completed: string[];
  recentViewed: string[];
};

type ReadingProgressContextValue = {
  viewed: string[];
  completed: string[];
  recentViewed: string[];
  points: number;
  markViewed: (route: string) => void;
  toggleCompleted: (route: string) => void;
  isViewed: (route: string) => boolean;
  isCompleted: (route: string) => boolean;
};

const STORAGE_KEY = "vibe-coding-tips:progress:v1";
const ReadingProgressContext = createContext<ReadingProgressContextValue | null>(null);

function dedupe(items: string[]) {
  return Array.from(new Set(items));
}

export function ReadingProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>({ viewed: [], completed: [], recentViewed: [] });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ProgressState;
      setState({
        viewed: Array.isArray(parsed.viewed) ? dedupe(parsed.viewed) : [],
        completed: Array.isArray(parsed.completed) ? dedupe(parsed.completed) : [],
        recentViewed: Array.isArray(parsed.recentViewed) ? dedupe(parsed.recentViewed).slice(0, 12) : []
      });
    } catch {
      setState({ viewed: [], completed: [], recentViewed: [] });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<ReadingProgressContextValue>(() => {
    const markViewed = (route: string) =>
      setState((current) =>
        current.viewed.includes(route) && current.recentViewed[0] === route
          ? current
          : {
              ...current,
              viewed: current.viewed.includes(route) ? current.viewed : dedupe([...current.viewed, route]),
              recentViewed: dedupe([route, ...current.recentViewed]).slice(0, 12)
            }
      );

    const toggleCompleted = (route: string) =>
      setState((current) => ({
        viewed: dedupe([...current.viewed, route]),
        recentViewed: dedupe([route, ...current.recentViewed]).slice(0, 12),
        completed: current.completed.includes(route)
          ? current.completed.filter((item) => item !== route)
          : dedupe([...current.completed, route])
      }));

    return {
      viewed: state.viewed,
      completed: state.completed,
      recentViewed: state.recentViewed,
      points: state.viewed.length * 2 + state.completed.length * 8,
      markViewed,
      toggleCompleted,
      isViewed: (route: string) => state.viewed.includes(route),
      isCompleted: (route: string) => state.completed.includes(route)
    };
  }, [state]);

  return <ReadingProgressContext.Provider value={value}>{children}</ReadingProgressContext.Provider>;
}

export function useReadingProgress() {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error("useReadingProgress must be used within ReadingProgressProvider");
  }
  return context;
}
