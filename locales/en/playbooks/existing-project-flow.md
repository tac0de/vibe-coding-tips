---
title: "Existing Project Flow"
kind: "playbook"
domain: "onboarding"
summary: "The recommended flow when attaching a Codex to an existing project is the 10 steps below."
tags:
  - "onboarding"
  - "existing"
  - "project"
  - "flow"
next: null
related: []
---

# Existing Project Flow

The recommended flow when attaching a Codex to an existing project is the 10 steps below.

1. Read existing repo
2. Lock modification range
3. Create a draft of AGENTS.md
4. dependency freeze
5. context trim
6. first small patch
7. reviewer + browser verifier
8. failure recovery
9. subagent orchestration
10. regression gate

## Why is this flow important?

- Prevents major damage from the start
- Makes you start by reading the structure
- Reduce infinite loops

## Prompt Order

- `prompts/onboarding/01-read-existing-repo.md`
- `prompts/onboarding/02-lock-scope.md`
- `prompts/onboarding/03-write-agents-md.md`
- `prompts/onboarding/06-dependency-freeze.md`
- `prompts/onboarding/07-context-trim.md`
- `prompts/onboarding/04-first-small-patch.md`
- `prompts/onboarding/05-review-and-browser-verify.md`
- `prompts/onboarding/08-failure-recovery.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/onboarding/10-regression-gate.md`

## practical tips

- The first patch should be spent on small structural checks rather than major, noticeable improvements.
- Separate the reviewer from the builder, and attach the browser verifier last.
- When a failure occurs, first write down the cause of failure and the object to be discarded rather than repairing the same structure.
