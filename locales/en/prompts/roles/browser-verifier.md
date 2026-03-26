---
title: "Browser Verifier"
kind: "prompt"
domain: "roles"
summary: "When checking actual browser impressions and interactions."
tags:
  - "roles"
  - "browser"
  - "verifier"
next: null
related: []
---

# Browser Verifier

## situation

When checking actual browser impressions and interactions.

## Prompt to copy and paste immediately

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

## Criteria for good output

- It's based on the screen, not the code.

## failure pattern

- Just making an estimate without checking the browser

## next action

Pass it to builder or reviewer.
