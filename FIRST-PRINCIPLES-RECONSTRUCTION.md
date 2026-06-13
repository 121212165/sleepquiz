# First-Principles Reconstruction: sleepquiz

> Applied Elon Musk's first-principles thinking: break to fundamental truths, rebuild from zero.

## Core Problem

People don't know their natural sleep chronotype and need a fast, free tool to find out.

## First Principles Breakdown

1. 26 questions collecting integer answers, fed through a weighted scoring matrix = the entire novel domain logic.
2. Sleep quality is deterministic from answers. No AI needed.
3. The result page IS the product.

## Essential Features

| Priority | Feature |
|----------|---------|
| P0 | 26 questions, one at a time |
| P0 | Scoring engine |
| P0 | Result page with chronotype, score, tips |
| P1 | Shareable link |

## Reconstruction Blueprint

~660 lines that matter (257 scoring engine + ~400 essential UI). Current: ~1,800 lines with 13 extra npm dependencies.

## Musk\'s Razor

Ship the 660 lines. Prove the product works. Then add complexity only when evidence demands it.
