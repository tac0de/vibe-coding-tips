---
title: "05. Add Tooltip"
kind: "prompt"
domain: "d3"
summary: "사용자가 값을 짧게 읽고 비교할 수 있는 tooltip을 붙일 때 쓰는 프롬프트."
tags:
  - "d3"
  - "add"
  - "tooltip"
order: 5
next: "prompts/d3/06-add-advanced-interaction.md"
related:
  - "prompts/d3/13-interaction-qa.md"
---

# 05. Add Tooltip

## 상황

사용자가 값을 탐색할 때 맥락을 짧게 보고 싶다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 tooltip만 구현해라.

목표:
- hover 시 핵심 정보 2~3개만
- 모바일 overflow 없음
- 장면을 가리지 않음
- 전체 SVG 재생성 금지

React overlay로 둘지, SVG text로 둘지 먼저 판단하고 진행해라.
```

## 좋은 출력의 기준

- 짧고 명확하다

## 실패 패턴

- tooltip이 너무 길다

## 다음 액션

`06-add-advanced-interaction.md`
