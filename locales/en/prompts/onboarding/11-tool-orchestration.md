---
title: "11. Tool Orchestration"
kind: "prompt"
domain: "onboarding"
summary: "We organize the order in which codex, reviewer, browser verifier, and MCP tools should be used to reduce costs and failures."
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

## situation

There are more agents and tools, but there is no sense of what to call and when, and the calls are wasted.

## Prompt to copy and paste immediately

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

## Criteria for good output

- Tool calling order is clear
- The tasks that can be paralleled and the tasks that can be prevented are separated.
- The timing of document inquiry, implementation, review, and browser verification is clear.

## failure pattern

- Call all tools at once
- Mix the reviewer with the same timing as the builder
- Call browser verifier first without UI

## next action

When moving on to the actual task, add `10-regression-gate.md` to lock the termination condition.
