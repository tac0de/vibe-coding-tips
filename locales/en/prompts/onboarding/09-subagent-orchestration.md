---
title: "09. Subagent Orchestration"
kind: "prompt"
domain: "onboarding"
summary: "With just one builder, the quality fluctuates due to the mix of structure reading, implementation, review, and browser verification."
tags:
  - "onboarding"
  - "subagent"
  - "orchestration"
order: 9
next: null
related: []
---

# 09. Subagent Orchestration

## situation

With just one builder, the quality fluctuates due to the mix of structure reading, implementation, review, and browser verification.

## Prompt to copy and paste immediately

```txt
이번 작업은 역할을 분리해서 운영한다.

역할:
- builder: 작은 구현 패치
- explorer: 관련 파일과 리스크 탐색
- reviewer: 버그/회귀/복잡성 리뷰
- browser verifier: 브라우저 동작 확인

이번 목표에 맞춰 역할별 순서를 제안해라.

답변 형식:
1. 역할별 책임
2. 실행 순서
3. 각 역할에 넘길 입력문 초안
4. 병렬로 돌려도 되는 것 / 안 되는 것

주의:
- 같은 파일을 여러 역할이 동시에 수정하게 하지 말 것
- 기존 프로젝트 기준으로 답할 것
```

## Criteria for good output

- Roles do not overlap
- Reviewer and verifier are separated after the builder
- It is clear that parallelism is possible/not possible.

## failure pattern

- Only roles are listed and no order of operation is given.
- Gives everything to the builder
- Mixing correction and verification responsibilities

## next action

`10-regression-gate.md`
