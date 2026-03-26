---
title: "13. Interaction QA"
kind: "prompt"
domain: "d3"
summary: "tooltip, zoom, brush, drag가 실제로 읽히고 동작하는지 마지막으로 점검할 때 쓰는 프롬프트."
tags:
  - "d3"
  - "interaction"
  - "qa"
order: 13
next: "prompts/d3/14-where-d3-fits-best.md"
related:
  - "prompts/d3/05-add-tooltip.md"
  - "prompts/d3/06-add-advanced-interaction.md"
---

# 13. Interaction QA

## 상황

tooltip, zoom, brush, drag 같은 D3 인터랙션이 실제로 읽히는지 마지막 점검이 필요하다.

## 바로 복붙할 프롬프트

```txt
이번 단계에서는 D3 interaction QA만 진행해라.

점검 대상:
- tooltip
- hover highlight
- zoom / brush / drag 중 현재 구현된 것
- keyboard 또는 touch 대응
- mobile readability

답변 형식:
1. 반드시 확인할 사용자 시나리오
2. 인터랙션별 실패 지점
3. 모바일에서 더 위험한 부분
4. release 전에 고칠 우선순위

주의:
- 구현 설명보다 실제 체험 기준으로 정리해라
- 브라우저 확인 포인트를 포함해라
```

## 좋은 출력의 기준

- 사용자 시나리오로 점검한다
- 모바일 리스크가 포함된다
- tooltip과 advanced interaction 둘 다 본다

## 실패 패턴

- 데스크톱만 본다
- tooltip만 보고 끝낸다
- 읽기 경험보다 기능 동작 여부만 본다

## 다음 액션

`browser-verifier.md`
