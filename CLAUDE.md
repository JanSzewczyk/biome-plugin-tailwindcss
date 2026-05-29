# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A Biome GritQL plugin that adds Tailwind CSS v4 linting rules for JSX class attributes. Rules are written in GritQL (`.grit` files) and require **Biome ≥ 2.0.0**.

## Commands

```bash
npm install       # install devDependency @biomejs/biome
npm test          # run all tests via tests/run.mjs
```

Tests invoke `biome lint` against fixture files in `tests/valid/` and `tests/invalid/`, using temporary `biome.json` configs written on the fly.

## Architecture

```
rules/          # GritQL rule files — one per rule + all.grit combining them
  no-arbitrary-value.grit
  enforces-negative-arbitrary-values.grit
  migration-from-tailwind-3.grit
  all.grit                          # loads all rules in a single or {} block
presets/
  recommended.json                  # biome.json snippet for recommended rules
  strict.json                       # biome.json snippet for strict rules
tests/
  run.mjs                           # custom test runner (Node.js, no framework)
  valid/<rule-name>.jsx             # fixtures that must produce 0 diagnostics
  invalid/<rule-name>.jsx           # fixtures that must produce ≥1 diagnostic
```

The test runner (`tests/run.mjs`) writes a temporary `biome.json` config per test, calls `biome lint`, counts occurrences of ` plugin ` in the output, then asserts > 0 (invalid) or === 0 (valid).

## Rules

| Rule file | What it flags | Severity |
|---|---|---|
| `no-arbitrary-value.grit` | Tailwind arbitrary values like `w-[42px]` | warn |
| `enforces-negative-arbitrary-values.grit` | Wrong form `-top-[5px]` instead of `top-[-5px]` | error |
| `migration-from-tailwind-3.grit` | Tailwind v3 classes removed/renamed in v4 | warn |
| `enforces-size-shorthand.grit` | `w-X h-X` with same value → use `size-X` | hint |

## Adding a new rule

1. Create `rules/<rule-name>.grit` using the standard wrapper pattern from `CONTRIBUTING.md`.
2. Add `tests/valid/<rule-name>.jsx` and `tests/invalid/<rule-name>.jsx` fixtures.
3. Add the rule pattern inside the `or {}` block in `rules/all.grit`.
4. Register it in `tests/run.mjs` (follow the existing three-block pattern).
5. Update the README coverage table and the presets in `presets/`.

## GritQL constraints

- GritQL matches a single AST node at a time — rules that require comparing multiple class tokens across an attribute (e.g. conflict detection) are **not expressible here** and belong upstream in the Biome Rust core.
- Rules that need Tailwind CSS configuration are similarly out of scope for this plugin.
- Use `register_diagnostic(span = $node, message = "...", severity = "warn"|"error"|"hint")`.
- The `engine biome(1.0)` and `language js(jsx)` headers are required in every `.grit` file.
- Restrict rules to `className` and `class` attributes: use `r"^class(Name)?=.*"` as the regex anchor.
