---
title: "08. Failure Recovery"
kind: "prompt"
domain: "onboarding"
summary: "The agent hallucinates, goes to the wrong structure, or repeats directions that have already failed."
tags:
  - "onboarding"
  - "failure"
  - "recovery"
order: 8
next: null
related: []
---

# 08. Failure Recovery

## situation

The agent hallucinates, goes to the wrong structure, or repeats directions that have already failed.

## Prompt to copy and paste immediately

```txt
이전 시도가 실패했다. 같은 방향으로 수정하지 말고 실패 원인을 먼저 정리해라.

답변 형식:
1. 실패 원인 3개
2. 유지할 것
3. 버릴 것
4. 더 작은 다음 패치 1개

제약:
- 방금 만든 구조를 억지로 살리지 말 것
- 새로운 패치는 한 가지 목표만 가질 것
- 수정 범위는 이전보다 더 작게 자를 것

추가:
- 가능하면 builder와 reviewer를 분리하는 다음 순서를 제안해라
```

## Criteria for good output

- Causes of failure are systematically organized
- The decision to maintain/discard is clear.
- Next patch will be smaller

## failure pattern

- Just say let's try again
- Blaming the model for failure
- do not reduce range

## next action

`09-subagent-orchestration.md`
