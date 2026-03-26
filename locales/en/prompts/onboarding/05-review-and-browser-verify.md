---
title: "05. Review And Browser Verify"
kind: "prompt"
domain: "onboarding"
summary: "The first patch is over, and we need to quickly check for regression and aesthetics."
tags:
  - "onboarding"
  - "review"
  - "and"
  - "browser"
  - "verify"
order: 5
next: null
related: []
---

# 05. Review And Browser Verify

## situation

The first patch is over, and we need to quickly check for regression and aesthetics.

## Prompt to copy and paste immediately

```txt
이번 변경을 reviewer + browser verifier 관점으로 확인해라.

먼저 reviewer:
1. 실제 동작이 깨질 가능성
2. 모바일 레이아웃 리스크
3. 상태 동기화 / cleanup 문제

그다음 browser verifier:
1. 첫 화면 인상
2. 모바일에서 이상한 점
3. hover / click / transition 체감 여부

칭찬은 최소화하고, 문제만 우선 정리해라.
```

## Criteria for good output

- Separate code and browser perspectives
- Pick out only real risks

## failure pattern

- Just guess the code without checking the browser.
- It flows mainly with praise.

## next action

Only the most dangerous item is passed back to the builder.
