---
title: "D3 Playbook"
kind: "playbook"
domain: "d3"
summary: "D3 작업을 판단, scale, join, tooltip, interaction, mobile, QA 순서로 바로 잡는 허브."
tags:
  - "d3"
  - "playbook"
next: null
related:
  - "prompts/d3/01-choose-d3-vs-chart-library.md"
  - "prompts/d3/02-design-scales.md"
  - "prompts/d3/04-structure-data-join.md"
  - "prompts/d3/05-add-tooltip.md"
  - "prompts/d3/09-react-d3-boundary.md"
  - "prompts/d3/13-interaction-qa.md"
---

# D3 Playbook

D3 작업을 빠르게 시작할 때 먼저 여는 허브다.

## 실전 순서

1. `01-choose-d3-vs-chart-library.md`
   D3가 필요한지 먼저 판단한다.
2. `02-design-scales.md`
   값이 위치, 길이, 색으로 어떻게 바뀌는지 정한다.
3. `04-structure-data-join.md`
   데이터 변경이 DOM 업데이트와 안정적으로 연결되게 만든다.
4. `05-add-tooltip.md`
   사용자가 값을 읽는 짧은 상호작용을 붙인다.
5. `06-add-advanced-interaction.md`
   zoom, brush, drag 같은 고급 인터랙션을 붙인다.
6. `07-cleanup-resize-mobile.md`
   resize, mobile, cleanup을 정리한다.
7. `13-interaction-qa.md`
   마지막으로 읽힘과 동작을 점검한다.

## 언제 D3를 쓸지

- interaction이 결과의 핵심일 때
- annotation, callout, story가 같이 움직여야 할 때
- chart library 경계가 금방 답답해질 때
- join update를 직접 통제해야 할 때

## React와 D3 경계

- React는 layout, state, controls를 맡는다
- D3는 scale, axis, join, geometry, interaction을 맡는다

## 같이 보면 좋은 문서

- `prompts/d3/09-react-d3-boundary.md`
- `prompts/d3/10-debug-scales-and-joins.md`
- `prompts/d3/12-performance-for-large-svg.md`
- `prompts/d3/14-where-d3-fits-best.md`
