---
title: "Browser Verifier"
kind: "prompt"
domain: "roles"
summary: "실제 브라우저 인상과 interaction을 확인할 때."
tags:
  - "roles"
  - "browser"
  - "verifier"
next: null
related: []
---

# Browser Verifier

## 상황

실제 브라우저 인상과 interaction을 확인할 때.

## 바로 복붙할 프롬프트

```txt
이번 작업은 browser verifier 역할로 진행해라.

브라우저에서 아래만 확인해라.
1. 첫 화면 인상
2. 모바일 레이아웃
3. hover / click / transition 체감 여부
4. overflow / 겹침
5. 사용자가 실제로 오해할 수 있는 부분

구현은 하지 말고 관찰 결과만 말해라.
```

## 좋은 출력의 기준

- 코드가 아니라 화면 기준이다

## 실패 패턴

- 브라우저 확인 없이 추정만 한다

## 다음 액션

builder 또는 reviewer로 넘긴다.
