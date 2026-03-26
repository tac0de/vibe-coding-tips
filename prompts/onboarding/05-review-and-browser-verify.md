---
title: "05. Review And Browser Verify"
kind: "prompt"
domain: "onboarding"
summary: "첫 패치 뒤 브라우저 인상, 레이아웃, interaction regression을 한 번에 확인하는 검증 프롬프트."
tags:
  - "onboarding"
  - "review"
  - "and"
  - "browser"
  - "verify"
order: 5
next: null
related: []
---

# 05. Review And Browser Verify

## 상황

첫 패치가 끝났고, 회귀와 미감까지 빠르게 확인해야 한다.

## 바로 복붙할 프롬프트

```txt
이번 변경을 reviewer + browser verifier 관점으로 확인해라.

먼저 reviewer:
1. 실제 동작이 깨질 가능성
2. 모바일 레이아웃 리스크
3. 상태 동기화 / cleanup 문제

그다음 browser verifier:
1. 첫 화면 인상
2. 모바일에서 이상한 점
3. hover / click / transition 체감 여부

칭찬은 최소화하고, 문제만 우선 정리해라.
```

## 좋은 출력의 기준

- 코드와 브라우저 관점을 분리한다
- 실제 위험만 뽑는다

## 실패 패턴

- 브라우저 확인 없이 코드 추정만 한다
- 칭찬 위주로 흐른다

## 다음 액션

가장 위험한 항목 하나만 다시 builder로 넘긴다.
