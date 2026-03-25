---
title: "Component API Cleanup"
kind: "prompt"
domain: "ui"
summary: "컴포넌트는 많아졌는데 props가 지저분하고 variant가 난잡해졌다."
tags:
  - "ui"
  - "component"
  - "api"
  - "cleanup"
next: null
related: []
---

# Component API Cleanup

## 상황

컴포넌트는 많아졌는데 props가 지저분하고 variant가 난잡해졌다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 UI 컴포넌트 API만 정리해라.

목표:
- props 이름 정리
- 중복 variant 줄이기
- 의미 없는 boolean props 제거
- Tailwind class 중복 완화

답변 형식:
1. 정리 대상 컴포넌트
2. 문제 패턴
3. 추천 API 형태
4. 가장 작은 정리 패치 1개

주의:
- 디자인을 다시 만들지 말고 API를 정리하는 데 집중해라
- 과한 추상화 금지
```

## 좋은 출력의 기준

- props와 variant 구조가 더 읽기 쉬워진다
- 중복 클래스와 boolean 조합이 줄어든다
- 한 번에 큰 리팩터로 가지 않는다

## 실패 패턴

- 컴포넌트를 통째로 갈아엎는다
- 새로운 추상 레이어를 과하게 만든다
- 디자인 변경까지 섞는다

## 다음 액션

`reviewer.md`
