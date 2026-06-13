# First-Principles Reconstruction: sleepquiz

> Applied Elon Musk's first-principles thinking: break to fundamental truths, rebuild from zero.

## Core Problem

People don't know their natural sleep chronotype and lack a fast, free tool to find out.

## First Principles Breakdown

1. 26 questions → weighted scoring matrix → chronotype + quality score. That's the entire domain logic (257 lines).
2. Sleep quality is deterministic from answers. No AI needed.
3. Result page IS the product. Shareable link is the growth mechanic.

## Essential Features (Only 4)

| P0 | 26 questions, one at a time, with 4 options |
| P0 | Scoring engine (chronotype + quality + habits) |
| P0 | Result page with chronotype, score, tips |
| P1 | Shareable link |

## Over-Engineering (10 items)

1. Supabase — in package.json, zero files import it
2. In-memory API store — dies on every serverless cold start
3. i18n system (6 files) — quiz questions hardcoded in Chinese anyway
4. Landing page (162 lines) — marketing doc, doesn't help users
5. shadcn/ui wrappers — could be plain HTML + Tailwind
6. framer-motion — ~150KB for CSS-transitionable animations
7. Pro upgrade UI — "$9" button, zero payment integration
8. ShareCard — renders DOM but can't export as image
9. Random star fields — Math.random() on every render
10. CI auto-release — GitHub release on every push

## Reconstruction Blueprint

~660 lines that matter. Current: ~1,800 lines, 13 extra npm deps. 60% of code and 70% of dependencies serve incomplete/premature features.

## Musk's Razor

Ship the 660 lines. Prove it works. Add complexity only when evidence demands it.
