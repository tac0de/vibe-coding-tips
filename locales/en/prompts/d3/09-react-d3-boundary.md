---
title: "09. React D3 Boundary"
kind: "prompt"
domain: "d3"
summary: "D3 and React responsibilities get mixed up, resulting in messy code, or D3 takes over the entire DOM."
tags:
  - "d3"
  - "react"
  - "boundary"
order: 9
next: null
related: []
---

# 09. React D3 Boundary

## situation

D3 and React responsibilities get mixed up, resulting in messy code, or D3 takes over the entire DOM.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 React와 D3의 책임 경계를 먼저 정리해라.

정리할 것:
- layout는 누가 맡는지
- state는 누가 갖는지
- SVG root는 누가 소유하는지
- scale, axis, join, interaction binding은 누가 맡는지
- tooltip은 React overlay인지 D3 foreignObject인지

답변 형식:
1. React 책임
2. D3 책임
3. useEffect / refs 구조
4. 절대 하지 말아야 할 구조

주의:
- full DOM takeover 금지
- 한 컴포넌트에 모든 걸 몰아넣지 말 것
```

## Criteria for good output

- The border between React and D3 is clear
- SVG root ownership is clear
- Effect and cleanup points are revealed

## failure pattern

- D3 builds all of JSX for you
- Mix up React state and simulation state
- tooltip ownership is unclear

## next action

`10-debug-scales-and-joins.md`
