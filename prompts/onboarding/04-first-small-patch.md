---
title: "04. First Small Patch"
kind: "prompt"
domain: "onboarding"
summary: "이제 첫 구현을 시작한다. 반드시 작은 패치여야 한다."
tags:
  - "onboarding"
  - "first"
  - "small"
  - "patch"
order: 4
next: null
related: []
---

# 04. First Small Patch

## 상황

이제 첫 구현을 시작한다. 반드시 작은 패치여야 한다.

## 바로 복붙할 프롬프트

```txt
이번 패치는 아주 작게 간다.

목표:
- [첫 수정 1개]

제약:
- 관련 없는 파일 수정 금지
- 새 abstraction 과하게 추가 금지
- 구현 후 lint, typecheck, build까지

답변 형식:
1. 수정 파일
2. 수정 내용
3. 검증 결과
4. 남은 리스크
```

## 좋은 출력의 기준

- 작은 패치다
- 검증까지 끝난다

## 실패 패턴

- 첫 패치부터 구조를 크게 뜯는다
- 검증 없이 끝낸다

## 다음 액션

`05-review-and-browser-verify.md`
