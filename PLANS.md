---
title: "PLANS.md"
kind: "guide"
domain: "ops"
summary: "이 레포는 UI 개발자가 기존 프로젝트에 Codex/에이전트를 바로 투입할 수 있게 만드는 `프롬프트 북`이다."
tags:
  - "ops"
  - "PLANS"
next: null
related: []
---

# PLANS.md

## 목적

이 레포는 UI 개발자가 기존 프로젝트에 Codex/에이전트를 바로 투입할 수 있게 만드는 `프롬프트 북`이다.  
주된 범위는 아래 3개다.

- UI/UX 작업
- Tailwind 기반 스타일링/리뷰
- D3.js 입문 + 실무 연결

## 폴더 책임

- `prompts/`: 그대로 복붙하는 실행 자산
- `playbooks/`: 왜 이 흐름이 필요한지 설명하는 운영 해설
- `sources/`: 공식 근거와 참고 링크
- `templates/`: AGENTS.md, brief, checklist 같은 재사용 문서

## 새 프롬프트 추가 기준

새 파일은 아래 조건을 모두 만족할 때만 추가한다.

- 기존 프로젝트 실무에서 자주 부딪히는 상황인가
- 한 파일이 한 상황만 다루는가
- 복붙 후 바로 실행 가능한가
- UI/Tailwind/D3/harness 중 하나에 명확히 속하는가
- 실패 패턴과 다음 액션이 명시되어 있는가

## Acceptance Criteria

- `README.md`만 읽어도 온보딩 흐름이 바로 보여야 한다
- 모든 `prompts/` 파일은 5개 섹션 형식을 따라야 한다
- D3 프롬프트 흐름은 `choose -> scales -> axis/legend -> join -> tooltip -> advanced interaction -> cleanup -> data shaping -> React boundary -> debug -> annotation -> performance -> QA`를 따라야 한다
- UI 프롬프트는 양산형 UI 회피 규칙을 포함해야 한다
- 공식 문서가 있는 영역은 공식 문서를 우선 출처로 삼아야 한다

## 우선순위 Backlog

1. 기존 프로젝트 온보딩 프롬프트 확장
2. UI/Tailwind anti-dashboard 프롬프트 확장
3. D3 debugging/performance/annotation 프롬프트 확장
4. 하네스 엔지니어링 운영 문서 강화
5. 프롬프트 템플릿과 리뷰 템플릿 정교화

## 유지 원칙

- 설명보다 실행 가능성이 우선이다
- 장문 강의체보다 짧은 복붙 문장이 우선이다
- 새 파일을 늘리기보다 기존 흐름을 더 정확히 하는 쪽을 먼저 택한다
- 환각이 많이 나는 축은 더 세밀하게, 반복적인 축은 더 짧게 쓴다
