---
title: "10. Regression Gate"
kind: "prompt"
domain: "onboarding"
summary: "작은 패치를 했는데 회귀가 걱정되거나, 어디까지 검증해야 할지 불명확하다."
tags:
  - "onboarding"
  - "regression"
  - "gate"
order: 10
next: null
related: []
---

# 10. Regression Gate

## 상황

작은 패치를 했는데 회귀가 걱정되거나, 어디까지 검증해야 할지 불명확하다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 검증 범위가 현실적이다
- UI/D3 회귀 포인트가 드러난다
- reviewer와 browser verifier의 역할이 분리된다

## 실패 패턴

- 모든 검증을 다 돌리라고만 한다
- 모바일 검증을 빼먹는다
- 브라우저 시나리오 없이 명령만 나열한다

## 다음 액션

`playbooks/existing-project-flow.md`
