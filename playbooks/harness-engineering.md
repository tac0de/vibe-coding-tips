---
title: "Harness Engineering For UI And D3"
kind: "playbook"
domain: "ops"
summary: "모델보다 환경 설계가 더 중요해지는 구간이 있다."
tags:
  - "ops"
  - "harness"
  - "engineering"
next: null
related: []
---

# Harness Engineering For UI And D3

모델보다 환경 설계가 더 중요해지는 구간이 있다.  
UI/UX와 D3 작업은 특히 그렇다.

## 왜 중요한가

- 디자인 작업은 추상 요구 때문에 환각이 많이 난다
- D3 작업은 단계가 섞이면 무너진다
- 브라우저에서만 드러나는 문제가 많다

## 공통 운영 원칙

- AGENTS.md
- 작은 패치
- reviewer 분리
- browser verifier
- 검증 루프
- 실패 시 더 크게 말하지 않고 더 작게 자르기

## Tailwind / UI 작업 적용

- 디자인 브리프 먼저
- 금지할 UI 문법 명시
- 모바일 기준 고정
- design system extract로 기존 토큰 읽기
- anti-dashboard rules로 카드형 문법 차단
- accessibility audit를 reviewer 앞단에 둔다

## D3 작업 적용

- scale → axis → join → tooltip → advanced interaction → cleanup 순서 고정
- data shaping을 구현 전에 잠근다
- React와 D3의 책임을 먼저 나눈다
- interaction QA와 performance 점검을 release 직전에 둔다

## 기존 프로젝트 온보딩 후 첫 패치 운영

1. 기존 레포 읽기
2. scope lock
3. AGENTS.md 초안
4. dependency freeze
5. context trim
6. 첫 작은 patch
7. reviewer
8. browser verifier
9. failure recovery
10. regression gate

## 관련 자산

- `prompts/onboarding/01-read-existing-repo.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/ui/anti-dashboard-rules.md`
- `prompts/d3/09-react-d3-boundary.md`
- `templates/AGENTS.md`
- `templates/task-brief.md`
- `templates/verification-checklist.md`
