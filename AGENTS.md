# Agent Guide

## Product

Build a Polymarket copy-trading marketplace. The repository is in a front-end-only phase with mocked wallet, trader, and notification data.

## Technical Defaults

- Next.js App Router with TypeScript
- Tailwind CSS v4 and shadcn/ui as the component foundation
- React Query for mocked data access
- Dark theme by default

## Non-Goals For Current Phase

- No real wallet integration
- No trader execution routing
- No backend APIs or persistent storage
- No billing, subscriptions, or performance fee settlement logic

## Delivery Rules

- Keep work aligned to the route slices and docs in `docs/`.
- Prefer extending typed mock data instead of embedding ad hoc literals inside components.
- Preserve loading, empty, disconnected, and error states in each slice.
- Run `npm run validate` after meaningful UI or state changes.
- Run `npm run build` for route, layout, dependency, or config changes.

## File Ownership

- `app/`: route entrypoints and layout shell
- `components/`: reusable UI, shell, and slice components
- `hooks/`: query and client behavior helpers
- `lib/`: domain types, mock fixtures, formatting, navigation
- `.github/` and `.vscode/`: workflow guidance for future Copilot-assisted delivery
