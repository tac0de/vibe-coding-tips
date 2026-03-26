"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vibe-coding-tips:gate-open:v3";
const PASSWORD_HASH = process.env.NEXT_PUBLIC_LIBRARY_PASSWORD_SHA256 ?? "";

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function LibraryGate({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    setIsOpen(stored === "open");
    setIsReady(true);
  }, []);

  const handleOpen = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "open");
    setIsOpen(true);
  };

  const handleUnlock = async () => {
    if (!PASSWORD_HASH) {
      handleOpen();
      return;
    }

    const hashed = await sha256(password.trim());
    if (hashed === PASSWORD_HASH) {
      setError("");
      handleOpen();
      return;
    }

    setError("비밀번호가 맞지 않습니다.");
  };

  return (
    <>
      <div aria-hidden={!isReady || !isOpen}>{children}</div>
      {isReady && !isOpen ? (
        <div className="fixed inset-0 z-50 bg-paper text-ink">
          <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col justify-between px-5 pb-10 pt-6 md:px-8 md:pb-16 md:pt-10">
            <div className="border-b border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Vibe Coding Tips</p>
            </div>
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div className="space-y-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Access</p>
                <h1 className="max-w-[10ch] font-display text-5xl leading-none tracking-[-0.055em] md:text-[6.6rem]">
                  워크숍 자료 열기
                </h1>
                <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">
                  수강생 열람용 페이지입니다. 비밀번호를 입력한 뒤 자료를 확인할 수 있습니다.
                </p>
              </div>
              <div className="space-y-5 md:justify-self-end">
                {PASSWORD_HASH ? (
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">Password</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setError("");
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") void handleUnlock();
                        }}
                        className="w-full border-b border-ink bg-transparent px-0 py-3 font-display text-2xl tracking-[-0.03em] text-ink outline-none"
                      />
                    </label>
                    {error ? <p className="text-sm text-[#9f2f28]">{error}</p> : null}
                    <button
                      type="button"
                      onClick={() => void handleUnlock()}
                      className="border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.24em] text-cobalt transition hover:text-ink"
                    >
                      열기
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.24em] text-cobalt transition hover:text-ink"
                    >
                      열기
                    </button>
                    <p className="max-w-[32ch] text-sm leading-7 text-smoke">
                      현재는 기본 게이트 모드로 열립니다.
                    </p>
                  </div>
                )}
                <p className="max-w-[32ch] text-sm leading-7 text-smoke">
                  정적 페이지 특성상 완전한 보안 장치는 아니며, 열람 제한용 게이트입니다.
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
