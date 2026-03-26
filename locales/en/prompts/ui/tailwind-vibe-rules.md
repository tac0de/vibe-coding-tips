---
title: "Tailwind Vibe Rules"
kind: "prompt"
domain: "ui"
summary: "Prompts to use Tailwind as a tool for designing hierarchy and density rather than as a class listing tool."
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

## situation

I'm using Tailwind, but the screen looks like a list of utilities, and the hierarchy and spacing are unstable.

## Prompt to copy and paste immediately

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

## Criteria for good output

- Reading Tailwind with visual hierarchy rules
- View spacing, typography, and surface depth separately
- Prohibited grammar is presented together

## failure pattern

- Only the class string length increases
- Rearrange only utility without design principles
- There are no responsive collapse criteria

## next action

Move to `motion-tuning.md` or start the actual cleanup with `tailwind-cleanup.md`.
