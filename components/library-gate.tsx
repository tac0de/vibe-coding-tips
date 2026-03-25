"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vibe-coding-tips:gate-open";

export function LibraryGate({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(STORAGE_KEY);
    setIsOpen(stored === "open");
    setIsReady(true);
  }, []);

  const handleOpen = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "open");
    window.localStorage.setItem(STORAGE_KEY, "open");
    setIsOpen(true);
  };

  return (
    <>
      <div aria-hidden={!isReady || !isOpen}>{children}</div>
      {isReady && !isOpen ? (
        <div className="fixed inset-0 z-50 bg-paper text-ink">
          <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col justify-between px-5 pb-10 pt-6 md:px-8 md:pb-16 md:pt-10">
            <div className="border-b border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Editorial Prompt Library</p>
            </div>
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div className="space-y-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Initial Gate</p>
                <h1 className="max-w-[10ch] font-display text-5xl leading-none tracking-[-0.055em] md:text-[6.6rem]">
                  Open the prompt library.
                </h1>
                <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">
                  첫 진입에서는 라이브러리를 바로 노출하지 않고, 의도적으로 한 번 열고 들어오게 한다. 패스워드
                  기반 보안이 아니라 읽기 게이트다.
                </p>
              </div>
              <div className="space-y-5 md:justify-self-end">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.24em] text-cobalt transition hover:text-ink"
                >
                  Enter Library
                </button>
                <p className="max-w-[32ch] text-sm leading-7 text-smoke">
                  이후에는 이 브라우저에서 다시 묻지 않는다. 공개 사이트이므로 완전한 접근 제어는 아니다.
                </p>
              </div>
            </div>
            <div className="border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              prompts / playbooks / sources
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
