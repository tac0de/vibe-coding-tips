---
title: "Codex Advanced"
kind: "playbook"
domain: "ops"
summary: "This document only summarizes operating principles to reduce hallucinations, infinite loops, and failure patterns."
tags:
  - "ops"
  - "codex"
  - "advanced"
next: null
related: []
---

# Codex Advanced

This document only summarizes operating principles to reduce hallucinations, infinite loops, and failure patterns.

## core

- Rather than writing everything down in detail, I only lock the axes that have a lot of failures.
- Be sure to provide 1 goal, 3 to 5 prohibitions, scope of modification, and verification loop.
- Separate builder and reviewer
- Don't keep fixing failed structures; throw them away and redesign them when necessary.
- In design work, prohibitions are often more important than references.

## Something that is always good to give in practice

- target
- pharmaceutical
- Prohibitions
- correction range
- verification command

## MCP and Orchestration Tips

- explorer is short for understanding the structure.
- Builder makes patch units small
- Reviewer is separated after implementation
- The browser verifier is used at the end after the UI is created.
- Official document inquiries are limited to the scope required.

## Related prompts

- `prompts/roles/*`
- `prompts/onboarding/*`
- `prompts/ui/review-ui-tone.md`
- `prompts/onboarding/11-tool-orchestration.md`
- `playbooks/mcp-orchestration.md`
