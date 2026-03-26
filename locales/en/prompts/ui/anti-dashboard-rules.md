---
title: "Anti Dashboard Rules"
kind: "prompt"
domain: "ui"
summary: "The landing or editorial UI keeps appearing like a SaaS dashboard."
tags:
  - "ui"
  - "anti"
  - "dashboard"
  - "rules"
next: null
related: []
---

# Anti Dashboard Rules

## situation

The landing or editorial UI keeps appearing like a SaaS dashboard.

## Prompt to copy and paste immediately

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

## Criteria for good output

- The scene is read first.
- Cards and pills are not the main characters
- UI moves away from product dashboard

## failure pattern

- Just change the color and leave the structure the same.
- Do not reduce the number of cards
- There is no dominant stage

## next action

`landing-first-screen.md`
