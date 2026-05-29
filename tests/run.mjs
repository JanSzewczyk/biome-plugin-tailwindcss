#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BIOME_EXT = process.platform === "win32" ? ".cmd" : "";
const BIOME = resolve(ROOT, `node_modules/.bin/biome${BIOME_EXT}`);

let passed = 0;
let failed = 0;

function lint(fixture, ruleFile) {
  const cfg = JSON.stringify({
    plugins: [ruleFile],
    linter: { enabled: true },
  });
  const cfgPath = resolve(tmpdir(), `biome-plugin-tw-${Date.now()}.json`);
  writeFileSync(cfgPath, cfg);
  let output = "";
  try {
    output = execSync(`"${BIOME}" lint "--config-path=${cfgPath}" "${fixture}" 2>&1`, {
      encoding: "utf8",
    });
  } catch (e) {
    output = (e.stdout ?? "") + (e.stderr ?? "");
  } finally {
    if (existsSync(cfgPath)) unlinkSync(cfgPath);
  }
  const hits = (output.match(/ plugin /g) ?? []).length;
  return { hits, output };
}

function test(label, fn) {
  try {
    fn();
    console.log(`  ✓  ${label}`);
    passed++;
  } catch (e) {
    console.log(`  ✗  ${label}`);
    console.log(`     ${e.message}`);
    failed++;
  }
}

function expect(val, msg) {
  if (!val) throw new Error(msg);
}

// ─── no-arbitrary-value ────────────────────────────────────────────────────────
console.log("\nno-arbitrary-value");
const arbRule = resolve(ROOT, "rules/no-arbitrary-value.grit");
const arbInvalid = resolve(ROOT, "tests/invalid/no-arbitrary-value.jsx");
const arbValid = resolve(ROOT, "tests/valid/no-arbitrary-value.jsx");

test("invalid fixtures trigger diagnostics", () => {
  const { hits } = lint(arbInvalid, arbRule);
  expect(hits > 0, `Expected ≥1 diagnostic, got ${hits}`);
});
test("valid fixtures are clean", () => {
  const { hits, output } = lint(arbValid, arbRule);
  expect(hits === 0, `Expected 0 plugin diagnostics, got ${hits}:\n${output}`);
});

// ─── enforces-negative-arbitrary-values ───────────────────────────────────────
console.log("\nenforces-negative-arbitrary-values");
const negRule = resolve(ROOT, "rules/enforces-negative-arbitrary-values.grit");
const negInvalid = resolve(ROOT, "tests/invalid/enforces-negative-arbitrary-values.jsx");
const negValid = resolve(ROOT, "tests/valid/enforces-negative-arbitrary-values.jsx");

test("invalid fixtures trigger diagnostics", () => {
  const { hits } = lint(negInvalid, negRule);
  expect(hits > 0, `Expected ≥1 diagnostic, got ${hits}`);
});
test("valid fixtures are clean", () => {
  const { hits, output } = lint(negValid, negRule);
  expect(hits === 0, `Expected 0 plugin diagnostics, got ${hits}:\n${output}`);
});

// ─── migration-from-tailwind-3 ────────────────────────────────────────────────
console.log("\nmigration-from-tailwind-3");
const migRule = resolve(ROOT, "rules/migration-from-tailwind-3.grit");
const migInvalid = resolve(ROOT, "tests/invalid/migration-from-tailwind-3.jsx");
const migValid = resolve(ROOT, "tests/valid/migration-from-tailwind-3.jsx");

test("invalid fixtures trigger diagnostics", () => {
  const { hits } = lint(migInvalid, migRule);
  expect(hits > 0, `Expected ≥1 diagnostic, got ${hits}`);
});
test("valid fixtures are clean", () => {
  const { hits, output } = lint(migValid, migRule);
  expect(hits === 0, `Expected 0 plugin diagnostics, got ${hits}:\n${output}`);
});

// ─── enforces-size-shorthand ──────────────────────────────────────────────────
console.log("\nenforces-size-shorthand");
const szRule = resolve(ROOT, "rules/enforces-size-shorthand.grit");
const szInvalid = resolve(ROOT, "tests/invalid/enforces-size-shorthand.jsx");
const szValid = resolve(ROOT, "tests/valid/enforces-size-shorthand.jsx");

test("invalid fixtures trigger diagnostics", () => {
  const { hits } = lint(szInvalid, szRule);
  expect(hits > 0, `Expected ≥1 diagnostic, got ${hits}`);
});
test("valid fixtures are clean", () => {
  const { hits, output } = lint(szValid, szRule);
  expect(hits === 0, `Expected 0 plugin diagnostics, got ${hits}:\n${output}`);
});

// ─── all.grit (combined) ──────────────────────────────────────────────────────
console.log("\nall.grit (combined)");
const allRule = resolve(ROOT, "rules/all.grit");

test("each invalid fixture produces ≥1 diagnostic", () => {
  for (const fix of [arbInvalid, negInvalid, migInvalid, szInvalid]) {
    const { hits } = lint(fix, allRule);
    expect(hits > 0, `${fix}: expected ≥1 diagnostic, got ${hits}`);
  }
});
test("all valid fixtures are clean", () => {
  // negValid is intentionally excluded: it contains correct-form arbitrary values
  // (e.g. top-[-5px]) that would be flagged by no-arbitrary-value in all.grit
  for (const fix of [arbValid, migValid, szValid]) {
    const { hits, output } = lint(fix, allRule);
    expect(hits === 0, `${fix}: unexpected ${hits} plugin hit(s)\n${output}`);
  }
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(44)}`);
console.log(`${passed + failed} tests  •  ${passed} passed  •  ${failed} failed`);
if (failed > 0) process.exit(1);
