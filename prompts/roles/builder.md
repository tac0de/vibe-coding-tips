---
title: "Builder"
kind: "prompt"
domain: "roles"
summary: "작은 구현 패치를 맡길 때."
tags:
  - "roles"
  - "builder"
next: null
related: []
---

# Builder

## 상황

작은 구현 패치를 맡길 때.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 구현 범위가 작다
- 검증이 있다

## 실패 패턴

- 한 번에 너무 많이 고친다

## 다음 액션

reviewer로 넘긴다.
