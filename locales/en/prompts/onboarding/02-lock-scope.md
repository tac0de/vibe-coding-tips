---
title: "02. Lock Scope"
kind: "prompt"
domain: "onboarding"
summary: "The first analysis is complete, and now we need to narrow down the scope of work."
tags:
  - "onboarding"
  - "lock"
  - "scope"
order: 2
next: null
related: []
---

# 02. Lock Scope

## situation

The first analysis is complete, and now we need to narrow down the scope of work.

## Prompt to copy and paste immediately

```txt
좋다. 이제 이번 작업의 수정 범위를 고정한다.

수정 가능:
- [여기에 경로]

수정 금지:
- [여기에 경로]

이번 패치 목표:
- [목표 1개]

먼저 어떤 파일을 어떻게 바꿀지 5줄 안으로만 말해라.
아직 구현하지 말라.
```

## Criteria for good output

- There is only one goal
- The range of modifications possible/prohibited is clear.

## failure pattern

- set a wide scope
- Add multiple goals

## next action

`03-write-agents-md.md`
