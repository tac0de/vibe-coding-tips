---
title: "vibe-coding-tips"
kind: "guide"
domain: "ops"
summary: "기존 프로젝트에 Codex/에이전트를 `바로 복붙해서 투입`할 수 있게 만든 프롬프트 모음집이다."
tags:
  - "ops"
  - "README"
next: null
related: []
---

# vibe-coding-tips

기존 프로젝트에 Codex/에이전트를 `바로 복붙해서 투입`할 수 있게 만든 프롬프트 모음집이다.  
구조는 `prompts + playbooks + sources + templates`로 나눈다.

## 가장 먼저 볼 흐름

기존 프로젝트에 바로 붙일 때:

1. [prompts/onboarding/01-read-existing-repo.md](prompts/onboarding/01-read-existing-repo.md)
2. [prompts/onboarding/02-lock-scope.md](prompts/onboarding/02-lock-scope.md)
3. [prompts/onboarding/03-write-agents-md.md](prompts/onboarding/03-write-agents-md.md)
4. [prompts/onboarding/04-first-small-patch.md](prompts/onboarding/04-first-small-patch.md)
5. [prompts/onboarding/05-review-and-browser-verify.md](prompts/onboarding/05-review-and-browser-verify.md)
6. [prompts/onboarding/06-dependency-freeze.md](prompts/onboarding/06-dependency-freeze.md)
7. [prompts/onboarding/07-context-trim.md](prompts/onboarding/07-context-trim.md)
8. [prompts/onboarding/08-failure-recovery.md](prompts/onboarding/08-failure-recovery.md)
9. [prompts/onboarding/09-subagent-orchestration.md](prompts/onboarding/09-subagent-orchestration.md)
10. [prompts/onboarding/10-regression-gate.md](prompts/onboarding/10-regression-gate.md)
11. [prompts/onboarding/11-tool-orchestration.md](prompts/onboarding/11-tool-orchestration.md)
12. [prompts/onboarding/12-run-one-hour-agent-lab.md](prompts/onboarding/12-run-one-hour-agent-lab.md)

## Prompt Viewer UI

웹에서 바로 보고 복붙하려면:

```bash
pnpm install
pnpm dev
```

정적 export 확인:

```bash
pnpm build
pnpm dlx serve out -l 3005
```

GitHub Pages 배포:

- `.github/workflows/deploy-pages.yml`가 `main` 브랜치 push 시 정적 export를 Pages로 배포한다.
- 저장소 이름이 프로젝트 페이지일 경우 Actions에서 자동으로 `basePath`를 맞춘다.
- 사용자 페이지 또는 로컬에서는 별도 `basePath` 없이 그대로 열린다.

## 운영 문서

- [PLANS.md](PLANS.md)
- [AGENTS.md](AGENTS.md)
- [PROMPT_SPEC.md](PROMPT_SPEC.md)

## 역할 프롬프트

- [prompts/roles/builder.md](prompts/roles/builder.md)
- [prompts/roles/explorer.md](prompts/roles/explorer.md)
- [prompts/roles/reviewer.md](prompts/roles/reviewer.md)
- [prompts/roles/browser-verifier.md](prompts/roles/browser-verifier.md)
- [prompts/roles/d3-tutor.md](prompts/roles/d3-tutor.md)

## UI / Tailwind

- [prompts/ui/landing-first-screen.md](prompts/ui/landing-first-screen.md)
- [prompts/ui/refactor-information-hierarchy.md](prompts/ui/refactor-information-hierarchy.md)
- [prompts/ui/fix-responsive-breakage.md](prompts/ui/fix-responsive-breakage.md)
- [prompts/ui/create-design-brief.md](prompts/ui/create-design-brief.md)
- [prompts/ui/tailwind-cleanup.md](prompts/ui/tailwind-cleanup.md)
- [prompts/ui/tailwind-vibe-rules.md](prompts/ui/tailwind-vibe-rules.md)
- [prompts/ui/review-ui-tone.md](prompts/ui/review-ui-tone.md)
- [prompts/ui/accessibility-audit.md](prompts/ui/accessibility-audit.md)
- [prompts/ui/design-system-extract.md](prompts/ui/design-system-extract.md)
- [prompts/ui/anti-dashboard-rules.md](prompts/ui/anti-dashboard-rules.md)
- [prompts/ui/motion-tuning.md](prompts/ui/motion-tuning.md)
- [prompts/ui/component-api-cleanup.md](prompts/ui/component-api-cleanup.md)

## D3

- [prompts/d3/01-choose-d3-vs-chart-library.md](prompts/d3/01-choose-d3-vs-chart-library.md)
- [prompts/d3/02-design-scales.md](prompts/d3/02-design-scales.md)
- [prompts/d3/03-add-axis-or-legend-scale.md](prompts/d3/03-add-axis-or-legend-scale.md)
- [prompts/d3/04-structure-data-join.md](prompts/d3/04-structure-data-join.md)
- [prompts/d3/05-add-tooltip.md](prompts/d3/05-add-tooltip.md)
- [prompts/d3/06-add-advanced-interaction.md](prompts/d3/06-add-advanced-interaction.md)
- [prompts/d3/07-cleanup-resize-mobile.md](prompts/d3/07-cleanup-resize-mobile.md)
- [prompts/d3/08-data-shaping-for-d3.md](prompts/d3/08-data-shaping-for-d3.md)
- [prompts/d3/09-react-d3-boundary.md](prompts/d3/09-react-d3-boundary.md)
- [prompts/d3/10-debug-scales-and-joins.md](prompts/d3/10-debug-scales-and-joins.md)
- [prompts/d3/11-annotation-and-storytelling.md](prompts/d3/11-annotation-and-storytelling.md)
- [prompts/d3/12-performance-for-large-svg.md](prompts/d3/12-performance-for-large-svg.md)
- [prompts/d3/13-interaction-qa.md](prompts/d3/13-interaction-qa.md)
- [prompts/d3/14-where-d3-fits-best.md](prompts/d3/14-where-d3-fits-best.md)

## 해설 문서

- [playbooks/codex-advanced.md](playbooks/codex-advanced.md)
- [playbooks/existing-project-flow.md](playbooks/existing-project-flow.md)
- [playbooks/ui-vibe-coding.md](playbooks/ui-vibe-coding.md)
- [playbooks/d3-playbook.md](playbooks/d3-playbook.md)
- [playbooks/harness-engineering.md](playbooks/harness-engineering.md)
- [playbooks/mcp-orchestration.md](playbooks/mcp-orchestration.md)
- [playbooks/one-hour-agent-lab.md](playbooks/one-hour-agent-lab.md)

## 출처

- [sources/openai.md](sources/openai.md)
- [sources/d3.md](sources/d3.md)
- [sources/politics-data.md](sources/politics-data.md)
- [sources/ui-references.md](sources/ui-references.md)
- [sources/mcp.md](sources/mcp.md)

## 템플릿

- [templates/AGENTS.md](templates/AGENTS.md)
- [templates/task-brief.md](templates/task-brief.md)
- [templates/verification-checklist.md](templates/verification-checklist.md)
- [templates/prompt-file-template.md](templates/prompt-file-template.md)
- [templates/review-findings-template.md](templates/review-findings-template.md)
