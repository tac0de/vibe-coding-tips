---
title: "14. Where D3 Fits Best"
kind: "prompt"
domain: "d3"
summary: "A prompt to organize where D3 should be used and in what situations it is stronger than Chart.js or general components."
tags:
  - "d3"
  - "concept"
  - "fit"
order: 14
next: null
related:
  - "prompts/d3/01-choose-d3-vs-chart-library.md"
  - "prompts/d3/11-annotation-and-storytelling.md"
---

# 14. Where D3 Fits Best

## situation

You try to use D3 vaguely, or on the contrary, you try to overly attach D3 to a scene where Chart.js is sufficient.

## Prompt to copy and paste immediately

```txt
이 기능에서 D3가 진짜 필요한지 판단해라.

판단 기준:
- 단순 정량 비교인가
- custom interaction이 필요한가
- annotation, zoom, brush, drag, join update가 필요한가
- 기사형 스토리텔링이나 linked views가 필요한가
- SVG 구조를 세밀하게 제어해야 하는가

출력 형식:
1. D3가 적합한 이유 또는 부적합한 이유
2. 이 장면에 맞는 interaction-first UI 구조
3. scale, axis/legend, join, tooltip, advanced interaction을 어디에 둘지
4. Chart library로 대체 가능하면 그 이유
5. 지금 단계에서 가장 작은 D3 범위

주의:
- D3를 “멋있어 보이니까” 쓰지 말 것
- static chart만 필요하면 D3를 과하게 쓰지 말 것
- React와 D3 책임 경계도 같이 제안할 것
```

## Criteria for good output

- Whether to introduce D3 is judged based on interaction.
- Essential concepts like scale, join, and tooltip are linked to the scene.
- Lock the minimum range first

## failure pattern

- D3 is recommended as the default.
- Prioritize implementation preference over visualization purpose.
- D3 is enforced even on static charts without interaction.

## next action

If you really need D3, proceed again in order starting from `02-design-scales.md`.
