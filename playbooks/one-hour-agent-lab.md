---
title: "One Hour Agent Lab"
kind: "playbook"
domain: "ops"
summary: "UI 개발자 대상 1시간짜리 실전 에이전트 코딩 세션. 기존 프로젝트 적용과 D3 미니 실습을 한 번에 묶는다."
tags:
  - "workshop"
  - "ops"
  - "ui"
  - "d3"
related:
  - "playbooks/existing-project-flow.md"
  - "playbooks/d3-playbook.md"
  - "prompts/onboarding/09-subagent-orchestration.md"
  - "prompts/onboarding/11-tool-orchestration.md"
---

# One Hour Agent Lab

1시간이면 이론을 넓게 설명하는 것보다, 에이전트를 `운영`해서 작은 결과를 내는 흐름을 끝까지 보여주는 쪽이 낫다.  
이 세션의 목적은 “에이전트가 똑똑하다”를 보여주는 것이 아니라, `UI 개발자가 기존 프로젝트에 바로 투입할 수 있는 운영 루프`를 몸에 익히게 하는 것이다.

## 세션 목표

- 기존 프로젝트에서 에이전트가 어디서부터 읽고 들어가야 하는지 보여준다
- builder, explorer, reviewer, browser verifier를 분리해 실제로 돌린다
- Tailwind/UI 수정은 작은 패치로, D3는 단계형 실습으로 붙인다
- 마지막에는 “실패를 줄이는 운영 규칙”만 남긴다

## 권장 준비물

- 기존 UI 프로젝트 하나
- 로컬에서 실행 가능한 브랜치
- 브라우저 검증 가능한 환경
- 이 레포의 viewer 또는 markdown 문서

## 60분 구성

### 0-8분: 실패 패턴 먼저 잠그기

- 보여줄 파일:
  - `prompts/onboarding/02-lock-scope.md`
  - `prompts/ui/anti-dashboard-rules.md`
  - `prompts/onboarding/10-regression-gate.md`
- 핵심 메시지:
  - 범위를 안 잠그면 환각한다
  - UI는 금지사항이 없으면 양산형으로 흐른다
  - 종료 조건이 없으면 무한루프가 난다

### 8-18분: 기존 프로젝트 읽기 + 역할 분리

- 보여줄 파일:
  - `prompts/onboarding/01-read-existing-repo.md`
  - `prompts/roles/explorer.md`
  - `prompts/roles/builder.md`
  - `prompts/roles/reviewer.md`
- 실제 운영:
  - explorer: 구조와 리스크만 읽기
  - builder: 수정 파일 범위 잠근 뒤 작은 패치
  - reviewer: builder와 분리
- 여기서 강조:
  - builder가 처음부터 구조 설명과 구현을 같이 맡지 않게 한다

### 18-32분: UI 작은 패치 라이브

- 보여줄 파일:
  - `prompts/ui/create-design-brief.md`
  - `prompts/ui/tailwind-vibe-rules.md`
  - `prompts/ui/landing-first-screen.md`
  - `prompts/ui/review-ui-tone.md`
- 실제 적용:
  - first screen 하나만 잡는다
  - spacing hierarchy, typography hierarchy, anti-dashboard 규칙만 고친다
- 라이브 데모:
  - builder로 패치
  - reviewer로 tone review
  - browser verifier로 실제 인상 확인

### 32-45분: D3 미니 실습

- 보여줄 파일:
  - `prompts/d3/14-where-d3-fits-best.md`
  - `prompts/d3/02-design-scales.md`
  - `prompts/d3/04-structure-data-join.md`
  - `prompts/d3/05-add-tooltip.md`
  - `prompts/d3/09-react-d3-boundary.md`
- 실제 적용:
  - 기존 프로젝트에 작은 SVG view 하나를 붙인다고 가정
  - scale -> join -> tooltip까지만 완성
- 강조:
  - D3는 interaction-first 장면에만 쓴다
  - React와 D3 경계를 먼저 잠근다

### 45-54분: 서브에이전트와 도구 오케스트레이션

- 보여줄 파일:
  - `prompts/onboarding/09-subagent-orchestration.md`
  - `prompts/onboarding/11-tool-orchestration.md`
  - `playbooks/mcp-orchestration.md`
- 핵심 메시지:
  - explorer는 읽기
  - builder는 구현
  - reviewer는 회귀
  - browser verifier는 실제 화면
  - 도구는 많이 쓰는 것이 아니라 순서가 중요하다

### 54-60분: 정리

- 보여줄 파일:
  - `playbooks/codex-advanced.md`
  - `playbooks/harness-engineering.md`
- 마지막 메시지:
  - 에이전트를 잘 쓰는 사람은 말을 잘하는 사람이 아니라 실패하기 어렵게 환경을 설계하는 사람이다

## 라이브로 돌릴 정확한 순서

1. `prompts/onboarding/01-read-existing-repo.md`
2. `prompts/onboarding/02-lock-scope.md`
3. `prompts/roles/explorer.md`
4. `prompts/roles/builder.md`
5. `prompts/ui/create-design-brief.md`
6. `prompts/ui/tailwind-vibe-rules.md`
7. `prompts/ui/review-ui-tone.md`
8. `prompts/roles/reviewer.md`
9. `prompts/roles/browser-verifier.md`
10. `prompts/d3/14-where-d3-fits-best.md`
11. `prompts/d3/02-design-scales.md`
12. `prompts/d3/04-structure-data-join.md`
13. `prompts/d3/05-add-tooltip.md`
14. `prompts/d3/09-react-d3-boundary.md`
15. `prompts/onboarding/09-subagent-orchestration.md`
16. `prompts/onboarding/11-tool-orchestration.md`

## 서브에이전트 적극 활용 포인트

### explorer

- 기존 프로젝트 구조 읽기
- D3를 넣을 위치 찾기
- 위험 파일 식별

### builder

- UI 작은 패치
- D3 최소 구현
- cleanup 전까지의 구현 담당

### reviewer

- 회귀, 복잡성, 과도한 추상화, UI 톤 확인

### browser verifier

- 모바일/데스크톱 인상 확인
- hover, tooltip, 반응형 깨짐 확인

### d3 tutor

- D3 입문자가 scale, join, tooltip을 이해 못할 때 짧게 개념 보조

## 실습에서 보여주면 좋은 결과물

- UI first screen 개선 1개
- reviewer가 잡은 문제 2~3개
- tooltip 있는 D3 미니 view 1개
- 마지막에 regression gate를 통과하는 종료 루프

## 이 세션이 좋은 이유

- 한 시간 안에 “읽기 -> 잠그기 -> 패치 -> 리뷰 -> 검증 -> D3 미니 적용”까지 끝난다
- UI 개발자가 바로 자기 프로젝트에 가져다 붙일 수 있다
- D3도 “다 배운다”가 아니라 “에이전트와 어디서부터 붙이는지”를 체감하게 만든다
