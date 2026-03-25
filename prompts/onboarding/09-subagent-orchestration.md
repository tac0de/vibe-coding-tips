---
title: "09. Subagent Orchestration"
kind: "prompt"
domain: "onboarding"
summary: "builder 하나로는 구조 읽기, 구현, 리뷰, 브라우저 확인이 섞여서 품질이 흔들린다."
tags:
  - "onboarding"
  - "subagent"
  - "orchestration"
order: 9
next: null
related: []
---

# 09. Subagent Orchestration

## 상황

builder 하나로는 구조 읽기, 구현, 리뷰, 브라우저 확인이 섞여서 품질이 흔들린다.

## 바로 복붙할 프롬프트

```txt
이번 작업은 역할을 분리해서 운영한다.

역할:
- builder: 작은 구현 패치
- explorer: 관련 파일과 리스크 탐색
- reviewer: 버그/회귀/복잡성 리뷰
- browser verifier: 브라우저 동작 확인

이번 목표에 맞춰 역할별 순서를 제안해라.

답변 형식:
1. 역할별 책임
2. 실행 순서
3. 각 역할에 넘길 입력문 초안
4. 병렬로 돌려도 되는 것 / 안 되는 것

주의:
- 같은 파일을 여러 역할이 동시에 수정하게 하지 말 것
- 기존 프로젝트 기준으로 답할 것
```

## 좋은 출력의 기준

- 역할이 겹치지 않는다
- reviewer와 verifier가 builder 뒤에 분리된다
- 병렬 가능/불가가 분명하다

## 실패 패턴

- 역할만 나열하고 운영 순서를 안 준다
- builder에게 모든 걸 몰아준다
- 수정 책임과 검증 책임을 섞는다

## 다음 액션

`10-regression-gate.md`
