---
title: "10. Regression Gate"
kind: "prompt"
domain: "onboarding"
summary: "I made a small patch, but I'm worried about regression, or it's unclear how far I need to verify it."
tags:
  - "onboarding"
  - "regression"
  - "gate"
order: 10
next: null
related: []
---

# 10. Regression Gate

## situation

I made a small patch, but I'm worried about regression, or it's unclear how far I need to verify it.

## Prompt to copy and paste immediately

```txt
이번 변경에 필요한 regression gate를 정리해라.

작업 기준:
- 기존 프로젝트
- UI/Tailwind 또는 D3 변경

답변 형식:
1. 꼭 돌릴 정적 검증
2. 꼭 확인할 브라우저 시나리오
3. 모바일에서 볼 항목
4. reviewer가 중점으로 볼 리스크
5. 이번 변경에서 생략 가능한 검증

주의:
- 무조건 풀테스트를 요구하지 말고, 이번 패치 기준으로 줄여라
- lint, typecheck, build, visual check 중 필요한 것만 이유와 함께 적어라
```

## Criteria for good output

- Verification scope is realistic
- UI/D3 regression points are revealed
- The roles of reviewer and browser verifier are separated.

## failure pattern

- It just tells me to run all verifications.
- Skip mobile verification
- Lists only commands without browser scenario

## next action

`playbooks/existing-project-flow.md`
