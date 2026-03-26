---
title: "Reviewer"
kind: "prompt"
domain: "roles"
summary: "When checking for bugs, regression, and complexity after implementation."
tags:
  - "roles"
  - "reviewer"
next: null
related: []
---

# Reviewer

## situation

When checking for bugs, regression, and complexity after implementation.

## Prompt to copy and paste immediately

```txt
이번 작업은 reviewer 역할로 진행해라.

칭찬보다 아래를 먼저 말해라.
1. 실제 동작이 깨질 가능성
2. 모바일 레이아웃 리스크
3. 상태 동기화 / cleanup 문제
4. 과도한 복잡성
5. 다음 패치 전에 꼭 정리해야 할 점
```

## Criteria for good output

- List problems in order of severity

## failure pattern

- A lot of people say “it’s neat”

## next action

The builder fixes the most dangerous items.
