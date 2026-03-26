---
title: "12. Run One Hour Agent Lab"
kind: "prompt"
domain: "onboarding"
summary: "1시간짜리 실습 세션을 실제 프로젝트 기준으로 운영할 때, 서브에이전트와 문서 흐름을 한 번에 묶는 프롬프트."
tags:
  - "onboarding"
  - "workshop"
  - "subagents"
  - "ops"
order: 12
next: null
related:
  - "playbooks/one-hour-agent-lab.md"
  - "prompts/onboarding/11-tool-orchestration.md"
  - "prompts/onboarding/09-subagent-orchestration.md"
---

# 12. Run One Hour Agent Lab

## 상황

기존 UI 프로젝트를 예제로 1시간짜리 에이전트 코딩 실습을 바로 운영해야 한다.

## 바로 복붙할 프롬프트

```txt
이번 작업은 1시간짜리 실습 세션 운영이다. 목표는 기존 UI 프로젝트에 에이전트를 투입해 작은 UI 패치와 D3 미니 기능까지 보여주는 것이다.

역할을 분리해서 진행해라.

역할:
- explorer: 기존 프로젝트 구조와 리스크 파악
- builder: 첫 작은 UI 패치와 D3 미니 구현
- reviewer: bug, regression, complexity, UI tone 리뷰
- browser verifier: 실제 브라우저 인상과 interaction 확인
- d3 tutor: scale, join, tooltip 개념 보조

출력 형식:
1. 60분 운영 순서
2. 각 10~15분 구간에서 열어야 할 프롬프트 파일
3. 각 역할을 언제 호출할지
4. live demo로 보여줄 것과 미리 읽힐 것을 분리
5. 마지막 종료 조건

조건:
- 기존 프로젝트 기준으로 설명할 것
- UI 패치는 first screen 또는 정보 위계 수정 정도의 작은 범위만
- D3는 scale -> join -> tooltip까지만
- 마지막에 reviewer와 browser verifier를 반드시 포함
```

## 좋은 출력의 기준

- 1시간 안에 끝나는 현실적인 세션이다
- 역할 분리가 뚜렷하다
- UI와 D3가 둘 다 “작은 적용” 수준으로 들어간다

## 실패 패턴

- 이론 설명만 길고 실제 적용이 없다
- builder 혼자 다 하게 만든다
- D3 범위가 커져서 세션이 무너진다

## 다음 액션

`playbooks/one-hour-agent-lab.md`를 실제 진행 순서표로 같이 연다.
