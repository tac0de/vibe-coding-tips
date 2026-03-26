---
title: "07. Cleanup Resize Mobile"
kind: "prompt"
domain: "d3"
summary: "구현 뒤 resize, mobile, cleanup을 정리할 때 쓰는 마무리 프롬프트."
tags:
  - "d3"
  - "cleanup"
  - "resize"
  - "mobile"
order: 7
next: "prompts/d3/13-interaction-qa.md"
related:
  - "prompts/d3/09-react-d3-boundary.md"
---

# 07. Cleanup Resize Mobile

## 상황

D3 구현은 됐지만 유지보수와 반응형 안정성이 걱정된다.

## 바로 복붙할 프롬프트

```txt
이 D3 UI를 아래 관점으로 점검해라.

1. cleanup 누락 여부
2. resize 대응
3. 모바일에서 잘림 / overflow
4. tooltip 또는 annotation 겹침
5. hover / zoom / brush 충돌

문제가 있으면 최소 수정으로 고치고, 마지막에 재발 방지 포인트를 3줄로 적어라.
```

## 좋은 출력의 기준

- 구현보다 안정성 관점이 우선이다

## 실패 패턴

- 기능만 더 붙인다

## 다음 액션

reviewer로 다시 본다.
