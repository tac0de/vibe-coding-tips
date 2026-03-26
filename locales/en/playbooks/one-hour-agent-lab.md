---
title: "One Hour Agent Lab"
kind: "playbook"
domain: "ops"
summary: "One-hour practical agent coding session for UI developers. It combines application of existing projects and D3 mini exercises at once."
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

Rather than explaining the theory broadly in an hour, it is better to show the flow of agents producing small results through `운영` to the end.
The purpose of this session is not to show that “the agent is smart,” but to make `UI 개발자가 기존 프로젝트에 바로 투입할 수 있는 운영 루프` a habit.

## session goals

- In an existing project, it shows where the agent should start reading and entering.
- Separate and actually run the builder, explorer, reviewer, and browser verifier
- Tailwind/UI fixes are done as small patches, and D3 is done as a step-by-step exercise.
- At the end, only “operating rules to reduce failure” are left.

## Recommended supplies

- One existing UI project
- Locally executable branch
- Browser Verifiable Environment
- viewer or markdown documentation in this repo

## 60-minute composition

### 0-8 minutes: Lock down the failure pattern first

- Files to show:
  - `prompts/onboarding/02-lock-scope.md`
  - `prompts/ui/anti-dashboard-rules.md`
  - `prompts/onboarding/10-regression-gate.md`
- Key message:
  - If you don't lock the range, you'll hallucinate.
  - UI flows to the mass-produced type unless there is a prohibition.
  - If there is no termination condition, an infinite loop occurs.

### 8-18 minutes: Read existing projects + separate roles

- Files to show:
  - `prompts/onboarding/01-read-existing-repo.md`
  - `prompts/roles/explorer.md`
  - `prompts/roles/builder.md`
  - `prompts/roles/reviewer.md`
- Actual operation:
  - explorer: read only structure and risk
  - builder: small patch after locking modification file range
  - separate from reviewer: builder
- Highlight here:
  - Do not allow the builder to handle both structural description and implementation from the beginning.

### 18-32 minutes: UI small patch live

- Files to show:
  - `prompts/ui/create-design-brief.md`
  - `prompts/ui/tailwind-vibe-rules.md`
  - `prompts/ui/landing-first-screen.md`
  - `prompts/ui/review-ui-tone.md`
- Practical application:
  - Grab only one first screen
  - Only fix spacing hierarchy, typography hierarchy, and anti-dashboard rules.
- Live Demo:
  - patch with builder
  - tone review as reviewer
  - Check your real impressions with browser verifier

### 32-45 minutes: D3 mini lab

- Files to show:
  - `prompts/d3/14-where-d3-fits-best.md`
  - `prompts/d3/02-design-scales.md`
  - `prompts/d3/04-structure-data-join.md`
  - `prompts/d3/05-add-tooltip.md`
  - `prompts/d3/09-react-d3-boundary.md`
- Practical application:
  - Assume you are attaching a small SVG view to an existing project.
  - Complete only scale -> join -> tooltip
- stress:
  - D3 is only used in interaction-first scenes.
  - Lock the border between React and D3 first

### 45-54 minutes: Orchestrating subagents and tools

- Files to show:
  - `prompts/onboarding/09-subagent-orchestration.md`
  - `prompts/onboarding/11-tool-orchestration.md`
  - `playbooks/mcp-orchestration.md`
- Key message:
  - explorer reads
  - builder implements
  - reviewer regresses
  - browser verifier is the actual screen
  - It's not about how many tools you use, it's about the order in which they are used.

### 54-60 minutes: Clean up

- Files to show:
  - `playbooks/codex-advanced.md`
  - `playbooks/harness-engineering.md`
- Last message:
  - People who use agents well are not people who are good at talking, but people who design an environment that makes failure difficult.

## Exact order to run live

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

## Points to actively utilize subagents

### explorer

- Read existing project structure
- Find out where to put D3
- Identify risky files

### builder

- UI small patch
- D3 minimal implementation
- Responsible for implementation until cleanup

### reviewer

- Check for regression, complexity, excessive abstraction, and UI tone.

### browser verifier

- Check mobile/desktop impressions
- Hover, tooltip, responsive broken check

### d3 tutor

- Brief conceptual assistance when D3 beginners do not understand scale, join, and tooltips

## Good results to show in practice

- 1 UI first screen improvement
- 2-3 problems identified by the reviewer
- 1 D3 mini view with tooltip
- End loop passing through regression gate at the end

## Why this session is great

- “Read -> Lock -> Patch -> Review -> Verify -> Apply D3 Mini” within an hour.
- UI developers can directly add it to their own projects.
- D3 also makes you feel “where to start with the agent,” rather than “learning everything.”
