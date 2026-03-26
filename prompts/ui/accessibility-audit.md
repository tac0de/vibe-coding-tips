---
title: "Accessibility Audit"
kind: "prompt"
domain: "ui"
summary: "semantic, focus, keyboard, contrast 리스크를 먼저 찾을 때 쓰는 접근성 점검 프롬프트."
tags:
  - "ui"
  - "accessibility"
  - "audit"
next: null
related: []
---

# Accessibility Audit

## 상황

기존 UI를 손대기 전에 접근성 리스크를 빠르게 찾고 싶다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 화면 단위로 위험이 드러난다
- 작은 수정부터 제안한다
- keyboard와 focus가 빠지지 않는다

## 실패 패턴

- 추상적인 접근성 원칙만 말한다
- contrast만 보고 끝낸다
- reduced motion과 focus를 빼먹는다

## 다음 액션

`review-ui-tone.md`
