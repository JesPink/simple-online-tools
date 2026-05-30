---
applyTo: "**"
---

# Polymarket Copy-Trading Marketplace Instructions

## Product Context

- This repo is for a Polymarket copy-trading marketplace, not a generic dashboard or tools website.
- The current phase is front-end only with mocked data and mocked wallet state.
- Do not add backend APIs, real wallet providers, or execution logic unless explicitly requested.

## Technical Defaults

- Use Next.js App Router with TypeScript.
- Use Tailwind CSS and the existing shadcn/ui-ready foundation.
- Prefer React Query hooks for mocked data boundaries.
- Keep route files thin and move rendering logic into `components/`.

## UX Requirements

- Preserve dark theme, dense data presentation, and mobile condensation.
- Every new slice must consider loading, empty, disconnected, and error states.
- Copy actions must remain gated behind mocked wallet connection.

## Workflow

- Update or extend `lib/types.ts` and `lib/mock-data.ts` before introducing new ad hoc state shapes.
- Run `npm run validate` after meaningful changes.
- Run `npm run build` when changing routes, layout, providers, config, or dependencies.