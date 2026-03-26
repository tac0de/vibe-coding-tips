---
title: "10. Debug Scales And Joins"
kind: "prompt"
domain: "d3"
summary: "축, scale, join이 꼬여 화면이 이상할 때 원인을 좁히는 디버그 프롬프트."
tags:
  - "d3"
  - "debug"
  - "scales"
  - "and"
  - "joins"
order: 10
next: "prompts/d3/13-interaction-qa.md"
related:
  - "prompts/d3/02-design-scales.md"
  - "prompts/d3/04-structure-data-join.md"
---

# 10. Debug Scales And Joins

## 상황

축이 틀어지거나, 데이터가 중복 렌더되거나, join이 꼬여서 D3가 이상하게 보인다.

## 바로 복붙할 프롬프트

```txt
현재 D3 버그를 scale과 join 관점에서 먼저 진단해라.

확인할 것:
- domain/range 설정
- key function 유무
- enter/update/exit 흐름
- axis 또는 legend scale 일관성
- resize 후 재계산 여부

답변 형식:
1. scale 관련 의심 지점
2. join 관련 의심 지점
3. 가장 가능성 높은 원인
4. 최소 수정 패치

주의:
- 시각 버그를 한 번에 다 고치려 하지 말고, 원인 1개부터 잡아라
```

## 좋은 출력의 기준

- scale과 join을 분리해서 본다
- key function과 domain 문제가 빠지지 않는다
- 최소 수정 패치로 이어진다

## 실패 패턴

- transition이나 CSS 탓으로만 돌린다
- join 키를 안 본다
- resize와 cleanup을 놓친다

## 다음 액션

`11-annotation-and-storytelling.md`
