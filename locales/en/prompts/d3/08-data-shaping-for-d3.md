---
title: "08. Data Shaping For D3"
kind: "prompt"
domain: "d3"
summary: "There are API responses and raw JSON, but the structure is messy to write directly to D3."
tags:
  - "d3"
  - "data"
  - "shaping"
  - "for"
order: 8
next: null
related: []
---

# 08. Data Shaping For D3

## situation

There are API responses and raw JSON, but the structure is messy to write directly to D3.

## Prompt to copy and paste immediately

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

## Criteria for good output

- It is a structure that allows scale and join immediately.
- tooltip/annotation fields are organized together
- Type design points are revealed

## failure pattern

- They say to use raw JSON as is.
- I only look at API convenience rather than visualization
- The join key is not clearly defined.

## next action

`09-react-d3-boundary.md`
