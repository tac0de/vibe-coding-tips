---
title: "12. Performance For Large SVG"
kind: "prompt"
domain: "d3"
summary: "노드, 라벨, path, annotation이 많아지면서 SVG 성능과 상호작용이 무거워진다."
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

## 상황

노드, 라벨, path, annotation이 많아지면서 SVG 성능과 상호작용이 무거워진다.

## 바로 복붙할 프롬프트

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

## 좋은 출력의 기준

- 병목이 SVG 요소와 상호작용 수준으로 드러난다
- cleanup과 resize가 빠지지 않는다
- label/transition 비용을 함께 본다

## 실패 패턴

- 무조건 canvas로 바꾸자고 한다
- 병목을 특정하지 못한다
- hover 때 전체 재렌더를 문제로 안 본다

## 다음 액션

`13-interaction-qa.md`
