---
title: "Codex Advanced"
kind: "playbook"
domain: "ops"
summary: "이 문서는 환각, 무한루프, 실패 패턴을 줄이기 위한 운영 원칙만 정리한다."
tags:
  - "ops"
  - "codex"
  - "advanced"
next: null
related: []
---

# Codex Advanced

이 문서는 환각, 무한루프, 실패 패턴을 줄이기 위한 운영 원칙만 정리한다.

## 핵심

- 모든 걸 자세히 쓰는 게 아니라, 실패가 많이 나는 축만 잠근다
- 목표 1개, 금지사항 3~5개, 수정 범위, 검증 루프는 꼭 준다
- builder와 reviewer는 분리한다
- 실패한 구조를 계속 고치지 말고, 필요하면 버리고 다시 설계한다
- 디자인 작업은 reference보다 금지사항이 더 중요할 때가 많다

## 실무에서 항상 같이 주면 좋은 것

- 목표
- 제약
- 금지사항
- 수정 범위
- 검증 명령

## MCP와 오케스트레이션 팁

- explorer는 구조 파악 전용으로 짧게
- builder는 패치 단위를 작게
- reviewer는 구현 후 분리
- browser verifier는 UI가 생긴 뒤 마지막에
- 공식 문서 조회는 필요한 범위만

## 관련 프롬프트

- `prompts/roles/*`
- `prompts/onboarding/*`
- `prompts/ui/review-ui-tone.md`
- `prompts/onboarding/11-tool-orchestration.md`
- `playbooks/mcp-orchestration.md`
