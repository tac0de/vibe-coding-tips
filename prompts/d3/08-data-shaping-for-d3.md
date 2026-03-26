---
title: "08. Data Shaping For D3"
kind: "prompt"
domain: "d3"
summary: "API 응답이나 raw JSON을 D3에 맞는 배열 구조로 먼저 정리할 때 쓰는 프롬프트."
tags:
  - "d3"
  - "data"
  - "shaping"
  - "for"
order: 8
next: "prompts/d3/02-design-scales.md"
related:
  - "prompts/d3/04-structure-data-join.md"
---

# 08. Data Shaping For D3

## 상황

API 응답이나 raw JSON은 있는데, D3에 바로 쓰기엔 구조가 지저분하다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 시각화 구현 전에 데이터를 D3 친화적으로 정리해라.

목표:
- raw data를 시각화용 배열/객체로 변환
- scale에 바로 넣을 필드 분리
- annotation, tooltip, legend에 필요한 필드 분리

답변 형식:
1. 현재 데이터의 문제
2. 시각화용으로 바꾼 구조
3. scale/axis/join에 각각 어떤 필드를 쓰는지
4. 구현 전에 잠가야 할 타입

주의:
- 차트를 먼저 그리지 말 것
- 데이터 구조 결정이 먼저다
```

## 좋은 출력의 기준

- scale과 join이 바로 가능한 구조다
- tooltip/annotation 필드가 같이 정리된다
- 타입 설계 포인트가 드러난다

## 실패 패턴

- raw JSON을 그대로 쓰자고 한다
- 시각화보다 API 편의만 본다
- join 키를 명확히 안 잡는다

## 다음 액션

`09-react-d3-boundary.md`
