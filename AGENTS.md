---
title: "AGENTS.md"
kind: "guide"
domain: "ops"
summary: "- Existing-project onboarding prompts"
tags:
  - "ops"
  - "AGENTS"
next: null
related: []
---

# AGENTS.md

## What This Repo Is For

- Existing-project onboarding prompts
- UI/Tailwind prompt collection
- D3.js prompt collection
- Harness engineering playbooks

## Folder Rules

- `prompts/` is for copy-paste-ready prompts only
- `playbooks/` is for operating guidance and sequencing
- `sources/` is for primary references and why they matter
- `templates/` is for reusable markdown artifacts

## Writing Rules

- 본문은 한국어 중심으로 쓴다
- 파일명과 코드 식별자만 영어로 유지한다
- 한 파일은 한 상황만 다룬다
- 설명보다 실행 문장을 우선한다
- placeholder는 최소화하고, 있으면 어디를 바꿔야 하는지 분명해야 한다

## Prompt Rules

모든 `prompts/` 파일은 아래 5개 섹션을 반드시 포함한다.

1. `상황`
2. `바로 복붙할 프롬프트`
3. `좋은 출력의 기준`
4. `실패 패턴`
5. `다음 액션`

## Source Rules

- OpenAI 관련 내용은 공식 문서만 근거로 쓴다
- D3 관련 내용은 공식 문서 우선으로 쓴다
- 정치 데이터/기사 예시는 출처와 쓰임새를 함께 적는다
- `sources/` 문서는 링크 모음이 아니라 `왜 지금 보는지`와 `연결 문서`를 포함해야 한다

## Do Not

- 장문 강의 원고처럼 쓰지 않는다
- 범용 조언만 나열하지 않는다
- UI prompt를 단순 class 나열법으로 축소하지 않는다
- D3 prompt에서 React와 D3의 책임을 섞지 않는다
- 공식 출처 없이 사실처럼 단정하지 않는다

## Review Standard

- 기존 프로젝트에 바로 붙여 넣을 수 있어야 한다
- 작은 패치와 검증 루프를 우선해야 한다
- 양산형 UI 회피 규칙이 필요한 곳에 포함되어야 한다
- D3 prompt는 최소한 scale, axis/legend, join, tooltip, advanced interaction 맥락과 이어져야 한다
