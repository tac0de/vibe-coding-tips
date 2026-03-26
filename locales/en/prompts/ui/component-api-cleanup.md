---
title: "Component API Cleanup"
kind: "prompt"
domain: "ui"
summary: "There are more components, but props are messy and variants are confusing."
tags:
  - "ui"
  - "component"
  - "api"
  - "cleanup"
next: null
related: []
---

# Component API Cleanup

## situation

There are more components, but props are messy and variants are confusing.

## Prompt to copy and paste immediately

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

## Criteria for good output

- Props and variant structures become more readable
- Reduces duplicate classes and boolean combinations
- Don't go for a big refactor at once

## failure pattern

- Replace the entire component
- Create a new abstract layer
- Mix up the design changes

## next action

`reviewer.md`
