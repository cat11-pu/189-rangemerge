import assert from "node:assert";
import { readSpans } from "../read.js";
import { mergeSpans } from "../merge.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readSpans returns a list", () => {
  assert.ok(Array.isArray(readSpans([[1, 2]])));
});

check("mergeSpans returns merged", () => {
  assert.ok(Array.isArray(mergeSpans([[1, 2]]).merged));
});

check("mergeSpans returns covered", () => {
  assert.strictEqual(typeof mergeSpans([[1, 2]]).covered, "number");
});

check("render counts merged", () => {
  assert.strictEqual(typeof render({ spans: [[1, 2]] }).count, "number");
});

check("render exposes widest", () => {
  assert.strictEqual(typeof render({ spans: [[1, 2]] }).widest, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
