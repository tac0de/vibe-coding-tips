---
title: "06. Dependency Freeze"
kind: "prompt"
domain: "onboarding"
summary: "Before entering an existing project, I want to lock the scope of additional dependencies first."
tags:
  - "onboarding"
  - "dependency"
  - "freeze"
order: 6
next: null
related: []
---

# 06. Dependency Freeze

## situation

Before entering an existing project, I want to lock the scope of additional dependencies first.

## Prompt to copy and paste immediately

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

## Criteria for good output

- Criteria for adding dependencies are clear
- Do not shake up existing projects
- It is clear when external libraries can be used in D3 or UI work.

## failure pattern

- I definitely recommend the new library.
- It speaks abstractly without reading current dependencies
- It's not about policy, it's about preference.

## next action

`07-context-trim.md`
