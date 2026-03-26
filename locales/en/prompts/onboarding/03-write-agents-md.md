---
title: "03. Write AGENTS.md"
kind: "prompt"
domain: "onboarding"
summary: "I plan to continue adding Codex to the existing project, and I want to fix the work rules within the repo."
tags:
  - "onboarding"
  - "write"
  - "agents"
  - "md"
order: 3
next: null
related: []
---

# 03. Write AGENTS.md

## situation

I plan to continue adding Codex to the existing project, and I want to fix the work rules within the repo.

## Prompt to copy and paste immediately

```txt
이 레포에 맞는 AGENTS.md 초안을 작성해라.

반드시 포함:
- 이 레포에서 AI를 어디에 쓰는지
- 무엇을 하면 안 되는지
- builder / reviewer / browser verifier 운영 방식
- 작은 패치 우선 원칙
- 검증 루프

너무 길지 않게, 실제 작업 규칙 문서처럼 써라.
```

## Criteria for good output

- Can be used as actual collaboration rules
- The prohibition is clear

## failure pattern

- List only abstract principles
- There is no verification loop

## next action

`04-first-small-patch.md`
