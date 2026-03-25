---
title: "Explorer"
kind: "prompt"
domain: "roles"
summary: "수정 전에 구조와 리스크를 읽고 싶을 때."
tags:
  - "roles"
  - "explorer"
next: null
related: []
---

# Explorer

## 상황

수정 전에 구조와 리스크를 읽고 싶을 때.

## 바로 복붙할 프롬프트

```txt
이번 작업은 explorer 역할로 진행해라.

수정하지 말고 아래만 답해라.
1. 현재 구조 요약
2. 가장 위험한 지점 5개
3. 먼저 손대야 할 파일 3개
4. 지금 건드리면 안 되는 부분
5. 가장 작은 첫 패치 제안
```

## 좋은 출력의 기준

- 구조를 읽는다
- 리스크 우선순위를 준다

## 실패 패턴

- 구현부터 시작한다

## 다음 액션

첫 패치를 builder로 넘긴다.
