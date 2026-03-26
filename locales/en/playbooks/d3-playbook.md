---
title: "D3 Playbook"
kind: "playbook"
domain: "d3"
summary: "D3 is more of a tool for directly controlling the interaction system than a tool for drawing charts."
tags:
  - "d3"
  - "playbook"
next: null
related: []
---

# D3 Playbook

D3 is more of a tool for directly controlling the interaction system than a tool for drawing charts.

## Scenes where D3 fits well

- When interaction is the core of the chart
- When annotation, story, and callout need to move together
- Frustrating moments with chart library like zoom, brush, drag, linked views
- When data changes frequently and join update is important

## Scene where D3 is excessive

- Static report that only requires simple bar, line, and pie
- Card-type dashboard that compares only numbers without interaction
- When you don't need fine-grained control over SVG

## Core Learning Sequence

1. Determine if you really need D3
2. scale design
3. axis or legend-scale
4. join
5. tooltip
6. advanced interaction
7. cleanup / resize / mobile

## Separation principles between React and D3

- React: layout, state, controls
- D3: scale, axis, join, geometry, interaction

## Why it fits well with Vibe Coding

- The steps are clear so it’s easy to proceed with small patches.
- Good for finely locking success conditions such as scale, axis, join, and tooltip.
- It is good to have the agent explain unfamiliar visualization APIs and gradually add examples.

## File to be written immediately

- `prompts/d3/01-choose-d3-vs-chart-library.md`
- `prompts/d3/02-design-scales.md`
- `prompts/d3/03-add-axis-or-legend-scale.md`
- `prompts/d3/04-structure-data-join.md`
- `prompts/d3/05-add-tooltip.md`
- `prompts/d3/06-add-advanced-interaction.md`
- `prompts/d3/07-cleanup-resize-mobile.md`
- `prompts/d3/14-where-d3-fits-best.md`
