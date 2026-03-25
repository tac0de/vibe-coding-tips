---
title: "Reviewer"
kind: "prompt"
domain: "roles"
summary: "구현 뒤 bug, regression, complexity를 확인할 때."
tags:
  - "roles"
  - "reviewer"
next: null
related: []
---

# Reviewer

## 상황

구현 뒤 bug, regression, complexity를 확인할 때.

## 바로 복붙할 프롬프트

```txt
이번 작업은 reviewer 역할로 진행해라.

칭찬보다 아래를 먼저 말해라.
1. 실제 동작이 깨질 가능성
2. 모바일 레이아웃 리스크
3. 상태 동기화 / cleanup 문제
4. 과도한 복잡성
5. 다음 패치 전에 꼭 정리해야 할 점
```

## 좋은 출력의 기준

- 문제를 심각도 순으로 말한다

## 실패 패턴

- “깔끔하다”는 말만 많다

## 다음 액션

가장 위험한 항목을 builder가 고친다.
