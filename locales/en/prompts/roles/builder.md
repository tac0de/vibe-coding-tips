---
title: "Builder"
kind: "prompt"
domain: "roles"
summary: "When entrusted with small implementation patches."
tags:
  - "roles"
  - "builder"
next: null
related: []
---

# Builder

## situation

When entrusted with small implementation patches.

## Prompt to copy and paste immediately

```txt
이번 작업은 builder 역할로 진행해라.

목표:
- [목표 1개]

제약:
- 작은 패치 단위
- 관련 없는 파일 수정 금지
- 과한 추상화 금지
- 구현 후 lint, typecheck, build

답변 형식:
1. 수정 파일
2. 수정 내용
3. 검증 결과
4. 남은 리스크
```

## Criteria for good output

- The scope of implementation is small
- There is verification

## failure pattern

- Fixing too much at once

## next action

Pass it to reviewer.
