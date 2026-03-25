---
title: "Existing Project Flow"
kind: "playbook"
domain: "onboarding"
summary: "기존 프로젝트에 Codex를 붙일 때의 권장 흐름은 아래 10단계다."
tags:
  - "onboarding"
  - "existing"
  - "project"
  - "flow"
next: null
related: []
---

# Existing Project Flow

기존 프로젝트에 Codex를 붙일 때의 권장 흐름은 아래 10단계다.

1. 기존 레포 읽기
2. 수정 범위 잠그기
3. AGENTS.md 초안 만들기
4. dependency freeze
5. context trim
6. 첫 작은 패치
7. reviewer + browser verifier
8. failure recovery
9. subagent orchestration
10. regression gate

## 왜 이 흐름이 중요한가

- 처음부터 크게 뜯지 않게 막아준다
- 구조를 읽고 시작하게 만든다
- 무한루프를 줄인다

## 프롬프트 순서

- `prompts/onboarding/01-read-existing-repo.md`
- `prompts/onboarding/02-lock-scope.md`
- `prompts/onboarding/03-write-agents-md.md`
- `prompts/onboarding/06-dependency-freeze.md`
- `prompts/onboarding/07-context-trim.md`
- `prompts/onboarding/04-first-small-patch.md`
- `prompts/onboarding/05-review-and-browser-verify.md`
- `prompts/onboarding/08-failure-recovery.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/onboarding/10-regression-gate.md`

## 실무 팁

- 첫 패치는 눈에 띄는 큰 개선보다 작은 구조 확인에 쓴다
- reviewer는 builder와 분리하고, browser verifier는 마지막에 붙인다
- 실패했을 때는 같은 구조를 고치기보다 실패 원인과 폐기 대상을 먼저 적는다
