"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vibe-coding-tips:gate-open";
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
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(STORAGE_KEY);
    setIsOpen(stored === "open");
    setIsReady(true);
  }, []);

  const handleOpen = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "open");
    if (remember) window.localStorage.setItem(STORAGE_KEY, "open");
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
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Editorial Prompt Library</p>
            </div>
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div className="space-y-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">Initial Gate</p>
                <h1 className="max-w-[10ch] font-display text-5xl leading-none tracking-[-0.055em] md:text-[6.6rem]">
                  Unlock the prompt library.
                </h1>
                <p className="max-w-measure text-sm leading-7 text-smoke md:text-base">
                  열람을 바로 열어두지 않고, 비밀번호를 통과한 뒤에만 라이브러리에 들어가게 한다. 다만 정적 GitHub
                  Pages 기반이라 완전한 보안 장치는 아니다.
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
                    <label className="flex items-center gap-2 text-sm text-smoke">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                      />
                      Remember in this browser
                    </label>
                    {error ? <p className="text-sm text-[#9f2f28]">{error}</p> : null}
                    <button
                      type="button"
                      onClick={() => void handleUnlock()}
                      className="border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.24em] text-cobalt transition hover:text-ink"
                    >
                      Enter Library
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.24em] text-cobalt transition hover:text-ink"
                    >
                      Enter Library
                    </button>
                    <p className="max-w-[32ch] text-sm leading-7 text-smoke">
                      아직 비밀번호 해시가 설정되지 않아 기본 게이트 모드로 동작한다.
                    </p>
                  </div>
                )}
                <p className="max-w-[32ch] text-sm leading-7 text-smoke">
                  공개 사이트이므로 완전한 접근 제어는 아니다. 정적 사이트에서의 읽기 제한용 소프트 게이트다.
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
