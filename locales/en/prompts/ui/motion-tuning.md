---
title: "Motion Tuning"
kind: "prompt"
domain: "ui"
summary: "The UI needs motion, but I want to avoid exaggerated or unnecessary animations."
tags:
  - "ui"
  - "motion"
  - "tuning"
next: null
related: []
---

# Motion Tuning

## situation

The UI needs motion, but I want to avoid exaggerated or unnecessary animations.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 모션을 더 많이 넣지 말고, 의미 있는 모션만 남겨라.

목표:
- entrance 1개
- hover transition 1개
- state transition 1개

제약:
- motion은 읽기를 방해하면 안 된다
- reduced motion 대응을 고려한다
- 모바일에서 과한 연속 애니메이션 금지

답변 형식:
1. 어떤 모션을 유지할지
2. 어떤 모션을 제거할지
3. 왜 그 선택이 맞는지
4. 검증 포인트
```

## Criteria for good output

- Motion helps structure information
- The roles of entrance, hover, and state transition are separated.
- Reduced motion is considered

## failure pattern

- Just add a lot of micro interactions.
- Repeat meaningless fades
- Doesn't take mobile costs into account

## next action

`browser-verifier.md`
