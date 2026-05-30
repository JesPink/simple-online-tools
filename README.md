# Polymarket Copy-Trading Marketplace

This repository is now a clean-slate Next.js App Router workspace for a front-end-first copy-trading marketplace. The current phase is mocked end to end: wallet state, leaderboard data, trader profiles, dashboard aggregates, and notifications are simulated so the UX can be built before backend execution, permissions, or trader connectivity exists.

## Product Frame

- Product: Polymarket Copy-Trading Marketplace
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui foundation, React Query
- Tone: dark, professional, data-dense, desktop-first with mobile condensation
- Current phase: mocked data only, no real wallet or trading backend

## Routes Seeded

- `/` leaderboard and discovery surface
- `/dashboard` follower operations hub
- `/trade-history` cross-trader feed
- `/trader/[id]` trader profile and execution history
- `/settings` onboarding and future-scope guardrails

## Commands

```bash
npm install
npm run dev
npm run validate
npm run build
npm run setup-hooks
```

`npm run validate` is the baseline local gate and runs lint plus typecheck.

## Working Rules

- Keep all API and wallet behavior mocked until explicitly requested otherwise.
- Build against typed domain models in `lib/types.ts` and seeded fixtures in `lib/mock-data.ts`.
- Prefer route-level slices that map directly to the roadmap in `docs/frontend-delivery-roadmap.md`.
- Preserve disconnected, loading, empty, and error states for every user-facing feature.

## Planning Docs

- `docs/product-vision.md`
- `docs/frontend-delivery-roadmap.md`
- `AGENTS.md`

## Next Delivery Order

1. Harden the global shell and responsive nav behaviors.
2. Expand reusable primitives for tables, badges, filters, and modal workflows.
3. Build the copy configuration modal and wallet onboarding gating.
4. Add richer profile and dashboard interactions before backend integration.
