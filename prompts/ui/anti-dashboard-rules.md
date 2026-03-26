---
title: "Anti Dashboard Rules"
kind: "prompt"
domain: "ui"
summary: "랜딩이나 에디토리얼 화면이 자꾸 SaaS 대시보드 문법으로 무너질 때 금지 규칙을 먼저 거는 프롬프트."
tags:
  - "ui"
  - "anti"
  - "dashboard"
  - "rules"
next: null
related: []
---

# Anti Dashboard Rules

## 상황

랜딩이나 에디토리얼 UI가 자꾸 SaaS 대시보드처럼 나온다.

## 바로 복붙할 프롬프트

```txt
이번 UI 작업은 아래 anti-dashboard rules를 강하게 적용해라.

금지:
- KPI cards
- repeated pill groups
- generic SaaS dashboard tone
- glassmorphism
- equal-size feature blocks
- over-rounded playful surfaces

지켜야 할 것:
- strong visual hierarchy
- fewer surfaces
- one dominant stage
- tighter type rhythm
- mobile-first

수정 후 답변 형식:
1. 어떤 대시보드 문법을 제거했는지
2. 장면의 중심이 무엇인지
3. 아직 남은 위험한 문법
```

## 좋은 출력의 기준

- 장면이 먼저 읽힌다
- 카드와 pill이 주인공이 아니다
- UI가 제품 대시보드에서 멀어진다

## 실패 패턴

- 색만 바꾸고 구조는 그대로 둔다
- 카드 개수를 줄이지 않는다
- dominant stage가 없다

## 다음 액션

`landing-first-screen.md`
