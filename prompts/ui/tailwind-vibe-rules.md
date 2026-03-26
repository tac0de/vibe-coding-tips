---
title: "Tailwind Vibe Rules"
kind: "prompt"
domain: "ui"
summary: "Tailwind를 클래스 나열 도구가 아니라 위계와 밀도를 설계하는 도구로 쓰게 만드는 프롬프트."
tags:
  - "ui"
  - "tailwind"
  - "hierarchy"
  - "vibe"
next: "motion-tuning.md"
related:
  - "prompts/ui/tailwind-cleanup.md"
  - "prompts/ui/anti-dashboard-rules.md"
---

# Tailwind Vibe Rules

## 상황

Tailwind를 쓰고 있는데 화면이 utility 나열처럼 보이고, 위계와 간격이 불안정하다.

## 바로 복붙할 프롬프트

```txt
이번 작업은 Tailwind 클래스를 추가하는 것이 아니라 UI 위계 규칙을 먼저 고정하는 단계다.

이 프로젝트의 현재 화면을 읽고 아래 5가지만 먼저 정리해라.

1. spacing hierarchy
2. typography hierarchy
3. component depth
4. color restraint
5. responsive collapse rule

출력 형식:
1. 현재 문제 5개
2. 새 Tailwind 규칙 5개
3. 금지할 Tailwind 패턴 5개
4. 바로 수정할 파일과 수정 범위

중요:
- utility를 더 많이 붙이는 방식으로 해결하지 말 것
- card, pill, KPI block 중심의 generic SaaS 문법 금지
- 모바일 기준으로 먼저 판단할 것
- spacing은 1개 화면에서 3~4단계만 허용할 것
- 색은 강조색을 1개 계열만 남길 것
```

## 좋은 출력의 기준

- Tailwind를 시각 위계 규칙으로 읽는다
- spacing, typography, surface 깊이를 분리해서 본다
- 금지 문법이 같이 제시된다

## 실패 패턴

- class string 길이만 늘어난다
- 디자인 원칙 없이 utility만 재배열한다
- 반응형 붕괴 기준이 없다

## 다음 액션

`motion-tuning.md`로 넘어가거나 `tailwind-cleanup.md`로 실제 정리를 시작한다.
