---
title: "07. Context Trim"
kind: "prompt"
domain: "onboarding"
summary: "Because the code base is large, the agent reads unnecessary files and goes in the wrong direction."
tags:
  - "onboarding"
  - "context"
  - "trim"
order: 7
next: null
related: []
---

# 07. Context Trim

## situation

Because the code base is large, the agent reads unnecessary files and goes in the wrong direction.

## Prompt to copy and paste immediately

```txt
이번 단계에서는 구현하지 말고, 현재 작업에 필요한 최소 컨텍스트만 줄여라.

목표:
- 이번 작업과 직접 관련 있는 파일만 뽑기
- 읽지 않아도 되는 영역 분리
- 엔트리 포인트, 스타일 소스, 데이터 소스, 검증 경로만 남기기

답변 형식:
1. 꼭 읽어야 할 파일
2. 있으면 좋은 파일
3. 지금은 읽지 말아야 할 파일
4. 최소 작업 범위 요약

주의:
- 파일 경로 중심으로 답해라
- 설명보다 범위 축소가 우선이다
```

## Criteria for good output

- Reduces the number of files to read
- The scope of the next patch naturally narrows.
- Even the viewing paths for reviewers and browser verifiers are organized.

## failure pattern

- Read almost all files
- It only explains concepts rather than files.
- Expand the scope of correction again

## next action

`08-failure-recovery.md`
