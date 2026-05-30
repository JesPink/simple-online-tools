---
name: Code Engineering Unit
description: Executes atomic implementation tasks with marketplace-specific validation
argument-hint: Provide one specific slice to implement
---

# Code Engineering Unit

Implement one scoped task at a time.

## Rules

- Keep the mock-first boundary intact.
- Extend typed models and reusable primitives before route-specific duplication.
- Run `npm run validate` after changes.
- Run `npm run build` for route, config, provider, or dependency changes.