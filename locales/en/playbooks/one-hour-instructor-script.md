---
title: "One Hour Instructor Script"
kind: "playbook"
domain: "ops"
summary: "A condensed script that allows instructors to conduct a one-hour practice session as is."
tags:
  - "workshop"
  - "script"
  - "ops"
related:
  - "playbooks/one-hour-agent-lab.md"
  - "prompts/onboarding/12-run-one-hour-agent-lab.md"
---

# One Hour Instructor Script

## 0-5 minutes

- What to say:
  - Today, we are not looking at how to use prompts well, but rather how to make it difficult for agents to fail.
  - When entering an existing project, always go in the order `읽기 -> 범위 잠금 -> 작은 패치 -> 리뷰 -> 브라우저 검증`.
- Open files:
  - `prompts/onboarding/02-lock-scope.md`
  - `prompts/ui/anti-dashboard-rules.md`

## 5-15 minutes

- What to say:
  - explorer is read-only.
  - If you run the builder right away, hallucinations and overcorrections will appear.
- Open files:
  - `prompts/onboarding/01-read-existing-repo.md`
  - `prompts/roles/explorer.md`
  - `prompts/roles/builder.md`
- Show:
  - Let explorer extract only structural and dangerous files

## 15-30 minutes

- What to say:
  - The UI isn't pretty, it locks the scene first.
  - Tailwind is a tool for designing hierarchies, not listing classes.
- Open files:
  - `prompts/ui/create-design-brief.md`
  - `prompts/ui/tailwind-vibe-rules.md`
  - `prompts/ui/landing-first-screen.md`
- Show:
  - 1 first screen or information hierarchy patch as builder

## 30-40 minutes

- What to say:
  - D3 is not a chart library but an interaction system control tool.
  - Today we only go to scale, join, and tooltip.
- Open files:
  - `prompts/d3/14-where-d3-fits-best.md`
  - `prompts/d3/02-design-scales.md`
  - `prompts/d3/04-structure-data-join.md`
  - `prompts/d3/05-add-tooltip.md`
- Show:
  - Add a tooltip to a small SVG view or visualization fragment

## 40-52 minutes

- What to say:
  - After the builder is finished, the reviewer and browser verifier must be separated.
  - There is a difference in quality here.
- Open files:
  - `prompts/roles/reviewer.md`
  - `prompts/roles/browser-verifier.md`
  - `prompts/onboarding/05-review-and-browser-verify.md`
- Show:
  - 2-3 problems identified by the reviewer
  - Check mobile/first impressions in real browser

## 52-60 minutes

- What to say:
  - Subagents and MCPs are not used often, but their order is important.
  - Don't mix documentation queries, implementation, reviews, and browser verification.
- Open files:
  - `prompts/onboarding/09-subagent-orchestration.md`
  - `prompts/onboarding/11-tool-orchestration.md`
  - `playbooks/mcp-orchestration.md`
- Closing remarks:
  - People who use agents well are not people who are good at speaking, but people who design an environment that makes failure difficult.
