---
title: "06. Dependency Freeze"
kind: "prompt"
domain: "onboarding"
summary: "기존 프로젝트에 들어가기 전에 dependency 추가 범위를 먼저 잠그고 싶다."
tags:
  - "onboarding"
  - "dependency"
  - "freeze"
order: 6
next: null
related: []
---

# 06. Dependency Freeze

## 상황

기존 프로젝트에 들어가기 전에 dependency 추가 범위를 먼저 잠그고 싶다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 새 기능 구현보다 dependency 정책부터 잠근다.

해야 할 일:
- 현재 package manager와 주요 의존성을 읽어라
- 새 dependency가 꼭 필요한지 판단하라
- 필요한 경우와 금지해야 하는 경우를 나눠라

답변 형식:
1. 현재 핵심 의존성
2. 지금 추가해도 되는 dependency
3. 지금은 추가하면 안 되는 dependency
4. 추천 기본 원칙 3개

주의:
- 구현하지 말고 정책만 정리해라
- UI/Tailwind/D3 작업 기준으로 답해라
```

## 좋은 출력의 기준

- 의존성 추가 기준이 명확하다
- 기존 프로젝트를 흔들지 않는다
- D3나 UI 작업에서 언제 외부 라이브러리를 써도 되는지 분명하다

## 실패 패턴

- 무조건 새 라이브러리를 추천한다
- 현재 의존성을 읽지 않고 추상적으로 말한다
- 정책이 아니라 취향만 말한다

## 다음 액션

`07-context-trim.md`
