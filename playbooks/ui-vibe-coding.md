---
title: "UI Vibe Coding"
kind: "playbook"
domain: "ui"
summary: "UI 작업에서 중요한 건 “예쁘게”가 아니라 “어떤 장면을 만들지”를 잠그는 것이다."
tags:
  - "ui"
  - "vibe"
  - "coding"
next: null
related: []
---

# UI Vibe Coding

UI 작업에서 중요한 건 “예쁘게”가 아니라 “어떤 장면을 만들지”를 잠그는 것이다.

## 핵심 원칙

- 첫 화면의 주인공은 하나만 둔다
- 카드, KPI, pill, dashboard 문법이 주인공이 되면 실패다
- 모바일 기준으로 먼저 설계한다
- reference와 함께 금지할 UI 문법을 꼭 준다

## Tailwind를 어디에 잘 쓰는가

- 빠르게 레이아웃 위계를 정리할 때
- spacing과 typography 규칙을 실험적으로 조정할 때
- 기존 design token을 읽고 얇게 맞춰갈 때
- 작은 패치로 화면을 자주 돌려보는 vibe coding 흐름에 잘 맞는다

## Tailwind에서 특히 볼 것

- spacing hierarchy
- typography hierarchy
- component depth
- surface / border / shadow 규칙

## Tailwind에서 자주 망하는 패턴

- utility를 늘리기만 하고 위계를 정의하지 않는다
- 반응형 collapse 기준이 없다
- 색과 shadow를 동시에 과하게 올린다
- class 중복을 줄이겠다고 섣불리 추상화부터 한다

## 바로 쓸 파일

- `prompts/ui/landing-first-screen.md`
- `prompts/ui/refactor-information-hierarchy.md`
- `prompts/ui/fix-responsive-breakage.md`
- `prompts/ui/create-design-brief.md`
- `prompts/ui/tailwind-cleanup.md`
- `prompts/ui/review-ui-tone.md`
- `prompts/ui/tailwind-vibe-rules.md`
- `prompts/ui/anti-dashboard-rules.md`
- `prompts/ui/accessibility-audit.md`
