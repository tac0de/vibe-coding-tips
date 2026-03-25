---
title: "01. Read Existing Repo"
kind: "prompt"
domain: "onboarding"
summary: "이미 있는 UI 프로젝트에 처음 들어가서 구조를 파악해야 한다."
tags:
  - "onboarding"
  - "read"
  - "existing"
  - "repo"
order: 1
next: null
related: []
---

# 01. Read Existing Repo

## 상황

이미 있는 UI 프로젝트에 처음 들어가서 구조를 파악해야 한다.

## 바로 복붙할 프롬프트

```txt
이 레포를 먼저 읽어라.
아직 구현하지 말고 아래 형식으로만 답해라.

1. 현재 구조 요약
2. 화면 진입점
3. 공통 UI 위치
4. D3 같은 렌더링 로직을 넣기 좋은 위치
5. 가장 위험한 파일 5개
6. 먼저 손대야 할 파일 3개
```

## 좋은 출력의 기준

- 구현하지 않고 구조만 읽는다
- 파일 기준으로 말한다
- 리스크 우선순위를 준다

## 실패 패턴

- 갑자기 수정부터 시작한다
- 추상적으로만 말하고 파일을 못 짚는다

## 다음 액션

`02-lock-scope.md`
