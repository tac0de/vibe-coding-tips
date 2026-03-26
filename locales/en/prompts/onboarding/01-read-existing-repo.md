---
title: "01. Read Existing Repo"
kind: "prompt"
domain: "onboarding"
summary: "You need to first go into an existing UI project and understand its structure."
tags:
  - "onboarding"
  - "read"
  - "existing"
  - "repo"
order: 1
next: null
related: []
---

# 01. Read Existing Repo

## situation

You need to first go into an existing UI project and understand its structure.

## Prompt to copy and paste immediately

```txt
이 레포를 먼저 읽어라.
아직 구현하지 말고 아래 형식으로만 답해라.

1. 현재 구조 요약
2. 화면 진입점
3. 공통 UI 위치
4. D3 같은 렌더링 로직을 넣기 좋은 위치
5. 가장 위험한 파일 5개
6. 먼저 손대야 할 파일 3개
```

## Criteria for good output

- Read only the structure without implementing it
- Based on file
- Give risk priorities

## failure pattern

- Suddenly it starts with modifications
- He only speaks abstractly and can't point to the file.

## next action

`02-lock-scope.md`
