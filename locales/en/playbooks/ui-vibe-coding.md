---
title: "UI Vibe Coding"
kind: "playbook"
domain: "ui"
summary: "The important thing in UI work is not “making it pretty,” but locking down “what kind of scene to create.”"
tags:
  - "ui"
  - "vibe"
  - "coding"
next: null
related: []
---

# UI Vibe Coding

The important thing in UI work is not “making it pretty,” but locking down “what kind of scene to create.”

## core principles

- There is only one main character on the first screen.
- If card, KPI, pill, dashboard grammar becomes the main character, it is a failure.
- Design for mobile first
- Be sure to provide the UI syntax to be banned along with the reference.

## What is Tailwind best used for?

- When quickly organizing the layout hierarchy
- When experimentally adjusting spacing and typography rules
- When reading the existing design token and adjusting it thinly
- It is a small patch that fits well with the vibe coding flow of frequently rotating the screen.

## What to Watch Especially on Tailwind

- spacing hierarchy
- typography hierarchy
- component depth
- surface/border/shadow rules

## Patterns that frequently fail in Tailwind

- Only increases utility and does not define hierarchy
- There is no standard for responsive collapse
- Excessively increases color and shadow at the same time
- To reduce class duplication, we hastily start with abstraction.

## File to be written immediately

- `prompts/ui/landing-first-screen.md`
- `prompts/ui/refactor-information-hierarchy.md`
- `prompts/ui/fix-responsive-breakage.md`
- `prompts/ui/create-design-brief.md`
- `prompts/ui/tailwind-cleanup.md`
- `prompts/ui/review-ui-tone.md`
- `prompts/ui/tailwind-vibe-rules.md`
- `prompts/ui/anti-dashboard-rules.md`
- `prompts/ui/accessibility-audit.md`
