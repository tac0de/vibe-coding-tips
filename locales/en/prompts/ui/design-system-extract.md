---
title: "Design System Extract"
kind: "prompt"
domain: "ui"
summary: "I want to first read the design system traces of existing projects and work on top of them."
tags:
  - "ui"
  - "design"
  - "system"
  - "extract"
next: null
related: []
---

# Design System Extract

## situation

I want to first read the design system traces of existing projects and work on top of them.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 새 UI를 만들지 말고, 현재 프로젝트의 디자인 시스템 흔적을 추출해라.

찾을 것:
- spacing rhythm
- radius scale
- shadow depth
- typography hierarchy
- color usage
- button / card / input 공통 규칙

답변 형식:
1. 반복되는 토큰 또는 패턴
2. 파일 기준으로 어디에 정의되어 있는지
3. 지금 따라야 할 규칙
4. 지금 깨고 있는 부분

주의:
- 클래스를 나열하지 말고 패턴으로 요약해라
- 없는 디자인 시스템을 있다고 꾸며내지 말라
```

## Criteria for good output

- The visual rules of the current project are organized.
- Spacing, type, and depth are taken together
- A standard will be created to match the new UI to the existing tone.

## failure pattern

- List only tailwind classes
- Forcibly generalizes values ​​that look like tokens
- It only refers to an ideal system rather than the current structure.

## next action

`create-design-brief.md`
