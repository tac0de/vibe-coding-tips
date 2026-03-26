---
title: "Fix Responsive Breakage"
kind: "prompt"
domain: "ui"
summary: "The layout is broken on mobile or at certain breakpoints."
tags:
  - "ui"
  - "fix"
  - "responsive"
  - "breakage"
next: null
related: []
---

# Fix Responsive Breakage

## situation

The layout is broken on mobile or at certain breakpoints.

## Prompt to copy and paste immediately

```txt
증상:
- 모바일에서 레이아웃이 깨진다.

먼저 아래만 말해라.
1. 원인 후보 3개
2. 가장 가능성 높은 원인 1개
3. 최소 수정안 1개

그다음 그 수정만 적용해라.
검증은 lint, typecheck, build까지 해라.
```

## Criteria for good output

- Look at the cause first

## failure pattern

- Tinkering with CSS here and there

## next action

Mobile verification with browser verifier.
