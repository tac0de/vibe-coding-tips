---
title: "10. Debug Scales And Joins"
kind: "prompt"
domain: "d3"
summary: "D3 looks strange because the axis is twisted, data is rendered redundant, or joins are twisted."
tags:
  - "d3"
  - "debug"
  - "scales"
  - "and"
  - "joins"
order: 10
next: null
related: []
---

# 10. Debug Scales And Joins

## situation

D3 looks strange because the axis is twisted, data is rendered redundant, or joins are twisted.

## Prompt to copy and paste immediately

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

## Criteria for good output

- View scale and join separately
- Key function and domain issues are not left out.
- Leads to a minimal fix patch

## failure pattern

- Just blame it on transition or CSS.
- I don't see the join key
- Misses resize and cleanup

## next action

`11-annotation-and-storytelling.md`
