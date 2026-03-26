---
title: "Accessibility Audit"
kind: "prompt"
domain: "ui"
summary: "I want to quickly find accessibility risks before tinkering with the existing UI."
tags:
  - "ui"
  - "accessibility"
  - "audit"
next: null
related: []
---

# Accessibility Audit

## situation

I want to quickly find accessibility risks before tinkering with the existing UI.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 기능 추가가 아니라 접근성 리스크만 점검해라.

범위:
- keyboard flow
- focus visibility
- contrast
- aria naming
- reduced motion

답변 형식:
1. 우선순위가 높은 접근성 문제
2. 어떤 화면/컴포넌트에서 보이는지
3. 작은 수정으로 해결 가능한 항목
4. 브라우저에서 직접 확인할 시나리오

주의:
- WCAG 이론 설명보다 현재 UI 리스크를 중심으로 답해라
- 수정 코드까지 쓰지 말고 진단부터 해라
```

## Criteria for good output

- Risks are revealed on a screen-by-screen basis
- Suggest small corrections first
- Keyboard and focus do not fall out

## failure pattern

- It only talks about abstract accessibility principles
- Just look at the contrast and finish
- Omit reduced motion and focus

## next action

`review-ui-tone.md`
