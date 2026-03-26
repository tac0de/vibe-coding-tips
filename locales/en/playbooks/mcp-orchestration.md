---
title: "MCP Orchestration"
kind: "playbook"
domain: "ops"
summary: "As the number of tools increases, the important thing is not to use more, but to call order and separation of responsibilities."
tags:
  - "ops"
  - "mcp"
  - "orchestration"
related:
  - "prompts/onboarding/11-tool-orchestration.md"
  - "sources/mcp.md"
  - "sources/openai.md"
---

# MCP Orchestration

As the number of tools increases, the more important question is not “what to use,” but “when and who to use first.”

## basic principles

- Navigation tools are briefly
- The implementation tool only works after the scope is locked.
- Reviewer is separate from implementation
- The browser verifier is used at the end after the screen is created.
- Document search only for the sections you need

## Recommendation order in UI/Tailwind tasks

1. Reading structure with explorer
2. Fix criteria with design-system extract or brief prompt
3. Small patch with builder
4. Return to reviewer and review tone
5. Check actual breakage with browser verifier

## Recommendation order in D3 tasks

1. Determine whether D3 is needed
2. Check only necessary modules through official documentation or Context7
3. data shaping
4. scale -> axis -> join -> tooltip -> advanced interaction
5. performance / interaction QA
6. browser verifier

## Frequently used MCP / tools and uses

- Playwright MCP: Actual screen verification, breakpoint, hover/click flow verification
- Context7: Modern library API context injection
- GitHub / registry-based MCP: Check issues, PR, and repository context
- General browsing: Check the latest documents, articles, and official sources

## inefficiency pattern

- Browser verification is required before implementation
- Run only builder without reviewer
- D3 steps are mixed and the interaction is added immediately.
- Reading the documentation wider than the required API scope

## Good file to watch together

- `prompts/onboarding/11-tool-orchestration.md`
- `prompts/onboarding/09-subagent-orchestration.md`
- `prompts/d3/14-where-d3-fits-best.md`
