---
title: "12. Performance For Large SVG"
kind: "prompt"
domain: "d3"
summary: "As the number of nodes, labels, paths, and annotations increases, SVG performance and interaction become heavier."
tags:
  - "d3"
  - "performance"
  - "for"
  - "large"
  - "svg"
order: 12
next: null
related: []
---

# 12. Performance For Large SVG

## situation

As the number of nodes, labels, paths, and annotations increases, SVG performance and interaction become heavier.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 D3 성능만 점검해라.

확인할 것:
- resize 비용
- cleanup 누락
- label density
- transition 비용
- hover/update 범위
- zoom/brush/drag 비용

답변 형식:
1. 성능 병목 3개
2. 가장 먼저 줄일 비용
3. 구현 변경 없이 할 수 있는 완화책
4. 코드 수정이 필요한 완화책

주의:
- 성능 얘기를 추상적으로 하지 말고 SVG/interaction 기준으로 말해라
```

## Criteria for good output

- The bottleneck is revealed at the level of interaction with SVG elements
- Cleanup and resize are essential
- View label/transition costs together

## failure pattern

- They say we should definitely change it to canvas.
- Unable to identify bottleneck
- I don't see the entire re-render when hovering as a problem.

## next action

`13-interaction-qa.md`
