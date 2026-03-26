---
title: "MCP Orchestration"
kind: "playbook"
domain: "ops"
summary: "도구가 많아질수록 중요한 것은 많이 쓰는 것이 아니라 호출 순서와 책임 분리다."
tags:
  - "ops"
  - "mcp"
  - "orchestration"
related:
  - "prompts/onboarding/11-tool-orchestration.md"
  - "sources/mcp.md"
  - "sources/openai.md"
---

# MCP Orchestration

도구가 많아질수록 중요한 것은 “무엇을 쓸까”보다 “언제 누구를 먼저 쓸까”다.

## 기본 원칙

- 탐색 도구는 구현 전에 짧게
- 구현 도구는 범위가 잠긴 뒤에만
- reviewer는 구현과 분리
- browser verifier는 화면이 생긴 뒤 마지막에
- 문서 조회는 필요한 섹션만

## UI / Tailwind 작업에서의 추천 순서

1. explorer로 구조 읽기
2. design-system extract 또는 brief prompt로 기준 고정
3. builder로 작은 패치
4. reviewer로 회귀와 톤 검토
5. browser verifier로 실제 breakage 확인

## D3 작업에서의 추천 순서

1. D3 필요 여부 판단
2. 공식 문서나 Context7로 필요한 모듈만 확인
3. data shaping
4. scale -> axis -> join -> tooltip -> advanced interaction
5. performance / interaction QA
6. browser verifier

## 자주 쓰는 MCP / 도구와 용도

- Playwright MCP: 실제 화면 검증, breakpoint, hover/click 흐름 확인
- Context7: 최신 라이브러리 API 문맥 주입
- GitHub / registry 계열 MCP: 이슈, PR, 저장소 문맥 확인
- 일반 브라우징: 최신 문서나 기사, 공식 출처 확인

## 비효율 패턴

- 구현 전에 브라우저 검증부터 건다
- reviewer 없이 builder만 돌린다
- D3 단계가 섞인 채로 바로 interaction부터 붙인다
- 필요한 API 범위보다 넓게 문서를 읽는다

## 같이 보면 좋은 파일

- `prompts/onboarding/11-tool-orchestration.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/d3/14-where-d3-fits-best.md`
