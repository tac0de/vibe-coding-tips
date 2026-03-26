---
title: "06. Add Advanced Interaction"
kind: "prompt"
domain: "d3"
summary: "zoom, brush, drag 같은 고급 인터랙션을 붙일 때 쓰는 프롬프트."
tags:
  - "d3"
  - "add"
  - "advanced"
  - "interaction"
order: 6
next: "prompts/d3/07-cleanup-resize-mobile.md"
related:
  - "prompts/d3/13-interaction-qa.md"
---

# 06. Add Advanced Interaction

## 상황

static chart처럼 보이지 않게, 탐색 가치를 더하고 싶다.

## 바로 복붙할 프롬프트

```txt
현재 시각화에 advanced interaction 하나만 추가해라.

후보:
- zoom
- brush
- drag
- scrollytelling step
- linked highlight

먼저 가장 맞는 후보 하나를 고르고,
왜 그게 맞는지 3줄 설명한 뒤 구현해라.
```

## 좋은 출력의 기준

- interaction이 실제 탐색 가치를 만든다

## 실패 패턴

- 있어 보이기만 한다

## 다음 액션

`07-cleanup-resize-mobile.md`
