---
title: "01. Choose D3 vs Chart Library"
kind: "prompt"
domain: "d3"
summary: "이 작업이 D3까지 필요한지 먼저 판단할 때 쓰는 시작 프롬프트."
tags:
  - "d3"
  - "choose"
  - "vs"
  - "chart"
order: 1
next: "prompts/d3/02-design-scales.md"
related:
  - "prompts/d3/14-where-d3-fits-best.md"
---

# 01. Choose D3 vs Chart Library

## 상황

이 작업에 D3가 필요한지 먼저 판단하고 싶다.

## 바로 복붙할 프롬프트

```txt
이 시각화에 D3가 필요한지 판단해라.

아래 형식으로만 답해라.
1. D3가 필요한 이유 3개 또는 필요 없는 이유 3개
2. Chart.js / Recharts로 충분한지
3. interaction 요구사항과 맞는지
4. 최종 추천
```

## 좋은 출력의 기준

- “멋있어서”가 아니라 interaction 기준으로 판단한다

## 실패 패턴

- 무조건 D3를 추천한다

## 다음 액션

D3가 맞다면 `02-design-scales.md`.
