---
title: "Design System Extract"
kind: "prompt"
domain: "ui"
summary: "기존 프로젝트의 디자인 시스템 흔적을 먼저 읽고 그 위에서 작업하고 싶다."
tags:
  - "ui"
  - "design"
  - "system"
  - "extract"
next: null
related: []
---

# Design System Extract

## 상황

기존 프로젝트의 디자인 시스템 흔적을 먼저 읽고 그 위에서 작업하고 싶다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 현재 프로젝트의 시각 규칙이 정리된다
- spacing, type, depth가 함께 잡힌다
- 새 UI를 기존 톤에 맞출 기준이 생긴다

## 실패 패턴

- tailwind class만 나열한다
- 토큰처럼 보이는 값을 억지로 일반화한다
- 현재 구조보다 이상적인 시스템만 말한다

## 다음 액션

`create-design-brief.md`
