# Contributing

## Adding a new GritQL rule

1. Create a new file in `rules/` with the `.grit` extension. Use kebab-case for the file name.

2. Use the standard wrapper pattern. Always restrict to `className` and `class` JSX attributes using the `^class(Name)?=` anchor:

```grit
engine biome(1.0)
language js(jsx)

JsxAttribute() as $attr where {
    $attr <: r"^class(Name)?=.*your-pattern-here",
    register_diagnostic(
        span = $attr,
        message = "your-rule-name: Describe the problem and the fix.",
        severity = "warn"
    )
}
```

3. Add test fixtures in `tests/valid/your-rule-name.jsx` and `tests/invalid/your-rule-name.jsx`.
   - Valid fixtures: cover correct usage AND false-positive guard cases (patterns that look similar but should not trigger).
   - Invalid fixtures: cover all distinct patterns the rule should catch.

4. Add the rule to `rules/all.grit` inside the main `or {}` block.

5. Register it in `tests/run.mjs` following the existing three-block pattern:
   ```js
   console.log("\nyour-rule-name");
   const myRule    = resolve(ROOT, "rules/your-rule-name.grit");
   const myInvalid = resolve(ROOT, "tests/invalid/your-rule-name.jsx");
   const myValid   = resolve(ROOT, "tests/valid/your-rule-name.jsx");

   test("invalid fixtures trigger diagnostics", () => { ... });
   test("valid fixtures are clean", () => { ... });
   ```

6. Update `presets/recommended.json` and `presets/strict.json` if applicable.

7. Update the README rule table and this file's "Rules in Biome core" section.

## Severity levels

- `error` — definite mistake in code form (e.g. wrong negative arbitrary value syntax)
- `warn` — code quality issue or deprecated pattern (e.g. arbitrary values, v3 class names)
- `hint` — informational suggestion

## GritQL regex tips

- Anchor all rules to class attributes: `r"^class(Name)?=.*pattern"` prevents false positives on non-class attributes.
- To match a class that is NOT preceded by a dash (avoiding compound names): `[^-]pattern`.
- To match a standalone class (not followed by more class name chars): `pattern[^-\w]`.
- Avoid `"` inside regex strings `r"..."` — use character classes like `[^-\w]` instead.
- Test patterns live in the [Biome Playground](https://biomejs.dev/playground/) → GritQL tab.

## Testing

```bash
npm install
npm test
```

Tests require `@biomejs/biome` ≥ 2.0.0 to be installed.

## Understanding GritQL

- [Biome GritQL reference](https://biomejs.dev/reference/gritql/)
- [GritQL Plugin Recipes](https://biomejs.dev/recipes/gritql-plugins/)
- [Biome Playground](https://biomejs.dev/playground/) — use the GritQL tab to test patterns live

## Rules in Biome core (not implementable here)

The following rules require access to Tailwind CSS configuration or multi-node analysis,
making them infeasible in GritQL. They belong as PRs to the main Biome repository:

- `no-contradicting-classname` → tracked as `noContradictingClasses` in Biome
- `enforces-shorthand` → tracked as `useShorthandClasses` in Biome
- `no-custom-classname` → tracked as `noUnknownTwClass` in Biome
- `no-unnecessary-arbitrary-value` → tracked as `noUnnecessaryArbitraryValue` in Biome

`classnames-order` is covered by Biome's built-in `useSortedClasses` nursery rule — add it to your `biome.json` as shown in the presets.
