---
title: "D3 Playbook"
kind: "playbook"
domain: "d3"
summary: "D3는 차트를 그리기 위한 도구보다, 상호작용 시스템을 직접 제어하는 도구에 가깝다."
tags:
  - "d3"
  - "playbook"
next: null
related: []
---

# D3 Playbook

D3는 차트를 그리기 위한 도구보다, 상호작용 시스템을 직접 제어하는 도구에 가깝다.

## D3가 잘 맞는 장면

- interaction이 차트의 핵심일 때
- annotation, story, callout이 같이 움직여야 할 때
- zoom, brush, drag, linked views처럼 chart library로 답답한 순간
- 데이터가 자주 바뀌고 join update가 중요할 때

## D3가 과한 장면

- 단순 bar, line, pie만 필요한 정적 리포트
- interaction 없이 숫자만 비교하는 카드형 대시보드
- SVG를 세밀하게 제어할 필요가 없는 경우

## 핵심 학습 순서

1. D3가 정말 필요한지 판단
2. scale 설계
3. axis 또는 legend-scale
4. join
5. tooltip
6. advanced interaction
7. cleanup / resize / mobile

## React와 D3의 분리 원칙

- React: layout, state, controls
- D3: scale, axis, join, geometry, interaction

## 바이브 코딩과 잘 맞는 이유

- 단계가 명확해서 작은 패치로 진행하기 쉽다
- scale, axis, join, tooltip처럼 성공 조건을 잘게 잠그기 좋다
- 에이전트가 낯선 시각화 API를 설명하고 예제를 점진적으로 붙이게 만들기 좋다

## 바로 쓸 파일

- `prompts/d3/01-choose-d3-vs-chart-library.md`
- `prompts/d3/02-design-scales.md`
- `prompts/d3/03-add-axis-or-legend-scale.md`
- `prompts/d3/04-structure-data-join.md`
- `prompts/d3/05-add-tooltip.md`
- `prompts/d3/06-add-advanced-interaction.md`
- `prompts/d3/07-cleanup-resize-mobile.md`
- `prompts/d3/14-where-d3-fits-best.md`
