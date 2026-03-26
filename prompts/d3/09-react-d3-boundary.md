---
title: "09. React D3 Boundary"
kind: "prompt"
domain: "d3"
summary: "React와 D3 책임이 섞였을 때 경계를 다시 나누는 프롬프트."
tags:
  - "d3"
  - "react"
  - "boundary"
order: 9
next: "prompts/d3/07-cleanup-resize-mobile.md"
related:
  - "prompts/d3/12-performance-for-large-svg.md"
---

# 09. React D3 Boundary

## 상황

D3와 React 책임이 섞여서 코드가 지저분해지거나, D3가 DOM을 통째로 장악한다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- React와 D3의 경계가 선명하다
- SVG root 소유권이 분명하다
- effect와 cleanup 지점이 드러난다

## 실패 패턴

- D3가 JSX 전체를 대신 만든다
- React state와 simulation state를 뒤섞는다
- tooltip 소유권이 불분명하다

## 다음 액션

`10-debug-scales-and-joins.md`
