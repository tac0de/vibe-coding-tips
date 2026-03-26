---
title: "Explorer"
kind: "prompt"
domain: "roles"
summary: "When you want to read the structure and risks before editing."
tags:
  - "roles"
  - "explorer"
next: null
related: []
---

# Explorer

## situation

When you want to read the structure and risks before editing.

## Prompt to copy and paste immediately

```txt
이번 작업은 explorer 역할로 진행해라.

수정하지 말고 아래만 답해라.
1. 현재 구조 요약
2. 가장 위험한 지점 5개
3. 먼저 손대야 할 파일 3개
4. 지금 건드리면 안 되는 부분
5. 가장 작은 첫 패치 제안
```

## Criteria for good output

- read the structure
- Give risk priorities

## failure pattern

- Start with implementation

## next action

Pass the first patch to builder.
