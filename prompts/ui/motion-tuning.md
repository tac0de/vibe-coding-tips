---
title: "Motion Tuning"
kind: "prompt"
domain: "ui"
summary: "UI에 모션이 필요하지만 과장되거나 불필요한 애니메이션은 피하고 싶다."
tags:
  - "ui"
  - "motion"
  - "tuning"
next: null
related: []
---

# Motion Tuning

## 상황

UI에 모션이 필요하지만 과장되거나 불필요한 애니메이션은 피하고 싶다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 모션이 정보 구조를 돕는다
- entrance, hover, state transition 역할이 분리된다
- reduced motion이 고려된다

## 실패 패턴

- micro interaction만 잔뜩 넣는다
- 의미 없는 fade를 반복한다
- 모바일 비용을 고려하지 않는다

## 다음 액션

`browser-verifier.md`
