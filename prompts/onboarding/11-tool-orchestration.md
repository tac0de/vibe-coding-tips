---
title: "11. Tool Orchestration"
kind: "prompt"
domain: "onboarding"
summary: "Codex, reviewer, browser verifier, MCP 도구를 어떤 순서로 묶어 써야 비용과 실패를 줄이는지 정리한다."
tags:
  - "onboarding"
  - "orchestration"
  - "mcp"
  - "tools"
order: 11
next: null
related:
  - "prompts/onboarding/09-subagent-orchestration.md"
  - "prompts/onboarding/10-regression-gate.md"
  - "playbooks/mcp-orchestration.md"
---

# 11. Tool Orchestration

## 상황

에이전트와 도구가 많아졌는데, 무엇을 언제 호출해야 하는지 감이 없고 호출이 낭비된다.

## 바로 복붙할 프롬프트

```txt
이 작업의 도구 호출 계획부터 짜라. 아직 구현하지 말고 순서만 정리해라.

사용 가능한 역할/도구:
- builder
- explorer
- reviewer
- browser verifier
- Playwright MCP
- Context7 또는 공식 문서 조회

출력 형식:
1. 지금 작업에서 꼭 필요한 도구만 고르기
2. 호출 순서
3. 병렬 가능한 단계
4. 절대 먼저 호출하면 안 되는 단계
5. 비용과 실패를 줄이기 위한 규칙 5개

규칙:
- 문서 조회는 구현 전에 필요한 부분만
- browser verifier는 UI가 보일 때만
- reviewer는 구현 후에 분리 실행
- 같은 파일을 여러 agent가 동시에 수정하지 말 것
- 작은 패치 단위로 끊고 각 단계마다 종료 조건을 명확히 둘 것
```

## 좋은 출력의 기준

- 도구 호출 순서가 명확하다
- 병렬 가능한 일과 막는 일이 분리된다
- 문서 조회, 구현, 리뷰, 브라우저 검증의 타이밍이 선명하다

## 실패 패턴

- 모든 도구를 한 번에 호출한다
- reviewer를 builder와 같은 타이밍에 섞는다
- browser verifier를 UI 없이 먼저 호출한다

## 다음 액션

실제 작업으로 넘어갈 때는 `10-regression-gate.md`를 붙여 종료 조건까지 잠근다.
