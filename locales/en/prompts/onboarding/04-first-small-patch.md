---
title: "04. First Small Patch"
kind: "prompt"
domain: "onboarding"
summary: "Now let's start the first implementation. It must be a small patch."
tags:
  - "onboarding"
  - "first"
  - "small"
  - "patch"
order: 4
next: null
related: []
---

# 04. First Small Patch

## situation

Now let's start the first implementation. It must be a small patch.

## Prompt to copy and paste immediately

```txt
이번 패치는 아주 작게 간다.

목표:
- [첫 수정 1개]

제약:
- 관련 없는 파일 수정 금지
- 새 abstraction 과하게 추가 금지
- 구현 후 lint, typecheck, build까지

답변 형식:
1. 수정 파일
2. 수정 내용
3. 검증 결과
4. 남은 리스크
```

## Criteria for good output

- It's a small patch
- Verification is complete

## failure pattern

- The structure is greatly overhauled from the first patch.
- Finish without verification

## next action

`05-review-and-browser-verify.md`
