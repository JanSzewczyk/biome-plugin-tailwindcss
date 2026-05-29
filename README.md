<div align="center">

# 🧩 biome-plugin-tailwindcss

[![npm version](https://img.shields.io/npm/v/biome-plugin-tailwindcss.svg)](https://www.npmjs.com/package/biome-plugin-tailwindcss)
[![npm downloads](https://img.shields.io/npm/dm/biome-plugin-tailwindcss.svg)](https://www.npmjs.com/package/biome-plugin-tailwindcss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Biome ≥ 2.0](https://img.shields.io/badge/Biome-%E2%89%A52.0-60A5FA?logo=&logoColor=white)](https://biomejs.dev/)

**Tailwind CSS v4 linting rules for [Biome](https://biomejs.dev/) — a GritQL plugin mirroring `eslint-plugin-tailwindcss`**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Rules](#-rules) • [Contributing](#-contributing)

</div>

---

## 👋 Hello there!

`biome-plugin-tailwindcss` is a [Biome](https://biomejs.dev/) GritQL plugin that brings Tailwind CSS-specific linting rules to teams that have migrated — or are migrating — from ESLint to Biome. It targets **Tailwind CSS v4** and provides rule parity with [`eslint-plugin-tailwindcss`](https://github.com/francoismassart/eslint-plugin-tailwindcss) wherever GritQL's single-node pattern matching allows.

Three rules ship today. A fourth — class ordering — is already built into Biome core as [`useSortedClasses`](https://biomejs.dev/linter/rules/use-sorted-classes/). The remaining four require multi-class analysis or Tailwind config access; they are documented below as candidates for upstream Biome contributions.

## ✨ Features

### 🎯 Plugin Rules (GritQL)

- **⚠ `no-arbitrary-value`** — flags arbitrary CSS values in class attributes (`w-[42px]`, `text-[#bada55]`) and encourages the use of configured design-scale values
- **✖ `enforces-negative-arbitrary-values`** — catches the wrong negative-arbitrary form `-top-[5px]` and enforces the correct `top-[-5px]` syntax
- **⚠ `migration-from-tailwind-3`** — detects 22 class patterns that were renamed or removed in Tailwind CSS v4: all six opacity utilities (`bg-opacity-*` → `bg-black/50`), flex shorthands (`flex-grow` → `grow`), shadow/blur/rounded scale renames, `outline-none` → `outline-hidden`, and more

### 🏗️ Built-in Biome Coverage

- **✅ `classnames-order`** — already built into Biome as [`useSortedClasses`](https://biomejs.dev/linter/rules/use-sorted-classes/) in the `nursery` group; see the [usage section](#-usage) for how to enable it

### 📋 Full Parity Matrix

| ESLint rule | Status | Source |
|---|---|---|
| `classnames-order` | ✅ Biome core (`useSortedClasses`) | [docs](https://biomejs.dev/linter/rules/use-sorted-classes/) |
| `no-arbitrary-value` | ✅ This plugin | [source](./rules/no-arbitrary-value.grit) |
| `enforces-negative-arbitrary-values` | ✅ This plugin | [source](./rules/enforces-negative-arbitrary-values.grit) |
| `migration-from-tailwind-3` | ✅ This plugin | [source](./rules/migration-from-tailwind-3.grit) |
| `enforces-size-shorthand` | ✅ This plugin (v4 bonus) | [source](./rules/enforces-size-shorthand.grit) |
| `no-contradicting-classname` | 🔧 Needs Biome core PR | — |
| `enforces-shorthand` | 🔧 Needs Biome core PR | — |
| `no-custom-classname` | 🔧 Needs Biome core PR | — |
| `no-unnecessary-arbitrary-value` | 🔧 Needs Biome core PR | — |

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [📦 Installation](#-installation)
- [🚀 Usage](#-usage)
- [📚 Rules](#-rules)
- [❓ Why are some rules missing?](#-why-are-some-rules-missing)
- [🧪 Testing](#-testing)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📧 Contact & Support](#-contact--support)

---

## 📦 Installation

```bash
npm install --save-dev biome-plugin-tailwindcss
# or
pnpm add --save-dev biome-plugin-tailwindcss
# or
yarn add --save-dev biome-plugin-tailwindcss
```

### Peer Dependencies

This plugin requires [Biome](https://biomejs.dev/) **≥ 2.0.0**. GritQL plugin support was introduced in Biome 2. Install it if you haven't already:

```bash
npm install --save-dev @biomejs/biome
```

---

## 🚀 Usage

Biome does not currently resolve plugins from `node_modules` automatically. You must reference `.grit` files using their explicit `node_modules` paths.

> **ℹ️ Note for all examples:** the `useSortedClasses` nursery rule sorts your Tailwind classes just like `prettier-plugin-tailwindcss`. The unsafe fix won't apply on save — run `biome lint --fix --unsafe` to apply it, or enable the rule as `"error"` with a pre-commit hook.

### Adding to an existing `biome.json`

If you already have a `biome.json`, add a `plugins` array and extend your existing `linter` section. Only the highlighted keys are new:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "plugins": [
    "./node_modules/biome-plugin-tailwindcss/rules/no-arbitrary-value.grit",
    "./node_modules/biome-plugin-tailwindcss/rules/enforces-negative-arbitrary-values.grit",
    "./node_modules/biome-plugin-tailwindcss/rules/migration-from-tailwind-3.grit"
  ],
  "linter": {
    "enabled": true,
    "rules": {
      "nursery": {
        "useSortedClasses": {
          "level": "warn",
          "fix": "unsafe"
        }
      }
    }
  }
}
```

The `plugins` key is merged with any existing rules — it does not replace them. If you already have a `rules.nursery` block, add `useSortedClasses` inside it.

### Option A — Recommended preset (copy-paste ready)

Copy the contents of [`presets/recommended.json`](./presets/recommended.json) into your `biome.json`. It enables all three plugin rules and the built-in `useSortedClasses` at `warn` severity.

### Option B — Strict preset

Copy [`presets/strict.json`](./presets/strict.json) to use the single `all.grit` bundle (all rules in one file) with `useSortedClasses` set to `error`.

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "plugins": [
    "./node_modules/biome-plugin-tailwindcss/rules/all.grit"
  ],
  "linter": {
    "enabled": true,
    "rules": {
      "nursery": {
        "useSortedClasses": {
          "level": "error",
          "fix": "unsafe"
        }
      }
    }
  }
}
```

### Option C — Individual rules

Pick only the rules you need:

```json
{
  "plugins": [
    "./node_modules/biome-plugin-tailwindcss/rules/no-arbitrary-value.grit"
  ]
}
```

---

## 📚 Rules

### ⚠ `no-arbitrary-value`

Flags Tailwind CSS [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) in `class` and `className` attributes. Arbitrary values bypass your design scale and make the codebase harder to maintain consistently.

```jsx
// ✗ Invalid — arbitrary values
<div className="w-[42px] h-[calc(100%-2rem)] text-[#bada55]" />

// ✓ Valid — scale values
<div className="w-10 h-full text-red-500" />
```

Applies to both JSX string attributes and expression containers (including `clsx`, `cx`, `cva`, `cn`, `twMerge`).

**Severity:** `warn`

---

### ✖ `enforces-negative-arbitrary-values`

Tailwind CSS expects negative arbitrary values in the form `property-[-value]`, not `-property-[value]`. The latter can cause confusion with double-negative variables and is not supported in all versions.

```jsx
// ✗ Invalid — negative modifier before property name
<div className="-top-[5px] -left-[10px]" />

// ✓ Valid — negative value inside brackets
<div className="top-[-5px] left-[-10px]" />
```

> Note: multi-component utility names with arbitrary values (e.g. `border-t-[4px]`) are **not** flagged — only class tokens that start with a leading `-` are.

**Severity:** `error`

---

### ⚠ `migration-from-tailwind-3`

Detects Tailwind CSS v3 class names that were **renamed or removed** in [Tailwind CSS v4](https://tailwindcss.com/docs/upgrade-guide). Run this rule during your v3 → v4 migration to locate all affected usages.

#### Opacity utilities (removed — use opacity modifier syntax)

| v3 class | v4 replacement |
|---|---|
| `bg-opacity-{n}` | `bg-{color}/{n}` e.g. `bg-black/50` |
| `text-opacity-{n}` | `text-{color}/{n}` e.g. `text-white/75` |
| `border-opacity-{n}` | `border-{color}/{n}` |
| `divide-opacity-{n}` | `divide-{color}/{n}` |
| `ring-opacity-{n}` | `ring-{color}/{n}` |
| `placeholder-opacity-{n}` | `placeholder-{color}/{n}` |

#### Renamed utilities

| v3 class | v4 class |
|---|---|
| `flex-grow` | `grow` |
| `flex-grow-0` | `grow-0` |
| `flex-shrink` | `shrink` |
| `flex-shrink-0` | `shrink-0` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |
| `outline-none` | `outline-hidden` |
| `shadow` | `shadow-sm` |
| `shadow-sm` | `shadow-xs` |
| `drop-shadow` | `drop-shadow-sm` |
| `drop-shadow-sm` | `drop-shadow-xs` |
| `blur` | `blur-sm` |
| `blur-sm` | `blur-xs` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `rounded` | `rounded-sm` |
| `rounded-sm` | `rounded-xs` |

```jsx
// ✗ Invalid — v3 class names
<div className="flex-grow bg-opacity-50 shadow outline-none" />

// ✓ Valid — v4 equivalents
<div className="grow bg-black/50 shadow-sm outline-hidden" />
```

**Severity:** `warn`

> **Tip:** After running this rule, use Biome's `--fix --unsafe` flag together with manual review for the shadow/blur/rounded scale renames — the scale shifted, so the correct v4 replacement depends on your intended visual weight.

---

### 💡 `enforces-size-shorthand`

Tailwind CSS v4 introduced the [`size-{n}`](https://tailwindcss.com/docs/size) utility, which sets both `width` and `height` to the same value in a single class. This rule detects when `w-X` and `h-X` appear together with an **identical value** and suggests using `size-X` instead.

```jsx
// ✗ Flagged — redundant pair when values are equal
<div className="w-4 h-4 p-2" />
<div className="flex items-center w-full h-full" />

// ✓ Valid — use the size-* shorthand
<div className="size-4 p-2" />
<div className="flex items-center size-full" />
```

> Note: the rule only flags pairs where **both values are the same** (zero false positives). `w-4 h-8` is intentionally ignored because `size-*` would not produce the same result.

Covers all 48 default Tailwind v4 size values: numeric scale (`0`–`96`) and named values (`full`, `screen`, `auto`, `fit`, `min`, `max`, `px`, `svh`, `lvh`, `dvh`, and more).

**Severity:** `hint` (advisory)

---

## ❓ Why are some rules missing?

The four remaining `eslint-plugin-tailwindcss` rules require capabilities that [GritQL](https://biomejs.dev/reference/gritql/) does not currently support:

- **Multi-class analysis** — `no-contradicting-classname` and `enforces-shorthand` need to compare multiple class tokens in the same attribute against a property map. GritQL matches one AST node at a time.
- **Tailwind config access** — `no-custom-classname` and `no-unnecessary-arbitrary-value` need to resolve the full class list from your Tailwind theme, which requires executing or statically parsing `tailwind.config.js` (or `@theme` in v4 CSS files).

These rules must be implemented directly in the [Biome repository](https://github.com/biomejs/biome) in Rust, where they are tracked as:

| Rule | Biome issue |
|---|---|
| `no-contradicting-classname` | `noContradictingClasses` |
| `enforces-shorthand` | `useShorthandClasses` |
| `no-custom-classname` | `noUnknownTwClass` |
| `no-unnecessary-arbitrary-value` | `noUnnecessaryArbitraryValue` |

Tailwind v4's CSS-first configuration (`@theme` in `.css` files) makes this significantly more tractable — Biome can parse CSS natively, which opens the door to reading custom configuration without executing JavaScript.

---

## 🧪 Testing

The test runner writes a temporary `biome.json` per test, invokes `biome lint`, and counts plugin diagnostic lines in the output.

```bash
# Install dependencies
npm install

# Run all tests
npm test
```

**Test matrix (10 tests):**

| Suite | Invalid fixture | Valid fixture |
|---|---|---|
| `no-arbitrary-value` | triggers ≥ 1 diagnostic | produces 0 diagnostics |
| `enforces-negative-arbitrary-values` | triggers ≥ 1 diagnostic | produces 0 diagnostics |
| `migration-from-tailwind-3` | triggers ≥ 1 diagnostic | produces 0 diagnostics |
| `enforces-size-shorthand` | triggers ≥ 1 diagnostic | produces 0 diagnostics |
| `all.grit` (combined) | each invalid triggers ≥ 1 | `arbValid` + `migValid` + `szValid` clean |

---

## 📁 Project Structure

```
biome-plugin-tailwindcss/
├── rules/                   # GritQL rule files
│   ├── no-arbitrary-value.grit
│   ├── enforces-negative-arbitrary-values.grit
│   ├── migration-from-tailwind-3.grit
│   └── all.grit             # All rules in a single or {} block
├── presets/                 # Ready-to-use biome.json snippets
│   ├── recommended.json     # Recommended rules at warn severity
│   └── strict.json          # All rules via all.grit at error severity
├── tests/
│   ├── run.mjs              # Custom Node.js test runner
│   ├── valid/               # Fixtures that must produce 0 diagnostics
│   │   ├── no-arbitrary-value.jsx
│   │   ├── enforces-negative-arbitrary-values.jsx
│   │   └── migration-from-tailwind-3.jsx
│   └── invalid/             # Fixtures that must produce ≥ 1 diagnostic
│       ├── no-arbitrary-value.jsx
│       ├── enforces-negative-arbitrary-values.jsx
│       └── migration-from-tailwind-3.jsx
├── CLAUDE.md                # Claude Code guidance
├── CONTRIBUTING.md          # Guide for adding new rules
├── biome.json               # Dev linting config
└── package.json
```

### Key Directories

- **`rules/`** — One `.grit` file per rule plus `all.grit` which combines every rule in a single `or {}` block for the strict preset
- **`presets/`** — Copy-paste `biome.json` snippets for common setups; these reference `node_modules` paths so they work with `npm install`
- **`tests/`** — Each rule has two fixtures: `valid/<rule>.jsx` (must lint clean) and `invalid/<rule>.jsx` (must produce ≥ 1 plugin diagnostic)

### Important Configuration Files

- **`presets/recommended.json`** — Production-ready config with all plugin rules at `warn` and `useSortedClasses` enabled
- **`presets/strict.json`** — Tighter config using `all.grit` bundle with `useSortedClasses` at `error`
- **`CONTRIBUTING.md`** — GritQL regex tips, the standard wrapper pattern, and the list of rules that belong in Biome core

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-rule`)
3. Follow the pattern in [CONTRIBUTING.md](./CONTRIBUTING.md) — each rule needs a `.grit` file, two test fixtures, an entry in `all.grit`, and an update to `tests/run.mjs`
4. Run tests: `npm test`
5. Open a Pull Request

---

## 📜 License

This package is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

- 🐛 [Open an issue](https://github.com/JanSzewczyk/biome-plugin-tailwindcss/issues)
- ⭐ [Star this repository](https://github.com/JanSzewczyk/biome-plugin-tailwindcss)
- 📦 [View on npm](https://www.npmjs.com/package/biome-plugin-tailwindcss)

---

<div align="center">

**Made with ❤️ by the community**

If this plugin helped you, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-biome-plugin-tailwindcss)

</div>
