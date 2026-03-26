"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ProgressState = {
  viewed: string[];
  completed: string[];
};

type ReadingProgressContextValue = {
  viewed: string[];
  completed: string[];
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
  const [state, setState] = useState<ProgressState>({ viewed: [], completed: [] });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ProgressState;
      setState({
        viewed: Array.isArray(parsed.viewed) ? dedupe(parsed.viewed) : [],
        completed: Array.isArray(parsed.completed) ? dedupe(parsed.completed) : []
      });
    } catch {
      setState({ viewed: [], completed: [] });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<ReadingProgressContextValue>(() => {
    const markViewed = (route: string) =>
      setState((current) =>
        current.viewed.includes(route)
          ? current
          : {
              ...current,
              viewed: dedupe([...current.viewed, route])
            }
      );

    const toggleCompleted = (route: string) =>
      setState((current) => ({
        viewed: dedupe([...current.viewed, route]),
        completed: current.completed.includes(route)
          ? current.completed.filter((item) => item !== route)
          : dedupe([...current.completed, route])
      }));

    return {
      viewed: state.viewed,
      completed: state.completed,
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
