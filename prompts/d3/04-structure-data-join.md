---
title: "04. Structure Data Join"
kind: "prompt"
domain: "d3"
summary: "데이터 변경이 enter, update, exit에 안정적으로 연결되게 만들 때 쓰는 join 프롬프트."
tags:
  - "d3"
  - "structure"
  - "data"
  - "join"
order: 4
next: "prompts/d3/05-add-tooltip.md"
related:
  - "prompts/d3/10-debug-scales-and-joins.md"
---

# 04. Structure Data Join

## 상황

데이터가 바뀔 때 시각 요소도 안정적으로 바뀌게 하고 싶다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 data join만 정리해라.

대상:
- node
- link
- overlay
- annotation

해야 할 일:
- enter/update/exit 구조 만들기
- 어떤 selection이 어느 데이터와 연결되는지 명확히 하기
- hover 때 전체 초기화하지 않게 설계
```

## 좋은 출력의 기준

- update만으로 상태 변화가 가능하다

## 실패 패턴

- SVG 전체를 지운다

## 다음 액션

`05-add-tooltip.md`
