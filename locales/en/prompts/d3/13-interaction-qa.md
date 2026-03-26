---
title: "13. Interaction QA"
kind: "prompt"
domain: "d3"
summary: "A final check is needed to ensure that D3 interactions such as tooltip, zoom, brush, and drag are actually read."
tags:
  - "d3"
  - "interaction"
  - "qa"
order: 13
next: null
related: []
---

# 13. Interaction QA

## situation

A final check is needed to ensure that D3 interactions such as tooltip, zoom, brush, and drag are actually read.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 D3 interaction QA만 진행해라.

점검 대상:
- tooltip
- hover highlight
- zoom / brush / drag 중 현재 구현된 것
- keyboard 또는 touch 대응
- mobile readability

답변 형식:
1. 반드시 확인할 사용자 시나리오
2. 인터랙션별 실패 지점
3. 모바일에서 더 위험한 부분
4. release 전에 고칠 우선순위

주의:
- 구현 설명보다 실제 체험 기준으로 정리해라
- 브라우저 확인 포인트를 포함해라
```

## Criteria for good output

- Check with user scenario
- Includes mobile risks
- See both tooltips and advanced interactions

## failure pattern

- I only see the desktop
- Just look at the tooltip and finish
- Look only at whether the function works rather than the reading experience

## next action

`browser-verifier.md`
