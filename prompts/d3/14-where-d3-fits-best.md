---
title: "14. Where D3 Fits Best"
kind: "prompt"
domain: "d3"
summary: "D3를 어디에 써야 하는지, Chart.js나 일반 컴포넌트보다 어떤 장면에서 강한지 정리하는 프롬프트."
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

## 상황

D3를 막연히 쓰려 하거나, 반대로 Chart.js로도 충분한 장면에 D3를 과하게 붙이려 한다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- D3 도입 여부를 interaction 기준으로 판단한다
- scale, join, tooltip 같은 필수 개념이 장면과 연결된다
- 최소 범위를 먼저 잠근다

## 실패 패턴

- D3를 기본값처럼 추천한다
- 시각화 목적보다 구현 취향을 앞세운다
- interaction이 없는 정적 차트에도 D3를 강요한다

## 다음 액션

정말 D3가 필요하면 `02-design-scales.md`부터 다시 순서대로 진행한다.
