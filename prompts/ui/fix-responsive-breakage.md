---
title: "Fix Responsive Breakage"
kind: "prompt"
domain: "ui"
summary: "모바일이나 특정 breakpoint에서 레이아웃이 깨진다."
tags:
  - "ui"
  - "fix"
  - "responsive"
  - "breakage"
next: null
related: []
---

# Fix Responsive Breakage

## 상황

모바일이나 특정 breakpoint에서 레이아웃이 깨진다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 원인을 먼저 본다

## 실패 패턴

- CSS를 여기저기 건드린다

## 다음 액션

browser verifier로 모바일 확인.
