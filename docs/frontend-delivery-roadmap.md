# Frontend Delivery Roadmap

## Sequence

1. Layout and navigation shell
2. Reusable design-system primitives
3. Leaderboard page
4. Trader profile page
5. Copy configuration modal
6. Wallet connection and onboarding mock
7. Follower dashboard
8. Real-time notifications

## Engineering Notes

- Every slice must include loading, empty, and disconnected states where relevant.
- Mock data should live in `lib/mock-data.ts` unless a new domain module is justified.
- Route entrypoints stay thin; state and rendering logic belong in `components/` and `hooks/`.
- If a slice introduces a new workflow primitive, add it to the reusable layer before duplicating it in a route.

## Validation Standard

- `npm run validate` after all feature edits
- `npm run build` after route, layout, config, or dependency changes
- Use mocked wallet gating consistently on Copy actions and dashboard access

## Backend Readiness Checkpoints

- Query boundaries are isolated behind hooks
- Wallet state remains context-driven and swappable
- Copy settings are modeled as frontend data first, not embedded into route files
- Notifications can be moved from interval simulation to websocket or polling without changing shell ownership