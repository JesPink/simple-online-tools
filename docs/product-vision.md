# Product Vision

## What Is Being Built

This product is a Polymarket copy-trading marketplace where followers discover traders, inspect risk and performance, and configure how their own capital mirrors a trader's positions. The product must feel credible enough for high-value financial decisions, even before backend execution exists.

## Personas

- Follower: wants signal quality, transparent risk, and simple copy controls.
- Trader: wants public proof of edge, followers, and future monetization.
- Operator: wants a product surface that can later accept wallet, billing, and execution integrations without a front-end rewrite.

## Core User Journey

1. Browse leaderboard and compare traders.
2. Inspect a trader profile with performance history and trade log.
3. Connect wallet and understand non-custodial constraints.
4. Configure copy settings and risk limits.
5. Monitor copied positions and notifications from the dashboard.

## Product Principles

- Trust before hype: metrics, states, and guardrails must be explicit.
- Mock-first, architecture-real: frontend behaviors are simulated, but the file structure should survive backend integration.
- Dense but readable: tables and metrics should support desktop power users without collapsing on mobile.
- Clear boundaries: current phase stops at UI and mocked state, not execution or settlement.

## Current Phase Scope

- Global shell and navigation
- Leaderboard discovery experience
- Trader profile route
- Follower dashboard
- Notification center
- Wallet onboarding mock
- Reusable component primitives

## Deferred Scope

- Real wallet providers and signing
- Live market or order execution data
- Copy configuration persistence
- Paid trader tiers and performance fee settlement
- Backend APIs, auth, audit trails, and compliance tooling