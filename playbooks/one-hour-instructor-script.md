---
title: "One Hour Instructor Script"
kind: "playbook"
domain: "ops"
summary: "강사가 1시간 실습 세션을 그대로 진행할 수 있게 만든 압축 스크립트."
tags:
  - "workshop"
  - "script"
  - "ops"
related:
  - "playbooks/one-hour-agent-lab.md"
  - "prompts/onboarding/12-run-one-hour-agent-lab.md"
---

# One Hour Instructor Script

## 0-5분

- 말할 것:
  - 오늘은 프롬프트를 잘 쓰는 법이 아니라, 에이전트를 실패하기 어렵게 운영하는 법만 본다.
  - 기존 프로젝트에 들어갈 때는 무조건 `읽기 -> 범위 잠금 -> 작은 패치 -> 리뷰 -> 브라우저 검증` 순서로 간다.
- 열 파일:
  - `prompts/onboarding/02-lock-scope.md`
  - `prompts/ui/anti-dashboard-rules.md`

## 5-15분

- 말할 것:
  - explorer는 읽기 전용이다.
  - builder를 바로 돌리면 환각과 과수정이 나온다.
- 열 파일:
  - `prompts/onboarding/01-read-existing-repo.md`
  - `prompts/roles/explorer.md`
  - `prompts/roles/builder.md`
- 보여줄 것:
  - explorer에게 구조와 위험 파일만 뽑게 하기

## 15-30분

- 말할 것:
  - UI는 예쁘게가 아니라 장면을 먼저 잠근다.
  - Tailwind는 클래스 나열이 아니라 위계를 설계하는 도구다.
- 열 파일:
  - `prompts/ui/create-design-brief.md`
  - `prompts/ui/tailwind-vibe-rules.md`
  - `prompts/ui/landing-first-screen.md`
- 보여줄 것:
  - builder로 first screen 또는 정보 위계 패치 1개

## 30-40분

- 말할 것:
  - D3는 차트 라이브러리가 아니라 interaction 시스템 제어 도구다.
  - 오늘은 scale, join, tooltip까지만 간다.
- 열 파일:
  - `prompts/d3/14-where-d3-fits-best.md`
  - `prompts/d3/02-design-scales.md`
  - `prompts/d3/04-structure-data-join.md`
  - `prompts/d3/05-add-tooltip.md`
- 보여줄 것:
  - 작은 SVG view 또는 시각화 조각에 tooltip 추가

## 40-52분

- 말할 것:
  - builder가 끝난 뒤엔 reviewer와 browser verifier를 분리해야 한다.
  - 여기서 품질 차이가 난다.
- 열 파일:
  - `prompts/roles/reviewer.md`
  - `prompts/roles/browser-verifier.md`
  - `prompts/onboarding/05-review-and-browser-verify.md`
- 보여줄 것:
  - reviewer가 잡은 문제 2~3개
  - 실제 브라우저에서 모바일/첫인상 확인

## 52-60분

- 말할 것:
  - 서브에이전트와 MCP는 많이 쓰는 게 아니라 순서가 중요하다.
  - 문서 조회, 구현, 리뷰, 브라우저 검증을 섞지 말아야 한다.
- 열 파일:
  - `prompts/onboarding/09-subagent-orchestration.md`
  - `prompts/onboarding/11-tool-orchestration.md`
  - `playbooks/mcp-orchestration.md`
- 마무리 멘트:
  - 에이전트를 잘 쓰는 사람은 말을 잘하는 사람이 아니라, 실패하기 어렵게 환경을 설계하는 사람이다.
