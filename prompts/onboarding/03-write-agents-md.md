---
title: "03. Write AGENTS.md"
kind: "prompt"
domain: "onboarding"
summary: "기존 프로젝트에 Codex를 계속 붙일 계획이고, 레포 안에 작업 규칙을 고정하고 싶다."
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

## 상황

기존 프로젝트에 Codex를 계속 붙일 계획이고, 레포 안에 작업 규칙을 고정하고 싶다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 실제 협업 규칙으로 쓸 수 있다
- 금지사항이 분명하다

## 실패 패턴

- 추상적인 원칙만 나열한다
- 검증 루프가 없다

## 다음 액션

`04-first-small-patch.md`
