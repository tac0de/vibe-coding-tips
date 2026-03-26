---
title: "Harness Engineering For UI And D3"
kind: "playbook"
domain: "ops"
summary: "There are sections where environmental design becomes more important than the model."
tags:
  - "ops"
  - "harness"
  - "engineering"
next: null
related: []
---

# Harness Engineering For UI And D3

There are sections where environmental design becomes more important than the model.
This is especially true for UI/UX and D3 work.

## Why it's important

- Design work is often hallucinating because of its abstract demands.
- D3 Work falls apart when steps are mixed
- There are many problems that only appear in the browser.

## Common operating principles

- AGENTS.md
- small patch
- reviewer separation
- browser verifier
- verification loop
- Narrowly call only necessary MCPs
- In case of failure, cut smaller rather than louder.

## Apply Tailwind/UI actions

- Design brief first
- Specify UI grammar to prohibit
- Fixed on mobile basis
- Read existing tokens with design system extract
- Block card-type grammar with anti-dashboard rules
- Put accessibility audit in front of reviewer

## Apply D3 task

- Scale → axis → join → tooltip → advanced interaction → cleanup order fixed
- Lock data shaping before implementation
- Divide responsibilities between React and D3 first
- Interaction QA and performance inspection are conducted immediately before release.

## First patch operation after onboarding an existing project

1. Read existing repo
2. scope lock
3. AGENTS.md Draft
4. dependency freeze
5. context trim
6. first small patch
7. reviewer
8. browser verifier
9. failure recovery
10. regression gate

## related assets

- `prompts/onboarding/01-read-existing-repo.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/onboarding/11-tool-orchestration.md`
- `prompts/ui/anti-dashboard-rules.md`
- `prompts/d3/09-react-d3-boundary.md`
- `playbooks/mcp-orchestration.md`
- `templates/AGENTS.md`
- `templates/task-brief.md`
- `templates/verification-checklist.md`
