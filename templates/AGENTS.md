---
title: "AGENTS.md Template"
kind: "template"
domain: "templates"
summary: "- Codebase exploration"
tags:
  - "templates"
  - "AGENTS"
next: null
related: []
---

# AGENTS.md Template

## What AI Is Used For

- Codebase exploration
- Small implementation patches
- Review and risk detection
- UI and D3 iteration support

## What AI Should NOT Do

- Make product decisions on its own
- Expand scope without approval
- Edit unrelated files
- Skip validation

## Working Rules

- Start with explorer if the codebase is unfamiliar
- Keep patches small
- Use reviewer after implementation
- Use browser verifier for UI work
- Run lint, typecheck, build after code changes
- Distinguish prompts, playbooks, sources, and templates
- Prefer official sources when documentation exists
